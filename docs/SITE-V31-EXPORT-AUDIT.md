# Site v31 Source Export Audit

## Export identity

- ChatGPT Site project: `appgprj_6a5c16a1646c8191949f329681acc219`
- Published Site version: `31`
- Published source commit: `4363c32cbfd3ac07211b5d350896126673ed680d`
- Source branch: `main`
- Export reviewed: `OTJ_Site_Complete_Source_Export_v31_4363c32(1).zip`

## Findings

The archive is a valid buildable source export for the current Virtual Teaching and Learning Hub and OTJ pages. The principal application is held in `worker/rebuild.js`, with EPA Professional Discussion client code and reference data stored separately.

The OTJ approved prompt library is not stored as a separate 50-prompt dataset in this export. The source contains a `starterPrompts` array with four summary records:

1. Level 3, Safeguarding, Review a safeguarding reporting route.
2. Level 4, Quality, Governance and Compliance, Analyse a small quality concern.
3. Level 5, Leadership and Management, Compare two leadership approaches.
4. Level 5, Leading Person-Centred Practice, Map participation and co-production.

The wider library appears to be generated from topic and activity structures embedded in the monolithic worker source rather than from 50 complete, individually controlled prompt records. Issue #1 must therefore remain open until the approved 50-prompt source is located or formally created and approved.

## Import approach

The export is being imported on branch `import/site-v31-source` before merging to `main`. The existing `.openai/hosting.json` project ID must be retained so the repository remains linked to the current ChatGPT Site project.

## Recommended refactor

After the source import is complete:

- move OTJ topics, methods and prompt records into separate JSON files;
- retain `worker/rebuild.js` as rendering and routing code rather than the sole content store;
- add validation to prevent duplicate prompt IDs and topic drift;
- generate `dist/` during build rather than editing generated output manually;
- keep the EPA reference schema and level reference data under source control.
