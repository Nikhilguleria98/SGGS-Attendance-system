import Navbar from './components/GlobalComp/Navbar'
import { Routes, Route } from 'react-router-dom'
import DashboardLayout from './components/GlobalComp/DashboardLayout'
import HodDashboardPage from './Pages/ADMINpages/HodDashboardPage'
import TeacherHome from './Pages/Teacherspages/TeacherHome'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/hod" element={<DashboardLayout role="hod" />}>
          <Route path="dashboard" element={<HodDashboardPage />} />
        </Route>
        <Route path='/teacherhome' element={<TeacherHome/>}/>
        
        {/* Fallback route */}
        <Route path="/" element={<Navbar />} />
      </Routes>
    </>
  )
}

export default App
