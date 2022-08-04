import './App.css';
import { useState } from 'react';
import Fretboard from './components/Fretboard';

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
          <Fretboard />
        )}
      </header>
    </div>
  );
}

export default App;
