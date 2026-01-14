export interface TOCItem {
  id: string
  title: string
  level: number
}

/**
 * 从 Markdown 内容提取目录（使用正则表达式）
 */
export function extractTOC(markdown: string): TOCItem[] {
  const toc: TOCItem[] = []
  const headingRegex = /^(#{2,3})\s+(.+)$/gm

  let match
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length
    const title = match[2].trim()
    
    // 移除 markdown 格式标记（如 **bold**, `code` 等）
    const cleanTitle = title
      .replace(/\*\*(.+?)\*\*/g, '$1')
      .replace(/\*(.+?)\*/g, '$1')
      .replace(/`(.+?)`/g, '$1')
      .replace(/\[(.+?)\]\(.+?\)/g, '$1')
      .trim()

    if (cleanTitle) {
      const id = cleanTitle
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\u4e00-\u9fa5-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')

      toc.push({
        id,
        title: cleanTitle,
        level
      })
    }
  }

  return toc
}

