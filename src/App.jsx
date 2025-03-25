import Card from "./components/card";
import { useState, useMemo, useEffect } from "react";

function App() {
  const [politicians, setPoliticians] = useState([]);
  const [inputValue, setInputValue] = useState('');

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

  const fiteredPoli = useMemo(() => {
    return politicians.filter(politician => {
      const {name, biography} = politician;
      const keys = [name, biography];
      const isWordPresent = keys.some(key => key.toLowerCase().includes(inputValue.toLowerCase()));
      if(isWordPresent) {
        return politician;
      };
    });
  }, [politicians, inputValue]);

  
  return (
    <main>

      <section className="container">
        <h1>POLITICIANS</h1>
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
