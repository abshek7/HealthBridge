import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import Loader from "./components/Loader"; 
import './index.css';
import DoctorForm from "./pages/DoctorForm";

function App() {
   const { isLoading } = useSelector((state) => state.loader);  

  return (
    <div>
      {isLoading && <Loader />}  
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>} />
          <Route path='/apply-doctor' element={<PrivateRoute><DoctorForm/></PrivateRoute>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
