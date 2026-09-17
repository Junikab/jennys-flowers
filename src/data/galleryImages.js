import galleryImageCatalog from './galleryCatalog'

const galleryImages = [...galleryImageCatalog]

function sortGalleryImages(images) {
  return [...images].sort((firstImage, secondImage) => {
    return firstImage.sortOrder - secondImage.sortOrder
  })
}

function isGalleryVisible(image) {
  return image.showInGallery
}

const sortedGalleryImages = sortGalleryImages(galleryImages)
const visibleGalleryImages = sortedGalleryImages.filter(isGalleryVisible)

function buildGalleryLookup(images, key) {
  return images.reduce((lookup, image) => {
    image[key].forEach((value) => {
      if (!lookup[value]) {
        lookup[value] = []
      }

      lookup[value].push(image)
    })

    return lookup
  }, {})
}

const galleryImagesBySection = buildGalleryLookup(
  sortedGalleryImages,
  'sections'
)
const galleryImagesByCategory = buildGalleryLookup(
  visibleGalleryImages,
  'categories'
)
const galleryImagesByCollection = buildGalleryLookup(
  visibleGalleryImages,
  'collections'
)
const galleryCategories = [
  ...new Set(visibleGalleryImages.flatMap((image) => image.categories))
].sort()

export function getGalleryImages() {
  return [...visibleGalleryImages]
}

export function getGalleryImagesBySection(section) {
  return [...(galleryImagesBySection[section] || [])]
}

export function getGalleryImagesByCategory(category) {
  return [...(galleryImagesByCategory[category] || [])]
}

export function getGalleryImagesByCollection(collection) {
  return [...(galleryImagesByCollection[collection] || [])]
}

export function getPrimaryGalleryImageBySection(section) {
  return galleryImagesBySection[section]?.[0] || null
}

export function getGalleryCategories() {
  return [...galleryCategories]
}

export default galleryImages
