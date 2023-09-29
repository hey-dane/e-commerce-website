import React, { useState, useEffect } from "react";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export default function Account() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    street: "",
    number: "",
    city: "",
    zipcode: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setIsLoading(false);

      const { address = {}, phone = "" } = user;
      setFormData({
        street: address.street || "",
        city: address.city || "",
        number: address.number || "",
        zipcode: address.zipcode || "",
        phone: phone,
      });
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  const { name = {}, email = "", username = "" } = user || {};
  const { firstname = "", lastname = "" } = name || {};

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const saveChanges = async () => {
    try {
      const localStorageKey = `userFormData_${user.username}`;
      localStorage.setItem(localStorageKey, JSON.stringify(formData));

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  useEffect(() => {
    const localStorageKey = `userFormData_${user.username}`;
    const savedFormData = localStorage.getItem(localStorageKey);

    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, [user]);

  return (
    <section
      className="vh-100"
      style={{
        backgroundColor: "var(--color-secondarybackground)",
      }}
      id="account"
      aria-label="User Account Profile"
    >
      <div className="container h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-md-10 col-lg-8">
            <div
              className="card rounded border"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div
                className="card-body p-4"
                style={{ color: "var(--color-text)" }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <h1
                    style={{
                      color: "var(--color-accent)",
                      fontFamily: "var(--font-primary)",
                    }}
                  >
                    Welcome, {firstname} {lastname || "Guest"}
                  </h1>
                  <button
                    className="btn"
                    onClick={toggleEdit}
                    style={{
                      borderColor: "var(--color-link)",
                      color: "var(--color-link)",
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </button>
                </div>
                <p
                  style={{
                    color: "var(--color-text)",
                    fontFamily: "var(--font-secondary)",
                  }}
                >
                  Username: {username}
                </p>
                <p
                  style={{
                    color: "var(--color-text)",
                    fontFamily: "var(--font-secondary)",
                  }}
                >
                  Email: {email}
                </p>
                <div className="address mb-3">
                  <h3
                    style={{
                      color: "var(--color-accent)",
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    Address
                  </h3>
                  {isEditing ? (
                    <>
                      <label className="form-label">Street:</label>
                      <input
                        className="form-control mb-2"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        placeholder="Street"
                      />
                      <label className="form-label">Unit:</label>
                      <input
                        className="form-control mb-2"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                        placeholder="Unit"
                      />
                      <label className="form-label">City:</label>
                      <input
                        className="form-control mb-2"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                      />
                      <label className="form-label">Zipcode:</label>
                      <input
                        className="form-control mb-2"
                        name="zipcode"
                        value={formData.zipcode}
                        onChange={handleChange}
                        placeholder="Zipcode"
                      />
                      <label className="form-label">Phone:</label>
                      <input
                        className="form-control mb-2"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                      />
                    </>
                  ) : (
                    <>
                      <p
                        style={{
                          color: "var(--color-text)",
                          fontFamily: "var(--font-secondary)",
                        }}
                      >
                        Street: {formData.street} {formData.number}
                      </p>
                      <p
                        style={{
                          color: "var(--color-text)",
                          fontFamily: "var(--font-secondary)",
                        }}
                      >
                        City: {formData.city}
                      </p>
                      <p
                        style={{
                          color: "var(--color-text)",
                          fontFamily: "var(--font-secondary)",
                        }}
                      >
                        Zipcode: {formData.zipcode}
                      </p>
                      <p
                        style={{
                          color: "var(--color-text)",
                          fontFamily: "var(--font-secondary)",
                        }}
                      >
                        Phone: {formData.phone}
                      </p>
                    </>
                  )}
                </div>
                {isEditing && (
                  <button
                    className="btn"
                    onClick={saveChanges}
                    style={{
                      backgroundColor: "var(--color-accent)",
                      borderColor: "var(--color-accent)",
                    }}
                  >
                    Save Changes
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
