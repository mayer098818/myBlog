import { Link } from 'react-router-dom'
import type { Article } from '../../types'
import './LatestArticles.css'

interface LatestArticlesProps {
  articles: Article[]
}

export default function LatestArticles({ articles }: LatestArticlesProps) {
  // 获取 slug，如果没有则使用 id
  const getSlug = (article: Article): string => {
    return article.slug || article.id
  }

  if (articles.length === 0) {
    return (
      <div className="latest-articles">
        <div className="section-header">
          <h2 className="section-title">最新文章</h2>
        </div>
        <p className="empty-state">暫無文章</p>
      </div>
    )
  }

  return (
    <div className="latest-articles">
      <div className="section-header">
        <h2 className="section-title">最新文章</h2>
        {articles.length > 0 && (
          <Link to="/articles" className="view-all-link">
            查看全部 →
          </Link>
        )}
      </div>
      <div className="articles-list">
        {articles.map(article => (
          <Link key={article.id} to={`/article/${getSlug(article)}`} className="article-item" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="article-content">
              <h3 className="article-title">{article.title}</h3>
              {article.description && <p className="article-description">{article.description}</p>}
              <div className="article-meta">
                <span className="article-date">
                  {(() => {
                    const date = article.publishDate as any
                    if (typeof date === 'string') return date
                    if (date && typeof date === 'object' && 'toISOString' in date) {
                      return (date as Date).toISOString().split('T')[0]
                    }
                    return String(date || '')
                  })()}
                </span>
                {article.tags && article.tags.length > 0 && (
                  <div className="article-tags">
                    {article.tags.map(tag => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
