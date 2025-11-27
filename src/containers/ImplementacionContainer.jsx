import { useContext, useEffect } from 'react'
import { PeliculasContext } from '../context/PeliculasContext'
import { TablaPeliculas } from '../components/TablaPeliculas'

export function ImplementacionContainer() {
  const { peliculas, cargando, cargarPeliculas } = useContext(PeliculasContext)

  useEffect(() => {
    cargarPeliculas()
  }, [])

  return (
    <TablaPeliculas
      peliculas={peliculas}
      cargando={cargando}
      cargarPeliculas={cargarPeliculas}
    />
  )
}
