import React from "react";

const Card = React.memo(({nome, immagine, posizione, bio}) => {
    console.log("Poli Render:", nome);
    
    return (
        <div className="col">
            <div className="card">
                <div>
                    <img src={immagine} alt={nome} />
                </div>
                <div className="card-text">
                    <h3>{nome}</h3>
                    <h5>{posizione}</h5>
                    <p>{bio}</p>
                </div>
            </div>
        </div>
    );
});

export default Card;