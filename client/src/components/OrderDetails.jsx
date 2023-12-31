import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function OrderDetails({ addressTypes }) {
  const navigate = useNavigate();

  const addressFields = [
    {
      label: "First Name",
      id: "FirstName",
      placeholder: "John",
      required: true,
    },
    {
      label: "Last Name",
      id: "LastName",
      placeholder: "Smith",
      required: true,
    },
    {
      label: "Street Address",
      id: "StreetAddress",
      placeholder: "123 Main St",
      required: true,
    },
    {
      label: "City",
      id: "City",
      placeholder: "New York",
      required: true,
    },
    {
      label: "State",
      id: "State",
      placeholder: "NY",
      required: true,
      maxLength: "2",
    },
    {
      label: "Zip Code",
      id: "ZipCode",
      placeholder: "12345",
      required: true,
    },
  ];

  OrderDetails.propTypes = {
    addressTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  const handlePaymentButtonClick = () => {
    navigate("/payment");
  };

  return (
    <section className="order-details">
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-10 col-lg-8">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-4 p-lg-5 text-var(--color-text)">
                <h4 className="mb-4" style={{ color: "var(--color-text)" }}>
                  WHERE TO SEND:
                </h4>{" "}
                {/* Header */}
                {addressTypes.map((addressType) => (
                  <div
                    className={`mb-5 card ${addressType.toLowerCase()}-address`}
                    key={addressType}
                  >
                    <div className="card-header">
                      <h4
                        className="mb-0"
                        style={{ color: "var(--color-text)" }}
                      >
                        {addressType}
                      </h4>
                    </div>
                    <div className="card-body">
                      <form noValidate>
                        <div className="row g-3">
                          {addressFields.map((field) => (
                            <div
                              className="col-md-4 mb-3"
                              key={`${addressType}-${field.id}`}
                            >
                              <label
                                htmlFor={`${addressType}-${field.id}`}
                                className="form-label"
                                style={{ color: "var(--color-text)" }}
                              >
                                {field.label}
                              </label>
                              <input
                                id={`${addressType}-${field.id}`}
                                type="text"
                                className="form-control"
                                placeholder={field.placeholder}
                                required={field.required}
                                maxLength={field.maxLength}
                              />
                            </div>
                          ))}
                        </div>
                      </form>
                    </div>
                  </div>
                ))}
                <div className="text-center mt-4">
                  <button
                    className="btn btn-dark btn-lg btn-block custom-button"
                    onClick={handlePaymentButtonClick}
                  >
                    Proceed to Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
