import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { Article } from '../../types'
import './AllArticlesPage.css'

interface AllArticlesPageProps {
  articles: Article[]
}

const ITEMS_PER_PAGE = 10

export default function AllArticlesPage({ articles }: AllArticlesPageProps) {
  const navigate = useNavigate()

  // 获取 slug，如果没有则使用 id
  const getSlug = (article: Article): string => {
    return article.slug || article.id
  }
  const [currentPage, setCurrentPage] = useState(1)

  // 按日期排序
  const sortedArticles = useMemo(() => {
    return [...articles].sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
  }, [articles])

  // 计算分页
  const totalPages = Math.ceil(sortedArticles.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentArticles = sortedArticles.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="all-articles-page">
      <div className="all-articles-content">
        <header className="all-articles-header">
          <h1 className="all-articles-title">所有文章</h1>
          <p className="all-articles-description">共 {sortedArticles.length} 篇文章</p>
        </header>

        <div className="articles-list-container">
          {currentArticles.length > 0 ? (
            <>
              <div className="articles-list">
                {currentArticles.map(article => (
                  <Link
                    key={article.id}
                    to={`/article/${getSlug(article)}`}
                    className="article-item"
                    style={{ textDecoration: 'none', color: 'inherit' }}>
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

              {/* 分页控件 */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="pagination-button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="上一页">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <div className="pagination-info">
                    <span className="pagination-text">
                      第 {currentPage} / {totalPages} 页
                    </span>
                  </div>

                  <button
                    className="pagination-button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="下一页">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="empty-state">
              <p>暫無文章</p>
            </div>
          )}
        </div>
      </div>

      <button className="back-button" onClick={() => navigate(-1)} aria-label="返回">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </button>
    </div>
  )
}

