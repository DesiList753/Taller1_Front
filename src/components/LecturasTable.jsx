import { useContext, useState, useMemo } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import LecturasContext from '../context/LecturasContext.js';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';

export function LecturasTable() {
  const { lecturas, removeLectura, toast } = useContext(LecturasContext);
  const [filtroTipo, setFiltroTipo] = useState(null);

  const tiposMedida = ['Kilowatts', 'Watts', 'Temperatura'];

  const lecturasFiltradas = useMemo(() => { // me estuvo dando problemas al borrar y filtrar asi que lo hice con useMemo
    if (filtroTipo) {
      return lecturas.filter(l => l.tipoMedida === filtroTipo);
    }
    return lecturas;
  }, [lecturas, filtroTipo]);

  const eliminarLectura = (lectura) => {
    removeLectura(lectura);
    toast.current.show({
      severity: "info",
      summary: "Lectura descartada",
      detail: "La lectura ha sido eliminada correctamente"
    });
  }

  const filtro = () => {
    if (filtroTipo) {
      const filtradas = lecturas.filter(l => l.tipoMedida === filtroTipo);
      toast.current.show({
        severity: "info",
        summary: "Filtro aplicado",
        detail: `Mostrando ${filtradas.length} lectura(s) de tipo ${filtroTipo}`
      });
    } else {
      toast.current.show({
        severity: "info",
        summary: "Filtro removido",
        detail: "Mostrando todas las lecturas"
      });
    }
  }

  const fechaFormato = (lectura) => {
    const fecha = new Date(lectura.fechaHora);
    return fecha.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }

  const horaFormato = (lectura) => {
    const fecha = new Date(lectura.fechaHora);
    return fecha.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  const valorFormato = (lectura) => {
    const unidadMap = {
      'Kilowatts': 'kW',
      'Watts': 'W',
      'Temperatura': 'C'
    };
    return `${lectura.valor} ${unidadMap[lectura.tipoMedida]}`;
  }

  const accionesFormato = (lectura) => {
    return (
      <Button
        severity='danger'
        label='Descartar Lectura'
        icon="pi pi-trash"
        size="small"
        onClick={() => eliminarLectura(lectura)}
      />
    );
  }

  const handleEliminarTodas = () => {
    if (window.confirm('¿Está seguro de eliminar todas las lecturas?')) {
      lecturas.forEach(lectura => removeLectura(lectura));
      setFiltroTipo(null);
      toast.current.show({
        severity: "info",
        summary: "Todas las lecturas eliminadas",
        detail: "Se han descartado todas las mediciones"
      });
    }
  }

  return (
    <div className="container-fluid">
      <Card title="Mediciones Registradas">

        <div className="d-flex gap-2 mb-3 align-items-end">
          <div className="flex-grow-1" style={{ maxWidth: '300px' }}>
            <label htmlFor="filtro-tipo" className="form-label">Filtrar por el tipo de medida</label>
            <Dropdown
              id="filtro-tipo"
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.value)}
              options={tiposMedida}
              placeholder="Todos los tipos"
              showClear
              className="w-100"
            />
          </div>
          <Button
            label="Filtrar"
            icon="pi pi-filter"
            onClick={filtro}
          />
        </div>

        <DataTable
          value={lecturasFiltradas}
          paginator
          rows={10}
          emptyMessage="No hay lecturas registradas"
          tableStyle={{ minWidth: '50rem' }}
          stripedRows
          sortField="fechaHora"
          sortOrder={-1}
        >
          <Column field="fechaHora" header="Fecha" body={fechaFormato} sortable></Column>
          <Column field="fechaHora" header="Hora" body={horaFormato}></Column>
          <Column field="medidor" header="Medidor" sortable></Column>
          <Column header="Valor" body={valorFormato} sortable></Column>
          <Column header="Acciones" body={accionesFormato}></Column>
        </DataTable>
        <div className="d-flex justify-content-between align-items-center">
          <h5>Mediciones Existentes ({lecturasFiltradas.length})</h5>
          {/* Las borra pero hay que actualizar la pagina por que se quedan a la vista en el dom */}
          <Button
            label="Eliminar todas"
            icon="pi pi-trash"
            severity="danger"
            onClick={handleEliminarTodas}
            disabled={lecturas.length === 0}
          />
        </div>
      </Card>
    </div>
  )
}

export default LecturasTable
