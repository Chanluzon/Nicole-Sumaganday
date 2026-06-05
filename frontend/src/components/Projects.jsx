import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const container = useRef();

  useEffect(() => {
    console.log('Fetching projects...');
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        console.log('Projects loaded:', data);
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching projects:', err);
        setLoading(false);
      });
  }, []);

  useGSAP(() => {
    if (!container.current) return;
    
    // Animate header separately so it's always visible regardless of loading state
    const headTl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });

    headTl.fromTo('.projects-header .reveal-text span', 
      { y: '100%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 1, ease: 'power4.out' }
    );

    headTl.fromTo('.projects-header p',
      { y: 20, opacity: 0, filter: 'blur(10px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'expo.out' },
      '-=0.7'
    );

    if (!loading && projects.length > 0) {
      gsap.fromTo('.project-card', 
        { y: 100, opacity: 0, rotationX: 15, filter: 'blur(20px)' },
        {
          scrollTrigger: {
            trigger: container.current,
            start: 'top 75%',
            toggleActions: 'play none none none'
          },
          y: 0,
          opacity: 1,
          rotationX: 0,
          filter: 'blur(0px)',
          stagger: 0.2,
          duration: 1.5,
          ease: 'expo.out',
          transformPerspective: 1200
        }
      );
    }
  }, { scope: container, dependencies: [loading, projects] });


  const handleCardMouseMove = (e, cardRef) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 1000,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  const handleCardMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)'
    });
  };

  return (
    <section id="experience" ref={container} style={{ padding: '80px 0 60px', position: 'relative', zIndex: 10 }}>
      <div className="container">
        <div className="projects-header" style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 className="section-title heading-display" style={{ marginBottom: '10px' }}>

            <div className="reveal-text">
              <span className="text-gradient" 
                style={{ display: 'inline-block', cursor: 'default', transition: 'var(--transition-smooth)' }}
                onMouseEnter={(e) => gsap.to(e.target, { scale: 1.05, rotation: -1, duration: 0.4, ease: 'back.out(1.7)' })}
                onMouseLeave={(e) => gsap.to(e.target, { scale: 1, rotation: 0, duration: 0.4, ease: 'power2.out' })}
              >Clinical Experience</span>
            </div>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '580px', margin: '0 auto', lineHeight: 1.6 }}>
            A summary of my hands-on clinical internships and healthcare community involvement.
          </p>
        </div>



        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '40px',
          perspective: '1500px'
        }}>
          {loading ? (
            <div className="flex-center" style={{ gridColumn: '1 / -1', height: '300px' }}>
              <div className="heading-display" style={{ fontSize: '1.5rem', opacity: 0.5 }}>Loading Experience...</div>
            </div>
          ) : (
            projects.map((project) => (
              <div
                key={project.id}
                className="glass-panel project-card"
                onMouseMove={(e) => handleCardMouseMove(e)}
                onMouseLeave={(e) => handleCardMouseLeave(e)}
                style={{
                  padding: '0',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  border: '1px solid var(--glass-border)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <div style={{ height: '260px', overflow: 'hidden', position: 'relative', transform: 'translateZ(20px)' }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(10px)',
                    padding: '8px 16px',
                    borderRadius: '100px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    {project.duration}
                  </div>
                </div>
                <div style={{ padding: '40px', flex: 1, display: 'flex', flexDirection: 'column', transform: 'translateZ(30px)' }}>
                  <h3 className="heading-display" style={{ fontSize: '2rem', marginBottom: '5px', letterSpacing: '-1px' }}>{project.title}</h3>
                  
                  {project.institution && (
                    <div style={{ color: 'var(--accent-light)', fontWeight: 700, fontSize: '1.05rem', marginBottom: '15px' }}>
                      {project.institution}
                    </div>
                  )}

                  <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', flex: 1, lineHeight: 1.7, fontSize: '1.05rem' }}>
                    {project.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: (project.liveLink || project.githubLink) ? '35px' : '0px' }}>
                    {project.techStack.map(tech => (
                      <span key={tech} style={{
                        padding: '6px 14px',
                        background: 'rgba(13, 148, 136, 0.1)',
                        border: '1px solid rgba(13, 148, 136, 0.2)',
                        borderRadius: '100px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: 'var(--accent-light)'
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  {(project.liveLink || project.githubLink) && (
                    <div style={{ display: 'flex', gap: '15px' }}>
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noreferrer" style={{ flex: 1, textDecoration: 'none' }}>
                          <button className="btn-primary" style={{ width: '100%', padding: '12px' }}>Live View</button>
                        </a>
                      )}
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noreferrer" style={{ flex: 1, textDecoration: 'none' }}>
                          <button className="btn-secondary" style={{ width: '100%', padding: '12px' }}>Source Code</button>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>

  );
};

export default Projects;

