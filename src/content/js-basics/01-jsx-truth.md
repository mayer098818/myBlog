---
title: JSX 背後的真相:它是怎麼轉換成畫面的?
series: js-basics
seriesOrder: 1
publishDate: 2025-03-30
lastUpdated: 2025-03-30
description: 深入理解 JSX 的轉換過程
tags: [JavaScript, React, JSX]
---

如果你剛開始學習 React，一定對 JSX 感到既熟悉又陌生。它看起來像是 HTML，卻能夠寫在 JavaScript 裡。你可能曾經寫過像這樣的程式碼：

```javascript
const element = <h1>Hello, World!</h1>
```

## 什麼是 JSX ?

JSX 是 JavaScript 的語法擴展，它允許你在 JavaScript 中寫類似 HTML 的標記。這讓 React 組件的結構更加清晰和直觀。

JSX 提供了一種聲明式的方式來描述 UI，讓開發者可以用類似 HTML 的語法來構建組件樹。

## 為什麼說 JSX 是語法糖?

JSX 被稱為語法糖，因為它提供了一種更簡潔、更易讀的方式來描述 UI 結構。實際上，JSX 會被轉換成普通的 JavaScript 函數調用。

例如，上面的 JSX 代碼會被轉換成：

```javascript
const element = React.createElement('h1', null, 'Hello, World!')
```

## 瀏覽器其實不懂 JSX !

瀏覽器無法直接理解 JSX 語法。在 JSX 代碼能夠在瀏覽器中運行之前，它必須先被轉換成標準的 JavaScript。

這個轉換過程通常發生在構建階段，通過編譯工具（如 Babel）來完成。

## Babel : 負責把 JSX 轉換成 JavaScript 的工具

Babel 是一個 JavaScript 編譯器，它能夠將現代 JavaScript 和 JSX 代碼轉換成瀏覽器可以理解的舊版本 JavaScript。

### Babel 是什麼?

Babel 是一個開源的 JavaScript 編譯器，主要用於將 ECMAScript 2015+ 版本的代碼轉換為向後兼容的 JavaScript 版本。

### JSX 是怎麼被 Babel 處理的?

Babel 使用插件系統來處理 JSX。當 Babel 遇到 JSX 語法時，它會使用 React 插件將其轉換為 `React.createElement` 調用。

### Babel 做了哪些事情?

Babel 主要執行以下操作：

- 解析 JSX 語法
- 轉換為 React.createElement 調用
- 處理 JavaScript 新特性
- 優化代碼結構

## 補充 : Babel 的替代方案

除了 Babel，還有其他工具可以處理 JSX，如 SWC 和 esbuild，它們通常提供更快的編譯速度。

## Babel + Webpack : React 專案的組合常客

在 React 項目中，Babel 通常與 Webpack 一起使用。Webpack 負責打包模塊，而 Babel 負責轉換代碼。

## React.createElement : 幫你生成虛擬 DOM 的函式

`React.createElement` 是 React 提供的一個函數，用於創建 React 元素。它是 JSX 語法的底層實現。

### React.createElement 做了什麼?

`React.createElement` 接收三個主要參數：元素類型、屬性對象和子元素，然後返回一個描述 UI 的對象。

### 參數說明

`React.createElement` 的參數包括：

- **type**: 元素類型（字符串或組件）
- **props**: 屬性對象
- **children**: 子元素

### 為什麼不直接建立 HTML?

React 使用虛擬 DOM 而不是直接操作 HTML，這樣可以：

- 提高性能（通過 diff 算法）
- 提供更好的開發體驗
- 支持服務器端渲染
- 實現組件化開發

## 總結

JSX 是 React 開發中的核心概念，理解它的轉換過程有助於更好地理解 React 的工作原理。通過 Babel 等工具，JSX 被轉換為 `React.createElement` 調用，最終生成虛擬 DOM，實現高效的 UI 更新。

