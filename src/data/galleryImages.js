const galleryImages = [
  {
    id: 'home-orchid-crown',
    src: 'https://res.cloudinary.com/djgi23npu/image/upload/Jennys%20Flowers/background/orcidCrown_ozzisb.jpg',
    alt: 'Orchid crown arrangement',
    sections: ['home']
  },
  {
    id: 'home-orchid',
    src: 'https://res.cloudinary.com/djgi23npu/image/upload/Jennys%20Flowers/background/orchid_pv0c70.jpg',
    alt: 'Orchid flowers',
    sections: ['home']
  },
  {
    id: 'home-rusty',
    src: 'https://res.cloudinary.com/djgi23npu/image/upload/Jennys%20Flowers/background/rusty_lfwvkw.jpg',
    alt: 'Rust-colored bouquet',
    sections: ['home']
  },
  {
    id: 'about-jenny-crown',
    src: 'https://res.cloudinary.com/djgi23npu/image/upload/Jennys%20Flowers/jennysPhotos/jennyCrownDown_eembxd.jpg',
    alt: 'Jenny with flower crown',
    sections: ['about']
  },
  {
    id: 'about-jenny-wisteria',
    src: 'https://res.cloudinary.com/djgi23npu/image/upload/Jennys%20Flowers/jennysPhotos/JennyWisteria_htea5b.jpg',
    alt: "Jenny's Flowers with wisteria",
    sections: ['about']
  },
  {
    id: 'about-jenny-white',
    src: 'https://res.cloudinary.com/djgi23npu/image/upload/Jennys%20Flowers/jennysPhotos/jennyWhite_gortvp.jpg',
    alt: 'Jenny in white',
    sections: ['about']
  },
  {
    id: 'contact-orchid-ring',
    src: 'https://res.cloudinary.com/djgi23npu/image/upload/Jennys%20Flowers/background/orchidsRing_n77azh.jpg',
    alt: 'Jenny with orchid ring',
    sections: ['contact']
  },
  {
    id: 'contact-rusty-wedding',
    src: 'https://res.cloudinary.com/djgi23npu/image/upload/Jennys%20Flowers/background/rustyWedding_umxq9i.jpg',
    alt: 'Rustic wedding flowers',
    sections: ['contact']
  },
  {
    id: 'contact-blue-bride',
    src: 'https://res.cloudinary.com/djgi23npu/image/upload/Jennys%20Flowers/background/blueBride_iayrfw.jpg',
    alt: 'Blue wedding bouquet',
    sections: ['contact']
  },
  {
    id: 'contact-jenny-crown',
    src: 'https://res.cloudinary.com/djgi23npu/image/upload/Jennys%20Flowers/jennysPhotos/jennyCrown1_a6sshy.jpg',
    alt: 'Jenny with flower crown',
    sections: ['contact']
  }
]

export function getGalleryImagesBySection(section) {
  return galleryImages.filter((image) => image.sections.includes(section))
}

export default galleryImages
