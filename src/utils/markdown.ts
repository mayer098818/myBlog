import matter from 'gray-matter'
import type { Article } from '../types'

export interface MarkdownFile {
  frontMatter: Article
  content: string
  slug: string
}

/**
 * 将日期转换为字符串格式（YYYY-MM-DD）
 */
function formatDate(date: any): string {
  if (!date) return new Date().toISOString().split('T')[0]
  
  // 如果已经是字符串，直接返回
  if (typeof date === 'string') return date
  
  // 如果是 Date 对象，转换为字符串
  if (date instanceof Date) {
    return date.toISOString().split('T')[0]
  }
  
  // 其他情况，尝试转换为字符串
  return String(date)
}

/**
 * 解析 Markdown 文件内容
 */
export function parseMarkdown(content: string, slug: string): MarkdownFile {
  const { data, content: markdownContent } = matter(content)

  // 提取 seriesId，优先使用 series 字段，如果没有则使用 seriesId
  const seriesId = data.series || data.seriesId || undefined

  // 处理日期字段，确保是字符串格式
  const publishDate = formatDate(data.publishDate)
  const lastUpdated = data.lastUpdated ? formatDate(data.lastUpdated) : (data.publishDate ? formatDate(data.publishDate) : undefined)

  return {
    frontMatter: {
      id: slug,
      title: data.title || 'Untitled',
      seriesId,
      publishDate,
      lastUpdated,
      description: data.description || undefined,
      tags: Array.isArray(data.tags) ? data.tags : undefined
      // 注意：不展开 ...data，避免覆盖已设置的字段
    },
    content: markdownContent,
    slug
  }
}

/**
 * 从文件名生成 slug
 */
export function generateSlug(filename: string): string {
  return filename
    .replace(/\.md$/, '')
    .replace(/^\d+-/, '') // 移除开头的数字前缀
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

