import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const [fullName, setFullName] =
    useState("");

  const [photoUrl, setPhotoUrl] =
    useState("");

  const updateProfileHandler = async () => {
    const token =
      localStorage.getItem("token");

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAhSQQB1pyeICbbnsggAJAKmL0Sox6_8S4",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            idToken: token,
            displayName: fullName,
            photoUrl: photoUrl,
            returnSecureToken: true,
          }),
        }
      );

      const data =
        await response.json();

      console.log(data);

      alert(
        "Profile Updated Successfully"
      );
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
  <div className="profile-container">
    <div className="profile-header">
      <p className="quote">
        Winners never quit, Quitters never win.
      </p>

      <div className="profile-status">
        Your Profile is 64% completed.
        A complete Profile has higher
        chances of landing a job.
        <a href="#">Complete now</a>
      </div>
    </div>

    <div className="contact-section">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Contact Details</h2>

        <button
          className="cancel-btn"
          onClick={() => navigate("/welcome")}
        >
          Cancel
        </button>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Full Name</label>

          <input
            type="text"
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>Profile Photo URL</label>

          <input
            type="text"
            value={photoUrl}
            onChange={(e) =>
              setPhotoUrl(e.target.value)
            }
          />
        </div>
      </div>

      <div className="btn-group">
        <button
          className="update-btn"
          onClick={updateProfileHandler}
        >
          Update
        </button>
      </div>

      <hr />
    </div>
  </div>
);
}

export default Profile;