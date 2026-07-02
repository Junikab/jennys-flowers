const fs = require('fs')
const path = require('path')

const ROOT_FOLDER = 'Jennys Flowers'
const DEFAULT_FOLDER = ROOT_FOLDER
const DEFAULT_SORT_START = 200
const DEFAULT_MAX_RESULTS = 500
const DEFAULT_FIELDS = [
  'public_id',
  'asset_folder',
  'display_name',
  'secure_url',
  'format',
  'created_at',
  'resource_type',
  'type'
].join(',')

function parseArgs(argv) {
  return argv.reduce((options, entry) => {
    if (!entry.startsWith('--')) {
      return options
    }

    const [rawKey, ...rest] = entry.slice(2).split('=')
    const key = rawKey.trim()
    const value = rest.join('=').trim()

    if (key) {
      options[key] = value || 'true'
    }

    return options
  }, {})
}

function stripQuotes(value) {
  return value.replace(/^['"]|['"]$/g, '')
}

function readEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return {}
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')

  return fileContents.split(/\r?\n/).reduce((envValues, rawLine) => {
    const line = rawLine.trim()

    if (!line || line.startsWith('#')) {
      return envValues
    }

    const separatorIndex = line.indexOf('=')

    if (separatorIndex === -1) {
      return envValues
    }

    const key = line.slice(0, separatorIndex).trim()
    const value = stripQuotes(line.slice(separatorIndex + 1).trim())

    if (key) {
      envValues[key] = value
    }

    return envValues
  }, {})
}

function loadEnv() {
  const projectRoot = process.cwd()

  return {
    ...readEnvFile(path.join(projectRoot, '.env')),
    ...readEnvFile(path.join(projectRoot, '.env.local')),
    ...readEnvFile(path.join(projectRoot, '.env.cloudinary.local')),
    ...process.env
  }
}

function normalizeFolderInput(folderInput) {
  const trimmedFolder = (folderInput || DEFAULT_FOLDER)
    .trim()
    .replace(/^\/+|\/+$/g, '')

  if (!trimmedFolder || trimmedFolder.toLowerCase() === 'root') {
    return ROOT_FOLDER
  }

  if (trimmedFolder === ROOT_FOLDER) {
    return ROOT_FOLDER
  }

  if (trimmedFolder.startsWith(`${ROOT_FOLDER}/`)) {
    return trimmedFolder
  }

  return `${ROOT_FOLDER}/${trimmedFolder}`
}

function buildFolderExpression(folderPath, recursive) {
  const escapedFolderPath = folderPath.replace(/"/g, '\\"')

  if (recursive) {
    return `(asset_folder="${escapedFolderPath}" OR asset_folder:"${escapedFolderPath}/*") AND resource_type:image AND type:upload`
  }

  return `asset_folder="${escapedFolderPath}" AND resource_type:image AND type:upload`
}

function toRelativeFolder(folderPath) {
  if (typeof folderPath !== 'string' || !folderPath.trim()) {
    return ''
  }

  if (folderPath === ROOT_FOLDER) {
    return ''
  }

  if (folderPath.startsWith(`${ROOT_FOLDER}/`)) {
    return folderPath.slice(ROOT_FOLDER.length + 1)
  }

  return folderPath
}

function toFileSafeSlug(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function toCamelCase(value) {
  const base = value
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  if (!base.length) {
    return 'folderImages'
  }

  const camelCase = base
    .map((part, index) => {
      const lowerPart = part.toLowerCase()

      if (index === 0) {
        return lowerPart
      }

      return lowerPart.charAt(0).toUpperCase() + lowerPart.slice(1)
    })
    .join('')

  return /\d/.test(camelCase.charAt(0)) ? `folder${camelCase}` : camelCase
}

function getGroupVariableName(relativeFolder) {
  if (!relativeFolder) {
    return 'rootImages'
  }

  return `${toCamelCase(relativeFolder)}Images`
}

function getAssetName(publicId) {
  return publicId.split('/').pop()
}

function getAssetFolder(asset) {
  if (typeof asset.asset_folder === 'string' && asset.asset_folder.trim()) {
    return asset.asset_folder
  }

  if (typeof asset.public_id === 'string' && asset.public_id.includes('/')) {
    return asset.public_id.split('/').slice(0, -1).join('/')
  }

  return ROOT_FOLDER
}

function sortAssets(firstAsset, secondAsset) {
  return firstAsset.public_id.localeCompare(secondAsset.public_id)
}

function groupAssetsByFolder(assets) {
  return assets.reduce((groups, asset) => {
    const relativeFolder = toRelativeFolder(getAssetFolder(asset))

    if (!groups[relativeFolder]) {
      groups[relativeFolder] = []
    }

    groups[relativeFolder].push(asset)
    return groups
  }, {})
}

function buildJsonExport(folderPath, assets) {
  return {
    generatedAt: new Date().toISOString(),
    folder: folderPath,
    total: assets.length,
    assets: assets.map((asset) => ({
      publicId: asset.public_id,
      assetFolder: getAssetFolder(asset),
      relativeFolder: toRelativeFolder(getAssetFolder(asset)),
      asset: getAssetName(asset.public_id),
      displayName: asset.display_name || getAssetName(asset.public_id),
      secureUrl: asset.secure_url,
      format: asset.format || '',
      createdAt: asset.created_at || ''
    }))
  }
}

function buildSnippetExport(folderPath, assets, sortStart) {
  const groupedAssets = groupAssetsByFolder(assets)
  const groupEntries = Object.entries(groupedAssets).sort(
    ([firstFolder], [secondFolder]) => firstFolder.localeCompare(secondFolder)
  )

  let currentSortOrder = sortStart

  const blocks = groupEntries.map(([relativeFolder, folderAssets]) => {
    const variableName = getGroupVariableName(relativeFolder)
    const lines = folderAssets
      .sort(sortAssets)
      .map((asset) => {
        const assetName = getAssetName(asset.public_id)
        const sortOrder = currentSortOrder
        currentSortOrder += 1

        if (!relativeFolder) {
          return `  createGalleryImage({ publicId: '${asset.public_id}', sortOrder: ${sortOrder} })`
        }

        return `    { asset: '${assetName}', sortOrder: ${sortOrder} }`
      })
      .join(',\n')

    if (!relativeFolder) {
      return `const ${variableName} = [\n${lines}\n]\n`
    }

    return `const ${variableName} = createGalleryImagesFromFolder(\n  '${relativeFolder}',\n  [\n${lines}\n  ]\n)\n`
  })

  const exportLines = groupEntries
    .map(([relativeFolder]) => `  ...${getGroupVariableName(relativeFolder)},`)
    .join('\n')

  return `// Generated from Cloudinary folder: ${folderPath}
// Paste the const block(s) into src/data/galleryCatalog.js
// Then add the spread line(s) into galleryImageCatalog

${blocks.join('\n')}// Add these lines inside galleryImageCatalog:
${exportLines}
`
}

async function fetchCloudinaryAssets({
  cloudName,
  apiKey,
  apiSecret,
  folderPath,
  recursive,
  maxResults
}) {
  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`
  const authorizationHeader = Buffer.from(`${apiKey}:${apiSecret}`).toString(
    'base64'
  )
  const assets = []
  let nextCursor = null

  do {
    const requestBody = {
      expression: buildFolderExpression(folderPath, recursive),
      max_results: maxResults,
      fields: DEFAULT_FIELDS,
      sort_by: [{ public_id: 'asc' }]
    }

    if (nextCursor) {
      requestBody.next_cursor = nextCursor
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${authorizationHeader}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
      const errorText = await response.text()

      throw new Error(
        `Cloudinary request failed (${response.status} ${response.statusText}): ${errorText}`
      )
    }

    const responseData = await response.json()
    assets.push(...(responseData.resources || []))
    nextCursor = responseData.next_cursor || null
  } while (nextCursor)

  return assets.sort(sortAssets)
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const env = loadEnv()
  const cloudName = env.CLOUDINARY_CLOUD_NAME || 'djgi23npu'
  const apiKey = env.CLOUDINARY_API_KEY
  const apiSecret = env.CLOUDINARY_API_SECRET
  const folderPath = normalizeFolderInput(args.folder)
  const recursive = args.recursive !== 'false'
  const sortStart = Number(args['sort-start'] || DEFAULT_SORT_START)
  const maxResults = Number(args['max-results'] || DEFAULT_MAX_RESULTS)
  const outputDirectory = path.join(process.cwd(), 'cloudinary-exports')
  const folderSlug = toFileSafeSlug(toRelativeFolder(folderPath))
  const jsonOutputPath = path.join(outputDirectory, `${folderSlug}.json`)
  const snippetOutputPath = path.join(
    outputDirectory,
    `${folderSlug}.snippet.js`
  )

  if (!apiKey || !apiSecret) {
    throw new Error(
      [
        'Missing Cloudinary API credentials.',
        'Add these to .env.cloudinary.local or your shell:',
        'CLOUDINARY_CLOUD_NAME=djgi23npu',
        'CLOUDINARY_API_KEY=your_key',
        'CLOUDINARY_API_SECRET=your_secret'
      ].join('\n')
    )
  }

  fs.mkdirSync(outputDirectory, { recursive: true })

  const assets = await fetchCloudinaryAssets({
    cloudName,
    apiKey,
    apiSecret,
    folderPath,
    recursive,
    maxResults
  })

  const jsonExport = buildJsonExport(folderPath, assets)
  const snippetExport = buildSnippetExport(folderPath, assets, sortStart)

  fs.writeFileSync(jsonOutputPath, `${JSON.stringify(jsonExport, null, 2)}\n`)
  fs.writeFileSync(snippetOutputPath, snippetExport)

  console.log(`Cloudinary export complete for: ${folderPath}`)
  console.log(`Images found: ${assets.length}`)
  console.log(`JSON file: ${path.relative(process.cwd(), jsonOutputPath)}`)
  console.log(`Snippet file: ${path.relative(process.cwd(), snippetOutputPath)}`)
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
