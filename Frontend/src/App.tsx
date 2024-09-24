import { BrowserRouter, Route, Link, Routes } from "react-router-dom"
import IntroductionPage from "./Pages/IntroductionPage"
import AllCampgrounds from "./Pages/AllCampgrounds"
import AllUsers from "./Pages/AllUsers"
import CreateCampground from "./Pages/CreateCampground"
import CreateReview from "./Pages/CreateReview"
import ErrorPage from "./Pages/ErrorPage"
import HomePage from "./Pages/HomePage"
import ProfilePage from "./Pages/ProfilePage"
import Signin from "./Pages/Signin"
import Signup from "./Pages/Signup"
import UpdateProfile from "./Pages/UpdateProfile"
import ViewCampground from "./Pages/ViewCampground"

function App() {  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IntroductionPage/>}/>
          <Route path="/allcamps" element={<AllCampgrounds/>}/>
          <Route path="/allusers" element={<AllUsers/>}/>
          <Route path="/createcamp" element={<CreateCampground/>}/>
          <Route path="/createreview" element={<CreateReview/>}/>
          <Route path="/error" element={<ErrorPage/>}/>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/updateprofile" element={<UpdateProfile/>}/>
          <Route path="/viewcamp" element={<ViewCampground/>}/>
        </Routes>
      </BrowserRouter>      
    </>
  )
}

export default App
