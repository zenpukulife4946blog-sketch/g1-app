import fs from 'node:fs/promises';
import {FileBlob,PresentationFile} from '@oai/artifact-tool';
const p=await PresentationFile.importPptx(await FileBlob.load('C:/Users/zento/Downloads/zenpuku_kagoshima.pptx'));
const records=(await p.inspect({kind:'slide,textbox,shape',maxChars:200000})).ndjson.split('\n').filter(Boolean).map(x=>JSON.parse(x));
for(let i=2;i<=10;i++){
 const slideRec=records.find(r=>r.kind==='slide'&&r.slide===i);
 const titleRec=records.find(r=>r.kind==='textbox'&&r.slide===i&&r.text===slideRec.title);
 const title=p.resolve(titleRec.id);
 title.text=titleRec.text;
 title.position={left:76,top:57,width:1128,height:95};
 title.text.style={typeface:'Noto Sans CJK JP',fontSize:54,bold:true,color:'#102E42',autoFit:'none'};
 const accentRec=records.find(r=>r.kind==='shape'&&r.slide===i&&r.name==='Title underline accent');
 const accent=p.resolve(accentRec.id);
 accent.position={left:76,top:153,width:300,height:0};
 accent.line={fill:'#C34E31',width:4};
}
await (await PresentationFile.exportPptx(p)).save('C:/Users/zento/g1-app/zenpuku-edit/build/authored.pptx');
console.log('Titles edited');
process.exit(0);
