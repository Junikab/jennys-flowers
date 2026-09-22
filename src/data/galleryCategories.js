import galleryCollectionDefinitions from './galleryCollections.json'

function toCollectionOption({ label, value, coverAsset }) {
  return {
    label,
    value,
    coverAsset
  }
}

export const galleryFilterOptions = [
  { label: 'All', value: 'all' },
  { label: 'Fresh Flowers', value: 'fresh-flowers' },
  { label: 'Faux Flowers', value: 'faux-flowers' },
  {
    label: 'Weddings',
    value: 'weddings',
    collections: galleryCollectionDefinitions.map(toCollectionOption)
  }
]
