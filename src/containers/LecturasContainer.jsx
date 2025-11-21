import { useContext } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Toast } from 'primereact/toast'
import { TabMenu } from 'primereact/tabmenu';
import LecturasContext from '../context/LecturasContext.js';

export function LecturasContainer() {
    const { toast } = useContext(LecturasContext);
    const navigate = useNavigate();
    const location = useLocation();

    const items = [
        { label: 'Registrar Lectura', command: () => navigate('/') },
        { label: 'Ver Mediciones', command: () => navigate('/mediciones') }
    ];

    const activeIndex = location.pathname === '/mediciones' ? 1 : 0;

    return (
        <div className="container-fluid py-4">
            <Toast ref={toast}></Toast>

            <div className="mb-4">
                <h1 className="display-5 text-primary">
                    Sanquinta
                </h1>
                <p className="text-muted">Sistema de registro y seguimiento de lecturas de medidores que miden medidas con mediciones para medir</p>
            </div>

            <div className="mb-4">
                <TabMenu model={items} activeIndex={activeIndex} />
            </div>

            <div> {/* lo iba a hacer con un children todo epico pero tah mejor eso */}
                <Outlet />
            </div>
        </div>
    )
}
