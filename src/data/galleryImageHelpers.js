import { getImageUrl } from '../plugins/cloudinary'

const AUTO_CATEGORIES_BY_FOLDER = {
  freshFlowers: ['fresh-flowers'],
  fauxFlowers: ['faux-flowers']
}

function stripFileExtension(value) {
  return value.replace(/\.(avif|gif|jpe?g|png|svg|webp)$/i, '')
}

function extractPublicIdFromCloudinaryUrl(url) {
  if (!url) {
    return ''
  }

  const uploadMarker = '/image/upload/'
  const uploadIndex = url.indexOf(uploadMarker)

  if (uploadIndex === -1) {
    return ''
  }

  const pathAfterUpload = url.slice(uploadIndex + uploadMarker.length)
  const pathWithoutVersion = pathAfterUpload.replace(/^v\d+\//, '')

  return stripFileExtension(decodeURIComponent(pathWithoutVersion))
}

function buildPublicIdFromFolderAsset(folderName, asset) {
  if (!folderName || !asset) {
    return ''
  }

  return `Jennys Flowers/${folderName}/${stripFileExtension(asset)}`
}

function inferCategoriesFromPublicId(publicId) {
  const folderName = publicId.split('/')[1]
  return AUTO_CATEGORIES_BY_FOLDER[folderName] || []
}

function humanizePublicId(publicId) {
  const rawName = publicId.split('/').pop() || ''
  const nameWithoutSuffix = rawName.replace(/_[a-z0-9]{6,}$/i, '')

  return nameWithoutSuffix.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim()
}

function buildImageId(publicId, fallbackTitle = '') {
  const baseValue = publicId || fallbackTitle

  return baseValue
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function uniqueValues(values) {
  return [...new Set(values.filter(Boolean))]
}

export function createGalleryImage(entry) {
  const publicId =
    entry.publicId ||
    buildPublicIdFromFolderAsset(entry.folderName, entry.asset) ||
    extractPublicIdFromCloudinaryUrl(entry.cloudinaryUrl)

  const title = entry.title || humanizePublicId(publicId)

  return {
    ...entry,
    id: entry.id || buildImageId(publicId, title),
    title,
    publicId,
    src: getImageUrl(publicId),
    alt: entry.alt || title,
    sections: entry.sections || [],
    categories: uniqueValues([
      ...inferCategoriesFromPublicId(publicId),
      ...(entry.categories || [])
    ]),
    showInGallery: entry.showInGallery !== false
  }
}

export function createGalleryImagesFromFolder(
  folderName,
  entries,
  sharedEntry = {}
) {
  return entries.map((entry) =>
    createGalleryImage({
      ...sharedEntry,
      ...entry,
      folderName
    })
  )
}
