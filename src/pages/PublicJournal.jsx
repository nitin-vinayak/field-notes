import { useEffect, useRef, useState } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase/config'
import { useMapCoords } from '../context/MapCoordsContext'
import styles from './Journal.module.css'

export default function PublicJournal() {
  const { setCoords } = useMapCoords()
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const hoverTimer = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchEntries() {
      const q = query(collection(db, 'entries'), orderBy('date', 'desc'))
      const snapshot = await getDocs(q)
      setEntries(snapshot.docs.map(d => ({ id: d.id, ...d.data() })))
      setLoading(false)
    }
    fetchEntries()
  }, [])

  useEffect(() => {
    setCoords({ lat: null, lng: null })
  }, [])

  function formatDate(timestamp) {
    return timestamp.toDate().toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    })
  }

  return (
    <main className={styles.feedCol}>
      <div className={styles.loggedIn}>
        <div className={styles.headerActions}>
          <button onClick={() => navigate('/journal')} className={styles.navBtn}>Admin</button>
        </div>

        <div className={styles.scrollable}>
          {loading && <div className={styles.loading}>Loading…</div>}

          {!loading && entries.length === 0 && (
            <div className={styles.empty}>
              <p className={styles.emptyText}>No entries yet.</p>
            </div>
          )}

          {entries.length > 0 && (
            <div className={styles.feed}>
              {entries.map(entry => (
                <article
                  key={entry.id}
                  className={styles.entry}
                  onMouseEnter={() => {
                    clearTimeout(hoverTimer.current)
                    hoverTimer.current = setTimeout(() => {
                      setCoords({ lat: entry.lat ?? null, lng: entry.lng ?? null })
                    }, 400)
                  }}
                  onMouseLeave={() => {
                    clearTimeout(hoverTimer.current)
                    hoverTimer.current = setTimeout(() => {
                      setCoords({ lat: null, lng: null })
                    }, 150)
                  }}
                >
                  <div className={styles.timeline}>
                    <div className={styles.node} />
                  </div>
                  <div className={styles.entryContent}>
                    {entry.locationName && (
                      <span className={styles.location}>{entry.locationName}</span>
                    )}
                    <h2
                      className={styles.title}
                      onClick={() => navigate(`/entry/${entry.id}`)}
                    >
                      {entry.title}
                    </h2>
                    <span className={styles.date}>{formatDate(entry.date)}</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
