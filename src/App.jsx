import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Admin from "./pages/admin/Admin";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/profile/Profile";
import Loader from "./components/Loader";
import './index.css';
import DoctorForm from "./pages/DoctorForm";
import BookAppointment from "./pages/BookAppointment";

function App() {
 
  return (
    <div>
  
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/apply-doctor" element={<PrivateRoute><DoctorForm /></PrivateRoute>} />
          <Route path="/book-appointment" element={<PrivateRoute><BookAppointment /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
