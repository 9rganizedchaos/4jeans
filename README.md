# 4jeans 👖👖👖👖

> Photo Search App using Unsplash API 📸
> 프론트엔드 개발 주제들을 탐구하기 위한 토이프로젝트

<img src="https://user-images.githubusercontent.com/75521675/209753240-a2300a95-d95e-469d-be08-a0d259964d4e.gif"  alt="4jeans" title="4jeans"/>

## Outlines

### v1

- 기간: 2022.11.24 ~ 2022.12.28 (완료)
- 내용: 프로젝트의 기본 틀을 구현해둔다.
- 사용 기술: `React`, `TypeScript`, `Scss`, `Storybook`, `Tanstack-Query`, `Eslint`, `Prettier`, `Stylelint`
- 구현 기능
    - 사진 필터 기능 및 다운로드 기능
        - Canvas를 활용해 ImageData를 불러오고 이를 직접 가공하여 `Contrast`, `GrayScale`, `Sepia`, `Brightness` 필터 제공
        - 필터를 적용한 이미지를 다운로드할 수 있는 기능 제공
    - 사진 검색 기능
        - Unsplash API 활용
        - SearchParams를 활용해 검색어 보존, 및 URL을 통한 검색어 접근 가능
    - 무한 스크롤
        - IntersectionObserver를 활용한 무한 스크롤 적용
    - Masonry Layout 컴포넌트 구현
        - `react-responsive-masonry` 소스코드 클론 및 프로젝트에 맞게 리팩토링 작업
    - 좋아요 기능
        - LocalStorage를 활용해 좋아요 내역 보존

### (예정) v2

- 기간: 2023.1 ~
- 사용 기술: `Jest`, `Cypress`
- 내용: 이미 완료된 프로젝트에 Testing Library를 적용해본다. (추후에 TDD를 도입하기 위함, 라이브러리 문법을 익히기 위한 목적)

### (예정) v3

- 사용 기술: `Jotai`, `Zustand`
- 내용: 서로 다른 스타일의 두 라이브러리로 프로젝트의 전역 상태를 관리해본다.

## How to run this project

- install: `npm install`
- start: `npm start`
