import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const container = useRef();

  useEffect(() => {
    console.log('Fetching skills...');
    fetch('/api/skills')
      .then(res => res.json())
      .then(data => {
        console.log('Skills loaded:', data);
        setSkills(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching skills:', err);
        setLoading(false);
      });
  }, []);

  useGSAP(() => {
    if (!container.current) return;

    const headTl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });

    headTl.fromTo('.about-content .reveal-text > span',
      { y: '100%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 1.2, ease: 'power4.out' }
    );

    headTl.fromTo('.about-content p',
      { y: 30, opacity: 0, filter: 'blur(10px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.2, duration: 1, ease: 'expo.out' },
      '-=0.8'
    );

    if (!loading && skills.length > 0) {
      gsap.fromTo('.skills-card',
        { x: 50, opacity: 0, filter: 'blur(15px)' },
        {
          scrollTrigger: {
            trigger: container.current,
            start: 'top 75%'
          },
          x: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.5,
          ease: 'expo.out'
        }
      );

      gsap.fromTo('.skill-badge',
        { scale: 0.3, opacity: 0, filter: 'blur(10px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', stagger: 0.05, duration: 0.6, ease: 'back.out(1.7)', delay: 0.5 }
      );
    }
  }, { scope: container, dependencies: [loading, skills] });


  return (
    <section id="about" ref={container} style={{ padding: '80px 0 60px', position: 'relative', zIndex: 10 }}>
      <div className="container">
        <div className="grid-2" style={{ alignItems: 'flex-start' }}>
          {/* Bio Section */}
          <div className="about-content">
            <h2 className="section-title heading-display" style={{ textAlign: 'left', marginBottom: '20px' }}>
              <div className="reveal-text">
                <span className="text-gradient" 
                  style={{ display: 'inline-block', cursor: 'default', transition: 'var(--transition-smooth)' }}
                  onMouseEnter={(e) => gsap.to(e.target, { scale: 1.05, rotation: 1, duration: 0.4, ease: 'back.out(1.7)' })}
                  onMouseLeave={(e) => gsap.to(e.target, { scale: 1, rotation: 0, duration: 0.4, ease: 'power2.out' })}
                >About Me</span>
              </div>
            </h2>

            <div style={{ height: '4px', width: '60px', background: 'var(--accent)', marginBottom: '30px', borderRadius: '100px' }}></div>


            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.8 }}>
                I am a dedicated student midwife passionate about maternal and newborn care. I strive to provide safe, compassionate, and evidence-based care to mothers and infants while continuously developing my clinical skills and professional knowledge.
              </p>
            </div>

          </div>

          {/* Skills Section */}
          <div className="skills-card">
            <div className="glass-panel" style={{ padding: '35px', background: 'var(--glass-bg)' }}>
              <h3 className="heading-display" style={{ fontSize: '2.2rem', marginBottom: '25px', letterSpacing: '-1px' }}>
                My Skills
              </h3>

              {loading ? (
                <div className="heading-display" style={{ opacity: 0.5 }}>Loading...</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>

                  {skills.map(skillGroup => (
                    <div key={skillGroup.category}>
                      <h4 style={{
                        color: 'var(--accent-light)',
                        marginBottom: '20px',
                        fontSize: '0.9rem',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        fontWeight: 800
                      }}>
                        {skillGroup.category}
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                        {skillGroup.items.map(item => (
                          <span key={item} className="skill-badge" style={{
                            padding: '10px 20px',
                            background: 'var(--badge-bg)',
                            borderRadius: '12px',
                            color: 'var(--text-primary)',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            border: '1px solid var(--glass-border)',
                            transition: 'var(--transition-smooth)',
                            cursor: 'default'
                          }}
                            onMouseOver={(e) => {
                              e.target.style.background = 'rgba(13, 148, 136, 0.1)';
                              e.target.style.borderColor = 'var(--accent-light)';
                              e.target.style.boxShadow = '0 0 15px var(--accent-glow)';
                            }}
                            onMouseOut={(e) => {
                              e.target.style.background = 'var(--badge-bg)';
                              e.target.style.borderColor = 'var(--glass-border)';
                              e.target.style.boxShadow = 'none';
                            }}>

                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
