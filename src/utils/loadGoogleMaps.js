let promise = null

export function loadGoogleMaps() {
  if (promise) return promise
  if (window.google?.maps?.places?.AutocompleteSuggestion) return Promise.resolve()

  promise = new Promise((resolve, reject) => {
    window.__googleMapsCallback = resolve
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places&loading=async&callback=__googleMapsCallback`
    script.async = true
    script.onerror = reject
    document.head.appendChild(script)
  })

  return promise
}
