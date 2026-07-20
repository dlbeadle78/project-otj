import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
const source=readFileSync(new URL('../worker/rebuild.js',import.meta.url),'utf8');
const epaReferenceText=readFileSync(new URL('../data/epa_pd_level_structure_reference.json',import.meta.url),'utf8');
const epaSchema=JSON.parse(readFileSync(new URL('../data/epa_pd_reference_schema.json',import.meta.url),'utf8'));
const epaReference=JSON.parse(epaReferenceText);
const epaClient=readFileSync(new URL('../worker/epa-pd-client.js',import.meta.url),'utf8');
const epaCss=readFileSync(new URL('../worker/epa-pd.css',import.meta.url),'utf8');
const templateSafe=value=>value.replaceAll('\\','\\\\').replaceAll('`','\\`').replaceAll('${','\\${');
for(const check of ['export default','async fetch','Learning Tools','teaching-and-learning','off-the-job'])if(!source.includes(check))throw new Error('Missing required site element: '+check);
if(!epaSchema||typeof epaSchema!=='object')throw new Error('EPA schema is missing or invalid.');
if(!Array.isArray(epaReference.levels)||epaReference.levels.length!==4)throw new Error('EPA reference must contain four levels.');
const expectedLevels=['L2','L3','L4','L5'];
epaReference.levels.forEach((level,index)=>{
 if(level.level!==expectedLevels[index]||!level.standard||!Array.isArray(level.grading)||!Array.isArray(level.sections)||!level.sections.length)throw new Error('Invalid EPA level structure: '+expectedLevels[index]);
 level.sections.forEach(section=>{
  if(!section.section_name||!Array.isArray(section.groups)||!section.groups.length)throw new Error('Invalid EPA section in '+level.level);
  section.groups.forEach(group=>{
   if(!group.group_code||!Array.isArray(group.ksbs)||!Number.isInteger(group.source_question_count)||!Array.isArray(group.sample_questions))throw new Error('Invalid EPA group in '+level.level+': '+group.group_code);
   group.ksbs.forEach(ksb=>{if(!ksb.code||!ksb.wording)throw new Error('Invalid EPA KSB in '+group.group_code)})
  })
 })
});
if(epaClient.includes('localStorage')||epaClient.includes('sessionStorage'))throw new Error('EPA tool must not persist working data.');
for(const token of ['__EPA_PD_REFERENCE__','__EPA_PD_CLIENT__','__EPA_PD_CSS__'])if(!source.includes(token))throw new Error('Missing build placeholder: '+token);
const builtSource=source.replace('__EPA_PD_REFERENCE__',templateSafe(JSON.stringify(epaReference))).replace('__EPA_PD_CLIENT__',templateSafe(epaClient)).replace('__EPA_PD_CSS__',templateSafe(epaCss));
if(builtSource.includes('__EPA_PD_'))throw new Error('Unresolved EPA build placeholder.');
mkdirSync(new URL('../dist/server',import.meta.url),{recursive:true});
mkdirSync(new URL('../dist/.openai',import.meta.url),{recursive:true});
copyFileSync(new URL('../worker/index.js',import.meta.url),new URL('../dist/server/index.js',import.meta.url));
writeFileSync(new URL('../dist/server/rebuild.js',import.meta.url),builtSource);
copyFileSync(new URL('../.openai/hosting.json',import.meta.url),new URL('../dist/.openai/hosting.json',import.meta.url));
writeFileSync(new URL('../dist/index.html',import.meta.url),'<!doctype html><html lang="en-GB"><meta charset="utf-8"><title>Virtual Teaching & Learning Hub</title><body><p>Loading Virtual Teaching & Learning Hub…</p></body></html>');
console.log('Validated Learning Tools worker with EPA PD Questions reference data.');
