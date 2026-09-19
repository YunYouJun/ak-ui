export interface GalleryItem {
  /** Unique stable key within this gallery. */
  id: string
  title: string
  description?: string
  image?: string
  alt?: string
}
