from pathlib import Path
import zipfile,copy
from lxml import etree as E
base=Path('C:/Users/zento/g1-app/zenpuku-edit/build')
ns={'a':'http://schemas.openxmlformats.org/drawingml/2006/main','p':'http://schemas.openxmlformats.org/presentationml/2006/main'}
src=zipfile.ZipFile('C:/Users/zento/Downloads/zenpuku_kagoshima.pptx')
edited=zipfile.ZipFile(base/'authored.pptx')
changed={}
for i in range(2,11):
    name=f'ppt/slides/slide{i}.xml'
    old=E.fromstring(src.read(name));new=E.fromstring(edited.read(name))
    title=old.xpath('//p:sp[p:txBody]',namespaces=ns)[0]
    text=''.join(title.xpath('.//a:t/text()',namespaces=ns))
    match=next(s for s in new.xpath('//p:sp',namespaces=ns) if ''.join(s.xpath('.//a:t/text()',namespaces=ns))==text)
    for tag in ['spPr','txBody']:
        existing=title.find('p:'+tag,ns)
        title.replace(existing,copy.deepcopy(match.find('p:'+tag,ns)))
    oldaccent=old.xpath('//p:sp[p:nvSpPr/p:cNvPr[@name="Title underline accent"]]',namespaces=ns)[0]
    newaccent=new.xpath('//p:sp[p:nvSpPr/p:cNvPr[@name="Title underline accent"]]',namespaces=ns)[0]
    oldaccent.replace(oldaccent.find('p:spPr',ns),copy.deepcopy(newaccent.find('p:spPr',ns)))
    for node in old.iter():
        for attribute,value in list(node.attrib.items()):
            if attribute.startswith('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}') and value=='':
                print('Removing empty relationship attribute',i,E.QName(node).localname)
                del node.attrib[attribute]
    changed[name]=E.tostring(old,xml_declaration=True,encoding='UTF-8',standalone=True)
with zipfile.ZipFile(base/'candidate.pptx','w',zipfile.ZIP_DEFLATED) as out:
    for entry in src.infolist(): out.writestr(entry,changed.get(entry.filename,src.read(entry.filename)))
print('Preserved all original parts, including embedded video; edited 9 slide headers')
