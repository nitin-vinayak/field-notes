import { useEffect, useRef } from 'react'
import { loadGoogleMaps } from '../utils/loadGoogleMaps'

export default function MapEmbed({ lat, lng, label }) {
  const mapRef = useRef()

  useEffect(() => {
    let cancelled = false

    async function initMap() {
      await loadGoogleMaps()
      if (cancelled || !mapRef.current) return

      const { Map } = await window.google.maps.importLibrary('maps')

      const map = new Map(mapRef.current, {
        center: { lat, lng },
        zoom: 15,
        disableDefaultUI: true,
        zoomControl: true,
        scrollwheel: true,
        styles: [
          { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
          { featureType: 'transit', elementType: 'labels', stylers: [{ visibility: 'off' }] },
        ],
      })

      new window.google.maps.Marker({
        map,
        position: { lat, lng },
        title: label ?? '',
      })
    }

    initMap()
    return () => { cancelled = true }
  }, [lat, lng, label])

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
}
