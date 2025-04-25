import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './TopBar.css';

const TopBar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="topbar">
      <div className="topbar-brand">
        <Link to="/">Stigma Lab</Link>
      </div>
      <div className="topbar-links">
        <Link to="/" className={isActive('/') ? 'active' : ''}>홈</Link>
        <Link to="/research" className={isActive('/research') ? 'active' : ''}>연구</Link>
        <Link to="/robot" className={isActive('/robot') ? 'active' : ''}>로봇</Link>
        <Link to="/ai" className={isActive('/ai') ? 'active' : ''}>AI</Link>
        <Link to="/3d" className={isActive('/3d') ? 'active' : ''}>3D 시각화</Link>
        <Link to="/about" className={isActive('/about') ? 'active' : ''}>소개</Link>
      </div>
    </nav>
  );
};

export default TopBar; 