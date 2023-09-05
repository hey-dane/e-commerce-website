import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { registerUser } = useAuth(); // Access the registration function from AuthContext
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.username.trim() ||
      !formData.password.trim() ||
      !formData.confirmPassword.trim()
    ) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setErrorMessage(""); // Clear any previous errors

    try {
      // Call the registration function from AuthContext
      await registerUser(formData.username, formData.password);
      navigate("/login"); // Redirect to the login page after successful registration
    } catch (error) {
      console.error("An error occurred during registration:", error);
      setErrorMessage(
        "An error occurred during registration. Please try again."
      );
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-md-10 col-lg-8">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 d-none d-md-block">
                  {/* Your image */}
                </div>
                <div className="col-md-6">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleRegistrationSubmit}>
                      <div className="form-outline mb-4">
                        <label htmlFor="username" className="form-label">
                          Username
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <label htmlFor="confirmPassword" className="form-label">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="submit"
                        >
                          Register
                        </button>
                      </div>
                      <p id="userNotFoundMessage" style={{ color: "red" }}>
                        {errorMessage && errorMessage}
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
