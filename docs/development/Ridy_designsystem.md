# 🎨 RIDY (ridy.co.kr) 디자인 시스템 레퍼런스 문서

아래는 IDE에서 바로 활용할 수 있도록 정리한 RIDY 웹사이트의 디자인 토큰 및 컴포넌트 가이드입니다. 모바일 뷰 상세 페이지를 만들 때 톤앤매너를 맞추는 데 활용하세요.

---

## 1. 기술 스택

이 사이트는 Framer로 빌드되어 있고(`generator: Framer f21d278`), 폼은 Tally.so iframe을 임베드하여 사용합니다. 상세 페이지를 직접 코딩할 경우 HTML/CSS/JS 또는 React 등 원하는 스택으로 아래 토큰을 그대로 적용하면 됩니다.

---

## 2. 컬러 시스템

```css
:root {
  /* ── Primary ── */
  --color-primary:        #4054E7;   /* rgb(64, 84, 231) — 히어로 배경, 활성 탭, 주요 CTA */

  /* ── Neutral (텍스트) ── */
  --color-text-primary:   #212121;   /* rgb(33, 33, 33) — 본문 강조 */
  --color-text-secondary: #3D3D3D;   /* rgb(61, 61, 61) — 제목(H1~H4) */
  --color-text-tertiary:  #5C5C5C;   /* rgb(92, 92, 92) — 네비 라벨 */
  --color-text-muted:     #757575;   /* rgb(117, 117, 117) — 비활성 탭, 보조 텍스트 */
  --color-text-light:     #8A8A8A;   /* rgb(138, 138, 138) — placeholder, 부가 설명 */
  --color-text-disabled:  #919191;   /* rgb(145, 145, 145) — 비활성 요소 */

  /* ── Neutral (배경) ── */
  --color-bg-white:       #FFFFFF;
  --color-bg-light:       #FAF9F5;   /* rgb(250, 249, 245) — 크림 배경 */
  --color-bg-gray:        #F2F2F2;   /* rgb(242, 242, 242) — 프로그레스바, 구분선 배경 */
  --color-bg-dark:        #212121;   /* rgb(33, 33, 33) — 다크 섹션(CTA/Footer) */
  --color-bg-dark-card:   #242424;   /* rgb(36, 36, 36) — 다크 섹션 내 카드/버튼 */
  --color-bg-frosted:     rgba(255, 255, 255, 0.6);  /* FAB 버튼 배경 */

  /* ── Accent ── */
  --color-accent-orange:  rgba(217, 119, 87, 0.7);  /* 글로우 이펙트 (inset shadow) */

  /* ── Border ── */
  --color-border:         rgba(31, 30, 29, 0.4);   /* 0.5px 보더 */

  /* ── On-dark ── */
  --color-on-dark:        #FFFFFF;
  --color-on-dark-muted:  rgba(255, 255, 255, 0.7);
}
```

---

## 3. 타이포그래피

### 3-1. 폰트 패밀리

```css
:root {
  /* 주요 폰트: Pretendard (가변 weight 사용) */
  --font-heading-xl:   'Pretendard ExtraBold', sans-serif;   /* weight: 800 */
  --font-heading:      'Pretendard Bold', sans-serif;         /* weight: 700 */
  --font-body:         'Pretendard Regular', sans-serif;       /* weight: 400 */
  /* 보조 폰트 */
  --font-fallback:     'Noto Sans KR', sans-serif;
}
```

**Pretendard woff2 파일 소스 (Framer CDN):**

- ExtraBold (800): `framerusercontent.com/assets/uwqGiuEU1nY12c9P3Tcx08pQYI.woff2`
- Bold (700): `framerusercontent.com/assets/GHJPBmd4yxGhh5oPHY0HmX7Jl4.woff2`
- Regular (400): `framerusercontent.com/assets/FyvaBmQLI1A6sAVrXVhA1qjbVqs.woff2`

