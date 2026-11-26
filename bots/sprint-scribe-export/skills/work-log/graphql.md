# Work item fields through GraphQL

Priority, parent and iteration are fields of the issue's work item. Set them through GitLab's GraphQL API, as your owner, with `glab`. Write each query to a file and send it with `glab api graphql -F query=@<file>`; every other `-f name=value` becomes a variable of the query.

Field and type names below are from GitLab's published GraphQL reference (`workItemUpdate`, `WorkItemWidgetCustomFieldValueInputType`, `WorkItemWidgetHierarchyUpdateInput`). If a call is refused, read the error, say it once in the summary, and don't try another way.

## The work item's id

The mutations need the work item's global id, not the number in its URL.

- From the issue: `glab api projects/<project>/issues/<iid>` gives its `id`. The work item id is `gid://gitlab/WorkItem/<id>`.
- From an epic: `glab api groups/<group>/epics/<iid>` gives its `work_item_id`. Use `gid://gitlab/WorkItem/<work_item_id>`.
- Or ask for it by number:

```graphql
query ($path: ID!, $iid: String!) {
  namespace(fullPath: $path) {
    workItem(iid: $iid) {
      id
      title
    }
  }
}
```

`glab api graphql -F query=@<file> -f path=<group or project path> -f iid=<number>`

## The Priority field and its options

Priority is a custom field that the team's top-level group set up for work items: a single-select with the team's own options. Look it up once and keep the ids in `memory/scribe-setup.md`.

```graphql
query ($group: ID!, $name: String) {
  group(fullPath: $group) {
    customFields(active: true, search: $name) {
      nodes {
        id
        name
        fieldType
        selectOptions {
          id
          value
        }
        workItemTypes {
          name
        }
      }
    }
  }
}
```

`glab api graphql -F query=@<file> -f group=<top-level group> -f name=Priority`

- Keep the field's `id` and each option's `id` and `value`.
- No field with that name: the group has none. Use priority labels instead, as the skill says.

## Read what an issue has now

```graphql
query ($id: WorkItemID!) {
  workItem(id: $id) {
    id
    widgets {
      type
      ... on WorkItemWidgetCustomFields {
        customFieldValues {
          customField {
            id
            name
          }
          ... on WorkItemSelectFieldValue {
            selectedOptions {
              id
              value
            }
          }
        }
      }
      ... on WorkItemWidgetHierarchy {
        parent {
          id
          title
        }
      }
    }
  }
}
```

Run this before you set anything: a Priority or a parent that is already there stays as it is.

## Set Priority

Write the ids into the file itself.

```graphql
mutation {
  workItemUpdate(
    input: {
      id: "gid://gitlab/WorkItem/<id>"
      customFieldsWidget: [
        { customFieldId: "<the Priority field's id>", selectedOptionIds: ["<the option's id>"] }
      ]
    }
  ) {
    errors
    workItem {
      id
    }
  }
}
```

## Set the parent

```graphql
mutation {
  workItemUpdate(
    input: { id: "gid://gitlab/WorkItem/<id>", hierarchyWidget: { parentId: "gid://gitlab/WorkItem/<parent id>" } }
  ) {
    errors
    workItem {
      id
    }
  }
}
```

## Set the iteration

```graphql
mutation {
  workItemUpdate(
    input: { id: "gid://gitlab/WorkItem/<id>", iterationWidget: { iterationId: "gid://gitlab/Iteration/<iteration id>" } }
  ) {
    errors
    workItem {
      id
    }
  }
}
```

`<iteration id>` is the `id` of the current iteration from `glab api "groups/<group>/iterations?state=current"`.

After any of these mutations: `errors` must be empty. Then read the issue back and check the value is there.
