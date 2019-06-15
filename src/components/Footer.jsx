import React from 'react';
import styles from '../css-modules/Footer.module.css';

function Footer() {
  return (
    <div className={styles.footerWrapper}>
      <div className={styles.footer}>
        <p> @author: Bundit Hongmanee <br/> <a href="https://bundit.io">@link: https://bundit.io</a> </p>
      </div>
    </div>
  )
}

export default Footer;
