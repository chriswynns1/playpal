import React from 'react';
import './HeroStyle.css';

function Hero(props) {
  return (
    <>
      <div className={props.cName}>
        <img className="fit" alt="HeroImg" src={require('./assets/2.jpg')}></img>
        <div className='hero-text'>
            <h1>Game discovery made easy</h1>
            <p>Finding games to play with friends has never been easier.</p>
            <a href="/">Start now</a>
        </div>
      </div>
    </>
  )
}

export default Hero
