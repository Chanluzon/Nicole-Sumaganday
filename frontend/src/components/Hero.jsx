import React, { useRef } from 'react';
import gsap from 'gsap';
import profileImg from '../assets/un3.png';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const container = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    // Cinematic reveal for the badge
    tl.fromTo('.hero-badge',
      { y: 30, opacity: 0, scale: 0.9, filter: 'blur(10px)' },
      { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, delay: 0.5 }
    );

    // Advanced word staggering with masking
    tl.fromTo('.hero-headline .reveal-text > span',
      { y: '110%', opacity: 0, rotationX: -15 },
      { y: '0%', opacity: 1, rotationX: 0, stagger: 0.1, duration: 1.5, ease: 'power4.out' },
      '-=0.8'
    );


    tl.fromTo('.hero-desc',
      { y: 30, opacity: 0, filter: 'blur(10px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2 },
      '-=1'
    );

    tl.fromTo('.hero-btns > *',
      { y: 20, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 1, ease: 'back.out(1.7)' },
      '-=0.8'
    );

    tl.fromTo('.hero-image-container', {
      scale: 0.9,
      opacity: 0,
      rotationY: 15,
      filter: 'blur(20px)'
    }, {
      scale: 1,
      opacity: 1,
      rotationY: 0,
      filter: 'blur(0px)',
      duration: 1.8,
      ease: 'expo.out'
    }, '-=1.2');

    // Floating animation for orbs
    gsap.to('.hero-orb-1', {
      y: 120, x: 80, rotation: 15, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut'
    });
    gsap.to('.hero-orb-2', {
      y: -120, x: -80, rotation: -15, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut'
    });

  }, { scope: container });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const xPos = (clientX / window.innerWidth - 0.5) * 40;
    const yPos = (clientY / window.innerHeight - 0.5) * 40;

    gsap.to('.hero-image-container', {
      rotationY: xPos / 2,
      rotationX: -yPos / 2,
      transformPerspective: 1000,
      duration: 1.2,
      ease: 'power3.out'
    });

    gsap.to('.hero-image', {
      x: xPos,
      y: yPos,
      duration: 1.5,
      ease: 'power2.out'
    });
  };

  return (
    <section id="home" ref={container} onMouseMove={handleMouseMove} style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '80px 0 40px' /* Reduced padding to fit on load */
    }}>
      {/* Dynamic Background Elements */}
      <div className="hero-orb-1" style={{
        position: 'absolute', top: '5%', left: '-10%', width: '600px', height: '600px',
        background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
        opacity: 0.15, filter: 'blur(80px)', zIndex: -1
      }} />
      <div className="hero-orb-2" style={{
        position: 'absolute', bottom: '5%', right: '-10%', width: '700px', height: '700px',
        background: 'radial-gradient(circle, var(--accent-light) 0%, transparent 70%)',
        opacity: 0.1, filter: 'blur(100px)', zIndex: -1
      }} />

      <div className="container grid-2" style={{ alignItems: 'center' }}>
        <div className="hero-content" style={{ zIndex: 2 }}>
          <div className="hero-badge glass-panel" style={{
            display: 'inline-block',
            padding: '8px 20px',
            borderRadius: '100px',
            marginBottom: '20px', /* Reduced margin */
            fontSize: '0.9rem',
            fontWeight: 700,
            color: 'var(--accent-light)',
            border: '1px solid rgba(253, 164, 175, 0.2)',
            background: 'var(--badge-bg)'
          }}>
            Welcome to my portfolio
          </div>

          <h1 className="hero-headline heading-display" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', marginBottom: '15px', letterSpacing: '-2px' }}>
            <div className="reveal-text" style={{ display: 'inline-block' }}>
              <span className="text-gradient"
                style={{ display: 'inline-block', cursor: 'default', transition: 'var(--transition-smooth)' }}
                onMouseEnter={(e) => gsap.to(e.target, { scale: 1.1, rotation: 2, duration: 0.4, ease: 'back.out(1.7)' })}
                onMouseLeave={(e) => gsap.to(e.target, { scale: 1, rotation: 0, duration: 0.4, ease: 'power2.out' })}
              >Nicole</span>
            </div>{' '}
            <div className="reveal-text" style={{ display: 'inline-block' }}>
              <span className="text-gradient"
                style={{ display: 'inline-block', cursor: 'default', transition: 'var(--transition-smooth)' }}
                onMouseEnter={(e) => gsap.to(e.target, { scale: 1.1, rotation: -2, duration: 0.4, ease: 'back.out(1.7)' })}
                onMouseLeave={(e) => gsap.to(e.target, { scale: 1, rotation: 0, duration: 0.4, ease: 'power2.out' })}
              >Sumaganday</span>
            </div> <br />
            <div className="reveal-text" style={{ display: 'inline-block' }}>
              <span style={{ color: 'var(--text-primary)', display: 'inline-block', cursor: 'default', transition: 'var(--transition-smooth)' }}
                onMouseEnter={(e) => gsap.to(e.target, { scale: 1.1, rotation: 2, duration: 0.4, ease: 'back.out(1.7)' })}
                onMouseLeave={(e) => gsap.to(e.target, { scale: 1, rotation: 0, duration: 0.4, ease: 'power2.out' })}
              ></span>
            </div>{' '}
            <div className="reveal-text" style={{ display: 'inline-block' }}>
              <span style={{ color: 'var(--text-primary)', display: 'inline-block', cursor: 'default', transition: 'var(--transition-smooth)' }}
                onMouseEnter={(e) => gsap.to(e.target, { scale: 1.1, rotation: -2, duration: 0.4, ease: 'back.out(1.7)' })}
                onMouseLeave={(e) => gsap.to(e.target, { scale: 1, rotation: 0, duration: 0.4, ease: 'power2.out' })}
              ></span>
            </div>

          </h1>


          <p className="hero-desc" style={{
            fontSize: 'clamp(1rem, 1.1vw, 1.15rem)',
            color: 'var(--text-secondary)',
            maxWidth: '520px',
            lineHeight: 1.6,
            marginBottom: '35px',
            fontWeight: 400
          }}>
            I am a student midwife passionate about maternal and newborn care. I strive to provide safe, compassionate, and evidence-based care to mothers and infants.
          </p>


          <div className="hero-btns" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <a href="#experience" style={{ textDecoration: 'none' }}>
              <button className="btn-primary">
                Explore Experience
                <span style={{ fontSize: '1.2rem', transition: 'transform 0.3s ease' }}>→</span>
              </button>
            </a>
            <a href="#contact" style={{ textDecoration: 'none' }}>
              <button className="btn-secondary">Let's Connect</button>
            </a>
          </div>
        </div>

        <div className="hero-image-container" style={{ position: 'relative', display: 'flex', justifyContent: 'center', zIndex: 1, transformStyle: 'preserve-3d' }}>
          <div className="glass-panel" style={{
            width: 'clamp(280px, 32vw, 480px)',
            height: 'clamp(350px, 38vw, 580px)',
            borderRadius: '32px',
            overflow: 'hidden',
            position: 'relative',
            zIndex: 1,
            border: '1px solid rgba(255,255,255,0.1)',
            transform: 'translateZ(20px)'
          }}>
            <img
              src={profileImg}
              className="hero-image"
              alt="Nicole Sumaganday"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                scale: '1.05',
              }}
            />
          </div>


          {/* Decorative Floating Card */}
          <div className="glass-panel" style={{
            position: 'absolute',
            bottom: '40px',
            left: '-30px',
            padding: '24px 30px',
            borderRadius: '24px',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '0.5px' }}>Student</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Midwife</div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;

