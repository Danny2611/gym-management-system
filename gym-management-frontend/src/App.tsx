import React from "react";
import Routes from "./routes/index";
import { BrowserRouter } from "react-router-dom";
import { AuthProviderWithRouter } from "./contexts/AuthContext";

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProviderWithRouter>
          <Routes />
        </AuthProviderWithRouter>
      </BrowserRouter>
    </div>
  );
};

export default App;
