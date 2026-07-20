# Site v31 source import

This branch is being used to import the complete source exported from OpenAI Site project `appgprj_6a5c16a1646c8191949f329681acc219`.

Source version:

- Published Site version: 31
- Published source commit: `4363c32cbfd3ac07211b5d350896126673ed680d`
- Import branch: `develop`

## Import approach

1. Preserve the exported application source before refactoring.
2. Keep `main` stable while import and build verification take place on `develop`.
3. Verify `npm run build` after all source modules and reference data are present.
4. Open a pull request into `main` only after the exported application builds successfully.
5. Refactor `worker/rebuild.js` in a later change, without altering the preserved v31 behaviour during import.

## Imported first

- root application entry point
- package and hosting configuration
- build script
- worker entry point
- EPA reference schema
- repository ignore rules and licence

## Remaining source modules

- `worker/rebuild.js`
- `worker/epa-pd-client.js`
- `worker/epa-pd.css`
- `data/epa_pd_level_structure_reference.json`
- generated `dist/` output, if retained for provenance
