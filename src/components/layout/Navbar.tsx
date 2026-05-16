import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navLinkClass =
    'font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors';

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 glass-header border-b border-outline-variant/10">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter flex items-center justify-between h-20">
        <Link to="/#home" className="font-headline-md text-headline-md font-extrabold text-primary tracking-tight">
          Paditech
        </Link>
        <div className="hidden md:flex items-center gap-stack-lg">
          <Link to="/#home" className="font-body-md text-body-md text-primary font-bold border-b-2 border-primary pb-1">
            Home
          </Link>
          <Link to="/#projects" className={navLinkClass}>
            Projects
          </Link>
          <Link to="/#services" className={navLinkClass}>
            Services
          </Link>
          <Link to="/blog" className={navLinkClass}>
            Blogs
          </Link>
          <Link to="/#contact" className={navLinkClass}>
            Contact
          </Link>
        </div>
        <Link
          to="/secret-login"
          className="bg-primary-container text-on-primary px-8 py-2.5 rounded-full font-label-bold active:scale-95 transition-transform hover:opacity-90"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
