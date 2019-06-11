import React from 'react';
import { connect } from 'react-redux';
import styles from '../css-modules/Header.module.css';
import logo from '../logo.svg';

function Header() {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.titleWrapper}>
        <img src={logo} className={styles.logo} alt="logo" />
        <h1>React Minesweeper</h1>
      </div>
      <div/>
    </div>
  );
}

export default connect()(Header);
