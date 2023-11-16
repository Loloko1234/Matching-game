import React, { useState } from "react";
import "./LosowePary.css";
const obrazy = {
  0: `${process.env.PUBLIC_URL}/images/1.png`,
  1: `${process.env.PUBLIC_URL}/images/2.png`,
  2: `${process.env.PUBLIC_URL}/images/3.png`,
  3: `${process.env.PUBLIC_URL}/images/4.png`,
  4: `${process.env.PUBLIC_URL}/images/5.png`,
  5: `${process.env.PUBLIC_URL}/images/6.png`,
  6: `${process.env.PUBLIC_URL}/images/7.png`,
  7: `${process.env.PUBLIC_URL}/images/8.png`,
  8: `${process.env.PUBLIC_URL}/images/9.png`,
  9: `${process.env.PUBLIC_URL}/images/10.png`,
};
function LosowePary() {
  const [pary, setPary] = useState([]);
  const [klikniete, setKlikniete] = useState(new Array(16).fill(false));
  const [kliknietePary, setKliknietePary] = useState([]);

  const generujPary = () => {
    const nowePary = [];
    const liczbyUzyte = {};

    while (nowePary.length < 16) {
      const losowaLiczba = Math.floor(Math.random() * 10);

      if (!liczbyUzyte[losowaLiczba]) {
        nowePary.push(losowaLiczba, losowaLiczba);
        liczbyUzyte[losowaLiczba] = true;
      }
    }

    for (let i = nowePary.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nowePary[i], nowePary[j]] = [nowePary[j], nowePary[i]];
    }

    setPary(nowePary);
    setKlikniete(new Array(16).fill(false));
    setKliknietePary([]); // Resetowanie stanu klikniętych par
  };

  const handleKlikniecie = (index) => {
    if (kliknietePary.length < 2 && !kliknietePary.includes(index)) {
      const noweKlikniete = [...klikniete];
      noweKlikniete[index] = true;
      setKlikniete(noweKlikniete);

      setKliknietePary([...kliknietePary, index]);

      if (kliknietePary.length === 1) {
        const firstIndex = kliknietePary[0];
        if (pary[firstIndex] === pary[index]) {
          setKliknietePary([]); // Czyszczenie klikniętych par
        } else {
          setTimeout(() => {
            const noweKlikniete = [...klikniete];
            noweKlikniete[firstIndex] = false;
            noweKlikniete[index] = false;
            setKlikniete(noweKlikniete);
            setKliknietePary([]); // Czyszczenie klikniętych par
          }, 1000); // Czas, przez który liczby pozostaną odkryte (1 sekunda)
        }
      }
    }
  };
  const sprawdzWidocznosc = () => {
    const tabela = document.querySelectorAll(".table.visible");
    if (tabela.length === pary.length) {
      alert("Gratulacje! Wygrałeś!");
    }
  };

  return (
    <div>
      <button onClick={generujPary}>Generuj Pary</button>
      <div className="table-container">
        {pary.map((liczba, index) => (
          <div
            className={`table ${klikniete[index] ? "visible" : ""}`}
            key={index}
            onClick={() => {
              handleKlikniecie(index);
              setTimeout(sprawdzWidocznosc, 1000);
            }}
          >
            {/* Zamiast wyświetlania samej liczby, wyświetl obraz */}
            {klikniete[index] ? (
              <img
                className="imgg"
                src={obrazy[liczba]}
                alt={`Obraz_${liczba}`}
              />
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LosowePary;
