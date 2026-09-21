const CLOUDINARY_CLOUD_NAME = 'djgi23npu'
const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`

function encodePublicId(publicId) {
  return publicId
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')
}

export const getImageUrl = (publicId, options = {}) => {
  const transformations = []
  const resizeOptions = []

  if (options.crop) {
    resizeOptions.push(`c_${options.crop}`)
  }

  if (options.width) {
    resizeOptions.push(`w_${options.width}`)
  }

  if (options.height) {
    resizeOptions.push(`h_${options.height}`)
  }

  if (resizeOptions.length) {
    transformations.push(resizeOptions.join(','))
  }

  transformations.push('f_auto', 'q_auto')

  const transformationPath = `${transformations.join('/')}/`

  return `${CLOUDINARY_BASE_URL}/${transformationPath}${encodePublicId(
    publicId
  )}`
}

export default {
  cloudName: CLOUDINARY_CLOUD_NAME,
  getImageUrl
}
