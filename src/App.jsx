import { LecturasContainer } from './containers/LecturasContainer'
import { LecturasForm } from './components/LecturasForm'
import { LecturasTable } from './components/LecturasTable'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LecturasContainer />}>
          <Route index element={<LecturasForm />} />
          <Route path="mediciones" element={<LecturasTable />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
