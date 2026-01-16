---
title: What's the React？
series: react-basics
seriesOrder: 3
publishDate: 2026-01-15
lastUpdated: 2026-01-15
description:
tags: [JavaScript, React, JSX]
---

## What's the difference between state and props?

- state is used for data within component,while props are used to pass data or event handles into child component.
- state can change over time but props are immutable

### Why props are immutable?

In React we use one-way data flow which means the parent is the source of truth for the data,any changes related to the data require you to track back to the parent. If you want to update props,you should do it in prarent.

## What's the React?

React is just a JavaScript library. It allows user to create reusable,modular components. React uses the virtual DOM to effciently update UI and one-way data flow make data more predictable

**Benifits of React**

- component-based architecture for modular code: React breaks the UI into independent components, making code modular, easier to maintain, and reusable.
- the virtual DOM for efficient updates: React only updates the changed parts that have actually changed by Diff alogrithm
- one way data for predictbale data flow, if something goes wrong, you can tack the state back to parent component,making debugging easier.

## What's virtual DOM?

It's a lightweight JavaScript object, which describes the structure and properties of the DOM.

- why we need it?

Because it can update only the parts of UI that they actually changed. By computing the difference between the previsous virtual DOM and the new one,React can minimize the operation of the real DOM,making updates effecient.

## what's the JSX?

It's a plain JavaScript but looks like HTML.It allows you to write UI component in declartive way. Then make it into React element by calling React.createElement method.

## What's the pupose of `key` in React

The `key` prop in React is used to uniquely identify elements in a list. It can help React to identify which items have changed,been added,or removed,so optimizing the rendering process.

Without `key` prop,React maybe re-render unncecessarily,leading to perfomance issues. For example, if you insert an item at the beginning of the list, React treats all following items as changed and creates new Fiber Nodes for them, even if their content acutally hasn't changed

If you have a `key` prop in a list, if you insert an item at the beginning of the list, React will check the key and type to figure out if it's changed, if they're matched,React will reuse the Fiber Node,otherwise React will create a new Fiber Node and mark it with effect tag,which are excuted during the commit pahse later.

## What's the difference between controlled and uncontrolled React Componnets?

- For Controlled components: the state is managed by the React componnet like useState
- For uncontrolled components: the state is managed by the DOM, if you want to access it,you need to use a ref

**Data flow**

- Controlled components: the input's value is controlled by React state, data flows from state to the input element,and user input updates the state via onChange
- uncontrolled components: the input's value store its value in the DOM,and React read it via a ref when neccessary

## What are some pitfalls about using context in React?

When the context changes, all components that consume the context will re-render,even if the part of the context they use hasn't change

### How to avoid unneccessary re-render when using context?

- split the context into smaller contexts so that only component that need the specific context will subscribe to it
- using useMemo/useCallback hook, memorize the context and callbacks

## What's the rules of using Hooks?

Always call hooks at the top of function component,you shouldn't call hooks inside loops,conditions or nesting functions. **Hooks should be called in the same order every render**

If you call hooks conditionally,it will break the order of hooks,causing React to associate the wrong state or effects with hooks, which can lead to bugs or runtime errors.

### hooks list

Each Fiber Node maintains a hooks list for component state and effects at the beginning of render, and an effect list that collects side effects after diffing in completeWork, which are then executed in the commit phase.

### why does React has a linked list of hooks for each component?

In React, we will call mutiple hooks,we need to remember the state and effects for each hook during render

React keeps them in a list inside Fiber Node,so that the hooks can be identified by thir order of calls, not by their name.

If you change the call order, React will mix up the hook state,causing bugs

## useRef and forwardRef

- `ref` and `key` are special props in React, so they don't show up in props. If you pass a `ref` to the child, it won't recieve the ref until you wrap the child component with `forwardRef`.

```javascript
<MyInput ref={inputRef} />

{
  type: MyInput,
  props: {},      // ❌ 没有 ref
  ref: inputRef   // ✅ 单独存放
}
```

### useImperativeHandle

By using useImperativeHandle,the child component can expose the controlled API to the parent instead of the entire DOM node.

- controlled API: the methods or properties you want the parent to use
  -not the whole DOM: parent cannot manipulate the DOM directly

```javascript
const MyInput = forwardRef((props, ref) => {
  // the inputRef is the ref that is created by the child
  const inputRef = useRef < HTMLInputElement > null
  // the ref passed to useImperativeHandle is the ref
  // created by the parent
  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current?.focus()
    }
  }))
  return <input type="text" ref={inputRef} />
})
```

## useEffect and useLayoutEffect

The fundmental difference between them isin the execution phase. useEffect runs after browser has been painted while useLayoutEffect runs after the DOM has been updated but before browser paints, which allows you change the layout sychronously.

### Why dose `useEffect` run after render phase？

Actually `useEffect` doesn't run after render phase,it runs after browser has been painted, this is because that `useEffect` is all about side-effects like data fetching, DOM manipulation and so on. **They don't need to block the UI**, and runing them during render will make app slow.

**They don't need to block the UI?**

This means the side effect doesn't need to finish before the user sees the updated UI
