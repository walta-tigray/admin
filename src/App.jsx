import './App.css'
import '@tremor/react/dist/esm/tremor.css';
import LayoutApp from './scenes/global/LayoutApp';
import Users from './scenes/users/Users';
import Employees from './scenes/empoyees/Employees';
import Reports from './scenes/reports/Reports';
import Login from './scenes/login/Login';
import { Route, Routes } from 'react-router-dom';
import { Dashboard } from '@mui/icons-material';
import NotFound from './scenes/sessions/NotFound';
import Unauthorized from './scenes/unauthorized/Unauthorized';
import RequireAuth from './context/RequireAuth';
import AddNewEmployee from './scenes/empoyees/AddNewEmployee';

function App() {

  return (
    <>
      <div className="app">
        <Routes>
          {/* <Route element={[<LayoutApp />, <RequireAuth allowedRoles={["admin", "emp"]} />]}> */}
          <Route element={[<LayoutApp />, <RequireAuth />]}>
            <Route path='/' element={<Dashboard />} />
            <Route path='/users' element={<Users />} />
            <Route path='/reports' element={<Reports />} />
            <Route path='/employees' element={<Employees />} />
            <Route path='/add_employee' element={<AddNewEmployee />} />
          </Route>
          <Route element={[<LayoutApp />]}>
            <Route path='/unauthorized' element={[<Unauthorized />]} />
          </Route>

          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </>
  )
}

export default App