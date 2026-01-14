---
title: React 元件基礎介紹
series: js-basics
seriesOrder: 2
publishDate: 2025-03-28
description: 學習 React 元件的基本概念
tags: [React, JavaScript]
---

React 組件是構建用戶界面的基本單位。組件讓你可以將 UI 拆分成獨立、可重用的部分。

## 什麼是 React 組件?

React 組件是一個返回 JSX 的函數或類。組件可以接收 props（屬性）作為輸入，並返回描述 UI 的 JSX。

### 函數組件

最簡單的組件形式是函數組件：

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>
}
```

### 類組件

你也可以使用類來定義組件：

```javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>
  }
}
```

## Props 是什麼?

Props（屬性）是組件之間傳遞數據的方式。Props 是只讀的，組件不應該修改自己的 props。

```javascript
function Button(props) {
  return <button onClick={props.onClick}>{props.text}</button>
}

// 使用組件
<Button text="點擊我" onClick={() => alert('Hello!')} />
```

## 組件的組合

組件可以在其他組件中使用，形成組件樹：

```javascript
function App() {
  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  )
}
```

## 組件的狀態

組件可以使用 `useState` Hook 來管理內部狀態：

```javascript
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>你點擊了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>
        點擊
      </button>
    </div>
  )
}
```

## 總結

React 組件是構建應用的基礎。通過組件，你可以創建可重用、可組合的 UI 元素，讓代碼更加模塊化和易於維護。

