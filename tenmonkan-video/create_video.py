from pathlib import Path
import sys, subprocess, math, wave, struct
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / '.video-tools'))
import imageio_ffmpeg

OUT = Path(__file__).resolve().parent
TEMP = Path('C:/Users/zento/AppData/Local/Temp')
W,H,FPS = 720,1280,24
font_path = 'C:/Windows/Fonts/meiryo.ttc'
def font(size): return ImageFont.truetype(font_path,size)
scenes = [
('3cfd3ae6-a1d4-4abd-9802-1320b356bb07',5,'文化通りから','天文館、おいしい街歩き','夜の灯りに誘われて'),
('885a5703-d771-42a7-b85f-167f4be8f6ff',7,'文化通りを歩こう','灯りのつづく通りへ','今夜は、おいしいものを探しに'),
('c29e3839-7ac0-4044-b40b-e23aa694657b',7,'天文館公園','きらめく公園で、ひと息','写真に写るイルミネーションの風景'),
('0c9319ef-a418-42e8-81e8-58118c9bcd9b',12,'喫茶マノン','喫茶時間も、ごちそう','コーヒーとホットケーキでゆっくり'),
('e3398cfc-a634-47ad-bb8e-e9a8363b6f0e',13,'鹿児島のスイーツ','白熊で、甘い寄り道','フルーツいっぱい。ひんやり幸せ'),
('c99f3006-55d4-43bc-b786-09bdb5cbc1cf',11,'ラーメン小金太','最後は、ラーメン気分','ラーメンと炒飯。食事も楽しもう'),
('18ca1a8a-f4c2-4805-8716-a0a7f2e5a04a',5,'鹿児島・天文館','歩いて、味わう天文館','次のおいしい寄り道は、ここで'),
]

def cover(im,size):
    scale=max(size[0]/im.width,size[1]/im.height)
    im=im.resize((round(im.width*scale),round(im.height*scale)),Image.Resampling.LANCZOS)
    x=(im.width-size[0])//2;y=(im.height-size[1])//2
    return im.crop((x,y,x+size[0],y+size[1]))

def centered(draw,text,y,size,color):
    f=font(size);box=draw.textbbox((0,0),text,font=f)
    draw.text(((W-(box[2]-box[0]))/2,y),text,font=f,fill=color)

prepared=[]
for i,(key,duration,label,title,caption) in enumerate(scenes):
    im=Image.open(TEMP / ('codex-clipboard-'+key+'.png')).convert('RGB')
    im.save(OUT / ('source-%02d.jpg'%(i+1)),quality=95)
    bg=ImageEnhance.Brightness(cover(im,(W,H)).filter(ImageFilter.GaussianBlur(25))).enhance(.32)
    scale=min(680/im.width,810/im.height)
    foreground=im.resize((round(im.width*scale),round(im.height*scale)),Image.Resampling.LANCZOS)
    prepared.append((bg,foreground))

# A quiet original instrumental: warm chords, a soft melody, and light pulses.
SR=22050;DURATION=sum(s[1] for s in scenes)
chords=[(130.81,164.81,196.00),(110.00,130.81,164.81),(87.31,110.00,130.81),(98.00,123.47,146.83)]
melody=[329.63,392,440,392,329.63,293.66,261.63,293.66]
audio=OUT/'music.wav'
with wave.open(str(audio),'wb') as wf:
    wf.setparams((1,2,SR,0,'NONE','not compressed'))
    buffer=bytearray()
    for n in range(SR*DURATION):
        t=n/SR; chord=chords[int(t/4)%4];phase=t%4
        env=min(1,phase/.35)*min(1,(4-phase)/.7)
        v=sum(math.sin(2*math.pi*f*t)+.15*math.sin(4*math.pi*f*t) for f in chord)*.045*env
        p=t%.5; note=melody[int(t/.5)%8]
        v+=.055*math.sin(2*math.pi*note*t)*math.exp(-p*7)*min(1,p/.012)
        beat=t%1;v+=.035*math.sin(2*math.pi*65*t)*math.exp(-beat*18)
        v*=min(1,t/2,(DURATION-t)/3)
        buffer.extend(struct.pack('<h',int(max(-1,min(1,v))*32767)))
        if len(buffer)>=65536: wf.writeframes(buffer);buffer.clear()
    wf.writeframes(buffer)

ffmpeg=imageio_ffmpeg.get_ffmpeg_exe()
output=OUT/'tenmonkan-food-walk.mp4'
cmd=[ffmpeg,'-y','-f','rawvideo','-vcodec','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','pipe:0','-i',str(audio),'-c:v','libx264','-preset','veryfast','-crf','20','-pix_fmt','yuv420p','-c:a','aac','-b:a','128k','-movflags','+faststart','-shortest',str(output)]
log=open(OUT/'encode.log','w',encoding='utf8')
p=subprocess.Popen(cmd,stdin=subprocess.PIPE,stdout=log,stderr=log)
count=0
for i,(_,duration,label,title,caption) in enumerate(scenes):
    bg,fg=prepared[i]
    for n in range(duration*FPS):
        progress=n/max(1,duration*FPS-1)
        frame=bg.copy()
        # Gentle push-in conveys movement while retaining the full supplied photograph.
        z=.96+.04*progress
        photo=fg.resize((round(fg.width*z),round(fg.height*z)),Image.Resampling.BICUBIC)
        frame.paste(photo,((W-photo.width)//2,230+(810-photo.height)//2))
        d=ImageDraw.Draw(frame)
        d.text((42,38),'KAGOSHIMA  /  FOOD WALK',font=font(20),fill='#ead7b8')
        d.rounded_rectangle((42,95,678,167),radius=18,fill='#ead7b8')
        centered(d,label,109,32,'#29221f')
        centered(d,title,1061,35,'#fff8ed')
        centered(d,caption,1132,24,'#ead7b8')
        d.text((42,1209),f'{i+1:02d} / 07',font=font(18),fill='#ead7b8')
        d.text((478,1210),'PHOTO STORY',font=font(18),fill='#ead7b8')
        d.rectangle((42,1187,678,1190),fill='#665a4d')
        d.rectangle((42,1187,42+round(636*count/(DURATION*FPS)),1190),fill='#ead7b8')
        # Short fades make each chapter change gentle.
        fade=min(1,n/(FPS*.35),(duration*FPS-1-n)/(FPS*.35))
        if fade<1: frame=ImageEnhance.Brightness(frame).enhance(.4+.6*max(0,fade))
        if n==duration*FPS//2: frame.save(OUT/f'preview-{i+1:02d}.jpg',quality=90)
        p.stdin.write(frame.tobytes());count+=1
    print(f'Chapter {i+1}/7 encoded',flush=True)
p.stdin.close()
if p.wait()!=0: raise RuntimeError('Encoding failed; see encode.log')
log.close()
print(str(output),flush=True)
