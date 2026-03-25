import { Outlet } from 'react-router-dom'
import { MapCoordsProvider, useMapCoords } from '../context/MapCoordsContext'
import MapboxViz from '../components/MapboxViz'
import styles from './MapLayout.module.css'

function Layout() {
  const { coords } = useMapCoords()
  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        <Outlet />
        <div className={styles.mapCol}>
          <MapboxViz lat={coords.lat} lng={coords.lng} />
        </div>
      </div>
    </div>
  )
}

export default function MapLayout() {
  return (
    <MapCoordsProvider>
      <Layout />
    </MapCoordsProvider>
  )
}
