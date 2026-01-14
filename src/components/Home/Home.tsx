import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar'
import SeriesCard from '../SeriesCard'
import LatestArticles from '../LatestArticles'
import type { Series, Article } from '../../types'
import './Home.css'

interface HomeProps {
  series: Series[]
  articles: Article[]
}

export default function Home({ series, articles }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState('')

  // 过滤所有文章（MD 文件）
  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return articles
    const query = searchQuery.toLowerCase()
    return articles.filter(a => a.title.toLowerCase().includes(query) || a.description?.toLowerCase().includes(query) || a.tags?.some(tag => tag.toLowerCase().includes(query)) || a.seriesId?.toLowerCase().includes(query))
  }, [articles, searchQuery])

  // 按日期排序最新文章
  const sortedArticles = useMemo(() => {
    return [...filteredArticles].sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
  }, [filteredArticles])

  // 根据搜索结果动态显示系列（只显示有匹配文章的系列）
  const filteredSeries = useMemo(() => {
    if (!searchQuery.trim()) return series
    // 如果有搜索，只显示包含匹配文章的系列
    const matchedSeriesIds = new Set(filteredArticles.map(a => a.seriesId).filter(Boolean))
    return series.filter(s => matchedSeriesIds.has(s.id))
  }, [series, filteredArticles, searchQuery])

  // 首页只显示前6个系列
  const displayedSeries = useMemo(() => {
    return filteredSeries.slice(0, 6)
  }, [filteredSeries])

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">
          來都來了,坐一下再走
          <span className="hero-emoji">🍵🍵🍵</span>
        </h1>
        <p className="hero-description">隨便看看,這裡是我整理的一些技術筆記,看到覺得有用的就拿去用吧。</p>
      </section>

      {/* Search Bar */}
      <SearchBar onSearch={setSearchQuery} />

      {/* Series Articles Section */}
      <section className="series-section">
        <div className="section-header">
          <h2 className="section-title">系列文章</h2>
          {filteredSeries.length > 6 && (
            <Link to="/series" className="view-all-link">
              查看全部 →
            </Link>
          )}
        </div>
        {displayedSeries.length > 0 ? (
          <div className="series-grid">
            {displayedSeries.map(s => (
              <SeriesCard key={s.id} series={s} />
            ))}
          </div>
        ) : (
          <p className="empty-state">沒有找到相關系列文章</p>
        )}
      </section>

      {/* Latest Articles Section */}
      <LatestArticles articles={sortedArticles} />
    </div>
  )
}
