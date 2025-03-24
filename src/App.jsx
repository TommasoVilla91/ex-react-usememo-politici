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
  }, []) 

  const fiteredPoli = useMemo(() => {
    return politicians.filter(politician => {
      const {name, biography} = politician;
      const keys = [name, biography];
      const isWordPresent = keys.some(key => key.toLowerCase().includes(inputValue.toLowerCase()))
      if(isWordPresent) {
        return politician
      }       
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
            <div className="col" key={i}> 
              <div className="card">
                <div>
                  <img src={politician.image} alt={politician.name} />
                </div>
                <div className="card-text">
                  <h3>{politician.name}</h3>
                  <h5>{politician.position}</h5>
                  <p>{politician.biography}</p>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>
      
    </main>
  );
};

export default App;
