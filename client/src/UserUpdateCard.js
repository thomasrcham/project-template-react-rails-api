import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

function UserUpdateCard({
  displayUser,
  setDisplayUser,
  user,
  handleLogoutClick,
  setNeedsUpdate,
}) {
  const navigate = useNavigate();
  const [activeSignups, setActiveSignups] = useState(null);
  const [updateUser, setUpdateUser] = useState(null);

  useEffect(() => {
    fetch(`/volunteer/${user.id}`)
      .then((r) => r.json())
      .then((d) => {
        setDisplayUser(d);
        setActiveSignups(d.signups);
        setUpdateUser({
          name: d.name,
          age: d.age,
          email: d.email,
        });
      });
  }, []);

  function handleDelete(id) {
    fetch(`/signups/${id}`, {
      method: "DELETE",
    }).then(() => {
      let newArray = activeSignups.filter((s) => s.id !== id);
      setActiveSignups(newArray);
    });
  }

  let displaySignups = activeSignups ? (
    activeSignups.length > 0 ? (
      activeSignups.map((a) => (
        <p key={a.id}>
          {
            displayUser.activities.find((b) => b.id === a.activity_id)
              .organization
          }
          : {format(new Date(a.dateTime), "MMMM dd, yyyy @ h:mmaaa")}{" "}
          <button onClick={(e) => handleDelete(a.id)}>Cancel?</button>
        </p>
      ))
    ) : (
      <>
        <p>None listed</p>
        <button
          className="btn btn-header"
          onClick={() => navigate(`/activities/`)}
        >
          Why don't you sign up for something?
        </button>
      </>
    )
  ) : null;

  function handleUpdate(e) {
    e.preventDefault();
    fetch(`/update/${displayUser.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: e.target.name.value,
        age: e.target.age.value,
        email: e.target.email.value,
      }),
    })
      .then((r) => r.json())
      .then(console.log);
    setNeedsUpdate(0);
  }

  const display = updateUser ? (
    <div className="container-fluid user-container">
      <div className="row home-row">
        <div className="col-sm-5 user-profile">
          <form onSubmit={(e) => handleUpdate(e)} id="update-form">
            <div className="update-form-row">
              <label htmlFor="Name">Name:</label>
              <input
                type="text"
                id="name"
                value={updateUser.name}
                onChange={(e) =>
                  setUpdateUser({
                    name: e.target.value,
                    age: updateUser.age,
                    email: updateUser.email,
                  })
                }
                className="update-form-box"
              />
            </div>
            <div className="update-form-row">
              <label htmlFor="age">Age:</label>
              <input
                type="text"
                id="age"
                value={updateUser.age}
                className="update-form-box"
                onChange={(e) =>
                  setUpdateUser({
                    name: updateUser.name,
                    age: e.target.value,
                    email: updateUser.email,
                  })
                }
              />
            </div>
            <div className="update-form-row">
              <label htmlFor="password_confirmation">Email:</label>
              <input
                type="text"
                id="email"
                value={updateUser.email}
                className="update-form-box"
                onChange={(e) =>
                  setUpdateUser({
                    name: updateUser.name,
                    age: updateUser.age,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <button type="submit" className="update-form-button">
              Submit Changes
            </button>
          </form>
          <button onClick={() => handleLogoutClick()}>Logout</button>
        </div>
        <div className="col-sm-7 home-text">
          <p className="home-text-title">Active Signups</p>
          <div className="active-signups">{displaySignups}</div>
        </div>
      </div>
    </div>
  ) : null;
  return display;
}

export default UserUpdateCard;
