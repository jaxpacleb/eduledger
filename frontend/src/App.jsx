import TeacherDashboard from './views/TeacherDashboard'
import StudentDashboard from './views/StudentDashboard'
import { RegistrarDashboard } from './views/RegistrarDashboard'
import OverFlow from './OverFlow'
import { GradeEditorPanel } from './views/GradeEditorPanel'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Form from './views/Form'     
import DocumentScanner from './views/Test'
import UseRefSample from './Sample'
import SmartScanner from './views/SmartScanner.jsx'

function App() {

  return (
    <div className='lg:w-full'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SmartScanner />} />
          <Route path='/student-dashboard' element={<StudentDashboard />} />
          <Route path='/registrar-dashboard' element={<RegistrarDashboard />} />
          <Route path='/grade-editor' element={<GradeEditorPanel />} />
          <Route path='/teacher-dashboard' element={<TeacherDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App 
