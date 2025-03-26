import Card from "./components/card";
import { useState, useMemo, useEffect } from "react";

function App() {
  const [politicians, setPoliticians] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedPos, setSelectedPos] = useState('');

  const getPoliticians = async() => {
    try {
      const response = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/politicians`);
      const obj = await response.json();
      setPoliticians(obj);
    } catch(err) {
      console.error(err);
    };
  };

  useEffect(() => {
    getPoliticians();
  }, []);

  //// BONUS (punto 3 corretto con correzione)
  const positions = useMemo(() => {
    let allPositions = [];
    politicians.forEach(politician => {
      const isPosAdded = allPositions.some(currPos => currPos === politician.position)
      if(!isPosAdded) {
        allPositions.push(politician.position);
      };
    });
    return allPositions;
  }, [politicians]);

  const fiteredPoli = useMemo(() => {
    return politicians.filter(politician => {
      const {name, biography} = politician;
      const keys = [name, biography];
      const isWordPresent = keys.some(key => key.toLowerCase().includes(inputValue.toLowerCase()));
      const isPosValid = selectedPos === "" || selectedPos === politician.position;
      if(isWordPresent && isPosValid) {
        return politician;
      };
    });
  }, [politicians, inputValue, selectedPos]);

  
  return (
    <main>

      <section className="container">
        <h1>POLITICIANS</h1>
          <div>
            <select 
              value={selectedPos} 
              onChange={(e) => setSelectedPos(e.target.value)}
            >
              <option value="">Cerca per carica politica</option>
              {positions.map((pos, i) => (
                <option value={pos} key={i}>{pos}</option>
              ))}
            </select>
          </div>
          <div>
            <input 
              type="text"
              value={inputValue}
              placeholder="Cerca un politico"
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
      </section>  

      <section className="container">
        <div className="poli-list">

          {fiteredPoli.map((politician, i) => (
            <Card 
              key={i}
              nome={politician.name}
              immagine={politician.image}
              posizione={politician.position}
              bio={politician.biography}
            />
          ))}
        </div>
      </section>
      
    </main>
  );
};

export default App;
