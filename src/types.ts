export interface Character {
  id: number
  name: string
  element: string
  weapon: string
  image: string
  rarity: number
}

export type Theme = 'light' | 'dark'