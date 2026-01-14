import { useParams } from 'react-router-dom'
import { useMemo } from 'react'
import BlogPost from '../BlogPost'
import type { LoadedArticle } from '../../utils/contentLoader'
import { extractTOC } from '../../utils/tocExtractor'

interface ArticlePageProps {
  articles: LoadedArticle[]
}

export default function ArticlePage({ articles }: ArticlePageProps) {
  const { slug } = useParams<{ slug: string }>()

  const article = useMemo(() => {
    return articles.find(a => a.slug === slug)
  }, [articles, slug])

  const tableOfContents = useMemo(() => {
    if (!article?.content) return []
    return extractTOC(article.content)
  }, [article])

  if (!article) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>文章未找到</h1>
        <p>抱歉，找不到这篇文章。</p>
      </div>
    )
  }

  return (
    <BlogPost
      title={article.title}
      lastUpdated={article.lastUpdated || article.publishDate}
      content={article.content}
      tableOfContents={tableOfContents}
    />
  )
}

