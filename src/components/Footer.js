import { Link } from 'gatsby';
import React from 'react';

const Footer = () => (
  <footer>
    <p>&copy; Slick's Slices {new Date().getFullYear()}</p>
    <Link to="/beers">Beers</Link>
  </footer>
);

export default Footer;
