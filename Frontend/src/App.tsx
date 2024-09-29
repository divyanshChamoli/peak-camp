import { BrowserRouter, Route, Link, Routes } from "react-router-dom"
import IntroductionPage from "./Pages/IntroductionPage"
import HomePage from "./Pages/HomePage"
import ErrorPage from "./Pages/ErrorPage"
import AllUsers from "./Pages/AllUsers"
import Signup from "./Pages/Signup"
import Signin from "./Pages/Signin"
import ProfilePage from "./Pages/ProfilePage"
import UpdateProfile from "./Pages/UpdateProfile"
import CreateCampground from "./Pages/CreateCampground"
import EnterCamp from "./Pages/EnterCamp"
import CreateReview from "./Pages/CreateReview"


function App() {  

  return (
    <div className="bg=[#FAEDCD]">
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<IntroductionPage/>}/>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/error" element={<ErrorPage/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/updateprofile" element={<UpdateProfile/>}/>
          <Route path="/allusers" element={<AllUsers/>}/>
          <Route path="/createcamp" element={<CreateCampground/>}/>
          <Route path="/entercamp/:campId" element={<EnterCamp/>}/>
          <Route path="/createreview/:campId" element={<CreateReview/>}/>

        </Routes>
      </BrowserRouter>      
    </div>
  )
}

export default App
