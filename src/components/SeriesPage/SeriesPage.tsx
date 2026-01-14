import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import type { Series, Article } from '../../types'
import LatestArticles from '../LatestArticles'
import './SeriesPage.css'

interface SeriesPageProps {
  articles: Article[]
  allSeries: Series[]
}

export default function SeriesPage({ articles, allSeries }: SeriesPageProps) {
  const { seriesId } = useParams<{ seriesId: string }>()

  const series = useMemo(() => {
    return allSeries.find(s => s.id === seriesId)
  }, [allSeries, seriesId])
  // 过滤出该系列的文章
  const seriesArticles = useMemo(() => {
    if (!series) return []
    return articles
      .filter(article => article.seriesId === series.id)
      .sort((a, b) => {
        // 按发布日期排序，最新的在前
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      })
  }, [articles, series])

  if (!series) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>系列未找到</h1>
        <p>抱歉，找不到这个系列。</p>
      </div>
    )
  }

  return (
    <div className="series-page">
      <header className="series-page-header">
        <div className="series-icon-large">{series.icon || '📄'}</div>
        <div className="series-header-content">
          <h1 className="series-page-title">{series.title}</h1>
          {series.description && <p className="series-page-description">{series.description}</p>}
          <p className="series-page-meta">
            {seriesArticles.length} 篇文章
          </p>
        </div>
      </header>

      <div className="series-page-content">
        {seriesArticles.length > 0 ? (
          <LatestArticles articles={seriesArticles} />
        ) : (
          <div className="empty-series">
            <p>該系列暫無文章</p>
          </div>
        )}
      </div>
    </div>
  )
}

