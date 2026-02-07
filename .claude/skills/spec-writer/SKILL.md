# Spec-Writing Skill

## Description
Produces clear, testable, unambiguous specifications for the fullstack todo application. Acts as the guardian of requirements, ensuring all features are well-defined before implementation.

## Core Rules
- Never include implementation details, code, libraries, folder structure or "how"
- Always use the mandatory spec template (do not deviate)
- Specs must be atomic, precise, versioned and referenceable
- Focus on WHAT, not HOW

## Mandatory Template for Every Spec
```
# [Feature/Module] Specification
**File:** specs/[category]/[kebab-case-name].md
**Version:** 1.0
**Last Updated:** YYYY-MM-DD
**Phase:** Phase II – Full-Stack Web Application

## Objective
One clear sentence.

## Target Users
...

## Scope In
...

## Scope Out
...

## Functional Requirements
### User Stories
- As a ..., I want ... so that ...

### Detailed Requirements
...

## Acceptance Criteria
- Given ... When ... Then ...

## Non-Functional Requirements
- Security ...
- Performance ...
- Validation ...

## Constraints & Assumptions
...

## Related Specifications
- @specs/...

## Open Questions
...

After writing a spec, always end with:
"Is this specification complete and clear enough to move to planning? If not, what is missing?"

Never generate code or suggest tools/libraries unless explicitly required in the project constitution.
```

## Capabilities
- Create clear, testable specifications
- Apply the mandatory spec template consistently
- Focus on functional and non-functional requirements
- Define scope clearly (in/out)
- Identify user stories and acceptance criteria

## Use Cases
- Creating feature specifications
- Defining requirements before implementation
- Establishing acceptance criteria
- Documenting scope and constraints
- Clarifying ambiguous requirements