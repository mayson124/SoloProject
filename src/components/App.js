import React, { Component, useEffect, useState } from 'react';
import '../scss/style.scss'
import Kobe from '../assets/KobeBryant.jpg'
import Bill from '../assets/BillRussell.jpeg'
import Kareem from '../assets/Kareem.jpeg'
import Larry from '../assets/LarryBird.jpeg'
import Lebron from '../assets/LebronJames.jpeg'
import Magic from '../assets/MagicJohnson.jpeg'
import Michael from '../assets/MichaelJordan.jpeg'
import Shaq from '../assets/Shaq.jpeg'
import Wilt from '../assets/WiltChamberlain.jpeg'

const cardData = [
  { player: Kobe, id: 1 },
  { player: Michael, id: 2 },
  { player: Lebron, id: 3 },
  { player: Kareem, id: 4 },
];

const App = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleOnMouseMove = (e) => {
      const { currentTarget: target } = e;
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePosition({ x, y });
    };

    const cards = document.querySelectorAll('.card');

    cards.forEach((card) => {
      card.addEventListener('mousemove', handleOnMouseMove);

      return () => {
        card.removeEventListener('mousemove', handleOnMouseMove);
      };
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mousemove', handleOnMouseMove);
      });
    };
  }, []); 

  return (
    <>
      <h1 id="header">Greatest Of All Time</h1>
      <div id="cards">
        {cardData.map((card) => (
          <div
            key={card.id}
            className="card"
            style={{
              '--mouse-x': `${mousePosition.x}px`,
              '--mouse-y': `${mousePosition.y}px`,
              backgroundImage: `url(${card.player})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
        ))}
      </div>
    </>
  );
};


export default App;