import { Card } from 'primereact/card'
import { Divider } from 'primereact/divider'

export function HomeContainer() {
  return (
    <div className="grid">
      <div className="col-12">
        <Card>
          <div className="text-center mb-4">
            <h1 className="text-primary mb-3">Catálogo de Películas Animadas</h1>
            <p className="text-muted">
              Explora películas de animación de diferentes épocas
            </p>
          </div>

          <Divider />

          <div className="mb-4">
            <h2 className="text-secondary mb-3">
              <i className="pi pi-info-circle mr-2"></i>
              Descripción del Proyecto
            </h2>
            <p className="line-height-3">
              Aplicación web que consume la API pública de Sample APIs para mostrar un catálogo 
              de películas animadas. Permite visualizar ID, título, póster e identificador de IMDb de cada película.
            </p>
          </div>

          <Divider />

          <div>
            <h2 className="text-secondary mb-3">
              <i className="pi pi-code mr-2"></i>
              Tecnologías Utilizadas
            </h2>
            <ul className="line-height-3">
              <li><strong>React:</strong> Framework para construir la interfaz de usuario</li>
              <li><strong>PrimeReact:</strong> Librería de componentes UI (DataTable, Card, Button, etc.)</li>
              <li><strong>React Router:</strong> Manejo de rutas y navegación</li>
              <li><strong>Axios:</strong> Cliente HTTP para consumir la API</li>
              <li><strong>Context API:</strong> Patrón Provider para manejo de estado global</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  )
}