> 실제 프로젝트에서는 CDN 대신 pretendard npm 패키지 또는 공식 CDN(`cdn.jsdelivr.net/gh/orioncactus/pretendard`)을 사용하세요.

### 3-2. 타입 스케일

```css
/* ── 데스크톱 기준 (모바일은 0.65~0.75배 축소 권장) ── */

/* Hero Title */
.text-hero {
  font-family: var(--font-heading-xl);
  font-size: 48px;
  line-height: 1.6;           /* 76.8px */
  letter-spacing: -1.92px;    /* -4% */
  color: var(--color-text-secondary);
}

/* Section Title (메인 카드 — 렌탈/정산/정비) */
.text-section-title {
  font-family: var(--font-heading);
  font-size: 56px;
  line-height: 1.6;           /* 89.6px */
  letter-spacing: -2.24px;    /* -4% */
  color: var(--color-text-secondary);
}

/* Sub-section Title (RIDY에서 한번에, 계약 절차, FAQ 등) */
.text-sub-title {
  font-family: var(--font-heading-xl);
  font-size: 24px;
  line-height: 1.35;          /* 32.4px */
  letter-spacing: -0.96px;    /* -4% */
  color: var(--color-text-secondary);
}

/* Navigation Label */
.text-nav {
  font-family: var(--font-heading);
  font-size: 14px;
  line-height: 1.6;
  letter-spacing: -0.28px;    /* -2% */
  color: var(--color-text-tertiary);
}

/* Nav CTA Button */
.text-nav-cta {
  font-family: var(--font-heading);
  font-size: 16px;
  line-height: 1.3;
  letter-spacing: -0.32px;
  color: var(--color-text-primary);
}

/* Body Text */
.text-body {
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.6;
  letter-spacing: -0.32px;
  color: var(--color-text-muted);
}

/* Small/Caption */
.text-caption {
  font-family: var(--font-body);
  font-size: 14px;
  line-height: 1.6;
  letter-spacing: -0.28px;
  color: var(--color-text-light);
}

/* Tab Labels (렌탈 기종/리스 승계, HONDA/YAMAHA 등) */
.text-tab-active {
  font-family: var(--font-heading-xl);
  font-size: 18px;
  letter-spacing: -0.36px;
  color: var(--color-text-secondary);
}
.text-tab-inactive {
  font-family: var(--font-body);
  font-size: 18px;
  letter-spacing: -0.36px;
  color: var(--color-text-muted);
}
```

---

## 4. 간격 & 레이아웃

```css
:root {
  /* ── Spacing Scale ── */
  --space-xs:   8px;
  --space-sm:   12px;
  --space-md:   16px;
  --space-lg:   20px;
  --space-xl:   30px;
  --space-2xl:  40px;
  --space-3xl:  60px;

  /* ── Container ── */
  --container-max-width: 1200px;    /* 컨텐츠 최대 폭 */
  --container-padding:   60px;      /* 데스크톱 좌우 패딩 */

  /* ── Nav ── */
  --nav-height: 80px;
  --nav-padding: 20px;
}
```

---

## 5. 컴포넌트 스타일

### 5-1. Border Radius

```css
:root {
  --radius-sm:   10px;   /* 카드, 버튼, 드롭다운 메뉴 */
  --radius-md:   12px;   /* 이미지 카드 */
  --radius-lg:   17px;   /* 네비 CTA 버튼 */
  --radius-xl:   20px;   /* 대형 카드/컨테이너 */
  --radius-pill: 34px;   /* 알약형 버튼 */
  --radius-full: 100px;  /* 원형 아이콘 */
}
```

### 5-2. 그림자 (Box Shadow)

