import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Home from './pages/Home';
import Research from './pages/Research';
import Robot from './pages/Robot';
import AI from './pages/AI';
import About from './pages/About';
import ThreeDPage from './pages/ThreeDPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <TopBar />
        <main className="App-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/research" element={<Research />} />
            <Route path="/robot" element={<Robot />} />
            <Route path="/ai" element={<AI />} />
            <Route path="/about" element={<About />} />
            <Route path="/3d" element={<ThreeDPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
