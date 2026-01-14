---
title: HTTP 協議基礎
series: http-basics
seriesOrder: 1
publishDate: 2025-03-25
description: HTTP 協議的基本概念
tags: [HTTP, 網路]
---

HTTP（HyperText Transfer Protocol）是網際網路上應用最廣泛的網路協議之一。它定義了客戶端和服務器之間如何進行通信。

## HTTP 是什麼?

HTTP 是一種應用層協議，用於在 Web 瀏覽器和 Web 服務器之間傳輸數據。它是無狀態的協議，意味著每個請求都是獨立的。

## HTTP 請求方法

HTTP 定義了幾種請求方法，最常見的有：

- **GET**: 獲取資源
- **POST**: 提交數據
- **PUT**: 更新資源
- **DELETE**: 刪除資源
- **PATCH**: 部分更新資源

### GET 請求示例

```http
GET /api/users HTTP/1.1
Host: example.com
```

### POST 請求示例

```http
POST /api/users HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}
```

## HTTP 狀態碼

HTTP 響應包含狀態碼，表示請求的結果：

- **200 OK**: 請求成功
- **201 Created**: 資源創建成功
- **400 Bad Request**: 請求錯誤
- **404 Not Found**: 資源未找到
- **500 Internal Server Error**: 服務器錯誤

## HTTP 頭部

HTTP 頭部包含請求或響應的元數據：

- `Content-Type`: 指定內容類型
- `Authorization`: 認證信息
- `Cache-Control`: 緩存控制

## HTTPS

HTTPS 是 HTTP 的安全版本，使用 TLS/SSL 加密來保護數據傳輸。

## 總結

HTTP 是 Web 通信的基礎協議。理解 HTTP 的工作原理對於 Web 開發非常重要。

