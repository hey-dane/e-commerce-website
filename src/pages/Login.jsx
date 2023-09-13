import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";

export default function LoginForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username.trim() || !formData.password.trim()) {
      setErrorMessage("Please enter a valid username and password.");
      return;
    }

    setErrorMessage("");

    try {
      // Call the login function from AuthContext to authenticate the user
      await login(formData.username, formData.password);
      navigate("/");
    } catch (error) {
      console.error("An error occurred during login:", error);
      setErrorMessage("An error occurred during login. Please try again.");
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
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                    alt="login form"
                    className="img-fluid"
                  />
                </div>
                <div className="col-md-6">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleLoginSubmit}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <span className="h1 fw-bold mb-0">
                          {" "}
                          <img
                            src="https://placehold.co/200x100/FFF/9A616D/?text=shop."
                            alt="Logo"
                          />
                        </span>
                      </div>
                      <h5
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Sign into your account
                      </h5>
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
                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="submit"
                        >
                          Login
                        </button>
                      </div>
                      <p id="userNotFoundMessage" style={{ color: "red" }}>
                        {errorMessage}
                      </p>

                      <a className="small text-muted" href="#!">
                        Forgot password?
                      </a>
                      <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                        Don't have an account?{" "}
                        <a href="#!" style={{ color: "#393f81" }}>
                          Register here.
                        </a>
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
