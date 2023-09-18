import { toast } from "react-toastify"
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/Auth"

const PrivateRoute = () => {

  const {currentUser} = useAuth()
  console.log(currentUser);

  if(!currentUser) {
    toast.error('Please Login First')
  }

  return currentUser? <Outlet/> : <Navigate to="/login"/>
}

export default PrivateRoute