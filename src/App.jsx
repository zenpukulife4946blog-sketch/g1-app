import { useMemo, useState, useRef } from "react";
import "./App.css";
import { osakaHai2026 } from "./data/osakaHai2026";
import { arimaKinen2025 } from "./data/arimaKinen2025";
import { oukaSho2026 } from "./data/oukaSho2026";

function App() {
  const raceMap = {
    osaka: osakaHai2026,
    ouka: oukaSho2026,
    arima: arimaKinen2025,
  };

  const raceOptionsByCourse = {
    阪神: [
      { value: "osaka", label: "大阪杯" },
      { value: "ouka", label: "桜花賞" },
    ],
    中山: [{ value: "arima", label: "有馬記念" }],
  };

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedRaceKey, setSelectedRaceKey] = useState("");
  const [currentRace, setCurrentRace] = useState(null);
  const [selectedHorse, setSelectedHorse] = useState(null);

  const detailRef = useRef(null);

  const raceOptions = useMemo(() => {
    if (!selectedCourse) return [];
    return raceOptionsByCourse[selectedCourse] || [];
  }, [selectedCourse]);

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
        return "----";
    }
  };

  const handleLoadRace = () => {
    const race = raceMap[selectedRaceKey];
    setCurrentRace(race);
    setSelectedHorse(null);
  };

  const handleHorseClick = (horse) => {
    setSelectedHorse(horse);

    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="app">
      <div className="container">
        <h1>G1情報アプリ</h1>

        {/* フィルター */}
        <div className="panel">
          <div className="filters">
            <select onChange={(e) => setSelectedCourse(e.target.value)}>
              <option>競馬場</option>
              <option value="阪神">阪神</option>
              <option value="中山">中山</option>
            </select>

            <select
              onChange={(e) => setSelectedRaceKey(e.target.value)}
            >
              <option>レース</option>
              {raceOptions.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>

            <button onClick={handleLoadRace}>表示</button>
          </div>
        </div>

        {currentRace && (
          <>
            {/* レース概要 */}
            <div className="panel">
              <h2>レース概要</h2>

              <div className="race-grid">
                <div>年</div>
                <div>{currentRace.year}年</div>
                <div>競馬場</div>
                <div>{currentRace.course}競馬場</div>
                <div>レース名</div>
                <div>{currentRace.raceName}</div>
                <div>条件</div>
                <div>
                  {currentRace.surface}
                  {currentRace.distance}m / {currentRace.turn} /{" "}
                  {currentRace.courseLayout}
                </div>

                <div>天候</div>
                <div>{currentRace.weather}</div>
                <div>馬場</div>
                <div>{currentRace.track}</div>

                <div>展開</div>
                <div>{currentRace.pace}</div>

                <div>コース解説</div>
                <div className="course-comment">
                  {currentRace.courseComment}
                </div>
              </div>
            </div>

            {/* 予想印 */}
            <div className="panel">
              <h2>予想印</h2>
              <div className="marks-box">
                <div className="mark-item mark-red">◎ {currentRace.marks.honmei}</div>
                <div className="mark-item mark-blue">○ {currentRace.marks.taikou}</div>
                <div className="mark-item mark-green">▲ {currentRace.marks.tanana}</div>
                <div className="mark-item mark-orange">△ {currentRace.marks.renka}</div>
                <div className="mark-item mark-purple">☆ {currentRace.marks.ana}</div>
              </div>
            </div>

            {/* 買い目 */}
            <div className="panel">
              <h2>買い目</h2>
              <div className="betting-box">
                <div>券種: {currentRace.betting.type}</div>
                <div>1着: {currentRace.betting.first.join(", ")}</div>
                <div>2着: {currentRace.betting.second.join(", ")}</div>
                <div>3着: {currentRace.betting.third.join(", ")}</div>
              </div>
            </div>

            {/* 出馬表 */}
            <div className="panel">
              <h2>出馬表</h2>

              {currentRace.horses.map((horse) => (
                <div
                  key={horse.number}
                  className="horse-card"
                  onClick={() => handleHorseClick(horse)}
                >
                  <div className="horse-name">
                    {horse.number} {horse.name}
                  </div>
                  <div>{horse.jockey}</div>
                  <div>{getStyleIcon(horse.style)}</div>
                  <div>{horse.odds}</div>
                </div>
              ))}
            </div>

            {/* 詳細 */}
            <div className="panel" ref={detailRef}>
              <h2>馬詳細</h2>

              {selectedHorse && (
                <>
                  <div className="detail-title">
                    {selectedHorse.name}
                  </div>
                  <p>{selectedHorse.comment}</p>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;