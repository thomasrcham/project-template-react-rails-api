import { useState } from "react";
import LoginForm from "./LoginForm";
import UserCard from "./UserCard";
import UserUpdateCard from "./UserUpdateCard";

function UserProfile({ user, setUser, handleLogoutClick }) {
  const [needsUpdate, setNeedsUpdate] = useState(0);
  const [displayUser, setDisplayUser] = useState(null);

  const display = user ? (
    needsUpdate === 1 ? (
      <UserUpdateCard
        user={user}
        handleLogoutClick={handleLogoutClick}
        setNeedsUpdate={setNeedsUpdate}
        displayUser={displayUser}
        setDisplayUser={setDisplayUser}
      />
    ) : (
      <UserCard
        user={user}
        handleLogoutClick={handleLogoutClick}
        setNeedsUpdate={setNeedsUpdate}
        displayUser={displayUser}
        setDisplayUser={setDisplayUser}
      />
    )
  ) : (
    <LoginForm setUser={setUser} user={user} />
  );

  return <>{display}</>;
}

export default UserProfile;
