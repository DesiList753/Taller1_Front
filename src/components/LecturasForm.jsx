import { useContext, useState } from 'react'
import { Card } from 'primereact/card';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Editor } from 'primereact/editor';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';
import LecturasContext from '../context/LecturasContext.js';
import { useNavigate } from 'react-router-dom';

const medidores = Array.from({ length: 10 }, (_, i) => { // Literal un array de 10
  const val = (i + 1).toString().padStart(2, '0');
  return { label: val, value: val };
});

const tiposMedida = ['Kilowatts', 'Watts', 'Temperatura'];

export function LecturasForm() {
  const { createLectura, toast } = useContext(LecturasContext);
  const navigate = useNavigate();

  const [fechaHora, setFechaHora] = useState(null);
  const [medidor, setMedidor] = useState(null);
  const [direccion, setDireccion] = useState('');
  const [valor, setValor] = useState(null);
  const [tipoMedida, setTipoMedida] = useState(null);

  const handleRegistro = () => {
    let errors = [];
    if (!fechaHora) errors.push("Fecha y Hora");
    if (!medidor) errors.push("Medidor");
    if (!direccion || direccion.trim() === '' || direccion === '<p><br></p>') errors.push("Dirección");
    if (!valor) errors.push("Valor");
    if (!tipoMedida) errors.push("Tipo de Medida");

    if (errors.length > 0) {
      toast.current.show({
        severity: "warn",
        summary: "Datos inválidos",
        detail: "Por favor complete todos los campos requeridos correctamente."
      });
      return;
    }

    const newLectura = {
      id: Date.now(),
      fechaHora: fechaHora.toISOString(),
      medidor,
      direccion,
      valor,
      tipoMedida
    }
    createLectura(newLectura);
    toast.current.show({ severity: "success", summary: "Lectura registrada exitosamente" });
    navigate('/mediciones');
  }

  return (
    <div className="container-fluid">
      <Card title="Registrar Lectura" className="mb-3">
        <div className="mb-3 d-flex flex-column">
          <label htmlFor="fecha-hora" className="form-label">Fecha y Hora</label>
          <Calendar
            id="fecha-hora"
            value={fechaHora}
            onChange={(e) => setFechaHora(e.value)}
            showTime
            dateFormat="dd-mm-yy"
            hourFormat="24"
            showIcon
            placeholder="dd-mm-yyyy HH:mm"
          />
        </div>

        <div className="mb-3 d-flex flex-column">
          <label htmlFor="medidor" className="form-label">Medidor</label>
          <Dropdown
            id="medidor"
            value={medidor}
            onChange={(e) => setMedidor(e.value)}
            options={medidores}
            optionLabel="label"
            placeholder="Seleccione un medidor"
            className="w-full"
          />
        </div>

        <div className="mb-3 d-flex flex-column">
          <label htmlFor="direccion" className="form-label">Dirección</label>
          <Editor
            id="direccion"
            value={direccion}
            onTextChange={(e) => setDireccion(e.htmlValue)}
            style={{ height: '200px' }}
            placeholder="Ingrese la dirección completa"
          />
        </div>

        <div className="mb-3 d-flex flex-column">
          <label htmlFor="valor" className="form-label">Valor</label>
          <InputNumber
            id="valor"
            value={valor}
            onValueChange={(e) => setValor(e.value)}
            min={1}
            max={500}
            showButtons
            placeholder="1 - 500"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Tipo de Medida</label>
          <div className="d-flex gap-3 mt-2">
            {tiposMedida.map((tipo) => {
              return (
                <div key={tipo}>
                  <RadioButton
                    inputId={tipo}
                    name="tipoMedida"
                    value={tipo}
                    onChange={(e) => setTipoMedida(e.value)}
                    checked={tipoMedida === tipo}
                  />
                  <label htmlFor={tipo}>{tipo}</label>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-3">
          <Button
            severity='success'
            label='Registrar'
            icon="pi pi-check"
            onClick={handleRegistro}
          />
        </div>

      </Card>
    </div>
  )
}
