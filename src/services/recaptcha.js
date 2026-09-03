const RECAPTCHA_SCRIPT_ID = 'google-recaptcha-script'
const RECAPTCHA_ONLOAD_CALLBACK = '__jennysFlowersRecaptchaOnload'

let recaptchaApiPromise = null

function waitForRecaptchaApi(timeout = 10000) {
  return new Promise((resolve, reject) => {
    const startedAt = Date.now()
    const intervalId = window.setInterval(() => {
      if (window.grecaptcha?.render) {
        window.clearInterval(intervalId)
        resolve(window.grecaptcha)
        return
      }

      if (Date.now() - startedAt >= timeout) {
        window.clearInterval(intervalId)
        reject(new Error('reCAPTCHA API did not become available in time.'))
      }
    }, 50)
  })
}

export function loadRecaptchaApi() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return Promise.reject(
      new Error('reCAPTCHA can only be loaded in a browser environment.')
    )
  }

  if (window.grecaptcha?.render) {
    return Promise.resolve(window.grecaptcha)
  }

  if (recaptchaApiPromise) {
    return recaptchaApiPromise
  }

  recaptchaApiPromise = new Promise((resolve, reject) => {
    const handleError = () => {
      delete window[RECAPTCHA_ONLOAD_CALLBACK]
      recaptchaApiPromise = null
      reject(new Error('Failed to load the reCAPTCHA API.'))
    }

    const existingScript = document.getElementById(RECAPTCHA_SCRIPT_ID)
    if (existingScript) {
      waitForRecaptchaApi()
        .then(resolve)
        .catch((error) => {
          recaptchaApiPromise = null
          reject(error)
        })
      return
    }

    window[RECAPTCHA_ONLOAD_CALLBACK] = () => {
      delete window[RECAPTCHA_ONLOAD_CALLBACK]
      resolve(window.grecaptcha)
    }

    const script = document.createElement('script')
    script.id = RECAPTCHA_SCRIPT_ID
    script.src = `https://www.google.com/recaptcha/api.js?onload=${RECAPTCHA_ONLOAD_CALLBACK}&render=explicit`
    script.async = true
    script.defer = true
    script.onerror = handleError
    document.head.appendChild(script)
  })

  return recaptchaApiPromise
}
