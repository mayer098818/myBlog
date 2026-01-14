import './BlogPost.css'
import TableOfContents from '../TableOfContents'
import MarkdownViewer from '../MarkdownViewer'

interface BlogPostProps {
  title: string
  lastUpdated?: string
  content?: string
  children?: React.ReactNode
  tableOfContents?: Array<{ id: string; title: string; level: number }>
}

export default function BlogPost({ 
  title, 
  lastUpdated, 
  content,
  children,
  tableOfContents = []
}: BlogPostProps) {
  return (
    <div className="blog-container">
      <main className="blog-main">
        <article className="blog-article">
          <header className="article-header">
            <h1 className="article-title">{title}</h1>
            {lastUpdated && (
              <p className="article-meta">
                最後更新:{' '}
                {typeof lastUpdated === 'string'
                  ? lastUpdated
                  : (lastUpdated as any)?.toISOString?.()?.split('T')[0] || String(lastUpdated)}
              </p>
            )}
          </header>
          <div className="article-content">
            {content ? <MarkdownViewer content={content} /> : children}
          </div>
        </article>
      </main>
      {tableOfContents.length > 0 && (
        <aside className="blog-sidebar">
          <TableOfContents items={tableOfContents} />
        </aside>
      )}
    </div>
  )
}

