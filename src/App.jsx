import { useMemo, useRef, useState } from "react";
import "./App.css";
import { osakaHai2026 } from "./data/osakaHai2026";
import { arimaKinen2025 } from "./data/arimaKinen2025";
import { oukaSho2026 } from "./data/oukaSho2026";

function App() {
  const raceCatalog = [
    { year: "2026", course: "阪神", key: "osaka", label: "大阪杯", data: osakaHai2026 },
    { year: "2026", course: "阪神", key: "ouka", label: "桜花賞", data: oukaSho2026 },
    { year: "2025", course: "中山", key: "arima", label: "有馬記念", data: arimaKinen2025 },
  ];

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedRaceKey, setSelectedRaceKey] = useState("");
  const [currentRace, setCurrentRace] = useState(null);
  const [selectedHorse, setSelectedHorse] = useState(null);

  const detailRef = useRef(null);

  const years = [...new Set(raceCatalog.map((r) => r.year))];

  const courses = useMemo(() => {
    return raceCatalog
      .filter((r) => r.year === selectedYear)
      .map((r) => r.course)
      .filter((v, i, a) => a.indexOf(v) === i);
  }, [selectedYear]);

  const raceOptions = raceCatalog.filter(
    (r) => r.year === selectedYear && r.course === selectedCourse
  );

  const getStyleIcon = (style) => {
    switch (style) {
      case "逃げ": return "◀︎◁◁◁";
      case "先行": return "◁◀︎◁◁";
      case "差し": return "◁◁◀︎◁";
      case "追込": return "◁◁◁◀︎";
      default: return "";
    }
  };

  const getFrameColorClass = (frame) => {
    switch (frame) {
      case 1: return "frame1";
      case 2: return "frame2";
      case 3: return "frame3";
      case 4: return "frame4";
      case 5: return "frame5";
      case 6: return "frame6";
      case 7: return "frame7";
      case 8: return "frame8";
      default: return "";
    }
  };

  const handleLoadRace = () => {
    const found = raceCatalog.find(
      (r) =>
        r.year === selectedYear &&
        r.course === selectedCourse &&
        r.key === selectedRaceKey
    );
    setCurrentRace(found?.data || null);
    setSelectedHorse(null);
  };

  const handleHorseClick = (horse) => {
    setSelectedHorse(horse);
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="container">
      <h1>G1情報アプリ</h1>

      {/* レース選択 */}
      <div className="panel">
        <h2>レース選択</h2>

        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="">年</option>
          {years.map((y) => <option key={y}>{y}</option>)}
        </select>

        <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
          <option value="">競馬場</option>
          {courses.map((c) => <option key={c}>{c}</option>)}
        </select>

        <select value={selectedRaceKey} onChange={(e) => setSelectedRaceKey(e.target.value)}>
          <option value="">レース</option>
          {raceOptions.map((r) => (
            <option key={r.key} value={r.key}>{r.label}</option>
          ))}
        </select>

        <button onClick={handleLoadRace}>情報表示</button>
      </div>

      {currentRace && (
        <>
          {/* レース概要 */}
          <div className="panel">
            <h2>レース概要</h2>
            <p>{currentRace.courseComment}</p>
            <p>{currentRace.surface}{currentRace.distance}m</p>
          </div>

          {/* 買い目 */}
          <div className="panel">
            <h2>買い目</h2>
            <p>{currentRace.betting.type}</p>
            <p>1着: {currentRace.betting.first.join(",")}</p>
            <p>2着: {currentRace.betting.second.join(",")}</p>
            <p>3着: {currentRace.betting.third.join(",")}</p>
            <p>点数: {currentRace.betting.points}</p>
          </div>

          {/* 出馬表 */}
          <div className="panel">
            <h2>出馬表</h2>

            {currentRace.horses.map((h) => (
              <div
                key={h.number}
                className={`card ${getFrameColorClass(h.frame)}`}
                onClick={() => handleHorseClick(h)}
              >
                <div>
                  {h.number} {h.name} <span className="age">{h.ageSex}</span>
                </div>
                <div>
                  {h.jockey} {getStyleIcon(h.style)} 単{h.odds}
                </div>
              </div>
            ))}
          </div>

          {/* コメント */}
          <div className="panel" ref={detailRef}>
            <h2>コメント</h2>
            {selectedHorse ? (
              <p>{selectedHorse.comment || selectedHorse.summary}</p>
            ) : (
              <p>馬をクリックしてください</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;