const MAX_NAME_LENGTH = 100
const MAX_EMAIL_LENGTH = 254
const MAX_VENUE_LOCATION_LENGTH = 50
const MAX_MESSAGE_LENGTH = 2000

function hasMeaningfulText(value) {
  return value.trim().length > 0
}

function isValidCalendarDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)

  if (!match) {
    return false
  }

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
  const daysInMonth = [
    31,
    isLeapYear ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
  ]

  return (
    year > 0 &&
    month >= 1 &&
    month <= 12 &&
    day >= 1 &&
    day <= daysInMonth[month - 1]
  )
}

function getEventDateError({ eventDate, eventDateUnknown }) {
  if (eventDateUnknown) {
    return ''
  }

  if (!eventDate) {
    return 'Please choose a date or tick “Date not known yet”.'
  }

  return isValidCalendarDate(eventDate)
    ? ''
    : 'Please enter a valid event date.'
}

export function createEmptyContactFormData() {
  return {
    name: '',
    phone: '',
    email: '',
    eventDate: '',
    eventDateUnknown: false,
    venueLocation: '',
    message: '',
    website: ''
  }
}

function normalizeFormData(formData) {
  return {
    name: formData.name.trim(),
    phone: formData.phone.trim(),
    email: formData.email.trim(),
    eventDate: formData.eventDate.trim(),
    eventDateUnknown: Boolean(formData.eventDateUnknown),
    venueLocation: formData.venueLocation.trim(),
    message: formData.message.trim(),
    website: formData.website?.trim() || ''
  }
}

export function validateContactForm(formData) {
  const normalizedData = normalizeFormData(formData)
  const eventDateError = getEventDateError(normalizedData)
  const validations = [
    {
      field: 'name',
      isValid:
        hasMeaningfulText(normalizedData.name) &&
        normalizedData.name.length <= MAX_NAME_LENGTH,
      message: hasMeaningfulText(normalizedData.name)
        ? `Please keep your name under ${MAX_NAME_LENGTH} characters.`
        : 'Please enter your name.'
    },
    {
      field: 'phone',
      isValid:
        normalizedData.phone === '' || /^\d{8,15}$/.test(normalizedData.phone),
      message: 'Please enter 8 to 15 digits.'
    },
    {
      field: 'email',
      isValid:
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedData.email) &&
        normalizedData.email.length <= MAX_EMAIL_LENGTH,
      message: hasMeaningfulText(normalizedData.email)
        ? 'Please enter a valid email address.'
        : 'Please enter your email address.'
    },
    {
      field: 'eventDate',
      isValid: !eventDateError,
      message: eventDateError
    },
    {
      field: 'venueLocation',
      isValid:
        hasMeaningfulText(normalizedData.venueLocation) &&
        normalizedData.venueLocation.length <= MAX_VENUE_LOCATION_LENGTH,
      message: hasMeaningfulText(normalizedData.venueLocation)
        ? `Please keep the venue under ${MAX_VENUE_LOCATION_LENGTH} characters.`
        : 'Please enter the venue or location.'
    },
    {
      field: 'message',
      isValid:
        hasMeaningfulText(normalizedData.message) &&
        normalizedData.message.length <= MAX_MESSAGE_LENGTH,
      message: hasMeaningfulText(normalizedData.message)
        ? `Please keep your message under ${MAX_MESSAGE_LENGTH} characters.`
        : 'Please add a short message.'
    }
  ]
  const invalidFields = validations.filter(({ isValid }) => !isValid)
  const errors = Object.fromEntries(
    invalidFields.map(({ field, message }) => [field, message])
  )

  return {
    formData: normalizedData,
    errors,
    firstInvalidField: invalidFields[0]?.field || ''
  }
}
