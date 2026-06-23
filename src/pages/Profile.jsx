import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { API_KEY } from "../services/firebase";

function Profile() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            idToken: token,
          }),
        }
      );

      const data = await response.json();

      const user = data.users[0];

      setFullName(
        user.displayName || ""
      );

      setPhotoUrl(
        user.photoUrl || ""
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfileHandler =
    async () => {
      const token =
        localStorage.getItem("token");

      try {
        const response =
          await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                idToken: token,
                displayName:
                  fullName,
                photoUrl:
                  photoUrl,
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

        fetchUserDetails();
      } catch (error) {
        console.log(error);

        alert(
          "Something went wrong"
        );
      }
    };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <p className="quote">
          Winners never quit,
          Quitters never win.
        </p>

        <div className="profile-status">
          Your Profile is 64%
          completed.
          <a href="#">
            Complete now
          </a>
        </div>
      </div>

      <div className="contact-section">
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
          }}
        >
          <h2>Contact Details</h2>

          <button
            className="cancel-btn"
            onClick={() =>
              navigate("/welcome")
            }
          >
            Cancel
          </button>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>
              Full Name
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(e) =>
                setFullName(
                  e.target.value
                )
              }
            />
          </div>

          <div className="form-group">
            <label>
              Profile Photo URL
            </label>

            <input
              type="text"
              value={photoUrl}
              onChange={(e) =>
                setPhotoUrl(
                  e.target.value
                )
              }
            />
          </div>
        </div>

        <button
          className="update-btn"
          onClick={
            updateProfileHandler
          }
        >
          Update
        </button>

        <hr />
      </div>
    </div>
  );
}

export default Profile;