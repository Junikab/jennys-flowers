const fs = require('fs')
const path = require('path')
const galleryCollectionDefinitions = require('../src/data/galleryCollections.json')
const {
  fetchCloudinaryAssets,
  getAssetFolder,
  getAssetName,
  loadEnv,
  normalizeFolderInput
} = require('./export-cloudinary-folder.cjs')

const GALLERY_CATEGORY_TAGS = new Set(['fresh-flowers', 'faux-flowers'])
const OUTPUT_PATH = path.join(
  process.cwd(),
  'src/data/galleryCollectionAssets.json'
)
const UPLOAD_DATES_OUTPUT_PATH = path.join(
  process.cwd(),
  'src/data/galleryUploadDates.json'
)

function getCategoriesFromTags(tags = []) {
  return tags.filter((tag) => GALLERY_CATEGORY_TAGS.has(tag))
}

function buildAssetEntry(asset, defaultCategories = []) {
  const entry = { asset: getAssetName(asset.public_id) }
  const categories = [
    ...new Set([
      ...defaultCategories.filter((category) =>
        GALLERY_CATEGORY_TAGS.has(category)
      ),
      ...getCategoriesFromTags(asset.tags)
    ])
  ]

  if (categories.length) {
    entry.categories = categories
  }

  return entry
}

function buildUploadDates(assets) {
  return Object.fromEntries(
    assets
      .filter((asset) => asset.public_id && asset.created_at)
      .sort((firstAsset, secondAsset) =>
        firstAsset.public_id.localeCompare(secondAsset.public_id)
      )
      .map((asset) => [asset.public_id, asset.created_at])
  )
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

  const allAssets = await fetchCloudinaryAssets({
    cloudName,
    apiKey,
    apiSecret,
    folderPath: normalizeFolderInput(),
    recursive: true,
    maxResults: 500
  })

  const collectionEntries = galleryCollectionDefinitions.map((collection) => {
    const folderPath = normalizeFolderInput(collection.folderName)
    const assets = allAssets.filter(
      (asset) => getAssetFolder(asset) === folderPath
    )

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

    const entries = assets.map((asset) =>
      buildAssetEntry(asset, collection.defaultCategories)
    )
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

  const galleryCollectionAssets = Object.fromEntries(collectionEntries)

  fs.writeFileSync(
    OUTPUT_PATH,
    `${JSON.stringify(galleryCollectionAssets, null, 2)}\n`
  )
  fs.writeFileSync(
    UPLOAD_DATES_OUTPUT_PATH,
    `${JSON.stringify(buildUploadDates(allAssets), null, 2)}\n`
  )

  console.log(`Updated: ${path.relative(process.cwd(), OUTPUT_PATH)}`)
  console.log(
    `Updated: ${path.relative(process.cwd(), UPLOAD_DATES_OUTPUT_PATH)}`
  )
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
