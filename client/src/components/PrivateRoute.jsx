import {useSelector} from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

export default function PrivateRoute() {
    
    //get the currentUser
    const {currentUser} = useSelector(state => state.user)
  
  //if the current user show the profile page
    return currentUser ? <Outlet/> : <Navigate to='/sign-in'/>
}