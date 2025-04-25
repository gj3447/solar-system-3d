import React from 'react';
import './Pages.css';

const About = () => {
  return (
    <div className="page about-page">
      <h1>Stigma Lab 소개 🔬</h1>
      <div className="about-content">
        <div className="about-section">
          <h2>연구실 소개</h2>
          <p>
            Stigma Lab은 로보틱스와 컴퓨터 비전 기술을 융합하여 지능형 로봇 시스템을 연구하는 연구실입니다.
            특히 Bin-Picking 문제 해결을 위한 혁신적인 솔루션 개발에 중점을 두고 있습니다.
          </p>
        </div>

        <div className="about-section">
          <h2>핵심 기술</h2>
          <ul className="tech-list">
            <li>Intel RealSense D435i를 활용한 3D 비전 시스템</li>
            <li>PyRealSense2 기반 실시간 데이터 처리</li>
            <li>두산로봇 A0509 제어 시스템</li>
            <li>딥러닝 기반 객체 인식</li>
            <li>실시간 로봇 제어 알고리즘</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>연구 목표</h2>
          <ul className="feature-list">
            <li>산업용 로봇의 자율성 향상</li>
            <li>실시간 3D 비전 처리 기술 개발</li>
            <li>효율적인 Bin-Picking 솔루션 구현</li>
            <li>로봇-비전 시스템 통합 최적화</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About; 