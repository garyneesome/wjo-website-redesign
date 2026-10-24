#!/usr/bin/env python3
"""Render the two user-supplied Brown Belt 2nd Tag reference charts.

Unlike AI-generated text, everything is drawn from source/v85/chart-content.json,
a transcription of the supplied combined WJO source pages. Produces two separate,
full-resolution PNGs in a reusable colour-coded 2x2 layout.
"""
import base64
import io
import json
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageColor

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'assets/grading/v85'
WIDTH, HEIGHT=1840, 2660
MARGIN, GAP=62, 24

def font_file(bold=False,serif=False):
    base=Path('/usr/share/fonts/truetype/dejavu')
    name=('DejaVuSerif-Bold.ttf' if bold else 'DejaVuSerif.ttf') if serif else ('DejaVuSans-Bold.ttf' if bold else 'DejaVuSans.ttf')
    path=base/name
    if path.is_file(): return str(path)
    # Pillow's truetype will also find installed system fonts by name.
    return name

def font(size, bold=False, serif=False):
    return ImageFont.truetype(font_file(bold,serif),size)

def wrap(draw,txt,f,max_width):
    if not txt:return ['']
    words=str(txt).split()
    lines=[]
    line=''
    for word in words:
        next_line=(line+' '+word).strip()
        if not line or draw.textbbox((0,0),next_line,font=f)[2]<=max_width:line=next_line
        else:lines.append(line);line=word
    if line:lines.append(line)
    return lines

def panel_commands(draw,panel,body_size,room_width):
    regular=font(body_size)
    bold=font(body_size,True)
    rows=[]
    leading=body_size+11
    for i,section in enumerate(panel['sections']):
        if section.get('title'):
            rows.append(('gap',None,None,body_size//2+8))
            rows.append(('heading',section['title'],bold,leading+2))
        elif section.get('kind')=='lines' and i>0:
            rows.append(('gap',None,None,body_size//3))
        numbered=section.get('kind')=='numbered'
        for ix,item in enumerate(section['items']):
            prefix=(str(ix+1)+'.  ') if numbered else ('•  ' if section.get('kind')!='lines' else '')
            indent=18 if prefix else 0
            lines=wrap(draw,item,regular,room_width-28-indent-30)
            for line_ix,line in enumerate(lines):
                lead=prefix if line_ix==0 else ''
                rows.append(('body',(lead,line,indent),regular,leading))
    return rows,regular,bold

def draw_panel(image,draw,panel,rect):
    x1,y1,x2,y2=rect
    color=panel['color']
    tint=ImageColor.getrgb(color)
    draw.rounded_rectangle(rect,radius=12,fill='#fffcf8',outline=color,width=5)
    bar=(x1+3,y1+3,x2-3,y1+72)
    draw.rounded_rectangle(bar,radius=10,fill=color)
    draw.rectangle((x1+3,y1+40,x2-3,y1+72),fill=color)
    title=panel['name']
    tf=font(36,True,True)
    bb=draw.textbbox((0,0),title,font=tf)
    draw.text(((x1+x2-(bb[2]-bb[0]))/2,y1+15),title,font=tf,fill='#fff' if panel['name'] not in ('YELLOW BELT',) else '#181818')
    body_x=x1+27
    maxwidth=x2-x1-57
    available=y2-(y1+90)-35
    for size in range(28,17,-1):
        cmds,regular,bold=panel_commands(draw,panel,size,maxwidth)
        total=sum(z[3] for z in cmds)
        if total<=available:break
    current_y=y1+90
    for kind,val,f,height in cmds:
        if kind=='gap':current_y+=height;continue
        if kind=='heading':
            draw.text((body_x,current_y),val,font=f,fill='#171717')
            current_y+=height
        elif kind=='body':
            prefix,line,indent=val
            if prefix:
                pfont=bold if prefix[0].isdigit() else regular
                draw.text((body_x,current_y),prefix,font=pfont,fill='#151515')
            offset=draw.textbbox((0,0),prefix,font=bold if prefix and prefix[0].isdigit() else regular)[2] if prefix else 0
            draw.text((body_x+offset+indent,current_y),line,font=regular,fill='#171717')
            current_y+=height
    if current_y>y2-8:
        raise RuntimeError(f'Panel {title} overflowed by {current_y-y2}px')

def build():
    OUT.mkdir(parents=True,exist_ok=True)
    charts=json.loads((ROOT/'source/v85/reference-charts.json').read_text(encoding='utf-8'))
    panels=json.loads((ROOT/'source/v85/chart-content.json').read_text(encoding='utf-8'))
    logo_source=base64.b64decode((ROOT/'source/v74/world-wjo-logo.b64').read_text(encoding='utf-8').strip())
    logo=Image.open(io.BytesIO(logo_source)).convert('RGBA')
    logo.thumbnail((158,158),Image.Resampling.LANCZOS)
    outputs=[]
    for chart in charts:
        image=Image.new('RGB',(WIDTH,HEIGHT),'#ffffff')
        d=ImageDraw.Draw(image)
        image.paste(logo,(MARGIN,39),logo)
        image.paste(logo,(WIDTH-MARGIN-logo.width,39),logo)
        main_font=font(70,True,True)
        title='JADO KUIN DO'
        bb=d.textbbox((0,0),title,font=main_font)
        d.text(((WIDTH-(bb[2]-bb[0]))/2,49),title,font=main_font,fill='#1a1a1a')
        label_font=font(29,True)
        sub='BROWN BELT · 2ND TAG REFERENCE'
        bb=d.textbbox((0,0),sub,font=label_font)
        d.text(((WIDTH-(bb[2]-bb[0]))/2,141),sub,font=label_font,fill='#74513a')
        # Light watermark behind the four panels — never consumes text space.
        overlay=Image.new('RGBA',(WIDTH,HEIGHT),(0,0,0,0))
        od=ImageDraw.Draw(overlay)
        big=font(360,True,True)
        bbox=od.textbbox((0,0),'WJO',font=big)
        od.text(((WIDTH-(bbox[2]-bbox[0]))/2,1030),'WJO',font=big,fill=(120,116,107,11))
        image=Image.alpha_composite(image.convert('RGBA'),overlay).convert('RGB')
        d=ImageDraw.Draw(image)
        top=250
        bottom=2544
        panel_width=(WIDTH-2*MARGIN-GAP)//2
        panel_height=(bottom-top-GAP)//2
        for index,grade_id in enumerate(chart['groups']):
            col=index%2;row=index//2
            xx=MARGIN+col*(panel_width+GAP)
            yy=top+row*(panel_height+GAP)
            draw_panel(image,d,panels[grade_id],(xx,yy,xx+panel_width,yy+panel_height))
        footer=chart['copyright']
        footer_font=font(27)
        bb=d.textbbox((0,0),footer,font=footer_font)
        d.text(((WIDTH-(bb[2]-bb[0]))/2,2580),footer,font=footer_font,fill='#333')
        path=OUT/chart['filename']
        image.save(path,format='PNG',optimize=True)
        outputs.append({'id':chart['id'],'filename':path.name,'bytes':path.stat().st_size})
    return outputs

if __name__=='__main__':
    print(build())
