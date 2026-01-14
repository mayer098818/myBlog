import type { Article, Series } from '../types'

export const mockSeries: Series[] = [
  {
    id: 'web-auth',
    title: 'Web 驗證入門',
    description: '從零開始學習 Web 身份驗證',
    articleCount: 15,
    icon: '📄'
  },
  {
    id: 'http-basics',
    title: 'HTTP 新手村',
    description: 'HTTP 協議基礎知識',
    articleCount: 12,
    icon: '📄'
  },
  {
    id: 'aws-vpc',
    title: 'AWS VPC 網路架構全攻略',
    description: '深入理解 AWS VPC 網路架構',
    articleCount: 8,
    icon: '📄'
  },
  {
    id: 'network-infrastructure',
    title: '網路基礎架構完全指南',
    description: '網路基礎架構的完整指南',
    articleCount: 20,
    icon: '📄'
  },
  {
    id: 'distributed-architecture',
    title: '從零開始的分散式架構',
    description: '學習分散式系統設計',
    articleCount: 10,
    icon: '📄'
  },
  {
    id: 'hasura-migration',
    title: 'Hasura Migration 完全指南',
    description: 'Hasura 資料庫遷移指南',
    articleCount: 6,
    icon: '📄'
  },
  {
    id: 'js-basics',
    title: 'JavaScript 基礎入門系列',
    description: 'JavaScript 基礎知識',
    articleCount: 25,
    icon: '📄'
  },
  {
    id: 'js-fundamentals',
    title: 'JavaScript 基礎:程式的基礎',
    description: '程式設計基礎概念',
    articleCount: 18,
    icon: '📄'
  },
  {
    id: 'dns-guide',
    title: '新手也看得懂的DNS 網域解析',
    description: 'DNS 網域解析入門',
    articleCount: 5,
    icon: '📄'
  }
]

export const mockArticles: Article[] = [
  {
    id: 'jsx-truth',
    title: 'JSX 背後的真相:它是怎麼轉換成畫面的?',
    seriesId: 'js-basics',
    publishDate: '2025-03-30',
    lastUpdated: '2025-03-30',
    description: '深入理解 JSX 的轉換過程',
    tags: ['JavaScript', 'React', 'JSX']
  },
  {
    id: 'react-components',
    title: 'React 元件基礎介紹',
    seriesId: 'js-basics',
    publishDate: '2025-03-28',
    description: '學習 React 元件的基本概念',
    tags: ['React', 'JavaScript']
  },
  {
    id: 'http-basics-1',
    title: 'HTTP 協議基礎',
    seriesId: 'http-basics',
    publishDate: '2025-03-25',
    description: 'HTTP 協議的基本概念',
    tags: ['HTTP', '網路']
  }
]
