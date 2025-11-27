import { createContext, useState, useRef } from 'react'
import { obtenerPeliculas } from '../services/peliculasService'

export const PeliculasContext = createContext()

export function PeliculasProvider({ children }) {
    const [peliculas, setPeliculas] = useState([])
    const [cargando, setCargando] = useState(false)
    const toast = useRef(null)

    const cargarPeliculas = async () => {
        setCargando(true)
        try {
            const data = await obtenerPeliculas()
            setPeliculas(data)
            mostrarMensaje('Películas cargadas exitosamente', 'success')
        } catch (error) {
            console.error('Error al cargar películas:', error)
            mostrarMensaje('Error al cargar películas', 'error')
        } finally {
            setCargando(false)
        }
    }

    const mostrarMensaje = (mensaje, tipo = 'success') => {
        if (toast.current) {
            toast.current.show({
                severity: tipo,
                summary: tipo === 'success' ? 'Éxito' : tipo === 'error' ? 'Error' : 'Información',
                detail: mensaje,
                life: 3000
            })
        }
    }

    return (
        <PeliculasContext.Provider value={{
            peliculas,
            cargando,
            toast,
            cargarPeliculas
        }}>
            {children}
        </PeliculasContext.Provider>
    )
}
