# GraphQL

GraphQL 서버 환경 세팅

## 📝 구현된 기능

1.  **도서 검색 (Book Search)**
    - `books`: 전체 도서 목록 조회 (필터링 가능)
    - `book`: 특정 도서 조회 (`id`, `title`, `author` 중 하나 이상으로 검색)
    - **특징**: 여러 검색 조건을 AND 로직으로 결합하여 정밀한 검색 가능

2.  **데이터 모델링**
    - `Book`: 도서 정보 (ID, 제목, 저자)
    - `Customer`: 고객 정보 (ID, 이름, 이메일, 나이)
    - `Rental`: 대여 기록 (도서, 고객, 날짜 정보 포함)

3.  **개발 환경 개선**
    - **TypeScript**: 정적 타입 시스템 적용
    - **GraphQL Code Generator**: 스키마(`typeDefs`)를 기반으로 TypeScript 타입 자동 생성
    - **Nodemon**: 파일 변경 시 서버 자동 재시작
    - **Concurrently**: 서버 실행과 타입 생성을 동시에 수행 (`npm run dev`)

## 🛠️ 기술 스택

- **Runtime**: Node.js
- **Language**: TypeScript
- **Server**: Apollo Server v3
- **Schema**: GraphQL
- **Tooling**: GraphQL Code Generator, Nodemon

## 🚀 실행 방법

### 1. 설치

```bash
npm install
```

### 2. 개발 서버 시작

서버 실행과 동시에 GraphQL 타입이 자동으로 생성됩니다. 또한, 런타임동안에 변경된 코드를 감지해 type을 실시간 생성합니다.

```bash
npm run dev
```

- Server: `http://localhost:4000`
- Codegen: Watch 모드로 동작

### 3. 주요 명령어

- `npm run dev`: 개발 모드 실행 (Server + Codegen Watch)
- `npm run codegen`: GraphQL 스키마를 기반으로 타입 수동 생성
- `npm start`: 빌드된 프로덕션 서버 실행
