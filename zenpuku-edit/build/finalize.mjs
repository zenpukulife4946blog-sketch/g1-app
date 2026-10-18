import fs from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {FileBlob,PresentationFile} from '@oai/artifact-tool';
const skill='C:/Users/zento/.codex/plugins/cache/openai-primary-runtime/presentations/26.904.11930/skills/presentations';
const root='C:/Users/zento/g1-app/zenpuku-edit';
const {finalizePresentation}=await import(pathToFileURL(skill+'/container_tools/artifact_tool_utils.mjs').href);
const result=await finalizePresentation({workspaceDir:root,candidatePath:root+'/build/candidate.pptx',finalPath:root+'/output/zenpuku_kagoshima_titles.pptx',pythonExecutable:'C:/Users/zento/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe',integrityValidatorPath:skill+'/container_tools/inspect_presentation_package_integrity.py',layoutValidatorPath:skill+'/container_tools/inspect_presentation_layout_geometry.py',layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-heading-fit'],explicitTotalSlideCount:10,verifyArtifactToolImport:true,receiptPath:root+'/build/validation.json'});
console.log(JSON.stringify(result));
const p=await PresentationFile.importPptx(await FileBlob.load(root+'/output/zenpuku_kagoshima_titles.pptx'));
for(let i=0;i<p.slides.items.length;i++){
 const s=p.slides.items[i];
 await fs.writeFile(root+`/build/after-${i+1}.png`,new Uint8Array(await (await s.export({format:'png',scale:1})).arrayBuffer()));
}
process.exit(0);
