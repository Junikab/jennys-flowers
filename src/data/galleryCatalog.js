import {
  createGalleryImage,
  createGalleryImagesFromFolder
} from './galleryImageHelpers'

const backgroundImages = createGalleryImagesFromFolder('background', [
  {
    id: 'home-rusty',
    title: 'Rust Bouquet',
    asset: 'rusty_lfwvkw',
    alt: 'Rust-colored bouquet',
    sections: ['home'],
    categories: ['fresh-flowers'],
    sortOrder: 30
  }
])

const jennysPortraitImages = createGalleryImagesFromFolder('jennysPhotos', [
  {
    id: 'about-jenny-crown',
    title: 'Jenny Crown Portrait',
    asset: 'jennyCrownDown_eembxd',
    alt: 'Jenny with flower crown',
    sections: [],
    categories: ['fresh-flowers'],
    sortOrder: 40
  },
  {
    id: 'about-jenny-wisteria',
    title: 'Jenny Wisteria Portrait',
    asset: 'JennyWisteria_htea5b',
    alt: "Jenny's Flowers with wisteria",
    sections: ['about'],
    categories: ['fresh-flowers'],
    showInGallery: false,
    sortOrder: 50
  },
  {
    id: 'about-jenny-white',
    title: 'Jenny White Portrait',
    asset: 'jennyWhite_gortvp',
    alt: 'Jenny in white',
    sections: [],
    categories: ['fresh-flowers'],
    sortOrder: 60
  }
])
const fauxflowersImages = createGalleryImagesFromFolder('fauxFlowers', [
  {
    asset: 'att.tVD2IzpDui19zRAFcldaVX5eZ0Vh6VRgwMzMrSswH-4_m3u3cz',
    sortOrder: 200
  },
  { asset: 'DSC03697_Large_kdpeu0', sortOrder: 201 },
  { asset: 'DSC03703_m6dn8q', sortOrder: 202 },
  { asset: 'DSC03802_ihwkcp', sortOrder: 203 },
  { asset: 'DSC03814.JPEGsmall_yqmgso', sortOrder: 204 },
  { asset: 'DSC03815.JPEGsmall_qz78ih', sortOrder: 205 },
  { asset: 'DSC09531_gb4ptb', sortOrder: 206 },
  { asset: 'DSC09536_cj39xf', sortOrder: 207 },
  { asset: 'DSC09546_heddix', sortOrder: 208 },
  { asset: 'DSC09549_psgwwl', sortOrder: 209 },
  { asset: 'DSC09554_bwffxb', sortOrder: 210 },
  { asset: 'DSC09555_q9frwx', sortOrder: 211 },
  { asset: 'DSC09556_qzwwgf', sortOrder: 212 },
  { asset: 'DSC09582_kdybme', sortOrder: 213 },
  { asset: 'DSC09606_dvivuk', sortOrder: 214 },
  { asset: 'DSC09608_iofns4', sortOrder: 215 },
  { asset: 'DSC09624_jdfagc', sortOrder: 216 },
  { asset: 'DSC09625_onqyen', sortOrder: 217 },
  { asset: 'DSC09626_uhl3g4', sortOrder: 218 },
  { asset: 'DSC09627_qoytvs', sortOrder: 219 },
  { asset: 'DSC09631_w4jihb', sortOrder: 220 },
  { asset: 'DSC09634_erx81f', sortOrder: 221 },
  { asset: 'DSC09634_jtomhb', sortOrder: 222 },
  { asset: 'DSC09639_otq4c5', sortOrder: 223 },
  { asset: 'DSC09640_sjrpge', sortOrder: 224 },
  { asset: 'DSC09641_cvltqx', sortOrder: 225 },
  { asset: 'DSC09641_yjexgn', sortOrder: 226 },
  { asset: 'DSC09642_fjesa2', sortOrder: 227 },
  { asset: 'DSC09643_dnnids', sortOrder: 228 },
  { asset: 'DSC09647_dan0ws', sortOrder: 229 },
  { asset: 'DSC09651_d393vk', sortOrder: 230 },
  { asset: 'DSC09654_mil2mz', sortOrder: 231 },
  { asset: 'DSC09660_h2k9ta', sortOrder: 232 },
  { asset: 'DSC09660_xe4gkt', sortOrder: 233 },
  { asset: 'DSC09700_gng7rd', sortOrder: 234 },
  { asset: 'DSC09702_u8hkko', sortOrder: 235 },
  { asset: 'DSC09708_jteqjg', sortOrder: 236 },
  { asset: 'DSC09717_qiaixj', sortOrder: 237 },
  { asset: 'DSC09718_ouaf0f', sortOrder: 238 },
  { asset: 'DSC09780_lhacga', sortOrder: 239 },
  { asset: 'DSC09781_vlhkqm', sortOrder: 240 },
  { asset: 'IMG_4098_iu4rs9', sortOrder: 241 },
  { asset: 'IMG_4473_t4gb7n', sortOrder: 242 },
  { asset: 'IMG_5222_n84v1d', sortOrder: 243 },
  { asset: 'IMG_5237_qgs6mk', sortOrder: 244 },
  { asset: 'IMG_5240_kpyz68', sortOrder: 245 },
  { asset: 'IMG_5245_b71ajn', sortOrder: 246 },
  { asset: 'IMG_5249_ddnmg1', sortOrder: 247 },
  { asset: 'IMG_5251_eaer8w', sortOrder: 248 },
  { asset: 'IMG_5260_fusv58', sortOrder: 249 },
  { asset: 'IMG_5262_sne2cd', sortOrder: 250 },
  { asset: 'IMG_5267_hyy98x', sortOrder: 251 },
  { asset: 'IMG_5343_ohdfp0', sortOrder: 252 },
  {
    asset: 'att.W7VGWGZY0E3n47_aF2g97uMDfVyGZLBfDTJvIF8_oJs_t0e42i',
    sortOrder: 253
  },
  { asset: 'IMG_5850_a0ktuq', sortOrder: 254 },
  {
    asset: 'att.bqOOcV_Ni8xN2YY27eR_5I2L6JO67TWKnieTZOJsrnU_gjgxzn',
    sortOrder: 255
  }
])

