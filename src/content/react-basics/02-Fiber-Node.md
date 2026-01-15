---
title: 什么是Fiber？
series: react-basics
seriesOrder: 2
publishDate: 2026-01-14
lastUpdated: 2026-01-15
description: 深入理解 Fiber Tree
tags: [JavaScript, React, JSX]
---

## 为何引入 Fiber

在 React 15 及更早版本中，使用 **Stack Reconciler**， 更新过程是**同步**的，**不可中断**。带来页面卡顿，用户体验差

在 React 16 之后引入 Fiber，将渲染工作拆分为多个以 Fiber 节点为单位的可恢复任务，从而实现**中断渲染**和**优先级调度**

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

![Fiber Node 结构图](/Fiber.png)
fiber tree 的 traversal 是 DFS，并且顺序是 Child -> 自身-> Sibling

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

![WIP Tree 结构图](/wip.png)

- **Current**: 目前页面展示的效果就是由 Current Fiber Tree 渲染出来，也就是和真实 DOM 对应的 Fiber tree
- **Work In Progress Tree**: 在状态更新时生成的临时 Fiber 树，用于计算下一次 UI 更新. 当 state 有更新，React 以 Current Tree 为基准，构建 WIP Fiber Tree，在 render 阶段通过 diff 比对每个 Fiber Node 生成 Effect Tag，并在`completeWork`收集 Effect List；之后进入 commit 阶段执行 Effect List 中的副作用，并在完成 commit 之后将 WIP Tree 替换为 Current Tree
- **二者联系**: Current Fiber Tree 和 WIP Tree 有 alternate 指针联系

### diff 算法

对比的是 Fiber Node，核心原则是 **"key + type 匹配"**：

- key 一样，type 一样 -- 复用 Fiber Node
- key 一样，type 不一样 -- 新建 Fiber Node 并标记旧的删除
- key 不一样 -- 新建 Fiber Node 并标记旧的删除

```javascript
//key和type一样，但是props不一样，复用Fiber Node打update flag
// old
<div key="a" className="red"></div>
// new
<div key="a" className="blue"></div>
// key和type一样，复用Fiber Node
// old
<div key="a" className="red"></div>
// new
<div key="a" className="red"></div>
```

### key 的作用

- key 是 Fiber Tree 中同一层 siblings 的唯一标识，帮助 复用 Fiber Node
- 不写 key 默认是按照索引顺序
- 不加 key 的坏处：任何元素的插入或删除都会改变后面所有元素的索引

```jsx
// 旧数组
;[<Item value="A" />, <Item value="B" />, <Item value="C" />]
;[
  // 新数组
  ((<Item value="A" />), (<Item value="D" />), (<Item value="B" />), (<Item value="C" />))
]
```

| 新索引 | 新元素 value | 对应旧 Fiber      | 处理结果                                                              |
| ------ | ------------ | ----------------- | --------------------------------------------------------------------- |
| 0      | A            | old index 0: A    | type 相同 → 复用 Fiber                                                |
| 1      | D            | old index 1: B    | type 不同 → 新建 Fiber → Placement flag；旧 Fiber B 被标记 Deletion？ |
| 2      | B            | old index 2: C    | type 不同 → 新建 Fiber → Placement flag；旧 Fiber C 被标记 Deletion？ |
| 3      | C            | old index 3: 没有 | 新建 Fiber → Placement flag                                           |

```jsx
// 旧数组
;[<Item key="A" value="A" />, <Item key="B" value="B" />, <Item key="C" value="C" />][
  // 新数组
  ((<Item key="A" value="A" />), (<Item key="D" value="D" />), (<Item key="B" value="B" />), (<Item key="C" value="C" />))
]
```

- index 0 → key="A"

  找到旧 Fiber key="A" → type 相同 → 复用 Fiber → Update flag（如果 props 改变）

- index 1 → key="D"

旧数组中没有 key="D" → 新建 Fiber → Placement flag

- index 2 → key="B"

找到旧 Fiber key="B" → type 相同 → 复用 Fiber → Update flag（如果 props 改变）

- index 3 → key="C"

找到旧 Fiber key="C" → type 相同 → 复用 Fiber → Update flag（如果 props 改变）

## Effect list

render phase 的主要目的想成需要產出

一個 Fiber Tree
一個 Effect List
Effect List(副作用清單): 當 Fiber Tree 處理完後，會組出 Effect List。再遍歷 effect list 處理副作用

### Effect List 形成

render 阶段从`beginWork`开始遍历 Fiber tree，对每个 Fiber Tree 和 WIP Tree 上的 Fiber 节点做 diff 并打上 effectTag，在`complete`按照从子到父的顺序有副作用的 Fiber，最终形成 Effect List

### Effect List 形式

Effect List 是个单向列表：

```javascript
firstEffect -> nextEffect -> nextEffect -> ...
```

在 `completeWork` 时：
先接上子节点的 effect list,再把自己（如果有 flags）接到末尾

### Effect List 执行顺序

Effect List 是在 render 阶段自底向上收集的；在 commit 阶段，它会被多次遍历，并且不同 commit 子阶段有不同的遍历方向（父 → 子 或 子 → 父）。

### commit 执行阶段:一旦执行不可中断，优先级 99

- **1**: Before Mutation 阶段（DOM 变更前）
- **2**: Mutation 阶段（真正改 DOM）
- **3**: Layout 阶段(DOM 变更后)，👉 DOM 已经更新完成，但浏览器 还没 repaint，可以执行生命周期函数或者 useLayoutEffect

passive(额外):
🔁 useEffect 在哪里？

⚠️ useEffect 不在 commit 这三个阶段里

useEffect 属于 Passive Effects
会在 commit 之后
浏览器 paint 之后

## 执行顺序

render-commit-browser painting-useEffect

1️⃣ Render Phase

- 构建 Work In Progress Fiber Tree
- 对每个 Fiber 与 alternate diff，打 Effect flags
- completeWork 收集 Effect List
- ❌ 不修改 DOM，可中断

2️⃣ Commit Phase

- Before Mutation：父 → 子（读取 DOM snapshot）
- Mutation：子 → 父（真实 DOM 更新、ref 赋值）
- Layout：子 → 父（componentDidMount / componentDidUpdate / useLayoutEffect）
- WIP Tree 替换为 Current Tree

3️⃣ Browser Paint

- 浏览器把 DOM 绘制到页面上（页面可见）

4️⃣ Passive Effects

- 执行 useEffect / useEffect cleanup / 订阅 / 异步副作用
- ✅ 发生在 paint 之后

## hooks 执行时机

绝大多数 hooks（useState、useReducer、useMemo、useCallback、useRef）都是在 render phase 初始化的

在 render phase 同步执行

作用：计算 state、缓存值、生成 ref 对象

注意：如果是绑定 DOM 的 ref，DOM 元素还没创建，ref.current 在 render phase 可能是 null

useLayoutEffect 和 useEffect 是例外

useLayoutEffect：commit phase 的 layout 阶段执行，DOM 已更新，浏览器还没 paint

useEffect：commit phase 的 passive 阶段异步执行，DOM 已 paint
