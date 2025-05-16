import { Cloudinary } from '@cloudinary/url-gen'

// Initialize Cloudinary
const cld = new Cloudinary({
  cloud: {
    cloudName: 'djgi23npu' // Your Cloudinary cloud name
  },
  url: {
    secure: true // Force HTTPS
  }
})

export default cld

// Helper function to get a Cloudinary URL that handles spaces in folder names
export const getImageUrl = (publicId, options = {}) => {
  const { width, height, crop } = options

  // Ensure spaces are properly handled
  const processedPublicId = publicId.replace(/ /g, '%20')

  let transformation = cld.image(processedPublicId)

  if (width) transformation = transformation.resize(`w_${width}`)
  if (height) transformation = transformation.resize(`h_${height}`)
  if (crop) transformation = transformation.resize(`c_${crop}`)

  return transformation.toURL()
}
