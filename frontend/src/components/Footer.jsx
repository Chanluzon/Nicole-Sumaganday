const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/christ-amron-luzon-45743a2b1/',
      svg: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/drcrys11',
      svg: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
    },

    {
      name: 'Instagram',
      href: 'https://www.instagram.com/_drcrys_',
      svg: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
    }
  ];

  return (
    <footer className="container" style={{
      padding: '100px 0 40px',
      textAlign: 'center',
      borderTop: '1px solid var(--glass-border)',
      marginTop: '150px'
    }}>
      <div style={{ marginBottom: '60px' }}>
        <h2 className="heading-display text-gradient" style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
          NICOLE SUMAGANDAY
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
          Dedicated student midwife passionate about maternal and newborn care.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '60px', flexWrap: 'wrap' }}>
        {socialLinks.map(({ name, href, svg }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noreferrer"
            style={{
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              transition: 'var(--transition-smooth)'
            }}
            onMouseOver={(e) => {
              const target = e.currentTarget;
              target.style.color = 'var(--accent-light)';
              target.style.transform = 'translateY(-8px)';
            }}
            onMouseOut={(e) => {
              const target = e.currentTarget;
              target.style.color = 'var(--text-secondary)';
              target.style.transform = 'translateY(0)';
            }}
          >
            <div className="glass-panel flex-center" style={{
              width: '60px',
              height: '60px',
              borderRadius: '18px',
              background: 'var(--badge-bg)',
              border: '1px solid var(--glass-border)',
              transition: 'inherit'
            }}>
              {svg}
            </div>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
              {name}
            </span>
          </a>
        ))}
      </div>


      <div style={{
        paddingTop: '30px',
        borderTop: '1px solid var(--glass-border)',
        color: 'var(--text-secondary)',
        fontSize: '0.85rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <p>&copy; {currentYear} Nicole Sumaganday. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '30px' }}>
          <a href="#privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#terms" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


