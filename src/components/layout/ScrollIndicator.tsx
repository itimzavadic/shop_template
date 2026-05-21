'use client';

import { useEffect, useState } from 'react';

export function ScrollIndicator() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;

      // Show after 10% scroll, hide near bottom
      setVisible(scrollPercent > 0.1 && scrollPercent < 0.95);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })}
      className="scroll-indicator"
      aria-label="Scroll to bottom"
    />
  );
}