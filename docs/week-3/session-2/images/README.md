# Diagrams for the Entra ID / RBAC walkthrough

31 original SVG schematics used by
[`../entra-id-user-group-rbac.md`](../entra-id-user-group-rbac.md).

## Why SVG diagrams instead of screenshots

The walkthrough originally pointed at GitHub's `user-attachments` CDN. Those URLs are
authentication-gated and bound to the repository they were first uploaded into, so every
request from anywhere else returned **HTTP 404** — which is why the images were broken.

These files replace them, and the failure mode is gone for good:

| Property | Effect |
|---|---|
| Stored in the repo | Works in forks, clones, private repos, offline, and in PDF exports |
| Vector, ~10–20 KB each | Sharp at any zoom, cheap to diff and review |
| Structural, not pixel-perfect | Stays correct when Microsoft restyles the portal |
| Plain text | Editable in any text editor; changes show up as readable diffs in PRs |

They are **schematics, not screenshots**, and each one says so in its footer. They show the
blade layout, the navigation path, the fields to fill and the click order — which is the part
learners actually need.

## Reading them

- **Orange numbered circles** = click order, matching the numbered steps in the document.
- **Orange dashed outlines** = the control the step refers to.
- **Blue** = Azure portal chrome, selection and primary buttons.
- **Green** = success or running states.
- Coloured side-panels are teaching notes, not portal UI.

## Regenerating or editing

The diagrams were produced by a small Python SVG kit (`svgkit.py` plus two generator scripts).
For a one-off change, editing the SVG directly is usually faster — the markup is hand-readable:

```xml
<text x="70" y="240" font-size="13" fill="#16202B" font-weight="600">Project details</text>
```

Keep the shared palette so the set stays visually consistent:

| Token | Hex | Use |
|---|---|---|
| ink | `#16202B` | Primary text |
| muted | `#5B6773` | Secondary text |
| line | `#D3DAE0` | Borders |
| blade | `#F4F6F8` | Blade background |
| chrome | `#1B2733` | Portal top bar |
| brand | `#0F6CBD` | Azure blue |
| accent | `#C8501E` | Annotation layer only |
| ok | `#107C41` | Success / running |

## Naming

Files are numbered in the order they appear in the document (`01-…` → `31-…`) and named after
the step, so a diff in a pull request tells you which step changed.

---

**CareerByteCode** · *Learning Made Simple* ·
[www.careerbytecode.com](https://www.careerbytecode.com)
