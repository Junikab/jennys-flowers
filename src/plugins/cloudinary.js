import { Cloudinary } from '@cloudinary/url-gen'

// Initialize Cloudinary
const cld = new Cloudinary({
  cloud: {
    cloudName: 'djgi23npu' // Replace with your Cloudinary cloud name
  },
  url: {
    secure: true // Force HTTPS
  }
})

export default cld

// Helper function to get a Cloudinary URL
export const getImageUrl = (publicId, options = {}) => {
  const { width, height, crop } = options

  let transformation = cld.image(publicId)

  if (width) transformation = transformation.resize(`w_${width}`)
  if (height) transformation = transformation.resize(`h_${height}`)
  if (crop) transformation = transformation.resize(`c_${crop}`)

  return transformation.toURL()
}
