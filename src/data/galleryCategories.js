export const galleryFilterOptions = [
  { label: 'All', value: 'all' },
  { label: 'Fresh Flowers', value: 'fresh-flowers' },
  { label: 'Faux Flowers', value: 'faux-flowers' },
  { label: 'Arrangements', value: 'arrangements' }
]

export const galleryFilterValues = galleryFilterOptions.map(
  (filter) => filter.value
)
