import React from 'react';
import styles from '../css-modules/Header.module.css';
import logo from '../logo.svg';

function Header() {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.titleWrapper}>
        <img src={logo} className={styles.logo} alt="logo" />
        <h1>React Minesweeper</h1>
      </div>
    </div>
  );
}

export default Header;
