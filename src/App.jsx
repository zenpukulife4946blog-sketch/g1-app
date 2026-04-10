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

  const getStyleLabel = (style) => {
    return style || "未設定";
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

  const normalizeMarkName = (text = "", symbol = "") => {
    if (!text) return "";
    return text.replace(`${symbol} `, "").replace(symbol, "").trim();
  };

  const getPredictions = (race) => {
    if (!race) return null;

    if (race.marks) {
      return {
        honmei: normalizeMarkName(race.marks.honmei, "◎"),
        taikou: normalizeMarkName(race.marks.taikou, "○"),
        tanana: normalizeMarkName(race.marks.tanana, "▲"),
        renka: normalizeMarkName(race.marks.renka, "△"),
        ana: normalizeMarkName(race.marks.ana, "☆"),
      };
    }

    if (race.predictions) {
      return {
        honmei: race.predictions.honmei || "",
        taikou: race.predictions.taiko || race.predictions.taikou || "",
        tanana: race.predictions.tanana || "",
        renka: race.predictions.renka || "",
        ana: race.predictions.hoshi || race.predictions.ana || "",
      };
    }

    return null;
  };

  const getHorseMark = (horse, race) => {
    if (horse.mark) return horse.mark;

    const predictions = getPredictions(race);
    if (!predictions) return "";

    if (horse.name === predictions.honmei) return "◎";
    if (horse.name === predictions.taikou) return "○";
    if (horse.name === predictions.tanana) return "▲";
    if (horse.name === predictions.renka) return "△";
    if (horse.name === predictions.ana) return "☆";

    return "";
  };

  const formatBetValue = (value) => {
    if (Array.isArray(value)) return value.join(", ");
    if (value === null || value === undefined || value === "") return "未設定";
    return value;
  };

  const getBettingData = (race) => {
    if (!race || !race.betting) return null;

    const betting = race.betting;

    if (betting.formation) {
      return {
        type: betting.type || "未設定",
        first: formatBetValue(betting.formation.first),
        second: formatBetValue(betting.formation.second),
        third: formatBetValue(betting.formation.third),
        points: betting.points || "未設定",
        unit: betting.unit || betting.amount || "未設定",
        total: betting.total || betting.amount || "未設定",
      };
    }

    return {
      type: betting.type || "未設定",
      first: formatBetValue(betting.first),
      second: formatBetValue(betting.second),
      third: formatBetValue(betting.third),
      points: betting.points || "未設定",
      unit: betting.unit || betting.amount || "未設定",
      total: betting.total || betting.amount || "未設定",
    };
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

  const predictions = getPredictions(currentRace);
  const bettingData = getBettingData(currentRace);

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
                <div className="info-list">
                  <div>
                    <span className="info-label">年</span>
                    <span>{currentRace.year || selectedYear}</span>
                  </div>
                  <div>
                    <span className="info-label">競馬場</span>
                    <span>{currentRace.course || "未設定"}</span>
                  </div>
                  <div>
                    <span className="info-label">レース名</span>
                    <span>{currentRace.raceName || "未設定"}</span>
                  </div>
                  <div>
                    <span className="info-label">条件</span>
                    <span>
                      {(currentRace.surface || "")}
                      {currentRace.distance ? `${currentRace.distance}m` : ""}
                      {currentRace.turn ? ` / ${currentRace.turn}` : ""}
                      {currentRace.courseLayout ? ` / ${currentRace.courseLayout}` : ""}
                    </span>
                  </div>
                  <div>
                    <span className="info-label">天候</span>
                    <span>{currentRace.weather || "未設定"}</span>
                  </div>
                  <div>
                    <span className="info-label">馬場</span>
                    <span>
                      {currentRace.track ||
                        currentRace.trackCondition ||
                        "未設定"}
                    </span>
                  </div>
                  <div>
                    <span className="info-label">展開</span>
                    <span>{currentRace.pace || "未設定"}</span>
                  </div>
                  <div className="info-comment">
                    <span className="info-label">コース解説</span>
                    <span>{currentRace.courseComment || "未設定"}</span>
                  </div>
                </div>
              </div>

              <div className="sub-panels">
                {predictions && (
                  <div className="panel">
                    <h2 className="section-title">予想印</h2>
                    <div className="marks-box">
                      {predictions.honmei && (
                        <div className="mark-row">
                          <span className="mark mark-honmei">◎</span>
                          <span>{predictions.honmei}</span>
                        </div>
                      )}
                      {predictions.taikou && (
                        <div className="mark-row">
                          <span className="mark mark-taikou">○</span>
                          <span>{predictions.taikou}</span>
                        </div>
                      )}
                      {predictions.tanana && (
                        <div className="mark-row">
                          <span className="mark mark-tanana">▲</span>
                          <span>{predictions.tanana}</span>
                        </div>
                      )}
                      {predictions.renka && (
                        <div className="mark-row">
                          <span className="mark mark-renka">△</span>
                          <span>{predictions.renka}</span>
                        </div>
                      )}
                      {predictions.ana && (
                        <div className="mark-row">
                          <span className="mark mark-ana">☆</span>
                          <span>{predictions.ana}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {bettingData && (
                  <div className="panel">
                    <h2 className="section-title">買い目</h2>
                    <div className="betting-box">
                      <div>
                        <span className="info-label">券種</span>
                        <span>{bettingData.type}</span>
                      </div>
                      <div>
                        <span className="info-label">1着</span>
                        <span>{bettingData.first}</span>
                      </div>
                      <div>
                        <span className="info-label">2着</span>
                        <span>{bettingData.second}</span>
                      </div>
                      <div>
                        <span className="info-label">3着</span>
                        <span>{bettingData.third}</span>
                      </div>
                      <div>
                        <span className="info-label">点数</span>
                        <span>{bettingData.points}</span>
                      </div>
                      <div>
                        <span className="info-label">金額</span>
                        <span>{bettingData.unit}</span>
                      </div>
                      <div>
                        <span className="info-label">合計</span>
                        <span>{bettingData.total}</span>
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
                    {(currentRace.horses || []).map((horse) => {
                      const horseMark = getHorseMark(horse, currentRace);

                      return (
                        <tr key={horse.number}>
                          <td className="cell-center">
                            {horseMark ? (
                              <span className={getMarkClass(horseMark)}>
                                {horseMark}
                              </span>
                            ) : (
                              ""
                            )}
                          </td>

                          <td className="cell-center">{horse.number}</td>

                          <td>
                            <button
                              onClick={() =>
                                setSelectedHorse({
                                  ...horse,
                                  mark: horseMark,
                                })
                              }
                              className={
                                selectedHorse?.number === horse.number
                                  ? "horse-button active"
                                  : "horse-button"
                              }
                            >
                              {horse.name}
                            </button>
                          </td>

                          <td>{horse.jockey || "未設定"}</td>

                          <td className="style-cell">
                            {getStyleIcon(horse.style)}
                          </td>

                          <td className="cell-right">{horse.odds ?? "-"}</td>
                        </tr>
                      );
                    })}
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
                      <span>{selectedHorse.jockey || "未設定"}</span>
                    </div>
                    <div>
                      <span className="info-label">脚質</span>
                      <span className="detail-style">
                        {getStyleIcon(selectedHorse.style)}{" "}
                        {getStyleLabel(selectedHorse.style)}
                      </span>
                    </div>
                    <div>
                      <span className="info-label">オッズ</span>
                      <span>{selectedHorse.odds ?? "-"}</span>
                    </div>
                  </div>

                  <div className="detail-summary">
                    <span className="info-label">コメント</span>
                    <p>
                      {selectedHorse.comment ||
                        selectedHorse.summary ||
                        selectedHorse.memo ||
                        "コメントは未設定です。"}
                    </p>
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