import React from 'react';
import './Pages.css';

const Robot = () => {
  return (
    <div className="page robot-page">
      <h1>로봇 시스템 🦾</h1>
      <div className="robot-content">
        <div className="robot-section">
          <h2>두산로봇 A0509</h2>
          <div className="robot-details">
            <h3>사양 및 특징</h3>
            <ul>
              <li>페이로드: 5kg</li>
              <li>작업 반경: 900mm</li>
              <li>반복 정밀도: ±0.03mm</li>
              <li>6축 관절 구조</li>
            </ul>
          </div>
        </div>

        <div className="robot-section">
          <h2>제어 시스템</h2>
          <div className="robot-details">
            <h3>로봇 제어 인터페이스</h3>
            <ul>
              <li>실시간 모션 제어</li>
              <li>TCP/IP 기반 통신</li>
              <li>안전 모니터링 시스템</li>
              <li>직관적인 티칭 인터페이스</li>
            </ul>
          </div>
        </div>

        <div className="robot-section">
          <h2>End-Effector</h2>
          <div className="robot-details">
            <h3>그리퍼 시스템</h3>
            <ul>
              <li>다양한 객체 파지 가능</li>
              <li>힘 제어 기능</li>
              <li>빠른 응답 속도</li>
              <li>높은 신뢰성</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Robot; 