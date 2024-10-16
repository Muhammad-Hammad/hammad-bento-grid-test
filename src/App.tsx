import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import BentoGrid from "./components/BentoGrid/BentoGrid";
import Banner from "./components/Banner/Banner";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <Banner />
        <BentoGrid />
      </main>
    </div>
  );
};

export default App;
