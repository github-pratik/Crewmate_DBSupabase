import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="homepage-layout">
    
      <main className="homepage-main">
        <h1 className="homepage-title">Welcome to the Crewmate Creator!</h1>
        <p className="homepage-desc">Here is where you can create your very own set of crewmates before sending them off into space!</p>
        <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/4da35b00-9686-4c96-826d-6ee7550a5539/de5o9qp-4dae339c-a537-4cc4-bc40-3dc87c03bd31.png" alt="crewmate" style={{width: '300px'}} />
        <img src="https://i.redd.it/8yq49t3c9en51.png" alt="Spaceship" style={{width: '500px'}} />
      </main>
    </div>
  );
}

export default HomePage;