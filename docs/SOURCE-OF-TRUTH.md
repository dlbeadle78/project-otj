# Source-of-Truth Register

This register identifies which materials control Project OTJ decisions.

## Product decisions

The repository documentation and approved GitHub changes are the master project record. Where a chat instruction conflicts with an approved repository file, review the conflict before changing the product.

## Apprenticeship source documents

The detailed standards, assessment plans and KSB references still need to be migrated into a controlled reference area. The known source set includes:

- Level 2 Adult Care Worker assessment plan versions used for the project
- Level 3 Lead Adult Care Worker assessment plan
- Level 4 Lead Practitioner in Adult Care assessment plan
- Level 5 Leader in Adult Care assessment plan and current approved version

These source documents must be checked before publishing confirmed KSB codes or assessment-specific statements.

## Controlled project data

- `data/levels-and-topics.json` controls level names and topic dropdowns.
- `data/generator-options.json` controls activity, duration, setting and pack options.
- `prompts/master-activity-prompt.md` controls the base generated prompt.
- `docs/CONTENT-AND-SAFETY-RULES.md` controls product boundaries and safeguards.

## Change rule

Do not duplicate controlled lists inside application code unless they are generated from the relevant data file. This prevents the T&L and OTJ topic lists, labels and options drifting apart.
