import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";
import RegistrationForm from "../components/RegistrationForm";

export default function LoginForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

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
      await login(formData.username, formData.password);
      navigate("/");
    } catch (error) {
      console.error("An error occurred during login:", error);
      setErrorMessage("An error occurred during login. Please try again.");
    }
  };

  if (showRegistrationForm) {
    return <RegistrationForm />;
  }

  return (
    <section
      className="vh-100"
      style={{
        backgroundColor: "var(--color-secondarybackground)",
      }}
      id="loginpage"
      aria-label="Login Page"
    >
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-md-10 col-lg-8">
            <div
              className="card"
              style={{
                borderRadius: "1rem",
                borderColor: "var(--color-border)",
              }}
              aria-label="Login Card"
            >
              <div className="row g-0">
                <div className="col-md-6 d-none d-md-block">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                    alt="login form"
                    className="img-fluid"
                    id="login-image"
                    style={{
                      height: "100%",
                      borderTopLeftRadius: "1rem",
                      borderBottomLeftRadius: "1rem",
                    }}
                    aria-label="Login Image"
                  />
                </div>

                <div className="col-md-6">
                  <div
                    className="card-body p-4 p-lg-5 text-black"
                    aria-label="Login Form"
                  >
                    <form onSubmit={handleLoginSubmit}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <span className="h1 fw-bold mb-0">
                          <img
                            src="https://placehold.co/200x100/FFF/3c1642/?text=shop."
                            alt="Logo"
                            aria-label="Company Logo"
                          />
                        </span>
                      </div>
                      <h5
                        className="fw-normal mb-3 pb-3"
                        style={{
                          letterSpacing: "1px",
                          color: "var(--color-text)",
                        }}
                        aria-label="Sign in Heading"
                      >
                        Sign into your account
                      </h5>
                      <div className="form-outline mb-4">
                        <label
                          htmlFor="username"
                          className="form-label"
                          style={{ color: "var(--color-text)" }}
                          aria-label="Username Label"
                        >
                          Username
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          aria-label="Username Input"
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <label
                          htmlFor="password"
                          className="form-label"
                          style={{ color: "var(--color-text)" }}
                          aria-label="Password Label"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          aria-label="Password Input"
                        />
                      </div>
                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-lg btn-block custom-button"
                          type="submit"
                          aria-label="Login Button"
                        >
                          Login
                        </button>
                      </div>
                      <p
                        id="userNotFoundMessage"
                        style={{ color: "red" }}
                        aria-label="Error Message"
                      >
                        {errorMessage}
                      </p>

                      <p
                        className="mb-5 pb-lg-2"
                        style={{
                          color: "var(--color-text)",
                          fontWeight: "600",
                        }}
                      >
                        Don't have an account?{" "}
                        <a
                          href="/register"
                          style={{
                            color: "var(--color-accent)",
                            transition: "color 0.3s",
                          }}
                          aria-label="Create Account Link"
                          onMouseEnter={(e) => {
                            e.target.style.color = "#007a99";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.color = "var(--color-accent)";
                          }}
                        >
                          Create an account
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
