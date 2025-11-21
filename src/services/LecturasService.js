const Llave_Storage = 'sanquinta_lecturas';

export const LecturasService = {
  getAllLecturas: () => {
    try {
      const data = localStorage.getItem(Llave_Storage);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error al obtener lecturas:', error);
      return [];
    }
  },

  saveLecturas: (lecturas) => { // separado por que si no lo tengo que tener 2 veces
    try {
      localStorage.setItem(Llave_Storage, JSON.stringify(lecturas));
    } catch (error) {
      console.error('Error al guardar lecturas:', error);
      throw new Error('No se pudo guardar la lectura');
    }
  },

  createLectura: (lectura) => {
    try {
      const lecturas = LecturasService.getAllLecturas();
      lecturas.push(lectura);
      LecturasService.saveLecturas(lecturas);
      return lectura;
    } catch (error) {
      console.error('Error al crearla:', error);
      throw error;
    }
  },

  deleteLectura: (id) => {
    try {
      const lecturas = LecturasService.getAllLecturas();
      const filtered = lecturas.filter(l => l.id !== id);
      LecturasService.saveLecturas(filtered);
    } catch (error) {
      console.error('Error al eliminarla:', error);
      throw error;
    }
  },
  
  clearAllLecturas: () => {
    try {
      localStorage.removeItem(Llave_Storage);
    } catch (error) {
      console.error('Si paso esto esta potente (capas y no la encontro):', error);
      throw error;
    }
  }
};

export default LecturasService;
