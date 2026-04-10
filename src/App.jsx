import { useState } from "react";
import "./App.css";
import { osakaHai2026 } from "./data/osakaHai2026";
import { oukaSho2026 } from "./data/oukaSho2026";

function App() {
  const [race, setRace] = useState(null);

  const races = [
    { name: "大阪杯", data: osakaHai2026 },
    { name: "桜花賞", data: oukaSho2026 },
  ];

  const getStyleIcon = (style) => {
    switch (style) {
      case "逃げ":
        return "◀︎◁◁◁";
      case "先行":
        return "◁◀︎◁◁";
      case "差し":
        return "◁◁◀︎◁";
      case "追込":
        return "◁◁◁◀︎";
      default:
        return "";
    }
  };

  const getFrameColorClass = (frame) => {
    switch (frame) {
      case 1:
        return "frame1";
      case 2:
        return "frame2";
      case 3:
        return "frame3";
      case 4:
        return "frame4";
      case 5:
        return "frame5";
      case 6:
        return "frame6";
      case 7:
        return "frame7";
      case 8:
        return "frame8";
      default:
        return "";
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>G1情報アプリ</h1>

        <div className="race-buttons">
          {races.map((r) => (
            <button key={r.name} onClick={() => setRace(r.data)}>
              {r.name}
            </button>
          ))}
        </div>

        {race && (
          <>
            <div className="section">
              <h2>出馬表</h2>

              <div className="horse-list">
                {race.horses.map((horse) => (
                  <div
                    key={horse.number}
                    className={`horse-card ${getFrameColorClass(
                      horse.frame
                    )}`}
                  >
                    <div className="horse-top">
                      <span className="number">{horse.number}</span>

                      <span className="name">
                        {horse.name}
                        <span className="ageSex">{horse.ageSex}</span>
                      </span>
                    </div>

                    <div className="horse-bottom">
                      <span>{horse.jockey}</span>
                      <span className="style">
                        {getStyleIcon(horse.style)}
                      </span>
                      <span className="odds">単 {horse.odds}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;