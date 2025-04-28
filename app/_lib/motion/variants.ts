import { Variants } from 'framer-motion';

// 기본 전환 설정
export const defaultTransition = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 40,
  mass: 1,
};

// 부드러운 전환 설정 (긴 애니메이션)
export const smoothTransition = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
  mass: 1.2,
};

// ============ 이징 함수 ============

// 요소 등장(fade-in)에 적합한 감속(ease-out) 이징
export const easeOut = [0, 0, 0.2, 1];

// 요소 퇴장(fade-out)에 적합한 가속(ease-in) 이징
export const easeIn = [0.4, 0, 1, 1];

// 상태 전환에 적합한 가속-감속(ease-in-out) 이징
export const easeInOut = [0.4, 0, 0.2, 1];

// ============ 페이드 애니메이션 ============

// 페이드인 (요소 등장)
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3, // 300ms
      ease: easeOut,
    },
  },
};

// 페이드인 (아래에서 위로)
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: easeOut,
    },
  },
};

// 페이드인 (위에서 아래로)
export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: easeOut,
    },
  },
};

// 페이드인 (왼쪽에서 오른쪽으로)
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: easeOut,
    },
  },
};

// 페이드인 (오른쪽에서 왼쪽으로)
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: easeOut,
    },
  },
};

// 페이드아웃 (요소 퇴장)
export const fadeOut: Variants = {
  visible: { opacity: 1 },
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.2, // 200ms
      ease: easeIn,
    },
  },
};

// ============ 스케일 애니메이션 ============

// 스케일인 (작게 시작해서 커짐)
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: easeOut,
    },
  },
};

// 스케일아웃 (정상 크기에서 작아짐)
export const scaleOut: Variants = {
  visible: { opacity: 1, scale: 1 },
  hidden: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2,
      ease: easeIn,
    },
  },
};

// ============ 버튼 애니메이션 ============

// 버튼 클릭 피드백
export const buttonTap: Variants = {
  rest: { scale: 1 },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.15, // 150ms
      ease: easeOut,
    },
  },
};

// 버튼 호버 효과
export const buttonHover: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: easeOut,
    },
  },
};

// ============ 로딩 애니메이션 ============

// 스피너 (무한 회전)
export const spinner: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// 펄스 (크기 변화)
export const pulse: Variants = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: easeInOut,
    },
  },
};

// ============ 스크롤 애니메이션 ============

// 스크롤 시 페이드인
export const scrollFadeIn: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4, // 400ms
      ease: easeInOut,
    },
  },
};

// 스태거 효과 (자식 요소들 순차적 등장)
export const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// 스태거 자식 요소
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: easeOut,
    },
  },
};

// ============ 페이지 전환 애니메이션 ============

export const pageVariants: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: easeIn,
      when: 'afterChildren',
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: easeOut,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
};
