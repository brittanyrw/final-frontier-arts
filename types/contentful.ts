export interface Exhibition {
  name: string
  shortName: string
  slug: string
  startDate: string
  endDate: string
  description: {
    json: any
  }
  artist: {
    name: string
  }
  artworksCollection: {
    items: {
      name: string
      image: {
        url: string
        width: number
        height: number
      }
    }[]
  }
}

export interface HomePageData {
  heroCollection?: {
    items: {
      title: string
      subtitle: string
      description: string
      image: {
        url: string
        width: number
        height: number
      }
    }[]
  }
  exhibitionCollection?: {
    items: Exhibition[]
  }
  aboutCollection?: {
    items: {
      title: string
      content: {
        json: any
      }
      image: {
        url: string
        width: number
        height: number
      }
    }[]
  }
}