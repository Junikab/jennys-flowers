import galleryImageCatalog from './galleryCatalog'

function sortGalleryImages(images) {
  return [...images].sort((firstImage, secondImage) => {
    return firstImage.sortOrder - secondImage.sortOrder
  })
}

function getUploadTime(image) {
  const uploadTime = Date.parse(image.uploadedAt)

  return Number.isNaN(uploadTime) ? Number.NEGATIVE_INFINITY : uploadTime
}

function sortGalleryImagesByNewest(images) {
  return [...images].sort((firstImage, secondImage) => {
    const firstImageShowsLast = Boolean(firstImage.showLastInAll)
    const secondImageShowsLast = Boolean(secondImage.showLastInAll)

    if (firstImageShowsLast !== secondImageShowsLast) {
      return firstImageShowsLast ? 1 : -1
    }

    const firstUploadTime = getUploadTime(firstImage)
    const secondUploadTime = getUploadTime(secondImage)

    if (firstUploadTime !== secondUploadTime) {
      return secondUploadTime - firstUploadTime
    }

    return firstImage.sortOrder - secondImage.sortOrder
  })
}

function isGalleryVisible(image) {
  return image.showInGallery
}

const sortedGalleryImages = sortGalleryImages(galleryImageCatalog)
const visibleGalleryImages = sortedGalleryImages.filter(isGalleryVisible)
const newestVisibleGalleryImages = sortGalleryImagesByNewest(
  visibleGalleryImages
)

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

export function getGalleryImages() {
  return [...newestVisibleGalleryImages]
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
