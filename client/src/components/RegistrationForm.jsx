import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../context/Auth/AuthActions";
export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",

    email: "",
    name: { firstname: "", lastname: "" },
    address: {
      city: "",
      street: "",
      number: "",
      zipcode: "",
      geolocation: { lat: "", long: "" },
    },
    phone: "",
  });

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  // Modify the handleInputChange function to include logic for formatting phone numbers
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the changed input is the phone input
    if (name === "phone") {
      let val = value.replace(/\D/g, ""); // Remove all non-numeric characters

      // Format the string as phone number
      if (val.length > 6)
        val = `(${val.substring(0, 3)}) ${val.substring(3, 6)}-${val.substring(
          6
        )}`;
      else if (val.length > 3)
        val = `(${val.substring(0, 3)}) ${val.substring(3)}`;
      else if (val.length > 0) val = `(${val}`;

      setFormData({ ...formData, [name]: val });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    console.log("handleRegistrationSubmit Called", formData);

    const { username, password, email, name, address, confirmPassword } =
      formData;

    const isEmpty = (field) => !field.trim();
    const isInvalidPassword = password !== confirmPassword;

    if (isEmpty(username) || isEmpty(password) || isEmpty(email)) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (
      password.length < 8 ||
      !/\d/.test(password) ||
      !/[!@#$%^&*]/.test(password)
    ) {
      setErrorMessage(
        "Password must be at least 8 characters long, contain a number and a special character."
      );
      return;
    }

    if (
      password.length < 8 ||
      !/\d/.test(password) ||
      !/[!@#$%^&*]/.test(password)
    ) {
      setErrorMessage(
        "Password must be at least 8 characters long, contain a number and a special character."
      );
      return;
    }
    if (isEmpty(name.firstname) || isEmpty(name.lastname)) {
      setErrorMessage("Please fill in both first and last name.");
      return;
    }

    const { city, street, zipcode } = address;

    if (isEmpty(city) || isEmpty(street) || isEmpty(zipcode)) {
      setErrorMessage(
        "Please fill in the complete address excluding unit/number."
      );
      return;
    }

    if (isInvalidPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setErrorMessage("");
    try {
      const response = await registerUser(formData);

      if (response && response.id) {
        navigate(`/login`);
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage(
        "An error occurred during registration. Please try again."
      );
    }
  };

  const handleNestedInputChange = (e, parent) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [parent]: {
          ...prevState[parent],
          [name]: value,
        },
      };
    });
  };

  return (
    <section
      className="vh-auto registerpage"
      style={{ backgroundColor: "var(--color-secondarybackground)" }}
    >
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-md-10 col-lg-8">
            <div
              className="card mt-5 mb-5"
              style={{
                borderRadius: "1rem",
                borderColor: "var(--color-border)",
              }}
            >
              <div className="column g-0">
                <div className="col-md-6 d-none d-md-block">
                  <img
                    src="https://placehold.co/200x100/FFF/3c1642/?text=shop."
                    alt="Logo"
                    style={{ borderRadius: "1rem" }}
                  />
                </div>
                <div className="col">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleRegistrationSubmit}>
                      <div
                        className="form-outline mb-2"
                        style={{ maxWidth: "300px", margin: "0 auto" }}
                      >
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
                      <div
                        className="form-outline mb-2"
                        style={{ maxWidth: "300px", margin: "0 auto" }}
                      >
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
                      <div
                        className="form-outline mb-4"
                        style={{ maxWidth: "300px", margin: "0 auto" }}
                      >
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
                      <hr
                        className="my-4"
                        style={{ borderColor: "#3c1642", borderWidth: "2px" }}
                      />

                      <div className="form-outline mb-2">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-2">
                          <label htmlFor="firstname" className="form-label">
                            First Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="firstname"
                            name="firstname"
                            value={formData.name.firstname}
                            onChange={(e) => handleNestedInputChange(e, "name")}
                          />
                        </div>

                        <div className="col-md-6 mb-4">
                          <label htmlFor="lastname" className="form-label">
                            Last Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastname"
                            name="lastname"
                            value={formData.name.lastname}
                            onChange={(e) => handleNestedInputChange(e, "name")}
                          />
                        </div>
                      </div>
                      <div className="form-outline mb-2">
                        <label htmlFor="city" className="form-label">
                          City
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="city"
                          name="city"
                          value={formData.address.city}
                          onChange={(e) =>
                            handleNestedInputChange(e, "address")
                          }
                        />
                      </div>
                      <div className="form-outline mb-2">
                        <label htmlFor="street" className="form-label">
                          Street Address
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="street"
                          name="street"
                          value={formData.address.street}
                          onChange={(e) =>
                            handleNestedInputChange(e, "address")
                          }
                        />
                      </div>
                      <div className="row mb-4">
                        <div className="col-md-4">
                          <div className="form-outline">
                            <label htmlFor="number" className="form-label">
                              Unit
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="number"
                              name="number"
                              value={formData.address.number}
                              onChange={(e) =>
                                handleNestedInputChange(e, "address")
                              }
                            />
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div
                            className="form-outline"
                            style={{
                              maxWidth: "80px",
                              marginLeft: "20px",
                              marginRight: "auto",
                            }}
                          >
                            <label htmlFor="zipcode" className="form-label">
                              Zipcode
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="zipcode"
                              name="zipcode"
                              value={formData.address.zipcode}
                              onChange={(e) => {
                                if (/^\d{0,5}$/.test(e.target.value)) {
                                  handleNestedInputChange(e, "address");
                                }
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div
                            className="form-outline"
                            style={{ maxWidth: "200px", marginLeft: "auto" }}
                          >
                            <label htmlFor="phone" className="form-label">
                              Phone
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="(123) 456-7890"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-lg btn-block custom-button "
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
