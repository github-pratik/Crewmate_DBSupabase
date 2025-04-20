import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import DetailPage from './pages/DetailPage'
import EditPage from './pages/EditPage'
import GalleryPage from './pages/GalleryPage'
import { Link } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="homepage-layout">
        <aside className="sidebar">
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/create">Create a Crewmate!</Link></li>
              <li><Link to="/gallery">Crewmate Gallery</Link></li>
            </ul>
          </nav>
          <div className="sidebar-icon">
            <img src="https://cdn3.emoji.gg/stickers/1318-peek.png" alt="Spaceship" style={{width: '60px'}} />
          </div>
        </aside>
        <main className="homepage-main">
          <div className="app-container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/create" element={<CreatePage />} />
              <Route path="/crewmate/:id" element={<DetailPage />} />
              <Route path="/edit/:id" element={<EditPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
