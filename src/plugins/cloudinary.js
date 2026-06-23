import { Cloudinary } from '@cloudinary/url-gen'

// Shared Cloudinary helper for future image transformations and gallery work.
const cld = new Cloudinary({
  cloud: {
    cloudName: 'djgi23npu'
  },
  url: {
    secure: true
  }
})

export default cld

export const getImageUrl = (publicId, options = {}) => {
  const { width, height, crop } = options
  const processedPublicId = publicId.replace(/ /g, '%20')

  let transformation = cld.image(processedPublicId)

  if (width) transformation = transformation.resize(`w_${width}`)
  if (height) transformation = transformation.resize(`h_${height}`)
  if (crop) transformation = transformation.resize(`c_${crop}`)

  return transformation.toURL()
}
