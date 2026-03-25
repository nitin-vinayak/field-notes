import { createContext, useContext, useState } from 'react'

const MapCoordsContext = createContext(null)

export function MapCoordsProvider({ children }) {
  const [coords, setCoords] = useState({ lat: null, lng: null })
  return (
    <MapCoordsContext.Provider value={{ coords, setCoords }}>
      {children}
    </MapCoordsContext.Provider>
  )
}

export function useMapCoords() {
  return useContext(MapCoordsContext)
}
