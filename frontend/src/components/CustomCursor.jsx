import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Center the custom cursors
    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });
    gsap.set(followerRef.current, { xPercent: -50, yPercent: -50 });

    // Ensure they don't appear in the top-left before the first mousemove
    gsap.set([cursorRef.current, followerRef.current], { opacity: 0 });

    const xToCursor = gsap.quickTo(cursorRef.current, 'x', { duration: 0, ease: 'none' });
    const yToCursor = gsap.quickTo(cursorRef.current, 'y', { duration: 0, ease: 'none' });

    const xToFollower = gsap.quickTo(followerRef.current, 'x', { duration: 0.6, ease: 'power3.out' });
    const yToFollower = gsap.quickTo(followerRef.current, 'y', { duration: 0.6, ease: 'power3.out' });

    let hasMoved = false;

    const mouseMove = (e) => {
      if (!hasMoved) {
        gsap.to([cursorRef.current, followerRef.current], { opacity: 1, duration: 0.3 });
        hasMoved = true;
      }
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToFollower(e.clientX);
      yToFollower(e.clientY);
    };

    window.addEventListener('mousemove', mouseMove);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('heading-display') ||
        target.classList.contains('text-gradient') ||
        target.classList.contains('hero-word')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  useEffect(() => {
    if (isHovering) {
      gsap.to(followerRef.current, {
        scale: 2.2,
        background: 'rgba(255, 255, 255, 0.1)',
        borderColor: 'rgba(255, 255, 255, 0)',
        backdropFilter: 'blur(4px) invert(1)',
        duration: 0.4,
        ease: 'power3.out'
      });
      gsap.to(cursorRef.current, { scale: 0, duration: 0.2 });
    } else {
      gsap.to(followerRef.current, {
        scale: 1,
        background: 'transparent',
        borderColor: 'var(--accent-light)',
        backdropFilter: 'blur(0px) invert(0)',
        duration: 0.4,
        ease: 'power3.out'
      });
      gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
    }
  }, [isHovering]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '8px', height: '8px',
          background: '#fff',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference'
        }}
      />
      <div
        ref={followerRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '40px', height: '40px',
          border: '1px solid var(--accent-light)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      />
    </>
  );
};


export default CustomCursor;
