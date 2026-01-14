---
title: 什么是Fiber Node，与React Element关系？
series: js-basics
seriesOrder: 2
publishDate: 2026-01-14
lastUpdated: 2025-03-30
description: 深入理解 Fiber Tree
tags: [JavaScript, React, JSX]
---

## 什么是 Fiber Node?

Fiber Node 是 React 内部用来表示"组件/DOM 节点"的运行时的一种数据结构，
他在 Reconciliation 期间由 React 根据 React ELement 创建出来的,通过调用 createFiberFromElement 生成 Fiber Node

## Fiber Node 长什么样子?

```javascript
type Fiber = {
  // 身份
  tag: WorkTag          // FunctionComponent / HostComponent 等
  type: any             // div / App / Button
  key: string | null

  // 结构关系
  return: Fiber | null  // 父
  child: Fiber | null   // 第一个子
  sibling: Fiber | null // 下一个兄弟

  // 状态
  stateNode: any        // DOM 节点 或 组件实例
  memoizedProps: any
  memoizedState: any    // hooks 链表在这里

  // 更新相关
  alternate: Fiber | null // 上一次渲染的 Fiber
  flags: Flags            // Placement / Update / Deletion
}
```

### Fiber 引入了三个关键能力

- 可以将渲染分成多个小任务
- 可以设置优先级，来调整工作顺序
- 任务可以暂停、恢复甚至是放弃，之后可以继续执行

### Fiber Tree

- **React Element**: component 是树状结构则生成的 React Elements 和 Fiber Nodes 也都会是树状结构
- **Fiber Node**: unit of work for React process

### 运行时间轴

```javascript
【构建时】                【运行时 - Render Phase】          【运行时 - Commit Phase】
JSX
 ↓ Babel
React Element  ──────▶  Fiber Tree (WIP)  ──────▶  DOM 更新
（普通 JS 对象）          （可中断）                  （不可中断）
```

✅ Fiber 是在「运行时 render 阶段」生成的

## Current Fiber Tree & WorkInProgress Fiber Tree

- **Current**: 目前页面展示的效果就是由 Current Fiber Tree 渲染出来，也就是和真实 DOM 对应的 Fiber tree
- **Work In Progress Tree**: 在状态更新时生成的临时 Fiber 树，用于计算下一次 UI 更新. 当有 state 更新时，通过 Reconciler diff 算法将要更新的节点建成一个 workInProgress 的 Fiber tree，当 render 阶段结束，WorkInProgress Tree 的变更会被应用到 DOM ，并替换 Current tree，有利于快速更新 DOM
- **二者联系**: Current Fiber Tree
