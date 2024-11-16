import { BrowserRouter,Routes,Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import PrivateRoute from "./components/PrivateRoute"
import Profile from "./pages/Profile"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/"  element={<PrivateRoute><Home/></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
