import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../pages/Error";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error:", error);
    console.error("Error Info:", info);
  }

  handleNavigateHome = () => {
    const navigate = useNavigate();
    navigate("/");
  };

  render() {
    if (this.state.hasError) {
      return <Error onNavigateHome={this.handleNavigateHome} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
