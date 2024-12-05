export function calculateCredibilityScore(
  domain: string,
  articleAge: number,
  citationCount: number,
  authorReputation: number
): number {
  const weights = {
    domain: 0.4,
    age: 0.2,
    citations: 0.2,
    author: 0.2,
  }

  const domainScore = getTrustedDomainScore(domain)
  const ageScore = Math.max(0, 1 - articleAge / (30 * 24 * 60 * 60 * 1000)) // 30 days max
  const citationScore = Math.min(citationCount / 10, 1)
  const authorScore = authorReputation

  return (
    domainScore * weights.domain +
    ageScore * weights.age +
    citationScore * weights.citations +
    authorScore * weights.author
  )
}

function getTrustedDomainScore(domain: string): number {
  const trustedDomains = new Map([
    ["theguardian.com", 0.9],
    ["bbc.co.uk", 0.95],
    ["skysports.com", 0.85],
    ["espn.com", 0.8],
    ["goal.com", 0.75],
  ])

  return trustedDomains.get(domain) || 0.5
}

export function extractKeywords(text: string): string[] {
  const stopWords = new Set([
    "the", "be", "to", "of", "and", "a", "in", "that", "have",
    "i", "it", "for", "not", "on", "with", "he", "as", "you",
    "do", "at", "this", "but", "his", "by", "from", "they",
  ])

  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter(word => !stopWords.has(word))

  const frequency: Record<string, number> = {}
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1
  })

  return Object.entries(frequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([word]) => word)
}

export function analyzeCoverageTrend(
  articles: MediaArticle[],
  timeframe: number
): number {
  const now = Date.now()
  const cutoff = now - timeframe

  const recent = articles.filter(article => 
    article.publishedAt.getTime() > cutoff
  ).length

  const previous = articles.filter(article =>
    article.publishedAt.getTime() <= cutoff &&
    article.publishedAt.getTime() > cutoff - timeframe
  ).length

  return recent === 0 && previous === 0 
    ? 0 
    : ((recent - previous) / Math.max(previous, 1)) * 100
}