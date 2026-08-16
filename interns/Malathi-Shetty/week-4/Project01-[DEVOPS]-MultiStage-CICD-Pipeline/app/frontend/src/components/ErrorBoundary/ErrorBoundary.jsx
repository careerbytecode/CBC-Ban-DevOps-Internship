import React from "react";
import "./ErrorBoundary.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Application Error:", error);
    console.error(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="error-boundary">
          <h1>Something went wrong</h1>

          <p>
            An unexpected error occurred.
          </p>

          <button type="button"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;