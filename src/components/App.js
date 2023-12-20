import React, { Component, useEffect, useState } from 'react';
import '../scss/style.scss'
import Kobe from '../assets/KobeBryant.jpeg'
import Bill from '../assets/BillRussell.jpeg'
import Kareem from '../assets/Kareem.jpeg'
import Larry from '../assets/LarryBird.jpeg'
import Lebron from '../assets/LebronJames.jpeg'
import Magic from '../assets/MagicJohnson.jpeg'
import Michael from '../assets/MichaelJordan.jpeg'
import Shaq from '../assets/Shaq.jpeg'
import Wilt from '../assets/WiltChamberlain.jpeg'

const goatData = [
  { player: Kobe, id: 1 },
  { player: Michael, id: 2 },
  { player: Lebron, id: 3 },
  { player: Kareem, id: 4 },
];

const App = () => {

  return (
    <div>
      <GoatBox />
    </div>
  );
};

const GoatBox = () => {
  
  
  return (
    <>
      <h1 id="header">Greatest Of All Time</h1>
      <div id="cards">
        {goatData.map((card) => (
          <div
            key={card.id}
            className="card"
              
                style={{
                  backgroundImage: `url(${card.player})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
            }}
          ></div>
        ))}
      </div>
    </>
  );
}


export default App;