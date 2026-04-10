import { useMemo, useState } from "react";
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

  const [selectedYear, setSelectedYear] = useState("2026");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedRaceKey, setSelectedRaceKey] = useState("");
  const [currentRace, setCurrentRace] = useState(null);
  const [selectedHorse, setSelectedHorse] = useState(null);

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

  const getMarkClass = (mark) => {
    switch (mark) {
      case "◎":
        return "mark mark-honmei";
      case "○":
        return "mark mark-taikou";
      case "▲":
        return "mark mark-tanana";
      case "△":
        return "mark mark-renka";
      case "☆":
        return "mark mark-ana";
      default:
        return "mark";
    }
  };

  const handleCourseChange = (event) => {
    const newCourse = event.target.value;
    setSelectedCourse(newCourse);
    setSelectedRaceKey("");
    setCurrentRace(null);
    setSelectedHorse(null);
  };

  const handleRaceChange = (event) => {
    setSelectedRaceKey(event.target.value);
    setCurrentRace(null);
    setSelectedHorse(null);
  };

  const handleLoadRace = () => {
    if (!selectedRaceKey) return;
    const race = raceMap[selectedRaceKey];
    setCurrentRace(race);
    setSelectedHorse(null);
  };

  return (
    <div className="app">
      <div className="container">
        <header className="page-header">
          <h1>G1情報Webアプリ</h1>
          <p className="page-subtitle">
            年・競馬場・レース名を選んで、出馬表・予想印・買い目を確認
          </p>
        </header>

        <section className="panel filter-panel">
          <h2 className="section-title">レース選択</h2>

          <div className="filters">
            <div className="field">
              <label>年</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="2026">2026</option>
                <option value="2025">2025</option>
              </select>
            </div>

            <div className="field">
              <label>競馬場</label>
              <select value={selectedCourse} onChange={handleCourseChange}>
                <option value="">競馬場を選択</option>
                <option value="阪神">阪神</option>
                <option value="中山">中山</option>
              </select>
            </div>

            <div className="field">
              <label>レース名</label>
              <select
                value={selectedRaceKey}
                onChange={handleRaceChange}
                disabled={!selectedCourse}
              >
                <option value="">レースを選択</option>
                {raceOptions.map((race) => (
                  <option key={race.value} value={race.value}>
                    {race.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="field button-field">
              <label>&nbsp;</label>
              <button
                className="load-button"
                onClick={handleLoadRace}
                disabled={!selectedRaceKey}
              >
                情報取得
              </button>
            </div>
          </div>
        </section>

        {currentRace && (
          <>
            <section className="summary-layout">
              <div className="panel summary-main">
                <h2 className="section-title">レース概要</h2>

                <div className="summary-row summary-row-four">
                  <div className="summary-item">
                    <span className="info-label">年</span>
                    <span>{currentRace.year}年</span>
                  </div>

                  <div className="summary-item">
                    <span className="info-label">競馬場</span>
                    <span>{currentRace.course}競馬場</span>
                  </div>

                  <div className="summary-item">
                    <span className="info-label">レース名</span>
                    <span>{currentRace.raceName}</span>
                  </div>

                  <div className="summary-item">
                    <span className="info-label">条件</span>
                    <span>
                      {currentRace.surface}
                      {currentRace.distance}m / {currentRace.turn} /{" "}
                      {currentRace.courseLayout}
                    </span>
                  </div>
                </div>

                <div className="summary-row summary-row-two">
                  <div className="summary-item">
                    <span className="info-label">天候</span>
                    <span>{currentRace.weather || "晴れ"}</span>
                  </div>

                  <div className="summary-item">
                    <span className="info-label">馬場</span>
                    <span>
                      {currentRace.track ||
                        currentRace.trackCondition ||
                        "未設定"}
                    </span>
                  </div>
                </div>

                <div className="summary-block">
                  <span className="info-label">展開</span>
                  <span>{currentRace.pace}</span>
                </div>

                <div className="summary-block">
                  <span className="info-label">コース解説</span>
                  <p>{currentRace.courseComment}</p>
                </div>
              </div>

              <div className="sub-panels">
                {currentRace.marks && (
                  <div className="panel">
                    <h2 className="section-title">予想印</h2>
                    <div className="marks-box">
                      <div className="mark-row">
                        <span className="mark mark-honmei">◎</span>
                        <span>{currentRace.marks.honmei.replace("◎ ", "")}</span>
                      </div>
                      <div className="mark-row">
                        <span className="mark mark-taikou">○</span>
                        <span>{currentRace.marks.taikou.replace("○ ", "")}</span>
                      </div>
                      <div className="mark-row">
                        <span className="mark mark-tanana">▲</span>
                        <span>{currentRace.marks.tanana.replace("▲ ", "")}</span>
                      </div>
                      <div className="mark-row">
                        <span className="mark mark-renka">△</span>
                        <span>{currentRace.marks.renka.replace("△ ", "")}</span>
                      </div>
                      <div className="mark-row">
                        <span className="mark mark-ana">☆</span>
                        <span>{currentRace.marks.ana.replace("☆ ", "")}</span>
                      </div>
                    </div>
                  </div>
                )}

                {currentRace.betting && (
                  <div className="panel">
                    <h2 className="section-title">買い目</h2>
                    <div className="betting-box">
                      <div>
                        <span className="info-label">券種</span>
                        <span>{currentRace.betting.type}</span>
                      </div>
                      <div>
                        <span className="info-label">1着</span>
                        <span>{currentRace.betting.first.join(", ")}</span>
                      </div>
                      <div>
                        <span className="info-label">2着</span>
                        <span>{currentRace.betting.second.join(", ")}</span>
                      </div>
                      <div>
                        <span className="info-label">3着</span>
                        <span>{currentRace.betting.third.join(", ")}</span>
                      </div>
                      <div>
                        <span className="info-label">点数</span>
                        <span>{currentRace.betting.points}</span>
                      </div>
                      <div>
                        <span className="info-label">金額</span>
                        <span>{currentRace.betting.unit}</span>
                      </div>
                      <div>
                        <span className="info-label">合計</span>
                        <span>{currentRace.betting.total}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            <section className="panel">
              <h2 className="section-title">出馬表</h2>

              <div className="table-wrap">
                <table className="horse-table">
                  <thead>
                    <tr>
                      <th>印</th>
                      <th>馬番</th>
                      <th>馬名</th>
                      <th>騎手</th>
                      <th>脚質</th>
                      <th>オッズ</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentRace.horses.map((horse) => (
                      <tr key={horse.number}>
                        <td className="cell-center">
                          {horse.mark ? (
                            <span className={getMarkClass(horse.mark)}>
                              {horse.mark}
                            </span>
                          ) : (
                            ""
                          )}
                        </td>

                        <td className="cell-center">{horse.number}</td>

                        <td>
                          <button
                            onClick={() => setSelectedHorse(horse)}
                            className={
                              selectedHorse?.number === horse.number
                                ? "horse-button active"
                                : "horse-button"
                            }
                          >
                            {horse.name}
                          </button>
                        </td>

                        <td>{horse.jockey}</td>

                        <td className="style-cell">
                          {getStyleIcon(horse.style)}
                        </td>

                        <td className="cell-right">{horse.odds}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="panel">
              <h2 className="section-title">馬詳細</h2>

              {selectedHorse ? (
                <div className="horse-detail">
                  <div className="detail-grid">
                    <div>
                      <span className="info-label">印</span>
                      <span className={getMarkClass(selectedHorse.mark)}>
                        {selectedHorse.mark || "なし"}
                      </span>
                    </div>
                    <div>
                      <span className="info-label">馬名</span>
                      <span>{selectedHorse.name}</span>
                    </div>
                    <div>
                      <span className="info-label">騎手</span>
                      <span>{selectedHorse.jockey}</span>
                    </div>
                    <div>
                      <span className="info-label">脚質</span>
                      <span className="detail-style">
                        {getStyleIcon(selectedHorse.style)}
                      </span>
                    </div>
                    <div>
                      <span className="info-label">オッズ</span>
                      <span>{selectedHorse.odds}</span>
                    </div>
                  </div>

                  <div className="detail-summary">
                    <span className="info-label">要約</span>
                    <p>{selectedHorse.summary}</p>
                  </div>
                </div>
              ) : (
                <div className="empty-message">
                  馬名をクリックすると、ここに詳細が表示されます。
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default App;