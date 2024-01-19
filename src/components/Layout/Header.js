import React from 'react';
import sushiImage from '../../assets/sushi.jpg';
import styles from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>Japan Cuisine</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={styles['main-image']}>
        <img src={sushiImage} alt="Japan Cuisine Dishes" />
      </div>
    </React.Fragment>
  );
};

export default Header;
