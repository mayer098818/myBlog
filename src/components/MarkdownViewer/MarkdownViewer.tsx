import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github.css'
import './MarkdownViewer.css'

interface MarkdownViewerProps {
  content: string
}

// 配置 rehype-sanitize，确保允许图片标签
// 在 v6 版本中，直接传递配置对象即可
const sanitizeConfig = {
  tagNames: ['p', 'br', 'strong', 'em', 'u', 's', 'code', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'hr'],
  attributes: {
    a: ['href', 'title'],
    img: ['src', 'alt', 'title', 'width', 'height']
  },
  protocols: {
    href: ['http', 'https', 'mailto'],
    src: ['http', 'https']
  }
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
  // 获取 Vite 的 base path
  const base = import.meta.env.BASE_URL || '/'
  
  return (
    <div className="markdown-viewer">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeConfig], rehypeHighlight]}
        components={{
          h2: ({ node, children, ...props }) => {
            let text = ''
            if (typeof children === 'string') {
              text = children
            } else if (Array.isArray(children) && children.length > 0) {
              text = String(children[0])
            } else if (children) {
              text = String(children)
            }
            const id = generateHeadingId(text)
            return <h2 id={id} {...props}>{children}</h2>
          },
          h3: ({ node, children, ...props }) => {
            let text = ''
            if (typeof children === 'string') {
              text = children
            } else if (Array.isArray(children) && children.length > 0) {
              text = String(children[0])
            } else if (children) {
              text = String(children)
            }
            const id = generateHeadingId(text)
            return <h3 id={id} {...props}>{children}</h3>
          },
          img: ({ src, alt, ...props }) => {
            // 处理图片路径：如果路径以 / 开头，需要加上 base path
            let imageSrc = src || ''
            if (imageSrc.startsWith('/') && !imageSrc.startsWith(base)) {
              // 移除开头的 /，然后加上 base path
              imageSrc = base + imageSrc.slice(1)
            } else if (!imageSrc.startsWith('http') && !imageSrc.startsWith('//') && !imageSrc.startsWith(base)) {
              // 相对路径也需要处理
              imageSrc = base + imageSrc
            }
            return <img src={imageSrc} alt={alt || ''} {...props} />
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

