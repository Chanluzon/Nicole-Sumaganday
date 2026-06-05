import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / (totalScroll || 1)) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const navItems = ['Home', 'About', 'Experience', 'Contact'];

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1000,
      padding: scrolled ? '12px 0' : '25px 0',
      transition: 'var(--transition-smooth)'
    }}>
      {/* Scroll Progress Bar */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '3px',
        width: `${scrollProgress}%`,
        background: 'linear-gradient(90deg, var(--accent), var(--accent-light))',
        transition: 'width 0.1s ease-out',
        zIndex: 1001
      }} />

      <header
        className="glass-panel"
        style={{
          width: 'clamp(92%, 95vw, 1300px)',
          padding: scrolled ? '8px 16px' : '12px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: '100px',
          background: scrolled ? 'var(--glass-bg)' : 'transparent',
          borderColor: scrolled ? 'var(--glass-border)' : 'transparent',
          boxShadow: scrolled ? '0 15px 35px rgba(0,0,0,0.2)' : 'none',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          position: 'relative'
        }}
      >
        <div
          className="heading-display text-gradient"
          style={{
            fontSize: 'clamp(1rem, 1.4vw, 1.4rem)',
            cursor: 'pointer',
            fontWeight: 800,
            letterSpacing: '-0.5px',
            whiteSpace: 'nowrap'
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          NICOLE SUMAGANDAY
        </div>

        {/* Desktop Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }} className="desktop-nav">
          <nav style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="nav-link"
                style={{
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  padding: '8px 18px',
                  borderRadius: '100px',
                  transition: '0.3s cubic-bezier(0.23, 1, 0.32, 1)',
                }}
              >
                {item}
              </a>
            ))}
          </nav>

          <div style={{ width: '1px', height: '18px', background: 'var(--glass-border)', opacity: 0.5 }}></div>

          <button
            onClick={toggleTheme}
            className="theme-toggle"
            style={{
              background: 'var(--badge-bg)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-primary)',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.4s ease',
              fontSize: '1rem'
            }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="mobile-toggle" style={{ display: 'none', alignItems: 'center', gap: '15px' }}>
          <button
            onClick={toggleTheme}
            style={{
              background: 'var(--badge-bg)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-primary)',
              width: '35px',
              height: '35px',
              borderRadius: '50%',
              fontSize: '0.9rem'
            }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              padding: '5px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}
          >
            <div style={{ width: '24px', height: '2px', background: 'currentColor', transition: '0.3s', transform: mobileMenuOpen ? 'translateY(8px) rotate(45deg)' : 'none' }} />
            <div style={{ width: '24px', height: '2px', background: 'currentColor', transition: '0.3s', opacity: mobileMenuOpen ? 0 : 1 }} />
            <div style={{ width: '24px', height: '2px', background: 'currentColor', transition: '0.3s', transform: mobileMenuOpen ? 'translateY(-8px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        background: 'var(--bg-color)',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '30px',
        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
        paddingTop: '80px'
      }}>
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={() => setMobileMenuOpen(false)}
            style={{
              color: 'var(--text-primary)',
              textDecoration: 'none',
              fontSize: '2.5rem',
              fontWeight: 700,
              letterSpacing: '-1px',
              transition: '0.3s'
            }}
            onMouseOver={(e) => e.target.style.color = 'var(--accent)'}
            onMouseOut={(e) => e.target.style.color = 'var(--text-primary)'}
          >
            {item}
          </a>
        ))}

        <button
          onClick={() => setMobileMenuOpen(false)}
          style={{
            marginTop: '40px',
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            color: 'var(--text-primary)',
            padding: '12px 25px',
            borderRadius: '100px',
            fontSize: '1rem'
          }}
        >
          Close Menu
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </div>
  );
};

export default Navbar;

