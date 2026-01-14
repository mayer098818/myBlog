export interface Article {
  id: string
  title: string
  seriesId?: string
  publishDate: string
  lastUpdated?: string
  description?: string
  tags?: string[]
  slug?: string
}

export interface Series {
  id: string
  title: string
  description?: string
  articleCount: number
  icon?: string
}

