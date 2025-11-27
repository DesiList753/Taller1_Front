import { Card } from 'primereact/card'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Image } from 'primereact/image'

export function TablaPeliculas({ peliculas, cargando, cargarPeliculas }) {
    const posterBodyTemplate = (rowData) => {
        return (
            <Image
                src={rowData.posterURL}
                alt={rowData.title}
                width="100"
                preview
            />
        )
    }

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl font-bold">Películas Animadas</span>
            <Button
                icon="pi pi-refresh"
                label="Recargar Datos"
                onClick={cargarPeliculas}
                loading={cargando}
                disabled={cargando}
                severity="info"
                raised
            />
        </div>
    )

    return (
        <div className="grid">
            <div className="col-12">
                <Card>
                    <div className="mb-4">
                        <h1 className="text-primary mt-0 mb-2">
                            <i className="pi pi-database mr-2"></i>
                            Implementación
                        </h1>
                    </div>

                    <div className="surface-100 border-round p-3 mb-3">
                        <div className="flex align-items-center">
                            <i className="pi pi-info-circle text-2xl mr-2"></i>
                            <div>
                                <strong>Total de películas:</strong>
                                <span className="text-blue-900 ml-2 text-xl font-bold">
                                    {peliculas.length}
                                </span>
                            </div>
                        </div>
                    </div>

                    {cargando && !peliculas.length ? (
                        <div className="flex justify-content-center align-items-center min-h-screen">
                            <ProgressSpinner />
                        </div>
                    ) : (
                        <DataTable
                            value={peliculas}
                            header={header}
                            paginator
                            rows={10}
                            rowsPerPageOptions={[5, 10, 25, 50]}
                            stripedRows
                            emptyMessage="No hay datos disponibles. Haga clic en 'Recargar Datos'."
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} películas"
                        >
                            <Column
                                field="id"
                                header="ID"
                                sortable
                            />
                            <Column
                                header="Póster"
                                body={posterBodyTemplate}
                            />
                            <Column
                                field="title"
                                header="Título"
                                sortable
                            />
                            <Column
                                field="imdbId"
                                header="IMDb ID"
                                sortable
                            />
                        </DataTable>
                    )}
                </Card>
            </div>
        </div>
    )
}