```css
/* 드롭다운 메뉴 */
.shadow-dropdown {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 50px 0px;
}

/* 주요 CTA 글로우 (오렌지 accent) */
.shadow-glow {
  box-shadow:
    rgba(217, 119, 87, 0.7) 0px 0px 15px 0px inset,
    rgba(217, 119, 87, 0.5) 0px 0px 25px 0px inset,
    rgba(217, 119, 87, 0.2) 0px 0px 35px 0px inset;
}

/* 외부 글로우 (버튼 hover 등) */
.shadow-glow-outer {
  box-shadow:
    rgba(217, 119, 87, 0.24) 0px 40px 80px 0px,
    rgba(217, 119, 87, 0.24) 0px 4px 14px 0px;
}
```

### 5-3. 네비게이션 헤더

```css
.nav {
  display: flex;
  align-items: center;
  height: 80px;
  padding: 20px;
  background: transparent;          /* 스크롤 시 변경 없음 */
  position: relative;               /* sticky가 아님 */
}

/* 프로그레스 바 (페이지 상단 6px 파란 줄) */
.nav-progress {
  height: 6px;
  background: var(--color-primary);
  position: fixed;
  top: 0;
  left: 0;
}
```

### 5-4. 드롭다운 메뉴

```css
.dropdown-menu {
  background: #FFFFFF;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 50px 0px;
  padding: 15px 0;
}
.dropdown-item {
  font-family: var(--font-heading);
  font-size: 14px;
  color: #4F4F4F;            /* rgb(79, 79, 79) */
  padding: 15px;
  letter-spacing: -0.28px;
}
.dropdown-sub-item {            /* 들여쓰기 서브 메뉴 (렌탈 기종 보기 등) */
  padding-left: 30px;
  font-family: var(--font-body);
  color: #4F4F4F;
}
```

### 5-5. 버튼

```css
/* ── 아웃라인 버튼 (히어로 CTA: 렌탈 기종 보기, 렌탈 신청하기) ── */
.btn-outline {
  background: transparent;
  border: 0.5px solid rgba(31, 30, 29, 0.4);
  border-radius: 34px;         /* pill shape */
  padding: 10px 24px;
  font-family: var(--font-heading);
  font-size: 14px;
  color: #FFFFFF;              /* on-dark background */
  height: 42px;
  cursor: pointer;
}

/* ── 아웃라인 버튼 (라이트 배경 — 더보기, 렌탈 문의하기) ── */
.btn-outline-light {
  background: transparent;
  border: 0.5px solid rgba(31, 30, 29, 0.4);
  border-radius: 34px;
  padding: 10px 24px;
  font-family: var(--font-heading);
  font-size: 14px;
  color: var(--color-text-secondary);
  height: 42px;
}

/* ── 지역 선택 버튼 (서비스센터) ── */
.btn-location-active {
  background: var(--color-primary);   /* #4054E7 */
  color: #FFFFFF;
  border-radius: 10px;
  height: 40px;
  font-size: 14px;
  font-family: var(--font-heading);
}
.btn-location-default {
  background: #333333;
  color: #FFFFFF;
  border-radius: 10px;
  height: 40px;
}

/* ── 다크 섹션 CTA 버튼 (리스/렌탈 문의하기 등) ── */
.btn-dark-cta {
  background: var(--color-bg-dark-card);  /* #242424 */
  color: #FFFFFF;
  border-radius: 10px;
  width: 302px;
  height: 86px;
  font-family: var(--font-heading);
  font-size: 16px;
}

/* ── Primary Submit 버튼 (신청하기, 다음으로) ── */
.btn-primary {
  background: var(--color-primary);
  color: #FFFFFF;
  border-radius: 10px;
  width: 100%;
  height: 48px;
  font-family: var(--font-heading);
  font-size: 16px;
  border: none;
}
```

### 5-6. 카드 컴포넌트

