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

  const getHorseComment = (horse) => {
    if (!horse) return "コメントは未設定です。";

    return (
      horse.comment ||
      horse.summary ||
      horse.memo ||
      horse.analysis ||
      horse.shortComment ||
      horse.note ||
      "コメントは未設定です。"
    );
  };

  const getHorseMark = (horse) => {
    if (!currentRace?.marks) return "";

    const honmei = currentRace.marks.honmei?.replace("◎ ", "").trim();
    const taikou = currentRace.marks.taikou?.replace("○ ", "").trim();
    const tanana = currentRace.marks.tanana?.replace("▲ ", "").trim();
    const renka = currentRace.marks.renka?.replace("△ ", "").trim();
    const ana = currentRace.marks.ana?.replace("☆ ", "").trim();

    if (horse.name === honmei) return "◎";
    if (horse.name === taikou) return "○";
    if (horse.name === tanana) return "▲";
    if (horse.name === renka) return "△";
    if (horse.name === ana) return "☆";

    return horse.mark || "";
  };

  const handleLoadRace = () => {
    if (!selectedRaceKey) return;
    const race = raceMap[selectedRaceKey];
    setCurrentRace(race);
    setSelectedHorse(null);
  };

  const handleHorseClick = (horse) => {
    const enrichedHorse = {
      ...horse,
      mark: getHorseMark(horse),
    };

    setSelectedHorse(enrichedHorse);

    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div className="app">
      <div className="container">
        <header className="page-header">
          <h1>G1情報アプリ</h1>
          <p className="page-subtitle">
            競馬場とレースを選んで、予想印・買い目・出馬表を確認
          </p>
        </header>

        <section className="panel">
          <h2 className="section-title">レース選択</h2>

          <div className="filters">
            <div className="field">
              <label>競馬場</label>
              <select
                value={selectedCourse}
                onChange={(e) => {
                  setSelectedCourse(e.target.value);
                  setSelectedRaceKey("");
                  setCurrentRace(null);
                  setSelectedHorse(null);
                }}
              >
                <option value="">競馬場を選択</option>
                <option value="阪神">阪神</option>
                <option value="中山">中山</option>
              </select>
            </div>

            <div className="field">
              <label>レース名</label>
              <select
                value={selectedRaceKey}
                onChange={(e) => {
                  setSelectedRaceKey(e.target.value);
                  setCurrentRace(null);
                  setSelectedHorse(null);
                }}
                disabled={!selectedCourse}
              >
                <option value="">レースを選択</option>
                {raceOptions.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
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
                表示
              </button>
            </div>
          </div>
        </section>

        {currentRace && (
          <>
            <section className="panel">
              <h2 className="section-title">レース概要</h2>

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
                <div>{currentRace.weather || "晴れ"}</div>

                <div>馬場</div>
                <div>
                  {currentRace.track ||
                    currentRace.trackCondition ||
                    "未設定"}
                </div>

                <div>展開</div>
                <div>{currentRace.pace}</div>

                <div>コース解説</div>
                <div className="course-comment">{currentRace.courseComment}</div>
              </div>
            </section>

            {currentRace.marks && (
              <section className="panel">
                <h2 className="section-title">予想印</h2>
                <div className="marks-box">
                  <div className="mark-item mark-red">
                    ◎ {currentRace.marks.honmei}
                  </div>
                  <div className="mark-item mark-blue">
                    ○ {currentRace.marks.taikou}
                  </div>
                  <div className="mark-item mark-green">
                    ▲ {currentRace.marks.tanana}
                  </div>
                  <div className="mark-item mark-orange">
                    △ {currentRace.marks.renka}
                  </div>
                  <div className="mark-item mark-purple">
                    ☆ {currentRace.marks.ana}
                  </div>
                </div>
              </section>
            )}

            {currentRace.betting && (
              <section className="panel">
                <h2 className="section-title">買い目</h2>
                <div className="betting-box">
                  <div>券種: {currentRace.betting.type}</div>
                  <div>1着: {currentRace.betting.first?.join(", ")}</div>
                  <div>2着: {currentRace.betting.second?.join(", ")}</div>
                  <div>3着: {currentRace.betting.third?.join(", ")}</div>
                  {currentRace.betting.points && (
                    <div>点数: {currentRace.betting.points}</div>
                  )}
                  {currentRace.betting.unit && (
                    <div>金額: {currentRace.betting.unit}</div>
                  )}
                  {currentRace.betting.total && (
                    <div>合計: {currentRace.betting.total}</div>
                  )}
                </div>
              </section>
            )}

            <section className="panel">
              <h2 className="section-title">出馬表</h2>

              {(currentRace.horses || []).map((horse) => (
                <div
                  key={horse.number}
                  className="horse-card"
                  onClick={() => handleHorseClick(horse)}
                >
                  <div className="horse-card-top">
                    <div className="horse-name">
                      {horse.number} {horse.name}
                    </div>
                    {getHorseMark(horse) && (
                      <div className="horse-mark-badge">{getHorseMark(horse)}</div>
                    )}
                  </div>
                  <div className="horse-meta">騎手: {horse.jockey}</div>
                  <div className="horse-meta">
                    脚質: {getStyleIcon(horse.style)} {horse.style}
                  </div>
                  <div className="horse-meta">オッズ: {horse.odds ?? "-"}</div>
                </div>
              ))}
            </section>

            <section className="panel" ref={detailRef}>
              <h2 className="section-title">馬詳細</h2>

              {selectedHorse ? (
                <div className="horse-detail">
                  <div className="detail-title">{selectedHorse.name}</div>

                  <div className="detail-grid">
                    <div>
                      <span className="info-label">印</span>
                      <span>{selectedHorse.mark || "なし"}</span>
                    </div>
                    <div>
                      <span className="info-label">騎手</span>
                      <span>{selectedHorse.jockey}</span>
                    </div>
                    <div>
                      <span className="info-label">脚質</span>
                      <span>
                        {getStyleIcon(selectedHorse.style)} {selectedHorse.style}
                      </span>
                    </div>
                    <div>
                      <span className="info-label">オッズ</span>
                      <span>{selectedHorse.odds ?? "-"}</span>
                    </div>
                  </div>

                  <div className="detail-summary">
                    <span className="info-label">コメント</span>
                    <p>{getHorseComment(selectedHorse)}</p>
                  </div>
                </div>
              ) : (
                <div className="empty-message">
                  馬名をクリックすると、ここにコメントが表示されます。
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