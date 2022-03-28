import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import { createContext } from "react";
import Marking from "./components/Teacher/Marking";
import TeacherSchedule from "./components/Teacher/TeacherSchedule";
import AssignedCourse from "./components/Teacher/AssignedCourse";
import Result from "./components/Student/Result";
import Schedule from "./components/Student/Schedule";
import SelectCourse from "./components/Student/SelectCourse";
import ShowCourse from "./components/Admin/ShowCourse";
import ShowStudent from "./components/Admin/ShowStudent";
import ShowTeacher from "./components/Admin/ShowTeacher";
import CreateStudent from "./components/Admin/CreateStudent";
import CreateTeacher from "./components/Admin/CreateTeacher";
import CreateCourse from "./components/Admin/CreateCourse";
import TeacherDash from "./Dashboard/TeacherDash";
import AdminDash from "./Dashboard/AdminDash";
import StuDash from "./Dashboard/StuDash";
import useLocalStorageState from "use-local-storage-state";

export const ProfileContext = createContext([]);

function App() {
  // const getStoredData = () => {
  //   const exists = useLocalStorageState
  // }
  const [signedInUser, setSignedInUser] = useLocalStorageState("signedInUser", []);
  // const [] = useLocalStorageState
  return (
    <ProfileContext.Provider value={[signedInUser, setSignedInUser]}>
      
      <Router>
        <Routes>
        <Route path='/dashboard/student' element={<StuDash />}/>
          <Route path='/dashboard/admin' element={<AdminDash />}/>
          <Route path='/dashboard/teacher' element={<TeacherDash />}/>
          <Route path='/dashboard/admin/createCourse' element={<CreateCourse />}/>
          <Route path='/dashboard/admin/createTeacher' element={<CreateTeacher />}/>
          <Route path='/dashboard/admin/createStudent' element={<CreateStudent />}/>
          <Route path='/dashboard/admin/showTeacher' element={<ShowTeacher />}/>
          <Route path='/dashboard/admin/showStudent' element={<ShowStudent />}/>
          <Route path='/dashboard/admin/showCourse' element={<ShowCourse />}/>
          <Route path='/dashboard/student/selectCourse' element={<SelectCourse />}/>
          <Route path='/dashboard/student/schedule' element={<Schedule />}/>
          <Route path='/dashboard/student/result' element={<Result />}/>
          <Route path='/dashboard/teacher/assignedCourse' element={<AssignedCourse />}/>
          <Route path='/dashboard/teacher/schedule' element={<TeacherSchedule />}/>
          <Route path='/dashboard/teacher/marking' element={<Marking />}/>
          <Route path='/login' element={<Home />}/>
          <Route path='/' element={<Home />}/>
        </Routes>
      </Router>
    </ProfileContext.Provider>
  );
}

export default App;