// FRESH FLOWERS GALLERY

const freshflowersImages = createGalleryImagesFromFolder('freshFlowers', [
  { asset: 'blueBride_iayrfw', sortOrder: 519 },
  { asset: 'blueHalf_tym2ts', sortOrder: 520 },
  { asset: 'crownCloseUp_ggnqwv', sortOrder: 521 },
  { asset: 'DSC09679_t30dvt', sortOrder: 522 },
  { asset: 'DSC09682_r4brfq', sortOrder: 523 },
  { asset: 'DSC09765_leq60o', sortOrder: 524 },
  { asset: 'DSC09766_td3oxt', sortOrder: 525 },
  { asset: 'DSC09767_genrfx', sortOrder: 526 },
  { asset: 'DSC09770_obfszz', sortOrder: 527 },
  { asset: 'DSC09772_c210gw', sortOrder: 528 },
  { asset: 'DSC09773_beggd6', sortOrder: 529 },
  { asset: 'halfRusty_uqtt7o', sortOrder: 530 },
  { asset: 'jennyOrchidRing_qx5jnn', sortOrder: 531 },
  { asset: 'orchidsRing_n77azh', sortOrder: 532 },
  { asset: 'orcidCrown_ozzisb', sortOrder: 533 },
  { asset: 'roseBunchRusty_rstrtu', sortOrder: 534 },
  { asset: 'rusty1_yuuit5', sortOrder: 535 },
  { asset: 'rustyWedding_umxq9i', sortOrder: 536 },
  { asset: 'small_reyr7k', sortOrder: 537 },
  { asset: 'twoRosesSmall_cves1q', sortOrder: 538 }
])
const freshflowersBlueweddingImages = createGalleryImagesFromFolder(
  'freshFlowers/blueWedding',
  [
    { asset: 'DSC09371_mytqup', sortOrder: 500 },
    { asset: 'DSC09372_cpwwz3', sortOrder: 501 },
    { asset: 'DSC09376_bbty1w', sortOrder: 502 },
    { asset: 'DSC09377_llyldx', sortOrder: 503 },
    { asset: 'DSC09384_aefwsl', sortOrder: 504 },
    { asset: 'DSC09388_p5zexj', sortOrder: 505 },
    { asset: 'DSC09391_o0kbgn', sortOrder: 506 }
  ]
)

const freshflowersChristmasImages = createGalleryImagesFromFolder(
  'freshFlowers/christmas',
  [
    { asset: 'DSC09354_wgfavs', sortOrder: 507 },
    { asset: 'DSC09360_krrvdv', sortOrder: 508 },
    { asset: 'DSC09363_fsugjq', sortOrder: 509 },
    { asset: 'DSC09455_dwx1nd', sortOrder: 510 },
    { asset: 'DSC09458_akavst', sortOrder: 512 },
    { asset: 'DSC09459_mzzzgr', sortOrder: 513 },
    { asset: 'DSC09461_syhnjb', sortOrder: 515 },
    { asset: 'DSC09465_zbpvjd', sortOrder: 516 },
    { asset: 'DSC09472_vahipg', sortOrder: 518 }
  ]
)

const homeFeaturedImages = [
  createGalleryImage({
    id: 'home-featured-img-5343',
    title: 'Featured Floral Detail',
    cloudinaryUrl:
      'https://res.cloudinary.com/djgi23npu/image/upload/v1782954647/Jennys%20Flowers/fauxFlowers/IMG_5343_ohdfp0.jpg',
    alt: 'Featured floral detail',
    sections: ['home'],
    categories: ['fresh-flowers'],
    showInGallery: false,
    sortOrder: 37
  }),
  createGalleryImage({
    id: 'home-featured-img-w4jihb',
    title: 'Plinths',
    cloudinaryUrl:
      'https://res.cloudinary.com/djgi23npu/image/upload/v1782966254/Jennys%20Flowers/background/DSC09631_mniyfv.jpg',
    alt: 'Plinths',
    sections: ['contact-cover'],
    categories: ['faux-flowers'],
    showInGallery: true,
    sortOrder: 38
  })
]

export const galleryImageCatalog = [
  ...backgroundImages,
  ...homeFeaturedImages,
  ...jennysPortraitImages,
  ...fauxflowersImages,
  ...freshflowersImages,
  ...freshflowersBlueweddingImages,
  ...freshflowersChristmasImages
]
export default galleryImageCatalog
