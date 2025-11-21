import { useRef, useState } from 'react'
import LecturasService from '../services/LecturasService'
import LecturasContext from '../context/LecturasContext.js';

export function LecturasProvider({ children }) {
  const toast = useRef(null);

  const [lecturas, setLecturas] = useState(() => LecturasService.getAllLecturas());

  const loadLecturas = () => {
    const lecturasFromStorage = LecturasService.getAllLecturas();
    setLecturas(lecturasFromStorage);
  }

  const createLectura = (lectura) => {
    LecturasService.createLectura(lectura);
    setLecturas([...lecturas, lectura]);
  }

  const removeLectura = (lectura) => {
    LecturasService.deleteLectura(lectura.id);
    setLecturas(lecturas.filter(l => l.id !== lectura.id));
  }

  const variablesGlobales = { lecturas, createLectura, removeLectura, loadLecturas, toast };
  return (
    <LecturasContext.Provider value={variablesGlobales}>{children}</LecturasContext.Provider>
  )
}