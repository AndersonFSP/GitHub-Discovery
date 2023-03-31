export interface Item {
  image: string
  repositoryName: string
  link: string
  stars: number
  forks: number
  issues: number
  updated: number
}

export enum SlideSize {
  Small = 'sm',
  Medium = 'md'
}