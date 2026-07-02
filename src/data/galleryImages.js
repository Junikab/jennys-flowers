const galleryImages = [
  {
    id: 'home-orchid-crown',
    title: 'Orchid Crown',
    src: 'https://res.cloudinary.com/djgi23npu/image/upload/Jennys%20Flowers/background/orcidCrown_ozzisb.jpg',
    publicId: 'Jennys Flowers/background/orcidCrown_ozzisb',
    alt: 'Orchid crown arrangement',
    sections: [],
    categories: ['crowns', 'faux-flowers'],
    sortOrder: 10
  },
  {
    id: 'home-rusty',
    title: 'Rust Bouquet',
    src: 'https://res.cloudinary.com/djgi23npu/image/upload/Jennys%20Flowers/background/rusty_lfwvkw.jpg',
    publicId: 'Jennys Flowers/background/rusty_lfwvkw',
    alt: 'Rust-colored bouquet',
    sections: ['home'],
    categories: ['bouquets', 'arrangements', 'fresh-flowers'],
    sortOrder: 30
  },
  // {
  //   id: 'home-featured-dsc03697',
  //   title: 'Featured Floral Arrangement',
  //   src: 'https://res.cloudinary.com/djgi23npu/image/upload/v1782955810/Jennys%20Flowers/DSC03697_Large_kdpeu0.jpg',
  //   publicId: 'Jennys Flowers/DSC03697_Large_kdpeu0',
  //   alt: 'Featured floral arrangement',
  //   sections: ['home'],
  //   categories: ['arrangements', 'fresh-flowers'],
  //   showInGallery: false,
  //   sortOrder: 35
  // },
  {
    id: 'home-featured-img-5343',
    title: 'Featured Floral Detail',
    src: 'https://res.cloudinary.com/djgi23npu/image/upload/v1782954647/Jennys%20Flowers/IMG_5343_ohdfp0.jpg',
    publicId: 'Jennys Flowers/IMG_5343_ohdfp0',
    alt: 'Featured floral detail',
    sections: ['home'],
    categories: ['arrangements', 'fresh-flowers'],
    showInGallery: false,
    sortOrder: 37
  },
  {
    id: 'about-jenny-crown',
    title: 'Jenny Crown Portrait',
    src: 'https://res.cloudinary.com/djgi23npu/image/upload/Jennys%20Flowers/jennysPhotos/jennyCrownDown_eembxd.jpg',
    publicId: 'Jennys Flowers/jennysPhotos/jennyCrownDown_eembxd',
    alt: 'Jenny with flower crown',
    sections: [],
    categories: ['portraits', 'crowns', 'faux-flowers'],
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
    showInGallery: false,
    sortOrder: 50
  },
  {
    id: 'about-jenny-white',
    title: 'Jenny White Portrait',
    src: 'https://res.cloudinary.com/djgi23npu/image/upload/Jennys%20Flowers/jennysPhotos/jennyWhite_gortvp.jpg',
    publicId: 'Jennys Flowers/jennysPhotos/jennyWhite_gortvp',
    alt: 'Jenny in white',
    sections: [],
    categories: ['portraits', 'fresh-flowers'],
    sortOrder: 60
  },
  {
    id: 'contact-orchid-ring',
    title: 'Orchid Ring Portrait',
    src: 'https://res.cloudinary.com/djgi23npu/image/upload/Jennys%20Flowers/background/orchidsRing_n77azh.jpg',
    publicId: 'Jennys Flowers/background/orchidsRing_n77azh',
    alt: 'Jenny with orchid ring',
    sections: ['contact'],
    categories: ['portraits', 'fresh-flowers'],
    sortOrder: 70
  },
  {
    id: 'contact-rusty-wedding',
    title: 'Rustic Wedding Flowers',
    src: 'https://res.cloudinary.com/djgi23npu/image/upload/Jennys%20Flowers/background/rustyWedding_umxq9i.jpg',
    publicId: 'Jennys Flowers/background/rustyWedding_umxq9i',
    alt: 'Rustic wedding flowers',
    sections: ['contact'],
    categories: ['arrangements', 'fresh-flowers'],
    sortOrder: 80
  },
  {
    id: 'contact-blue-bride',
    title: 'Blue Bridal Bouquet',
    src: 'https://res.cloudinary.com/djgi23npu/image/upload/Jennys%20Flowers/background/blueBride_iayrfw.jpg',
    publicId: 'Jennys Flowers/background/blueBride_iayrfw',
    alt: 'Blue wedding bouquet',
    sections: ['contact'],
    categories: ['bouquets', 'arrangements', 'fresh-flowers'],
    sortOrder: 90
  },
  {
    id: 'contact-jenny-crown',
    title: 'Jenny Flower Crown',
    src: 'https://res.cloudinary.com/djgi23npu/image/upload/Jennys%20Flowers/jennysPhotos/jennyCrown1_a6sshy.jpg',
    publicId: 'Jennys Flowers/jennysPhotos/jennyCrown1_a6sshy',
    alt: 'Jenny with flower crown',
    sections: ['contact'],
    categories: ['portraits', 'crowns', 'faux-flowers'],
    sortOrder: 100
  }
]

function sortGalleryImages(images) {
  return [...images].sort((firstImage, secondImage) => {
    return firstImage.sortOrder - secondImage.sortOrder
  })
}

function isGalleryVisible(image) {
  return image.showInGallery !== false
}

const sortedGalleryImages = sortGalleryImages(galleryImages)
const visibleGalleryImages = sortedGalleryImages.filter(isGalleryVisible)

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
const galleryImagesByCategory = visibleGalleryImages.reduce((lookup, image) => {
  image.categories.forEach((value) => {
    if (!lookup[value]) {
      lookup[value] = []
    }

    lookup[value].push(image)
  })

  return lookup
}, {})
const galleryCategories = [
  ...new Set(visibleGalleryImages.flatMap((image) => image.categories))
].sort()

export function getGalleryImages() {
  return [...visibleGalleryImages]
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
