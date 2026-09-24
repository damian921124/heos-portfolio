# Heo's Portfolio

허인범 포트폴리오 — 정적 사이트 (Vanilla HTML/CSS/JS, 빌드 도구 없음)

## 구조

```
index.html      메인 페이지
css/style.css   전체 스타일
js/main.js      인터랙션 (프로젝트 탭, 갤러리, 라이트박스, FabriX 필터 등)
images/         스크린샷 · 스틸컷 이미지
videos/         Presetflow 제작 숏폼 mp4
vercel.json     Vercel 배포 설정 (clean URL)
```

## 로컬에서 보기

빌드 과정이 없는 정적 사이트라 아무 방법으로나 로컬 서버만 띄우면 됩니다.

```bash
npx serve .
# 또는
python3 -m http.server 8000
```

## Vercel 배포

1. 이 저장소를 GitHub에 push
2. [vercel.com](https://vercel.com) → New Project → 이 저장소 선택
3. Framework Preset은 "Other" (자동 감지), Build Command 없음 — Deploy만 누르면 끝
4. 이후 `main` 브랜치에 push할 때마다 자동으로 재배포됩니다

## 수정하기

- 프로젝트 카드 내용/문구: `index.html`의 `<article class="proj" id="...">` 블록
- FabriX 산출물 이미지 추가: `images/`에 파일 넣고 `index.html`의 `#fabrix-shots` 안 해당 `fx-group`에 `<figure>` 추가
- 스타일: `css/style.css`
