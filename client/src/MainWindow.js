import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import UserProfile from "./UserProfile";
import VolunteerActivities from "./VolunteerActivities";
// import AllVolunteers from "./AllVolunteers";
import OurTeam from "./OurTeam";
// import CookieTest from "./CookieTest";

function MainWindow({ user, setUser, handleLogoutClick }) {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          path="/user/"
          element={
            <UserProfile
              user={user}
              setUser={setUser}
              handleLogoutClick={handleLogoutClick}
            />
          }
        />
        <Route
          path="/activities/"
          element={<VolunteerActivities user={user} />}
        />
        <Route path="/volunteers/" element={<OurTeam />} />
        {/* <Route path="/cookietest/" element={<CookieTest />} /> */}
      </Routes>
    </>
  );
}

export default MainWindow;
