const CLOUDINARY_CLOUD_NAME = 'djgi23npu'
const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`

function encodePublicId(publicId) {
  return publicId
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')
}

export const getImageUrl = (publicId, options = {}) => {
  const transformations = ['f_auto']

  if (options.crop) {
    transformations.push(`c_${options.crop}`)
  }

  if (options.width) {
    transformations.push(`w_${options.width}`)
  }

  if (options.height) {
    transformations.push(`h_${options.height}`)
  }

  const transformationPath = transformations.length
    ? `${transformations.join(',')}/`
    : ''

  return `${CLOUDINARY_BASE_URL}/${transformationPath}${encodePublicId(
    publicId
  )}`
}

export default {
  cloudName: CLOUDINARY_CLOUD_NAME,
  getImageUrl
}
