import React, { Component, useEffect, useState } from 'react';
import '../scss/style.scss'
import Kobe from '../assets/KobeBryant.jpeg'
import Kareem from '../assets/Kareem.jpeg'
import Lebron from '../assets/LebronJames.jpeg'
import Michael from '../assets/MichaelJordan.jpeg'

const goatData = [
  { player: Kobe, id: 1 },
  { player: Michael, id: 2 },
  { player: Lebron, id: 3 },
  { player: Kareem, id: 4 },
];

const App = () => {

  return (
    <div>
      <HomePage />
    </div>
  );
};

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    if (currentPage === 'stats') {
      window.scroll({ top: window.innerHeight, behavior: 'smooth' });
    }
  }, [currentPage]);

  const goToStatsPage = () => {
    setCurrentPage('stats');
  };

  return (
    <div>
      {currentPage === 'home' && <GoatBox />}
      {currentPage === 'stats' && <StatsPage />}
      {currentPage === 'home' && (
        <button id="button" onClick={goToStatsPage}>Compare Players</button>
      )}
    </div>
  );
}

const GoatBox = () => {


  return (
    <>
      
        <h1 id="header">🐐Who Is The Greatest Of All Time 🐐</h1>
        <div id="cards">
            <div
              className="card"
                  style={{
                    backgroundImage: `url(${Kobe})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
              }}
              onClick={() => window.location.href = 'https://www.youtube.com/watch?v=lPk_zyRKs1Q'}
            ></div>
            <div
              className="card"
                  style={{
                    backgroundImage: `url(${Michael})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
              }}
              onClick={() => window.location.href = 'https://www.nba.com/news/history-nba-legend-michael-jordan'}
            ></div>
            <div
              className="card"
                  style={{
                    backgroundImage: `url(${Lebron})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
              }}
              onClick={() => window.location.href = 'https://www.youtube.com/watch?v=ThmQU7zs-Ho'}
            ></div> 
            <div
              className="card"
                  style={{
                    backgroundImage: `url(${Kareem})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
              }}
              onClick={() => window.location.href = 'https://www.nba.com/news/history-nba-legend-kareem-abdul-jabbar'}
            ></div>         
        </div>
    </>
  );
}

const StatsPage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  

  return (
    <>
      <h1 id="statsHeader">CHOOSE A PLAYER</h1>
      <input className='input-bar'></input>
      <div className="dropdown-container">
        <button className="dropdown-button" onClick={ toggleDropdown }>
          Choose Stat
        </button>
        {isDropdownOpen && (
          <ul className='dropdown-content' style={{ listStyleType: 'none', padding: 0 }}>
              <li>All Stats</li>
              <li>Points</li>
              <li>Rebounds</li>
              <li>Assists</li>
              <li>Blocks</li>
              <li>Steals</li>
          </ul>
        )}
      </div>
      <button className="secret-button" onClick={() => window.location.href = 'https://www.si.com/.image/t_share/MjAyNTY3NzA2NTUyMDUwNzU2/jimmy-butler.jpg'}>PLEASE DON'T PUSH</button>
    </>
  )
}


export default App;