import { useMemo } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import SeriesPage from './components/SeriesPage/SeriesPage'
import AllSeriesPage from './components/AllSeriesPage/AllSeriesPage'
import AllArticlesPage from './components/AllArticlesPage/AllArticlesPage'
import ArticlePage from './components/ArticlePage/ArticlePage'
import { loadContent } from './utils/contentLoader'
import { loadSeriesConfig } from './utils/seriesLoader'
import './App.css'

function App() {
  // 加载所有内容
  const { articles, series } = useMemo(() => {
    const seriesConfig = loadSeriesConfig()
    return loadContent(seriesConfig)
  }, [])

  // 转换为 Article 类型（用于首页显示）
  const articleList = useMemo(() => {
    return articles.map(({ content, ...article }) => article)
  }, [articles])

  return (
    <div className="app">
      <Header title="May's Log" />
      <Routes>
        <Route path="/" element={<Home series={series} articles={articleList} />} />
        <Route path="/series" element={<AllSeriesPage series={series} />} />
        <Route path="/series/:seriesId" element={<SeriesPage articles={articleList} allSeries={series} />} />
        <Route path="/articles" element={<AllArticlesPage articles={articleList} />} />
        <Route path="/article/:slug" element={<ArticlePage articles={articles} />} />
      </Routes>
    </div>
  )
}

export default App
