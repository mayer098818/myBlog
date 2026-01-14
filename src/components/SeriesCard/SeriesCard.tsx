import { Link } from 'react-router-dom'
import type { Series } from '../../types'
import './SeriesCard.css'

interface SeriesCardProps {
  series: Series
}

export default function SeriesCard({ series }: SeriesCardProps) {
  return (
    <Link to={`/series/${series.id}`} className="series-card" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="series-icon">{series.icon || '📄'}</div>
      <div className="series-content">
        <h3 className="series-title">{series.title}</h3>
        <p className="series-count">{series.articleCount} 篇文章</p>
      </div>
    </Link>
  )
}
