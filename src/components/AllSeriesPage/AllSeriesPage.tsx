import { useNavigate } from 'react-router-dom'
import SeriesCard from '../SeriesCard'
import type { Series } from '../../types'
import './AllSeriesPage.css'

interface AllSeriesPageProps {
  series: Series[]
}

export default function AllSeriesPage({ series }: AllSeriesPageProps) {
  const navigate = useNavigate()
  return (
    <div className="all-series-page">
      <div className="all-series-content">
        <header className="all-series-header">
          <h1 className="all-series-title">所有系列文章</h1>
          <p className="all-series-description">瀏覽所有技術筆記系列</p>
        </header>

        <div className="all-series-grid-container">
          <div className="all-series-grid">{series.length > 0 ? series.map(s => <SeriesCard key={s.id} series={s} />) : <p className="empty-state">暫無系列文章</p>}</div>
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
