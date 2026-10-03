#!/usr/bin/env bash
# src/ 의 파일을 순서대로 이어 붙여 단일 HTML(dist/game.html)을 만든다. 순서는 tools/sources.js 가 정한다.
set -e
cd "$(dirname "$0")/.."
mkdir -p dist
node -e "
const fs=require('fs'),s=require('./tools/sources');
const js=s.read(s.files());
new Function(js);   // 문법 오류면 여기서 멈춘다
const h=fs.readFileSync('src/head.html','utf8')+js+'\n</script>\n</body>\n</html>\n';
fs.writeFileSync('dist/game.html',h); console.log('build ok', Math.round(h.length/1024)+' KB');"
# GitHub Pages(https://lewfot-crypto.github.io/rofan/)용: 저장소 맨 앞 index.html = 게임과 같은 파일
cp dist/game.html index.html
# 일러스트 파일: dist/game.html 에서도 art/ 로 읽히게 복사 (GitHub Pages 는 저장소 맨 앞 art/ 를 그대로 씀)
rm -rf dist/art && cp -r art dist/art
