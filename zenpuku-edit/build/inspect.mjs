import fs from 'node:fs/promises';
import {FileBlob,PresentationFile} from '@oai/artifact-tool';
const p=await PresentationFile.importPptx(await FileBlob.load('C:/Users/zento/Downloads/zenpuku_kagoshima.pptx'));
await fs.writeFile('C:/Users/zento/g1-app/zenpuku-edit/build/inspect.ndjson',(await p.inspect({kind:'slide,textbox,shape,layout',maxChars:100000})).ndjson);
for(let i=0;i<p.slides.items.length;i++){
 const s=p.slides.items[i];
 await fs.writeFile(`C:/Users/zento/g1-app/zenpuku-edit/build/before-${i+1}.png`,new Uint8Array(await (await s.export({format:'png',scale:1})).arrayBuffer()));
 await fs.writeFile(`C:/Users/zento/g1-app/zenpuku-edit/build/layout-${i+1}.json`,await (await s.export({format:'layout'})).text());
}
console.log('Rendered',p.slides.items.length);
