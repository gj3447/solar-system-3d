import React from 'react';
import './Pages.css';

const AI: React.FC = () => {
  return (
    <div className="page ai-page">
      <h1>인공지능 시스템 🧠</h1>
      
      <section className="ai-section">
        <h2>YOLO (You Only Look Once)</h2>
        <div className="ai-content-box">
          <div className="ai-icon">🎯</div>
          <div className="ai-description">
            <h3>실시간 객체 감지 시스템</h3>
            <p>
              YOLO는 실시간 객체 감지를 위한 최첨단 딥러닝 시스템입니다. 
              우리 연구실에서는 다음과 같은 작업에 활용하고 있습니다:
            </p>
            <ul>
              <li>로봇 작업을 위한 실시간 물체 감지 및 분류</li>
              <li>Bin-picking을 위한 물체 위치 추정</li>
              <li>GPU 가속을 통한 실시간 처리 (30fps 이상)</li>
            </ul>
            <div className="reference-links">
              <a href="https://github.com/ultralytics/yolov5" target="_blank" rel="noopener noreferrer">
                🔗 YOLOv5 GitHub
              </a>
              <a href="https://pjreddie.com/darknet/yolo/" target="_blank" rel="noopener noreferrer">
                🔗 YOLO 공식 사이트
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="ai-section">
        <h2>Anomalib</h2>
        <div className="ai-content-box">
          <div className="ai-icon">🔍</div>
          <div className="ai-description">
            <h3>제품 불량 검출 시스템</h3>
            <p>
              Anomalib은 제품 불량 검출과 이상 행동 감지를 위한 강력한 도구입니다.
              주요 특징은 다음과 같습니다:
            </p>
            <ul>
              <li>히트맵 기반의 불량 위치 시각화</li>
              <li>준지도 학습 방식으로 정상 데이터만으로 학습 가능</li>
              <li>실시간 불량 검출 및 로봇 이상 행동 감지</li>
            </ul>
            <div className="reference-links">
              <a href="https://github.com/openvinotoolkit/anomalib" target="_blank" rel="noopener noreferrer">
                🔗 Anomalib GitHub
              </a>
              <a href="https://openvinotoolkit.github.io/anomalib/" target="_blank" rel="noopener noreferrer">
                🔗 Anomalib 문서
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="ai-section">
        <h2>YCB 객체 탐지</h2>
        <div className="ai-content-box">
          <div className="ai-icon">🎯</div>
          <div className="ai-description">
            <h3>YCB 데이터셋 기반 객체 인식</h3>
            <p>
              YCB(Yale-CMU-Berkeley) 객체 데이터셋을 활용한 로봇 조작용 
              물체 인식 시스템을 구현하고 있습니다:
            </p>
            <ul>
              <li>77개의 일상 생활 물체에 대한 3D 모델 및 물리 속성 활용</li>
              <li>6D 포즈 추정을 통한 정확한 물체 파지 위치 계산</li>
              <li>시뮬레이션 환경에서의 사전 학습 및 실제 환경 적용</li>
            </ul>
            <div className="reference-links">
              <a href="http://www.ycbbenchmarks.com/" target="_blank" rel="noopener noreferrer">
                🔗 YCB 벤치마크 사이트
              </a>
              <a href="https://github.com/yuxng/YCB_Video_toolbox" target="_blank" rel="noopener noreferrer">
                🔗 YCB Video Toolbox
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="ai-section">
        <h2>시스템 통합</h2>
        <div className="ai-content-box">
          <div className="ai-icon">🔄</div>
          <div className="ai-description">
            <h3>AI-로봇 통합 시스템</h3>
            <p>
              YOLO와 Anomalib은 ROS2 기반의 통신 시스템을 통해 로봇 시스템과 
              실시간으로 통합되어 있습니다. 주요 응용 분야는 다음과 같습니다:
            </p>
            <ul>
              <li>스마트 팩토리 자동화</li>
              <li>로봇 기반 품질 검사</li>
              <li>안전한 인간-로봇 협동 작업</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="ai-section">
        <h2>성능 분석</h2>
        <div className="ai-content-box">
          <div className="ai-icon">📊</div>
          <div className="ai-description">
            <h3>시스템 성능 지표</h3>
            <p>
              우리 연구실의 AI 시스템은 다음과 같은 성능 지표를 달성하고 있습니다:
            </p>
            <ul>
              <li>객체 감지 정확도: 95% 이상</li>
              <li>불량 검출 정밀도: 98% 이상</li>
              <li>실시간 처리 속도: 30fps 이상</li>
              <li>시스템 통합 지연 시간: 100ms 이하</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AI; 