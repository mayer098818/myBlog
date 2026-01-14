import type { Article, Series } from '../types'
import { parseMarkdown, generateSlug } from './markdown'

// 使用 Vite 的 import.meta.glob 动态导入所有 MD 文件
const markdownModules = import.meta.glob('../content/**/*.md', { as: 'raw', eager: true })

export interface LoadedArticle extends Article {
  content: string
  slug: string
}

export interface ContentData {
  articles: LoadedArticle[]
  series: Series[]
}

/**
 * 从文件路径提取系列ID（目录名）
 */
function extractSeriesIdFromPath(path: string): string | undefined {
  // 路径格式: ../content/js-basics/01-article.md
  const parts = path.split('/')
  const contentIndex = parts.findIndex(part => part === 'content')
  if (contentIndex >= 0 && contentIndex < parts.length - 1) {
    const seriesDir = parts[contentIndex + 1]
    // 排除 standalone 目录
    if (seriesDir && seriesDir !== 'standalone' && !seriesDir.endsWith('.md')) {
      return seriesDir
    }
  }
  return undefined
}

/**
 * 加载所有文章内容
 */
export function loadArticles(): LoadedArticle[] {
  const articles: LoadedArticle[] = []

  for (const [path, content] of Object.entries(markdownModules)) {
    if (typeof content !== 'string') continue

    // 排除 README.md 文件（不是文章内容）
    if (path.includes('README.md')) continue

    // 从路径提取文件名
    const filename = path.split('/').pop() || ''
    const slug = generateSlug(filename)

    try {
      const parsed = parseMarkdown(content, slug)

      // 如果 front matter 中没有 series，尝试从路径推断
      let seriesId = parsed.frontMatter.seriesId
      if (!seriesId) {
        seriesId = extractSeriesIdFromPath(path)
      }

      articles.push({
        ...parsed.frontMatter,
        seriesId,
        slug: parsed.slug,
        content: parsed.content
      })
    } catch (error) {
      console.error(`Failed to parse ${path}:`, error)
    }
  }

  return articles
}

/**
 * 从文章数据生成系列信息
 */
export function generateSeries(articles: LoadedArticle[], seriesConfig: Series[]): Series[] {
  // 统计每个系列的文章数量
  const seriesCountMap = new Map<string, number>()

  articles.forEach(article => {
    if (article.seriesId) {
      const currentCount = seriesCountMap.get(article.seriesId) || 0
      seriesCountMap.set(article.seriesId, currentCount + 1)
    }
  })

  // 合并配置和统计信息
  return seriesConfig.map(series => {
    const count = seriesCountMap.get(series.id) || 0
    return {
      ...series,
      articleCount: count
    }
  })
}

/**
 * 加载所有内容数据
 */
export function loadContent(seriesConfig: Series[]): ContentData {
  const articles = loadArticles()
  const series = generateSeries(articles, seriesConfig)

  return {
    articles,
    series
  }
}
