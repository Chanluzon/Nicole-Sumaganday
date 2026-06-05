import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const container = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%'
      }
    });

    tl.from('.contact-content > *', {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: 'power4.out'
    });

    tl.from('.contact-form-container', {
      scale: 0.95,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out'
    }, '-=0.8');

  }, { scope: container });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^[^\s@]+@gmail\.com$/i.test(formData.email.trim())) {
      setStatus('invalid_email');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(''), 5000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '16px 20px',
    background: 'var(--badge-bg)',
    border: '1px solid var(--glass-border)',
    borderRadius: '12px',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-sans)',
    fontSize: '1rem',
    marginBottom: '20px',
    outline: 'none',
    transition: 'var(--transition-smooth)'
  };

  return (
    <section id="contact" ref={container} className="container" style={{ padding: '80px 0 60px', minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
      <div className="grid-2" style={{ alignItems: 'center', gap: '60px', width: '100%' }}>
        <div className="contact-content">
          <h2 className="section-title heading-display" style={{ textAlign: 'left', marginBottom: '20px' }}>
            <div className="reveal-text">
              <span className="text-gradient"
                style={{ display: 'inline-block', cursor: 'default', transition: 'var(--transition-smooth)' }}
                onMouseEnter={(e) => gsap.to(e.target, { scale: 1.05, rotation: 1, duration: 0.4, ease: 'back.out(1.7)' })}
                onMouseLeave={(e) => gsap.to(e.target, { scale: 1, rotation: 0, duration: 0.4, ease: 'power2.out' })}
              >Let's Connect and <br /> Work Together.</span>
            </div>
          </h2>

          <div style={{ height: '4px', width: '60px', background: 'var(--accent)', marginBottom: '30px', borderRadius: '100px' }}></div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '40px', maxWidth: '480px' }}>
            Have an opportunity, questions, or just want to connect? I am always open to new experiences, collaborations, and discussions in maternal and newborn care.
          </p>


          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div className="glass-panel" style={{ padding: '20px 30px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'rgba(13, 148, 136, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-light)', fontSize: '1.2rem' }}>
                ✉
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Email</div>
                <div style={{ fontWeight: 600 }}>nicolesumaganday80@gmail.com</div>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '20px 30px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'rgba(13, 148, 136, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-light)', fontSize: '1.2rem' }}>
                📍
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Location</div>
                <div style={{ fontWeight: 600 }}>Marihatag, Surigao del Sur, Philippines</div>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-container">
          <div className="glass-panel" style={{ padding: '50px', background: 'var(--glass-bg)' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: '5px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Full Name</div>
              <input
                type="text" name="name" placeholder="John Doe" required
                value={formData.name} onChange={handleChange} style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = 'var(--accent-light)'; e.target.style.background = 'rgba(255,255,255,0.05)'; e.target.style.boxShadow = '0 0 15px var(--accent-glow)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--glass-border)'; e.target.style.background = 'var(--badge-bg)'; e.target.style.boxShadow = 'none'; }}
              />

              <div style={{ marginBottom: '5px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Work Email</div>
              <input
                type="email" name="email" placeholder="john@example.com" required
                disabled={!formData.name.trim()}
                value={formData.email} onChange={handleChange}
                style={{ ...inputStyle, opacity: !formData.name.trim() ? 0.3 : 1, cursor: !formData.name.trim() ? 'not-allowed' : 'text' }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--accent-light)'; e.target.style.background = 'rgba(255,255,255,0.05)'; e.target.style.boxShadow = '0 0 15px var(--accent-glow)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--glass-border)'; e.target.style.background = 'var(--badge-bg)'; e.target.style.boxShadow = 'none'; }}
              />

              <div style={{ marginBottom: '5px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Message</div>
              <textarea
                name="message" rows="5" placeholder="How can I help you?..." required
                disabled={!/^[^\s@]+@gmail\.com$/i.test(formData.email.trim())}
                value={formData.message} onChange={handleChange}
                style={{ ...inputStyle, resize: 'none', opacity: !/^[^\s@]+@gmail\.com$/i.test(formData.email.trim()) ? 0.3 : 1, cursor: !/^[^\s@]+@gmail\.com$/i.test(formData.email.trim()) ? 'not-allowed' : 'text' }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--accent-light)'; e.target.style.background = 'rgba(255,255,255,0.05)'; e.target.style.boxShadow = '0 0 15px var(--accent-glow)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--glass-border)'; e.target.style.background = 'var(--badge-bg)'; e.target.style.boxShadow = 'none'; }}
              />


              <button type="submit" className="btn-primary" disabled={status === 'sending'} style={{ padding: '18px', fontSize: '1.1rem', marginTop: '10px' }}>
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'invalid_email' && (
                <div style={{ color: '#f87171', marginTop: '20px', textAlign: 'center', fontSize: '0.9rem', fontWeight: 600 }}>
                  Please use a valid @gmail.com address.
                </div>
              )}
              {status === 'error' && (
                <div style={{ color: '#f87171', marginTop: '20px', textAlign: 'center', fontSize: '0.9rem', fontWeight: 600 }}>
                  Something went wrong. Please try again later.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Success Overlay */}
      {status === 'success' && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          background: 'rgba(8, 8, 12, 0.8)',
          backdropFilter: 'blur(10px)',
        }}>
          <div className="glass-panel" style={{
            padding: '60px 80px',
            textAlign: 'center',
            maxWidth: '600px',
            width: '90%',
            transform: 'scale(1)',
            animation: 'fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(34, 197, 94, 0.1)',
              color: '#22c55e',
              fontSize: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 30px'
            }}>
              ✓
            </div>
            <h3 className="heading-display" style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Message Sent!</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.6 }}>
              Thank you for reaching out. I've received your inquiry and will get back to you as soon as possible.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
