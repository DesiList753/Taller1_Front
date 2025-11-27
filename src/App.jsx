import { useContext } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import { PeliculasContext } from './context/PeliculasContext'
import { HomeContainer } from './containers/HomeContainer'
import { ImplementacionContainer } from './containers/ImplementacionContainer'
import { Menubar } from 'primereact/menubar'
import { Toast } from 'primereact/toast'
import './index.scss'

function App() {
  const { toast } = useContext(PeliculasContext)

  const createMenuItem = (label, icon, path) => ({
    label,
    icon,
    template: (item) => (
      <NavLink 
        to={path}
        className={({ isActive }) => 
          `p-menuitem-link no-underline ${isActive ? 'p-highlight' : ''}`
        }
      >
        <i className={item.icon}></i>
        <span className="ml-2">{item.label}</span>
      </NavLink>
    )
  })

  // Titulo, icono, ruta
  const menuItems = [
    createMenuItem('Home', 'pi pi-home', '/'),
    createMenuItem('Implementación', 'pi pi-database', '/implementacion')
  ]

  return (
    <div className="min-h-screen surface-ground">
      <Toast ref={toast} />
      
      <div className="mx-auto p-3" style={{ maxWidth: '1400px' }}>
        <Menubar model={menuItems} className="mb-4" />

        <Routes>
          <Route path="/" element={<HomeContainer />} />
          <Route path="/implementacion" element={<ImplementacionContainer />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
