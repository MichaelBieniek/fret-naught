import './App.css';
import { useState } from 'react';
import Player from './components/Player';

function App() {
  const [isWelcome, setWelcome] = useState(true);

  return (
    <div className="App">
      <header className="App-header">
        {isWelcome ? (
          <div>
            Fretnaught
            <div>
              <button onClick={() => setWelcome(false)}>Start</button>
            </div>
          </div>
        ) : (
          <Player />
        )}
      </header>
    </div>
  );
}

export default App;
