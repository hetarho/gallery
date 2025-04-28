# UI 애니메이션 최적화 가이드

## 개요
이 문서는 사용자 경험을 향상시키기 위한 UI 애니메이션 최적화 방법과 motion.js를 활용한 구현 가이드라인을 제공합니다.

## 애니메이션 최적화 연구 및 근거

### 애니메이션 타이밍
- **Nielsen Norman Group 연구**: UI 애니메이션의 최적 지속 시간은 200-500ms입니다. 이 범위는 사용자가 변화를 인지하기에 충분하면서도 지연감을 느끼지 않는 시간입니다.[^1]
- **Google의 연구**: 100ms 미만의 반응은 즉각적으로 느껴지며, 100-300ms는 약간의 지연으로, 1초 이상은 집중이 끊기는 지연으로 인식됩니다.[^2]
- **Microsoft Guidelines**: 피드백 애니메이션은 150-200ms, 전환 애니메이션은 200-300ms, 중요 상태 변화는 300-400ms 범위를 권장합니다.[^3]

### 이징 함수(Easing Functions)
- **자연스러운 움직임**: 현실 세계의 물체는 선형으로 움직이지 않습니다. 가속과 감속이 있는 움직임이 더 자연스럽게 느껴집니다.
- **Disney의 애니메이션 원칙**: "ease in and ease out" 원칙은 움직임의 시작과 끝에서 속도 변화가 있어야 한다고 강조합니다.[^4]
- **Penner Equations**: Robert Penner의 이징 방정식은 애니메이션에 물리적 특성을 부여하는 수학적 기반을 제공합니다.[^5]

### 권장되는 이징 함수
1. **ease-out(감속)**: 빠르게 시작했다가 느려지는 패턴. 요소 등장에 적합(fade-in)
   - `cubic-bezier(0, 0, 0.2, 1)`
2. **ease-in(가속)**: 천천히 시작해서 빨라지는 패턴. 요소 퇴장에 적합(fade-out)
   - `cubic-bezier(0.4, 0, 1, 1)`
3. **ease-in-out(가속-감속)**: 천천히 시작, 빨라졌다가 다시 느려지는 패턴. 상태 전환에 적합
   - `cubic-bezier(0.4, 0, 0.2, 1)`

### 애니메이션 유형별 최적 설정
| 애니메이션 유형 | 권장 시간 | 권장 이징 | 목적 |
|-------------|---------|---------|------|
| 버튼 클릭 피드백 | 100-200ms | ease-out | 즉각적인 반응 인식 |
| 요소 fade-in | 200-300ms | ease-out | 자연스러운 등장 |
| 요소 fade-out | 150-250ms | ease-in | 방해되지 않는 퇴장 |
| 페이지 전환 | 300-500ms | ease-in-out | 문맥 유지와 방향성 제공 |
| 드래그 애니메이션 | 50-100ms | linear 또는 ease-out | 즉각적인 피드백 |

## 개발 가이드라인 (motion.js)

### 기본 설정

```javascript
// 기본 애니메이션 설정
const defaultTransition = {
  type: "spring", // 자연스러운 움직임을 위한 spring 타입
  stiffness: 400, // 강성 (높을수록 빠르게 움직임)
  damping: 40, // 감쇠 (높을수록 진동이 적음)
  mass: 1 // 질량 (높을수록 느리게 움직임)
};

// 페이드인 설정
const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.3, // 300ms
      ease: [0, 0, 0.2, 1] // ease-out
    }
  }
};

// 버튼 클릭 피드백
const buttonFeedbackVariants = {
  tap: { 
    scale: 0.95,
    transition: { 
      duration: 0.15, // 150ms
      ease: [0, 0, 0.2, 1] // ease-out
    }
  }
};
```

### 구현 예시

#### 1. 요소 페이드인

```jsx
import { motion } from 'motion.js';

function FadeInComponent() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
    >
      콘텐츠가 여기에 들어갑니다
    </motion.div>
  );
}
```

#### 2. 버튼 클릭 피드백

```jsx
import { motion } from 'motion.js';

function AnimatedButton({ onClick, children }) {
  return (
    <motion.button
      whileTap="tap"
      variants={buttonFeedbackVariants}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
```

#### 3. 로딩 상태 애니메이션

```jsx
import { motion } from 'motion.js';

function LoadingButton({ isLoading, onClick, children }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap="tap"
      variants={buttonFeedbackVariants}
      disabled={isLoading}
    >
      {isLoading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          ⟳
        </motion.div>
      ) : children}
    </motion.button>
  );
}
```

#### 4. 스크롤에 따른 등장 애니메이션

```jsx
import { motion } from 'motion.js';

function ScrollRevealSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.4, // 400ms
          ease: [0.4, 0, 0.2, 1] // ease-in-out
        }
      }}
      viewport={{ once: true, margin: "-100px" }}
    >
      스크롤 시 나타나는 콘텐츠
    </motion.section>
  );
}
```

### 최적화 팁

1. **퍼포먼스 고려**: transform과 opacity 속성은 GPU 가속을 받으므로 애니메이션에 우선적으로 사용
2. **will-change 활용**: 복잡한 애니메이션은 `will-change` 속성으로 최적화
3. **애니메이션 타이밍 일관성**: 유사한 액션에는 일관된 타이밍과 이징 적용
4. **접근성 고려**: 사용자가 선호하는 경우 애니메이션 축소 옵션 제공(`prefers-reduced-motion` 미디어 쿼리 활용)

---

[^1]: Nielsen Norman Group, "Animation for Attention and Comprehension"
[^2]: Google Developers, "The Science of Speed"
[^3]: Microsoft Design, "Motion Guidelines"
[^4]: Disney's 12 Principles of Animation
[^5]: Robert Penner, "Programming Macromedia Flash MX"
