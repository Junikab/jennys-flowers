const galleryImages = [
  {
    id: 'home-orchid-crown',
    title: 'Orchid Crown',
    src: 'https://res.cloudinary.com/djgi23npu/image/upload/Jennys%20Flowers/background/orcidCrown_ozzisb.jpg',
    publicId: 'Jennys Flowers/background/orcidCrown_ozzisb',
    alt: 'Orchid crown arrangement',
    sections: [],
    categories: ['crowns', 'arrangements'],
    sortOrder: 10
  },
  {
    id: 'home-orchid',
    title: 'Orchid Arrangement',
    src: 'https://res.cloudinary.com/djgi23npu/image/upload/Jennys%20Flowers/background/orchid_pv0c70.jpg',
    publicId: 'Jennys Flowers/background/orchid_pv0c70',
    alt: 'Orchid flowers',
    sections: ['home'],
    categories: ['arrangements'],
    sortOrder: 20
  },
  {
    id: 'home-rusty',
    title: 'Rust Bouquet',
    src: 'https://res.cloudinary.com/djgi23npu/image/upload/Jennys%20Flowers/background/rusty_lfwvkw.jpg',
    publicId: 'Jennys Flowers/background/rusty_lfwvkw',
    alt: 'Rust-colored bouquet',
    sections: ['home'],
    categories: ['bouquets'],
    sortOrder: 30
  },
  {
    id: 'about-jenny-crown',
    title: 'Jenny Crown Portrait',
    src: 'https://res.cloudinary.com/djgi23npu/image/upload/Jennys%20Flowers/jennysPhotos/jennyCrownDown_eembxd.jpg',
    publicId: 'Jennys Flowers/jennysPhotos/jennyCrownDown_eembxd',
    alt: 'Jenny with flower crown',
    sections: [],
    categories: ['portraits', 'crowns'],
    sortOrder: 40
  },
  {
    id: 'about-jenny-wisteria',
    title: 'Jenny Wisteria Portrait',
    src: 'https://res.cloudinary.com/djgi23npu/image/upload/Jennys%20Flowers/jennysPhotos/JennyWisteria_htea5b.jpg',
    publicId: 'Jennys Flowers/jennysPhotos/JennyWisteria_htea5b',
    alt: "Jenny's Flowers with wisteria",
    sections: ['about'],
    categories: ['portraits'],
    sortOrder: 50
  },
  {
    id: 'about-jenny-white',
    title: 'Jenny White Portrait',
    src: 'https://res.cloudinary.com/djgi23npu/image/upload/Jennys%20Flowers/jennysPhotos/jennyWhite_gortvp.jpg',
    publicId: 'Jennys Flowers/jennysPhotos/jennyWhite_gortvp',
    alt: 'Jenny in white',
    sections: [],
    categories: ['portraits'],
    sortOrder: 60
  },
  {
    id: 'contact-orchid-ring',
    title: 'Orchid Ring Portrait',
    src: 'https://res.cloudinary.com/djgi23npu/image/upload/Jennys%20Flowers/background/orchidsRing_n77azh.jpg',
    publicId: 'Jennys Flowers/background/orchidsRing_n77azh',
    alt: 'Jenny with orchid ring',
    sections: ['contact'],
    categories: ['portraits', 'crowns'],
    sortOrder: 70
  },
  {
    id: 'contact-rusty-wedding',
    title: 'Rustic Wedding Flowers',
    src: 'https://res.cloudinary.com/djgi23npu/image/upload/Jennys%20Flowers/background/rustyWedding_umxq9i.jpg',
    publicId: 'Jennys Flowers/background/rustyWedding_umxq9i',
    alt: 'Rustic wedding flowers',
    sections: ['contact'],
    categories: ['weddings', 'arrangements'],
    sortOrder: 80
  },
  {
    id: 'contact-blue-bride',
    title: 'Blue Bridal Bouquet',
    src: 'https://res.cloudinary.com/djgi23npu/image/upload/Jennys%20Flowers/background/blueBride_iayrfw.jpg',
    publicId: 'Jennys Flowers/background/blueBride_iayrfw',
    alt: 'Blue wedding bouquet',
    sections: ['contact'],
    categories: ['weddings', 'bouquets'],
    sortOrder: 90
  },
  {
    id: 'contact-jenny-crown',
    title: 'Jenny Flower Crown',
    src: 'https://res.cloudinary.com/djgi23npu/image/upload/Jennys%20Flowers/jennysPhotos/jennyCrown1_a6sshy.jpg',
    publicId: 'Jennys Flowers/jennysPhotos/jennyCrown1_a6sshy',
    alt: 'Jenny with flower crown',
    sections: ['contact'],
    categories: ['portraits', 'crowns'],
    sortOrder: 100
  },
  {
    id: 'cover-flints',
    title: 'Event Flints',
    src: 'https://res.cloudinary.com/djgi23npu/image/upload/v1782783559/Jennys%20Flowers/DSC09631_vnspci.jpg',
    publicId: 'Jennys Flowers/jennysPhotos/DSC09631_vnspci.jpg',
    alt: 'short image description',
    sections: ['home'],
    categories: ['weddings'],
    sortOrder: 110
  }
]

function sortGalleryImages(images) {
  return [...images].sort((firstImage, secondImage) => {
    return firstImage.sortOrder - secondImage.sortOrder
  })
}

const sortedGalleryImages = sortGalleryImages(galleryImages)

function buildGalleryLookup(key) {
  return sortedGalleryImages.reduce((lookup, image) => {
    image[key].forEach((value) => {
      if (!lookup[value]) {
        lookup[value] = []
      }

      lookup[value].push(image)
    })

    return lookup
  }, {})
}

const galleryImagesBySection = buildGalleryLookup('sections')
const galleryImagesByCategory = buildGalleryLookup('categories')
const galleryCategories = [
  ...new Set(sortedGalleryImages.flatMap((image) => image.categories))
].sort()

export function getGalleryImages() {
  return [...sortedGalleryImages]
}

export function getGalleryImagesBySection(section) {
  return [...(galleryImagesBySection[section] || [])]
}

export function getGalleryImagesByCategory(category) {
  return [...(galleryImagesByCategory[category] || [])]
}

export function getPrimaryGalleryImageBySection(section) {
  return galleryImagesBySection[section]?.[0] || null
}

export function getGalleryCategories() {
  return [...galleryCategories]
}

export default galleryImages
