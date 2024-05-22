import './App.css'
import { Pagos } from './pages/Pagos/Pagos'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {


  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Pagos/>
      </LocalizationProvider>
    </>
  )
}

export default App
