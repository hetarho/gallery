'use client';

import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useState } from 'react';

function Page1() {
  return (
    <div>
      <motion.div
        layoutId="shared-element"
        style={{ width: 100, height: 100, backgroundColor: 'red' }}
      />
    </div>
  );
}

// 두 번째 페이지
function Page2() {
  return (
    <div>
      <motion.div
        layoutId="shared-element"
        style={{
          width: 200,
          height: 200,
          backgroundColor: 'blue',
          borderRadius: 50,
        }}
      />
    </div>
  );
} // 공통 부모
export default function App() {
  const [page, setPage] = useState(1);

  return (
    <LayoutGroup>
      <AnimatePresence mode="wait">
        <button onClick={() => setPage(1)} key={1}>
          Page1
        </button>
        <button onClick={() => setPage(2)} key={2}>
          Page2
        </button>
        {page === 1 ? <Page1 /> : <Page2 />}
      </AnimatePresence>
    </LayoutGroup>
  );
}
