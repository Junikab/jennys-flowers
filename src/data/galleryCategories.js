export const galleryCollections = {
  laurenAndMatthew: {
    label: 'Lauren & Matthew',
    value: 'lauren-and-matthew',
    coverAsset: 'IMG_7164_l0mfz1'
  }
}

export const galleryFilterOptions = [
  { label: 'All', value: 'all' },
  { label: 'Fresh Flowers', value: 'fresh-flowers' },
  { label: 'Faux Flowers', value: 'faux-flowers' },
  {
    label: 'Weddings',
    value: 'weddings',
    collections: [galleryCollections.laurenAndMatthew]
  }
]

export const galleryFilterValues = galleryFilterOptions.map(
  (filter) => filter.value
)
