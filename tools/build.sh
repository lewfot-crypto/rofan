#!/usr/bin/env bash
# src/*.js 를 순서대로 이어 붙여 단일 HTML(dist/game.html)을 만든다.
set -e
cd "$(dirname "$0")/.."
mkdir -p dist
{
  cat src/head.html
  cat src/chapters.js src/art_core.js src/art_sprites.js src/art_bg.js src/scenes.js src/changelog.js src/app.js
  printf '\n</script>\n</body>\n</html>\n'
} > dist/game.html
node -e "
const h=require('fs').readFileSync('dist/game.html','utf8');
const s=h.split('<script>')[1].split('</script>')[0];
new Function(s); console.log('build ok', Math.round(h.length/1024)+' KB');"