```css
/* ── 출고 사례 카드 (렌탈 페이지) ── */
.card-case {
  background: #FFFFFF;
  border-radius: 20px;
  overflow: hidden;
  /* 이미지 + 텍스트 수직 배치 */
}
.card-case__image {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
}
.card-case__title {
  font-family: var(--font-heading-xl);
  font-size: 18px;
  color: var(--color-text-primary);
  padding: 16px;
}
.card-case__desc {
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--color-text-light);
  padding: 0 16px;
}

/* ── 바이크 모델 카드 (차종보기 페이지) ── */
.card-bike {
  background: #FFFFFF;
  border: 1px solid #E0E0E0;    /* 라이트 보더 */
  border-radius: 12px;
  overflow: hidden;
  text-align: center;
}
.card-bike__image {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: contain;
  background: #FAF9F5;
}
.card-bike__name {
  font-family: var(--font-heading);
  font-size: 16px;
  color: var(--color-text-primary);
  padding: 12px 0;
}

/* ── 특장점 카드 (보험, 무료탁송 등) ── */
.card-feature {
  background: #FFFFFF;
  border: 1px solid #E0E0E0;
  border-radius: 12px;
  padding: 24px;
}
.card-feature__title {
  font-family: var(--font-heading-xl);
  font-size: 18px;
  color: var(--color-text-primary);
}
.card-feature__desc {
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--color-text-light);
  margin-top: 8px;
}
```

### 5-7. 배지

```css
/* 인기상품 배지 (바이크 모델 카드) */
.badge-popular {
  background: #FF5252;           /* 레드 계열 */
  color: #FFFFFF;
  font-size: 12px;
  font-family: var(--font-heading);
  padding: 4px 10px;
  border-radius: 4px;
  position: absolute;
  top: 8px;
  left: 8px;
}
```

### 5-8. 아코디언/FAQ

```css
.accordion-item {
  border-bottom: 1px solid #E0E0E0;
  padding: 20px 0;
}
.accordion-title {
  font-family: var(--font-heading);
  font-size: 16px;
  color: var(--color-text-primary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.accordion-icon {
  /* + 아이콘, 열리면 - 로 전환 */
  font-size: 20px;
  color: var(--color-text-muted);
}
```

### 5-9. 탭 네비게이션

```css
.tab-nav {
  display: flex;
  gap: 24px;
  border-bottom: 1px solid #E0E0E0;
  padding-bottom: 12px;
}
.tab-item {
  font-family: var(--font-body);
  font-size: 18px;
  color: var(--color-text-muted);
  letter-spacing: -0.36px;
  cursor: pointer;
  padding-bottom: 4px;
}
.tab-item--active {
  font-family: var(--font-heading-xl);
  color: var(--color-text-secondary);
  border-bottom: 2px solid var(--color-text-secondary);
}
```

### 5-10. 폼 (Tally.so 스타일 참고)

```css
.form-label {
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--color-text-primary);
  margin-bottom: 6px;
}
.form-label__required {
  color: var(--color-primary);     /* * 표시 */
}
.form-input {
  width: 100%;
  height: 48px;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  padding: 12px 16px;
  font-family: var(--font-body);
  font-size: 16px;
  color: var(--color-text-primary);
  background: #FFFFFF;
}
.form-input::placeholder {
  color: #B0B0B0;
}
.form-input:focus {
  border-color: var(--color-primary);
  outline: none;
}
.form-select {
  /* input과 동일 + 오른쪽 chevron down 아이콘 */
  appearance: none;
  background-image: url("chevron-down.svg");
  background-position: right 16px center;
  background-repeat: no-repeat;
}
.form-textarea {
  min-height: 120px;
  resize: vertical;
}
```

### 5-11. FAB (Floating Action Buttons)

```css
.fab-container {
  position: fixed;
  right: 30px;
  bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 0;
  z-index: 1000;
}
.fab-item {
  width: 67px;
  height: 100px;
  background: rgba(255, 255, 255, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  text-decoration: none;
}
.fab-item__icon {
  width: 32px;
  height: 32px;
}
.fab-item__label {
  font-size: 12px;
  color: var(--color-text-primary);
}
```

### 5-12. Footer / CTA 다크 섹션

