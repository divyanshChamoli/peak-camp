import { Route, Routes } from "react-router-dom";
import IntroductionPage from "./Pages/IntroductionPage";
import HomePage from "./Pages/HomePage";
import ErrorPage from "./Pages/ErrorPage";
import AllUsers from "./Pages/AllUsers";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import ProfilePage from "./Pages/ProfilePage";
import UpdateProfile from "./Pages/UpdateProfile";
import CreateCampground from "./Pages/CreateCampground";
import EnterCamp from "./Pages/EnterCamp";
import CreateReview from "./Pages/CreateReview";
import UpdateCampground from "./Pages/UpdateCampground";
import RequireAuth from "./Components/RequireAuth";

function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<IntroductionPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/allusers" element={<AllUsers />} />
      <Route path="/entercamp/:campId" element={<EnterCamp />} />

      {/* private routes */}
      <Route path="/" element={<RequireAuth />}>
        <Route path="/createcamp" element={<CreateCampground />} />
        <Route path="/createreview/:campId" element={<CreateReview />} />
        <Route path="/edit/:campId" element={<UpdateCampground />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/updateprofile" element={<UpdateProfile />} />
      </Route>

      {/* catch error */}
      <Route path="/error" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
