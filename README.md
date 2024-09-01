# 이 토이 프로젝트의 목적은 완성이 아니라 협업을 위해 또 내가 배운것을 복습하기 위해 진행하는 것이니 너무 부담 갖지는 말아주세요!

# 프로젝트 설계

## 기술 스택

- 프로젝트 생성 및 번들링: Vite
- 코드 품질 관리:
  - Prettier
  - ESLint
- VS Code 확장 프로그램:
  - ESLint
  - Prettier (주의: 'Prettier ESLint' 확장이 아닌 'Prettier' 확장을 설치해주세요)
- 패키지 매니저: npm
- 형상관리: GitHub
- 주요 의존성 패키지:
  - axios
  - normalize.css
  - react (18.3.1)
  - react-dom (18.3.1)

## 개발 환경 설정

1. Node.js 버전: TBD
2. npm 버전: TBD
3. 프로젝트 클론 및 의존성 설치:
   ```
   git clone [repository-url]
   cd [project-directory]
   npm install
   ```
4. 개발 서버 실행: `npm run dev`
5. 빌드: `npm run build`
6. 추가: `npm run lint` 린트 오류 찾기 `npm run format` 프리티어 규칙에 맞춰 포매팅

# 폴더 구조

```
toy-project/
├─ .gitignore
├─ .prettierrc
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public/
│  └─ .gitkeep
├─ README.md
├─ .env
├─ src/
│  ├─ apis/
│  │  └─ apis.js
│  ├─ App.css
│  ├─ App.jsx
│  ├─ assets/
│  │  └─ .gitkeep
│  ├─ components/
│  │  └─ Header/
│  │     ├─ Header.css
│  │     └─ Header.jsx
│  ├─ main.jsx
│  └─ utils/
│     └─ currentDay.js
└─ vite.config.js
```

## 주요 폴더 및 파일 설명

- `public/`: 정적 자산 (예: 파비콘)을 위한 폴더
- `src/apis/`: API 호출 관련 함수 정의
- `src/assets/`: 컴포넌트에서 사용할 이미지 등의 자산
- `src/components/`: 재사용 가능한 React 컴포넌트
- `src/utils/`: 유틸리티 함수
- `.env`

```js
VITE_API_KEY = 'API_KEY'
```

위와 같이 설정하시면 됩니다. VITE의 경우 항상 환경변수 앞에 VITE을 붙혀 저장

```js
// api.js
const API_KEY = import.meta.env.VITE_API_KEY
```

환경 변수를 불러올 때는 `import.meta.env[변수명]`

# 설정 파일

## vite.config.js

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
    extensions: ['.js', '.jsx'],
  },
})
```

### 주요 설정

- `alias`: 경로 별칭 설정 (예: `@utils/example.jsx`로 임포트 가능)
- `extensions`: `.js` 및 `.jsx` 확장자 자동 해석
- 최종 `@utils/example`로 임포트 가능

## .eslintrc.js

```javascript
export default [
  { ignores: ['dist', 'vite.config.js', 'node_modules'] },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'prettier/prettier': 'error',
    },
  },
  eslintConfigPrettier,
]
```

### 주요설정

- prettier의 룰을 따르는 중

## .prettierrc

```json
{
  "arrowParens": "avoid",
  "semi": false,
  "tabWidth": 2,
  "printWidth": 120,
  "singleQuote": true,
  "trailingComma": "all",
  "singleAttributePerLine": true,
  "jsxBracketSameLine": false,
  "jsxSingleQuote": true,
  "endOfLine": "auto"
}
```

### 세팅

- TBD

# 개발 가이드라인

1. 컴포넌트 생성: `src/components/` 폴더 내에 새 폴더를 만들고 그 안에 컴포넌트 파일을 작성해주세요.
2. 스타일링: 컴포넌트별 CSS 파일을 사용
3. 커밋 메시지 규칙: TBD
4. 코드 리뷰 프로세스: 매 주 WTL, RBF시간 활용하여 코드 리뷰 진행 후 풀 리퀘스트 처리 예정

# 추가 참고 사항

- API 문서: API.md 참고
- 디자인 가이드: TBD
- 배포 프로세스: TBD
