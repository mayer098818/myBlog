import yaml from 'js-yaml'
import type { Series } from '../types'

// 使用 Vite 的 import.meta.glob 动态导入 YAML 文件
const seriesYaml = import.meta.glob('../content/series.yml', { as: 'raw', eager: true })

/**
 * 从 YAML 文件加载系列配置
 */
export function loadSeriesConfig(): Series[] {
  try {
    const yamlContent = Object.values(seriesYaml)[0]
    if (typeof yamlContent !== 'string') {
      console.warn('Failed to load series.yml, using fallback')
      return getFallbackSeries()
    }

    const data = yaml.load(yamlContent) as Series[]
    if (!Array.isArray(data)) {
      console.warn('series.yml is not an array, using fallback')
      return getFallbackSeries()
    }

    return data.map(item => ({
      id: item.id,
      title: item.title,
      description: item.description,
      icon: item.icon || '📄',
      articleCount: 0 // 会在 generateSeries 中更新
    }))
  } catch (error) {
    console.error('Failed to parse series.yml:', error)
    return getFallbackSeries()
  }
}

/**
 * 备用系列配置（当 YAML 文件加载失败时使用）
 */
function getFallbackSeries(): Series[] {
  return [
    {
      id: 'web-auth',
      title: 'Web 驗證入門',
      description: '從零開始學習 Web 身份驗證',
      icon: '📄'
    },
    {
      id: 'http-basics',
      title: 'HTTP 新手村',
      description: 'HTTP 協議基礎知識',
      icon: '📄'
    },
    {
      id: 'js-basics',
      title: 'JavaScript 基礎入門系列',
      description: 'JavaScript 基礎知識',
      icon: '📄'
    }
  ]
}

