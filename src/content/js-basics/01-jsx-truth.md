---
title: JSX 背后的真相：它是怎么转换成画面的？
series: js-basics
seriesOrder: 1
publishDate: 2025-03-30
lastUpdated: 2025-03-30
description: 深入理解 JSX 的转换过程
tags: [JavaScript, React, JSX]
---

如果你刚开始学习 React，一定对 JSX 感到既熟悉又陌生。它看起来像是 HTML，却能够写在 JavaScript 里。你可能曾经写过像这样的代码：

```javascript
const element = <h1>Hello, World!</h1>
```

## 什么是 JSX ?

JSX 是 JavaScript 的语法扩展，它允许你在 JavaScript 里写类似 HTML 的标记。JSX 本身不会被浏览器识别，在 React 中它需要通过 Babel 调用 React.createElement 调用，然后 React.createElement 的返回值是 React Element。React Element 其实就是普通的 JavaScript 对象。

例如，上面的 JSX 代码会被转换成：

```javascript
const element = React.createElement('h1', null, 'Hello, World!')
```

React.createElement 返回的是 React Element,如：

```javascript
{
  $$typeof: Symbol(react.element),
  type: 'h1',
  key: null,
  ref: null,
  props: {
    className: 'title',
    children: 'Hello'
  },
  _owner: null,
  _store: {}
}
```

### 内容说明

`React Element` 的内容包括：

- **$$typeof**: 使用 Symbol 用来识别「这是一个 React Element」防止被伪造
- **type**: 标签 type
- **props**: 传入属性
- **key**: 列表渲染时 React 做 diff 的关键字段

## 浏览器其实不懂 JSX！

浏览器无法直接理解 JSX 语法。在 JSX 代码能够在浏览器中运行之前，它必须先被转换成标准的 JavaScript。

这个转换过程通常发生在构建阶段，通过编译工具（如 Babel）来完成。

## Babel：负责把 JSX 转换成 JavaScript 的工具

Babel 是一个 JavaScript 编译器，它能够将现代 JavaScript 和 JSX 代码转换成浏览器可以理解的旧版本 JavaScript。

### Babel 是什么？

Babel 是一个开源的 JavaScript 编译器，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 版本。

### JSX 是怎么被 Babel 处理的？

Babel 使用插件系统来处理 JSX。当 Babel 遇到 JSX 语法时，它会使用 React 插件将其转换为 `React.createElement` 调用。

### Babel 做了哪些事情？

Babel 主要执行以下操作：

- 解析 JSX 语法
- 转换为 React.createElement 调用
- 处理 JavaScript 新特性
- 优化代码结构

## 补充：Babel 的替代方案

除了 Babel，还有其他工具可以处理 JSX，如 SWC 和 esbuild，它们通常提供更快的编译速度。

## Babel + Webpack：React 项目的常见组合

在 React 项目中，Babel 通常与 Webpack 一起使用。Webpack 负责打包模块，而 Babel 负责转换代码。

## React.createElement：帮你生成虚拟 DOM 的函数

`React.createElement` 是 React 提供的一个函数，用于创建 React 元素。它是 JSX 语法的底层实现。

### React.createElement 做了什么？

`React.createElement` 接收三个主要参数：元素类型、属性对象和子元素，然后返回一个描述 UI 的对象。

### 参数说明

`React.createElement` 的参数包括：

- **type**: 元素类型（字符串或组件）
- **props**: 属性对象
- **children**: 子元素

### 为什么不直接建立 HTML?

React 使用虚拟 DOM 而不是直接操作 HTML，这样可以：

- 提高性能（通过 diff 算法）
- 提供更好的开发体验
- 支持服务端渲染
- 实现组件化开发

## 总结

JSX 是 React 开发中的核心概念，理解它的转换过程有助于更好地理解 React 的工作原理。通过 Babel 等工具，JSX 被转换为 `React.createElement` 调用，最终生成虚拟 DOM，实现高效的 UI 更新。
