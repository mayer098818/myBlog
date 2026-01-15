# 博客内容目录

这个目录用于存放所有的 Markdown 博客文章。

## 文件结构

```
content/
├── react-basics/       # React 基础系列
│   ├── 01-jsx-truth.md
│   └── 02-react-components.md
├── http-basics/        # HTTP 基础系列
│   └── 01-http-protocol-basics.md
└── standalone/         # 独立文章（不属于任何系列）
    └── independent-article.md
```

## Front Matter 格式

每个 Markdown 文件都需要包含 YAML front matter：

```yaml
---
title: 文章标题
series: 系列ID（可选）
seriesOrder: 在系列中的顺序（可选）
publishDate: 2025-03-30
lastUpdated: 2025-03-30（可选）
description: 文章描述（可选）
tags: [标签1, 标签2]（可选）
draft: false（可选，是否草稿）
---

# 文章正文
```

## 必需字段

- `title`: 文章标题
- `publishDate`: 发布日期（格式：YYYY-MM-DD）

## 可选字段

- `series`: 系列ID（如果文章属于某个系列）
- `seriesOrder`: 在系列中的顺序（用于排序）
- `lastUpdated`: 最后更新时间
- `description`: 文章描述（用于首页显示）
- `tags`: 标签数组
- `draft`: 是否为草稿（默认 false）

## 添加新文章

1. 在相应的系列目录下创建新的 `.md` 文件
2. 添加 front matter
3. 编写文章内容
4. 系统会自动加载并显示

## 独立文章

不属于任何系列的文章可以放在 `standalone/` 目录下，不需要设置 `series` 字段。

