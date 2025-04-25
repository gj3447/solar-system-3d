import React from 'react';
import './Pages.css';

const Research = () => {
  return (
    <div className="page research-page">
      <h1>연구 분야 🔬</h1>
      <div className="research-content">
        <div className="research-section">
          <h2>3D 비전 시스템</h2>
          <div className="research-details">
            <h3>Intel RealSense</h3>
            <ul>
              <li>D435i 모델을 활용한 실시간 3D 데이터 획득</li>
              <li>PyRealSense2 라이브러리를 통한 데이터 처리</li>
              <li>포인트 클라우드 데이터 분석 및 객체 인식</li>
              <li>실시간 깊이 정보 처리 및 시각화</li>
            </ul>
          </div>
        </div>
        
        <div className="research-section">
          <h2>Bin-Picking 알고리즘</h2>
          <div className="research-details">
            <h3>객체 인식 및 그래스핑</h3>
            <ul>
              <li>딥러닝 기반 객체 인식 및 포즈 추정</li>
              <li>최적 그래스핑 포인트 계산</li>
              <li>충돌 회피 경로 계획</li>
              <li>실시간 피드백 기반 제어</li>
            </ul>
          </div>
        </div>

        <div className="research-section">
          <h2>시스템 통합</h2>
          <div className="research-details">
            <h3>로봇-비전 시스템 연동</h3>
            <ul>
              <li>RealSense 카메라와 로봇 시스템 캘리브레이션</li>
              <li>실시간 데이터 처리 파이프라인 구축</li>
              <li>로봇 제어 인터페이스 개발</li>
              <li>성능 최적화 및 안정성 향상</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Research; 