import React, { ReactNode } from 'react';
import { motion, TargetAndTransition, VariantLabels, AnimationControls } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import './Pages.css';
import aiBrainTech from '../assets/ai-brain-tech.png';
import aiRobot from '../assets/3d-ai-robot.png';
import aiDataTech from '../assets/ai-data-tech.png';
import NetworkGraph from '../components/NetworkGraph';

interface SectionProps {
  children: ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ children, className = '' }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      className={`home-section ${className}`}
    >
      {children}
    </motion.div>
  );
};

const Home: React.FC = () => {
  const [researchRef, researchInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const animationVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="home-container">
      {/* 히어로 섹션 */}
      <Section className="hero-section">
        <div className="hero-background">
          <div className="hero-gradient" />
          <NetworkGraph />
          <div className="gradient-overlay" />
          <div className="tech-circles">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="tech-circle" style={{
                animationDelay: `${i * 0.5}s`,
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`
              }} />
            ))}
          </div>
          <div className="floating-numbers">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="binary-number"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              >
                {Math.random() > 0.5 ? '1' : '0'}
              </div>
            ))}
          </div>
        </div>
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            로봇 시스템 연구실
          </motion.h1>
          <motion.p
            className="hero-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            혁신적인 로봇 기술과 AI 솔루션을 연구하여 미래를 선도합니다
          </motion.p>
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/research" className="hero-button primary">
              연구 분야 살펴보기
            </Link>
            <Link to="/about" className="hero-button secondary">
              연구실 소개
            </Link>
          </motion.div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-arrow" />
          <div className="scroll-text">Scroll to explore</div>
        </div>
      </Section>

      {/* 비전 섹션 */}
      <Section className="vision-section">
        <div className="vision-background">
          <div className="vision-gradient" />
        </div>
        <div className="tech-particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
        <div className="vision-content">
          <h2>우리의 비전</h2>
          <p>로봇 기술과 AI의 융합을 통한 혁신적인 솔루션 개발</p>
          <div className="vision-grid">
            <motion.div
              className="vision-card"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="card-glow" />
              <span className="vision-icon">🎯</span>
              <h3>물체 인식 기술</h3>
              <p>YOLO와 Anomalib을 활용한 고성능 물체 감지 및 이상 탐지 시스템 개발</p>
              <div className="tech-badge">Computer Vision</div>
            </motion.div>
            <motion.div
              className="vision-card"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="card-glow" />
              <span className="vision-icon">🤖</span>
              <h3>로봇 제어</h3>
              <p>정밀한 로봇 제어 시스템과 직관적인 사용자 인터페이스 구현</p>
              <div className="tech-badge">Robotics</div>
            </motion.div>
            <motion.div
              className="vision-card"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="card-glow" />
              <span className="vision-icon">🧠</span>
              <h3>AI 솔루션</h3>
              <p>최신 AI 기술을 활용한 지능형 로봇 시스템 개발</p>
              <div className="tech-badge">Deep Learning</div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* 연구 하이라이트 섹션 */}
      <Section className="research-highlight-section">
        <div className="research-background">
          <div className="research-gradient" />
        </div>
        <div className="circuit-background">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="circuit-line" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${50 + Math.random() * 100}px`,
              transform: `rotate(${Math.random() * 360}deg)`
            }} />
          ))}
        </div>
        <div className="research-content">
          <div className="research-text">
            <h2>주요 연구 분야</h2>
            <p>혁신적인 기술 개발을 통한 미래 로봇 시스템 구현</p>
            <ul className="research-list" ref={researchRef}>
              <motion.li
                initial="hidden"
                animate={researchInView ? "visible" : "hidden"}
                variants={animationVariants}
                transition={{ duration: 0.5 }}
              >
                <div className="research-item">
                  <div className="research-icon">🤖</div>
                  <div className="research-details">
                    <h4>Bin-Picking 솔루션 개발</h4>
                    <p>AI 기반 물체 인식 및 로봇 제어 통합 시스템</p>
                  </div>
                </div>
              </motion.li>
              <motion.li
                initial="hidden"
                animate={researchInView ? "visible" : "hidden"}
                variants={animationVariants}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="research-item">
                  <div className="research-icon">👁️</div>
                  <div className="research-details">
                    <h4>3D 비전 처리 시스템</h4>
                    <p>실시간 3D 객체 인식 및 위치 추정</p>
                  </div>
                </div>
              </motion.li>
              <motion.li
                initial="hidden"
                animate={researchInView ? "visible" : "hidden"}
                variants={animationVariants}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="research-item">
                  <div className="research-icon">⚡</div>
                  <div className="research-details">
                    <h4>실시간 로봇 제어</h4>
                    <p>고성능 로봇 제어 알고리즘 개발</p>
                  </div>
                </div>
              </motion.li>
            </ul>
            <Link to="/research" className="research-link">
              더 알아보기 →
            </Link>
          </div>
          <div className="research-visual">
            <div className="research-image-placeholder">
              <div className="floating-elements">
                <div className="float-element"></div>
                <div className="float-element"></div>
                <div className="float-element"></div>
              </div>
              <div className="tech-diagram">
                <div className="diagram-node central">AI</div>
                <div className="diagram-node">Vision</div>
                <div className="diagram-node">Control</div>
                <div className="diagram-node">Robotics</div>
                <div className="diagram-lines"></div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 기술 섹션 */}
      <Section className="tech-section">
        <div className="tech-background">
          <div className="tech-grid-pattern"></div>
          <div className="tech-glow"></div>
        </div>
        <div className="tech-grid">
          <Link to="/robot" className="tech-card">
            <div className="card-content">
              <div className="tech-icon-wrapper">
                <span className="tech-icon-large">🤖</span>
              </div>
              <h3>로봇 시스템</h3>
              <p>정밀한 로봇 제어와 시스템 통합</p>
              <div className="tech-features">
                <span className="feature-tag">Motion Control</span>
                <span className="feature-tag">System Integration</span>
              </div>
            </div>
            <div className="card-overlay">
              <span className="learn-more">자세히 보기 →</span>
            </div>
          </Link>
          <Link to="/ai" className="tech-card">
            <div className="card-content">
              <div className="tech-icon-wrapper">
                <span className="tech-icon-large">🧠</span>
              </div>
              <h3>AI 시스템</h3>
              <p>YOLO와 Anomalib을 활용한 지능형 시스템</p>
              <div className="tech-features">
                <span className="feature-tag">Deep Learning</span>
                <span className="feature-tag">Computer Vision</span>
              </div>
            </div>
            <div className="card-overlay">
              <span className="learn-more">자세히 보기 →</span>
            </div>
          </Link>
          <Link to="/research" className="tech-card">
            <div className="card-content">
              <div className="tech-icon-wrapper">
                <span className="tech-icon-large">🔬</span>
              </div>
              <h3>연구 분야</h3>
              <p>혁신적인 로봇 기술 연구</p>
              <div className="tech-features">
                <span className="feature-tag">Innovation</span>
                <span className="feature-tag">Research</span>
              </div>
            </div>
            <div className="card-overlay">
              <span className="learn-more">자세히 보기 →</span>
            </div>
          </Link>
        </div>
      </Section>
    </div>
  );
};

export default Home; 