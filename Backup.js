// import React, { Component, useEffect } from 'react';
// import '../scss/style.scss'
// import Kobe from '../assets/KobeBryant.jpg'
// import Bill from '../assets/BillRussell.jpeg'
// import Kareem from '../assets/Kareem.jpeg'
// import Larry from '../assets/LarryBird.jpeg'
// import Lebron from '../assets/LebronJames.jpeg'
// import Magic from '../assets/MagicJohnson.jpeg'
// import MJ from '../assets/MichaelJordan.jpeg'
// import Shaq from '../assets/Shaq.jpeg'
// import Wilt from '../assets/WiltChamberlain.jpeg'

// const App = () => {
//   useEffect(() => {
//     const track = document.getElementById('image-track');

//     const handleMouseUp = () => {
//       track.dataset.mouseDownAt = "0";
//       track.dataset.prevPercentage = track.dataset.percentage;
//     };

//     const handleMouseMove = (e) => {
//       if (track.dataset.mouseDownAt === '0') return;
    
//       const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
//         maxDelta = window.innerWidth / 2;
    
//       const percentage = (mouseDelta / maxDelta) * -100;
//       let nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;
    
//       nextPercentage = Math.min(nextPercentage, 0);
//       nextPercentage = Math.max(nextPercentage, -100);
    
//       track.dataset.percentage = nextPercentage;
    
//       for (let i = 0; i < track.children.length; i++) {
//         const image = track.children[i];
//         const imagePercentage = 100 + (nextPercentage / track.children.length) * (i + 1);
//         image.animate(
//           {
//             objectPosition: `${imagePercentage}% center`,
//           },
//           { duration: 1200, fill: 'forwards' }
//         );
//       }
    
//       track.animate(
//         {
//           transform: `translate(${nextPercentage}%, -50%)`,
//         },
//         { duration: 1200, fill: 'forwards' }
//       );
//     };

//     const handleMouseDown = (e) => {
//       track.dataset.mouseDownAt = e.clientX;
//     };

//     document.addEventListener('mousedown', handleMouseDown);
//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', handleMouseUp);

//     return () => {
//       document.removeEventListener('mousedown', handleMouseDown);
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, []);


//     return (
//         <div id="image-track" data-mouse-down-at="0" data-prev-percentage="0">
//           <img className="image" src={Kobe} draggable="false"  />
//           <img className="image" src={MJ} draggable="false" />
//           <img className="image" src={Lebron} draggable="false" />
//           <img className="image" src={Kareem} draggable="false" />
//           <img className="image" src={Magic} draggable="false" />
//         </div>
//     );
//   };

//   export default App;