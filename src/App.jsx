import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Register from './components/Register'
import Userlist from './components/Userlist'
import FileUploadForm from './components/FileUploadForm'
import Header from './components/Header'
import PrivateRoute from './components/PivateRoute.jsx'
import AdminRoute from './components/AdminRoute.jsx'


function App() {

  let appRouter=createBrowserRouter([

    {
      path:"/",
      element:<Login/>
    },
    {
      path:"/home",
      element:<PrivateRoute>
      <Header/>
      <Home/>
      </PrivateRoute>
    },
    {
      path:"/register",
      element:<AdminRoute>
      <Header/>
      <Register/>
      </AdminRoute>
    },
    {
      path:"/userlist",
      element: <AdminRoute>
      <Header/>
      <Userlist/>
      </AdminRoute>
      
    },
    {
      path:"/uploadFile",
      element:<PrivateRoute>
      <Header/>
      <FileUploadForm/>
      </PrivateRoute>
    },
  ])
  return (
    <>
    <RouterProvider router={appRouter}/>
   </>
  )
}

export default App
