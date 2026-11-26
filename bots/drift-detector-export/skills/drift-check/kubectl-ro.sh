#!/bin/sh
# kubectl-ro: runs kubectl for reading only, on one named context.
# Anything that could change the cluster, switch identity or print stored values is refused.
#
#   sh kubectl-ro.sh <context> <verb> [arguments]
#
# The cluster's own access rules are the real lock. This script stops mistakes before they get there.
set -euf

refuse() {
  echo "kubectl-ro refused: $1" >&2
  echo "This bot only reads the cluster. Do not run kubectl directly instead." >&2
  exit 64
}

[ "$#" -ge 2 ] || refuse "usage: kubectl-ro.sh <context> <verb> [arguments]"
context=$1
verb=$2
shift 2

case "$context" in
  "" | -*) refuse "the first argument must be the name of the context" ;;
esac

case "$verb" in
  get | describe | logs | top | events | explain | api-resources | api-versions | version) ;;
  auth)
    [ "${1:-}" = "can-i" ] || refuse "only 'auth can-i' is allowed"
    ;;
  *) refuse "'$verb' is not a read-only command" ;;
esac

output=""
hidden=no
next_is_output=no
for arg in "$@"; do
  if [ "$next_is_output" = yes ]; then
    output=$arg
    next_is_output=no
    continue
  fi
  case "$arg" in
    -o | --output) next_is_output=yes ;;
    --output=*) output=${arg#--output=} ;;
    -o=*) output=${arg#-o=} ;;
    -o*) output=${arg#-o} ;;
    -A | -n | -l | -c | -p | -L) ;;
    --context* | --kubeconfig* | --cluster* | --user* | --server* | --as | --as[=-]*)
      refuse "'$arg' is not allowed, the context is fixed"
      ;;
    --token* | --password* | --username* | --client-* | --certificate-authority* | --insecure*)
      refuse "'$arg' is not allowed, the context is fixed"
      ;;
    --raw* | --template* | --filename* | --kustomize* | --recursive*)
      refuse "'$arg' is not allowed"
      ;;
    --watch* | --follow*)
      refuse "'$arg' is not allowed, it would never end"
      ;;
    --*) ;;
    -*) refuse "'$arg' is not an allowed short flag" ;;
    *)
      for part in $(printf '%s' "$arg" | tr 'A-Z,' 'a-z '); do
        kind=${part%%/*}
        kind=${kind%%.*}
        case "$kind" in
          secret | secrets)
            hidden=yes
            ;;
        esac
      done
      ;;
  esac
done

# 'auth can-i' and 'explain' answer about a kind without reading any object of it.
case "$verb" in
  auth | explain) hidden=no ;;
esac

if [ "$hidden" = yes ]; then
  [ "$verb" = get ] || refuse "only 'get' is allowed on that kind, for names"
  case "$output" in
    "" | name | wide) ;;
    *) refuse "that output could print stored values, list names only" ;;
  esac
fi

exec kubectl --context "$context" "$verb" "$@"
