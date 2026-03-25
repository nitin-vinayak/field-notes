import { useEffect, useRef, useState } from 'react'
import Globe from 'react-globe.gl'

export default function GlobeEmbed({ lat, lng, label }) {
  const containerRef = useRef()
  const globeRef = useRef()
  const [size, setSize] = useState({ width: 300, height: 300 })

  const marker = [{ lat, lng, label: label ?? '' }]

  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect
      setSize({ width, height })
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!globeRef.current) return
    // Point of view: zoom to the marker location
    globeRef.current.pointOfView({ lat, lng, altitude: 1.8 }, 1200)
  }, [lat, lng, size])

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <Globe
        ref={globeRef}
        width={size.width}
        height={size.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(0,0,0,0)"
        atmosphereColor="#a8c8f0"
        atmosphereAltitude={0.12}
        pointsData={marker}
        pointLat="lat"
        pointLng="lng"
        pointLabel="label"
        pointColor={() => '#e53935'}
        pointAltitude={0.01}
        pointRadius={0.6}
        labelsData={marker}
        labelLat="lat"
        labelLng="lng"
        labelText="label"
        labelSize={1.2}
        labelColor={() => '#fff'}
        labelDotRadius={0.4}
        labelAltitude={0.015}
      />
    </div>
  )
}
