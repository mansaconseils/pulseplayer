export function analyzeSentiment(text: string): number {
  // Basic sentiment analysis implementation
  const positiveWords = new Set([
    "great", "excellent", "amazing", "wonderful", "good",
    "fantastic", "brilliant", "outstanding", "superb", "win"
  ])
  
  const negativeWords = new Set([
    "bad", "poor", "terrible", "awful", "disappointing",
    "fail", "worst", "horrible", "mediocre", "lose"
  ])

  const words = text.toLowerCase().split(/\s+/)
  let score = 0
  let wordCount = 0

  words.forEach(word => {
    if (positiveWords.has(word)) {
      score += 1
      wordCount++
    } else if (negativeWords.has(word)) {
      score -= 1
      wordCount++
    }
  })

  return wordCount > 0 ? score / wordCount : 0
}

export function calculateEngagementRate(
  likes: number,
  comments: number,
  shares: number,
  followers: number
): number {
  return ((likes + comments * 2 + shares * 3) / followers) * 100
}