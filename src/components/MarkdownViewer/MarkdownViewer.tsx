import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import './MarkdownViewer.css'

interface MarkdownViewerProps {
  content: string
}

/**
 * 生成标题 ID（与 TOC 提取器保持一致）
 */
function generateHeadingId(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/`(.+?)`/g, '$1')
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u4e00-\u9fa5-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export default function MarkdownViewer({ content }: MarkdownViewerProps) {
  return (
    <div className="markdown-viewer">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
          h2: ({ node, children, ...props }) => {
            const text = typeof children === 'string' ? children : children?.[0]?.toString() || ''
            const id = generateHeadingId(text)
            return <h2 id={id} {...props}>{children}</h2>
          },
          h3: ({ node, children, ...props }) => {
            const text = typeof children === 'string' ? children : children?.[0]?.toString() || ''
            const id = generateHeadingId(text)
            return <h3 id={id} {...props}>{children}</h3>
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

