const fs = require('fs')
const path = require('path')
const galleryCollectionDefinitions = require('../src/data/galleryCollections.json')
const {
  fetchCloudinaryAssets,
  getAssetName,
  loadEnv,
  normalizeFolderInput
} = require('./export-cloudinary-folder')

const GALLERY_CATEGORY_TAGS = new Set(['fresh-flowers', 'faux-flowers'])
const OUTPUT_PATH = path.join(
  process.cwd(),
  'src/data/galleryCollectionAssets.json'
)

function getCategoriesFromTags(tags = []) {
  return tags.filter((tag) => GALLERY_CATEGORY_TAGS.has(tag))
}

function buildAssetEntry(asset) {
  const entry = { asset: getAssetName(asset.public_id) }
  const categories = getCategoriesFromTags(asset.tags)

  if (categories.length) {
    entry.categories = categories
  }

  return entry
}

async function main() {
  const env = loadEnv()
  const cloudName = env.CLOUDINARY_CLOUD_NAME || 'djgi23npu'
  const apiKey = env.CLOUDINARY_API_KEY
  const apiSecret = env.CLOUDINARY_API_SECRET

  if (!apiKey || !apiSecret) {
    throw new Error(
      'Missing Cloudinary credentials in .env.cloudinary.local.'
    )
  }

  const collectionEntries = await Promise.all(
    galleryCollectionDefinitions.map(async (collection) => {
      const folderPath = normalizeFolderInput(collection.folderName)
      const assets = await fetchCloudinaryAssets({
        cloudName,
        apiKey,
        apiSecret,
        folderPath,
        recursive: false,
        maxResults: 500
      })

      if (!assets.length) {
        throw new Error(`No images found for ${collection.label}.`)
      }

      if (
        !assets.some(
          (asset) => getAssetName(asset.public_id) === collection.coverAsset
        )
      ) {
        throw new Error(`Cover image not found for ${collection.label}.`)
      }

      const entries = assets.map(buildAssetEntry)
      const countCategory = (category) =>
        entries.filter((entry) => entry.categories?.includes(category)).length
      const untaggedCount = entries.filter(
        (entry) => !entry.categories
      ).length

      console.log(
        [
          `${collection.label}: ${entries.length} images`,
          `${countCategory('fresh-flowers')} fresh`,
          `${countCategory('faux-flowers')} faux`,
          `${untaggedCount} untagged`
        ].join(' | ')
      )

      return [collection.value, entries]
    })
  )

  const galleryCollectionAssets = Object.fromEntries(collectionEntries)

  fs.writeFileSync(
    OUTPUT_PATH,
    `${JSON.stringify(galleryCollectionAssets, null, 2)}\n`
  )

  console.log(`Updated: ${path.relative(process.cwd(), OUTPUT_PATH)}`)
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