```css
.footer-cta {
  background: var(--color-bg-dark);
  padding: 51px 60px;
}
.footer-cta__heading {
  font-family: var(--font-heading-xl);
  font-size: 24px;
  color: #FFFFFF;
  line-height: 1.4;
}
.footer-cta__logo {
  /* RIDY 로고 — 흰색 버전 */
  margin-top: 16px;
}
.footer-info {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 40px;
  padding-top: 40px;
}
.footer-info__category-title {
  font-family: var(--font-heading);
  font-size: 14px;
  color: #FFFFFF;
}
.footer-info__text {
  font-family: var(--font-body);
  font-size: 12px;
  color: var(--color-text-muted);
}
```

---

## 6. 섹션 구분선

```css
.divider {
  width: 100%;
  max-width: var(--container-max-width);
  height: 1px;
  background: #E0E0E0;
  margin: 40px auto;
}
```

---

## 7. 페이지별 히어로 패턴

```css
/* 렌탈/페이아웃 페이지 — 풀폭 블루 히어로 */
.hero-blue {
  background: var(--color-primary);
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #FFFFFF;
  padding: 60px 20px;
}
.hero-blue__logo {
  /* RIDY RENTAL 또는 RIDY PAYOUT 로고 */
  margin-bottom: 24px;
}
.hero-blue__title {
  font-family: var(--font-heading-xl);
  font-size: 48px;
  line-height: 1.6;
  letter-spacing: -1.92px;
}
.hero-blue__subtitle {
  font-family: var(--font-body);
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 16px;
}

/* 서비스센터/차종보기 — 라이트 배경 히어로 */
.hero-light {
  background: #FFFFFF;
  padding: 80px 60px;
}
```

---

## 8. 모바일 최적화 권장사항

이 사이트는 `viewport: width=device-width`를 사용하며, 모바일에서도 데스크톱과 동일한 레이아웃을 유지합니다(Framer의 반응형 스케일링). 모바일 상세 페이지를 새로 만들 때는 다음을 권장합니다.

```css
/* 모바일 뷰 조정 예시 */
@media (max-width: 768px) {
  .text-hero      { font-size: 28px; line-height: 1.4; letter-spacing: -1.12px; }
  .text-section   { font-size: 32px; }
  .text-sub-title { font-size: 20px; }
  .text-body      { font-size: 15px; }
  
  .container      { padding: 0 20px; }
  .nav            { height: 56px; padding: 12px 16px; }
  
  .card-grid      { grid-template-columns: 1fr; gap: 16px; }
  .footer-info    { grid-template-columns: 1fr; }
}
```

---

## 9. 요약 — 핵심 디자인 키워드

| 항목 | 값 |
|------|-----|
| 브랜드 컬러 | `#4054E7` (파란 보라) |
| 다크 배경 | `#212121` / `#242424` |
| 주 폰트 | Pretendard (ExtraBold 800 / Bold 700 / Regular 400) |
| 보조 폰트 | Noto Sans KR |
| letter-spacing | 대체로 -2% ~ -4% (타이트한 자간) |
| border-radius | 10px(소) / 17px(중) / 20px(대) / 34px(pill) |
| 톤앤매너 | 깔끔하고 미니멀, 다크+블루 히어로 대비, 밝은 본문 섹션, 여백 넉넉 |
| 폼 스타일 | Tally.so 임베드 — 라운드 인풋, 밑줄 없는 클린 스타일 |
| 인터랙션 | 아코디언(FAQ), 탭 전환, 드롭다운 메뉴, 글로우 이펙트 |

---

이 문서를 프로젝트의 `design-tokens.css` 또는 Tailwind config에 매핑하면 RIDY와 일관된 톤앤매너의 상세 페이지를 빠르게 구축할 수 있습니다. 추가로 궁금한 컴포넌트나 특정 페이지의 세부 스타일이 필요하시면 말씀해 주세요!
