'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

export default function Reveal({ children, index = 0, as: Tag = 'div', className = '', ...rest }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [failsafe, setFailsafe] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setFailsafe(true), 5000);
    return () => clearTimeout(t);
  }, []);

  const shown = reduced || inView || failsafe;

  return (
    <Tag
      ref={ref}
      data-reveal
      data-testid="reveal"
      data-in={shown ? 'true' : 'false'}
      className={className}
      style={{ '--stagger-index': index }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
