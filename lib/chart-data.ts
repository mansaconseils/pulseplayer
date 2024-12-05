export const performanceData = [
  {
    name: "Jan",
    performance: 7.2,
    social: 65,
    media: 45,
  },
  {
    name: "Feb",
    performance: 7.5,
    social: 68,
    media: 52,
  },
  {
    name: "Mar",
    performance: 7.8,
    social: 72,
    media: 61,
  },
  {
    name: "Apr",
    performance: 7.6,
    social: 75,
    media: 58,
  },
  {
    name: "May",
    performance: 7.9,
    social: 80,
    media: 65,
  },
]

export type ChartDataPoint = {
  name: string
  performance: number
  social: number
  media: number
}