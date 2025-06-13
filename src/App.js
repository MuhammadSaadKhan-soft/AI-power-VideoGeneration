import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Marketing from "./pages/Marketing";
import RealEstate from "./pages/RealEstate";

const App = () => (
  <Router>
    <div className="min-vh-100 bg-light">
      <Navigation />
      <main className="container py-5">
        <Routes>
          <Route path="/" element={<Marketing />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/realestate" element={<RealEstate />} />
        </Routes>
      </main>
    </div>
  </Router>
);

const Navigation = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand d-flex flex-column">
          <span className="h4 mb-0 text-primary fw-bold">Google Gemini (Veo3)</span>
          <small className="text-muted">AI-powered video generation</small>
        </Link>

        <div className="d-flex gap-3">
          {path !== "/marketing" && path !== "/" && (
            <Link to="/marketing" className="btn btn-outline-primary">
              Suplimax Marketing
            </Link>
          )}
          {path !== "/realestate" && (
            <Link to="/realestate" className="btn btn-outline-success">
              Real Estate Tour
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default App;
