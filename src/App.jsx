import { useState, useEffect } from "react";



function App() {
  const [politicians, setPoliticians] = useState([]);

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

  
  return (
    <main>
      <section className="container">
        <h1>POLITICIANS</h1>
        <div className="poli-list">
          {politicians.map((politician, i) => (
            <div className="col"> 
              <div className="card" key={i}>
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
