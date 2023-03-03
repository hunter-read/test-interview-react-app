import React from 'react';
import Spellbook from './components/Spellbook';
import './App.css';

function App() {
  const url = 'https://startplaying.games/api/detect-magic/spells'

  const getSpells = async () => {
    const response = await fetch(url);
    const data = await response.json();
    return data.spells;
  }
  const spells = getSpells();


  const who = [
    'Adventurer',
    'Aspiring Wizard',
    'Definitely Not Doomed NPC',
    'Wandering Soul',
    'Lost Barbarian'
  ]
  return (
    <div className="App">
      <header className="App-header">
        <h2>Hello {who[Math.floor(Math.random() * who.length)]}!</h2>
        <p>Have a gander inside my spellbook, and try a spell out for yourself if you are brave enough.</p>
        <Spellbook spells={spells}/>
      </header>
    </div>
  );
}



export default App;
