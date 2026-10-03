#!/usr/bin/env python3
"""일러스트 넣기: python3 tools/add_art.py <원본 그림> <이름>
이름 규칙
  배경: bg_<장소>_<계절|any>_<day|night>     예) bg_study_any_day, bg_orchard_winter_day
        계절: spring summer autumn(늦가을·가을) winter(초겨울·한겨울) — 늦여름은 summer, 이른 봄은 spring
  인물: ch_<인물>_<a|b|c|all>_<표정>          예) ch_marot_all_neutral, ch_kylen_b_smile
        a=어린 시절(1~14장) b=자라는 시절(15~25장) c=성인식 무렵(26~30장) all=나이 구분 없음(어른)
        표정: neutral smile sad worry surprise
배경은 가로 1200px, 인물은 투명한 테두리를 잘라 내고 세로 1000px 로 줄여 art/<이름>.webp 로 저장한 뒤
src/assets.js(ART 목록)를 art/ 폴더 내용으로 다시 만든다."""
import sys, os, glob
from PIL import Image
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def manifest():
    names=sorted(os.path.splitext(os.path.basename(p))[0] for p in glob.glob(os.path.join(ROOT,'art','*.webp')))
    with open(os.path.join(ROOT,'src','assets.js'),'w',encoding='utf-8') as f:
        f.write('// 일러스트 목록 — tools/add_art.py 가 art/ 폴더를 보고 만든다(직접 편집 금지). 이름 규칙은 그 파일 머리말 참고\n')
        f.write('const ART=new Set('+repr(names).replace("'",'"')+');\n')
    print('assets.js:',len(names),'장')
if __name__=='__main__':
    if len(sys.argv)>=3:
        src,name=sys.argv[1],sys.argv[2]
        im=Image.open(src)
        if name.startswith('bg_'):
            im=im.convert('RGB'); w=1200; im=im.resize((w,round(im.height*w/im.width)),Image.LANCZOS)
            # 3:2 로 가운데 자르기
            H=w*2//3
            if im.height>H: t=(im.height-H)//2; im=im.crop((0,t,w,t+H))
            im.save(os.path.join(ROOT,'art',name+'.webp'),'WEBP',quality=82,method=6)
        elif name.startswith('ch_'):
            im=im.convert('RGBA'); bb=im.getchannel('A').point(lambda a:255 if a>16 else 0).getbbox(); im=im.crop(bb)
            h=1000; im=im.resize((round(im.width*h/im.height),h),Image.LANCZOS)
            im.save(os.path.join(ROOT,'art',name+'.webp'),'WEBP',quality=85,method=6)
        else: sys.exit('이름은 bg_ 또는 ch_ 로 시작해야 합니다')
        print(name, im.size, os.path.getsize(os.path.join(ROOT,'art',name+'.webp'))//1024,'KB')
    manifest()
