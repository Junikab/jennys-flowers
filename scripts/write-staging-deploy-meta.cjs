const fs = require('fs')
const path = require('path')

const metadataPath = path.join(__dirname, '..', 'dist', '__staging_deploy.json')

const metadata = {
  deployedAt: new Date().toISOString(),
  environment: 'staging'
}

fs.writeFileSync(metadataPath, `${JSON.stringify(metadata, null, 2)}\n`)
console.log('Wrote staging deploy metadata file.')
