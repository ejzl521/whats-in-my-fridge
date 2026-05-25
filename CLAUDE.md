# whats-in-my-fridge

AI 기반 냉장고 재료 → 레시피 추천 웹앱

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **AI**: Claude API (`claude-sonnet-4-6`)
- **State**: Zustand (레시피 상태, 북마크 persist)
- **HTTP**: Axios
- **Storage**: Zustand persist (localStorage 기반 북마크 저장)

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── recipe/
│   │       └── route.ts            # Next.js API 라우트 (Claude 호출)
│   ├── icon.svg                    # 파비콘
│   ├── globals.css                 # 전역 스타일
│   ├── layout.tsx
│   └── page.tsx
├── apis/
│   ├── axiosInstance.ts            # 공통 axios 인스턴스 (baseURL: /api)
│   └── recipe/
│       ├── type.ts                 # Recipe, RecipeFilter 타입
│       ├── claude.ts               # Claude API 클라이언트 (서버사이드)
│       └── recipeApi.ts            # 클라이언트 → API 라우트 axios 호출
├── components/
│   ├── IngredientSelector.tsx      # 재료 선택 + 필터 UI
│   ├── RecipeCard.tsx              # 레시피 카드 (북마크 포함)
│   └── RecipeList.tsx              # 레시피 목록
├── constants/
│   └── recipe.ts                  # 재료 카테고리, 필터 옵션
├── store/
│   ├── recipeStore.ts              # 레시피 목록/로딩/에러 상태
│   └── bookmarkStore.ts            # 북마크 상태 (persist)
└── lib/
    └── storage.ts                  # 레거시 (미사용)
```

## Data Flow

```
IngredientSelector (선택)
  → recipeStore.fetchRecipes()
    → recipeApi.fetchRecipesApi() [axios POST /api/recipe]
      → route.ts [서버]
        → claude.ts → Claude API
```

## Core Features

1. **재료 선택** - 카테고리별 재료 토글 (채소/육류/해산물/유제품/곡류/소스)
2. **필터** - 난이도 / 조리시간 / 칼로리
3. **레시피 생성** - Claude API로 레시피 3개 추천
4. **북마크** - 레시피 저장 (localStorage persist, ★ 버튼)

## Conventions

- 컴포넌트: PascalCase
- 훅: `use` prefix
- 타입: 도메인별 `apis/<domain>/type.ts`에서 관리
- API 함수: 서버사이드는 `apis/<domain>/claude.ts`, 클라이언트는 `apis/<domain>/<domain>Api.ts`
- 상수: `constants/` 하위
- 환경변수: `.env.local`

## Environment Variables

```
ANTHROPIC_API_KEY=
```

## Commands

```bash
npm run dev      # 개발 서버
npm run build    # 빌드
npm run lint     # 린트
```

## CLAUDE.md 업데이트 기준

아래 변경이 생기면 반드시 이 파일도 함께 업데이트하세요:

- 패키지 추가/제거 (`package.json` 변경)
- 폴더 구조 변경
- 새 도메인/기능 추가
- 타입 구조 변경
- 환경변수 추가
