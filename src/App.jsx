import "./App.css";
import { useMemo, useState } from "react";
import { oukaSho2026 } from "./data/oukaSho2026";

// 必要なら今後ここに追加
// import { osakaHai2026 } from "./data/osakaHai2026";

const raceDataMap = {
  "2026": {
    阪神: {
      桜花賞: oukaSho2026,
      // 大阪杯: osakaHai2026,
    },
  },
};

const markColorClass = {
  "◎": "mark mark-gold",
  "○": "mark mark-blue",
  "▲": "mark mark-red",
  "△": "mark mark-orange",
  "☆": "mark mark-purple",
};

function getMarkForHorse(horseName, predictions) {
  if (!predictions) return null;

  const entries = [
    { mark: "◎", name: predictions.honmei },
    { mark: "○", name: predictions.taiko },
    { mark: "▲", name: predictions.tanana },
    { mark: "△", name: predictions.renka },
    { mark: "☆", name: predictions.hoshi },
  ];

  const found = entries.find((item) => item.name === horseName);
  return found ? found.mark : null;
}

function getStyleLabel(style) {
  switch (style) {
    case "逃げ":
      return "◀︎◁◁◁ 逃げ";
    case "先行":
      return "◁◀︎◁◁ 先行";
    case "差し":
      return "◁◁◀︎◁ 差し";
    case "追込":
      return "◁◁◁◀︎ 追込";
    default:
      return style || "-";
  }
}

function App() {
  const years = Object.keys(raceDataMap);
  const [selectedYear, setSelectedYear] = useState(years[0] || "");

  const courses = selectedYear ? Object.keys(raceDataMap[selectedYear] || {}) : [];
  const [selectedCourse, setSelectedCourse] = useState(courses[0] || "");

  const races =
    selectedYear && selectedCourse
      ? Object.keys(raceDataMap[selectedYear]?.[selectedCourse] || {})
      : [];
  const [selectedRace, setSelectedRace] = useState(races[0] || "");

  const currentRaceData = useMemo(() => {
    if (!selectedYear || !selectedCourse || !selectedRace) return null;
    return raceDataMap[selectedYear]?.[selectedCourse]?.[selectedRace] || null;
  }, [selectedYear, selectedCourse, selectedRace]);

  const handleYearChange = (e) => {
    const newYear = e.target.value;
    const newCourses = Object.keys(raceDataMap[newYear] || {});
    const newCourse = newCourses[0] || "";
    const newRaces = Object.keys(raceDataMap[newYear]?.[newCourse] || {});
    const newRace = newRaces[0] || "";

    setSelectedYear(newYear);
    setSelectedCourse(newCourse);
    setSelectedRace(newRace);
  };

  const handleCourseChange = (e) => {
    const newCourse = e.target.value;
    const newRaces = Object.keys(raceDataMap[selectedYear]?.[newCourse] || {});
    const newRace = newRaces[0] || "";

    setSelectedCourse(newCourse);
    setSelectedRace(newRace);
  };

  const handleRaceChange = (e) => {
    setSelectedRace(e.target.value);
  };

  if (!currentRaceData) {
    return (
      <div className="app">
        <div className="hero-card">
          <p className="hero-badge">G1 INFO APP</p>
          <h1 className="hero-title">G1情報アプリ</h1>
          <p className="hero-subtitle">レースデータが見つかりません。</p>
        </div>
      </div>
    );
  }

  const predictions = currentRaceData.predictions || {};
  const betting = currentRaceData.betting || {};

  const horsesWithMark = (currentRaceData.horses || []).map((horse) => ({
    ...horse,
    mark: getMarkForHorse(horse.name, predictions),
  }));

  const featuredHorses = horsesWithMark.filter((horse) => horse.mark);
  const allHorses = horsesWithMark;

  return (
    <div className="app">
      <div className="hero-card">
        <p className="hero-badge">G1 INFO APP</p>
        <h1 className="hero-title">G1情報アプリ</h1>
        <p className="hero-subtitle">
          レースを選んで、予想印・買い目・出馬表をスマホで見やすくチェック
        </p>
      </div>

      <section className="section-card">
        <div className="section-header">
          <h2 className="section-title">レース選択</h2>
          <p className="section-desc">年・競馬場・レース名を選択してください</p>
        </div>

        <div className="select-group">
          <div className="input-block">
            <label className="input-label">年</label>
            <select value={selectedYear} onChange={handleYearChange}>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}年
                </option>
              ))}
            </select>
          </div>

          <div className="input-block">
            <label className="input-label">競馬場</label>
            <select value={selectedCourse} onChange={handleCourseChange}>
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          <div className="input-block">
            <label className="input-label">レース名</label>
            <select value={selectedRace} onChange={handleRaceChange}>
              {races.map((race) => (
                <option key={race} value={race}>
                  {race}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="section-card">
        <div className="section-header">
          <h2 className="section-title">レース概要</h2>
        </div>

        <div className="overview-grid">
          <div className="overview-item">
            <span className="overview-label">年</span>
            <span className="overview-value">{selectedYear}年</span>
          </div>
          <div className="overview-item">
            <span className="overview-label">競馬場</span>
            <span className="overview-value">{currentRaceData.course}</span>
          </div>
          <div className="overview-item">
            <span className="overview-label">レース名</span>
            <span className="overview-value">{currentRaceData.raceName}</span>
          </div>
          <div className="overview-item">
            <span className="overview-label">コース</span>
            <span className="overview-value">{currentRaceData.surface}</span>
          </div>
          <div className="overview-item">
            <span className="overview-label">距離</span>
            <span className="overview-value">{currentRaceData.distance}m</span>
          </div>
        </div>
      </section>

      <section className="section-card">
        <div className="section-header">
          <h2 className="section-title">予想印</h2>
          <p className="section-desc">注目馬を先にチェック</p>
        </div>

        <div className="prediction-list">
          {predictions.honmei && (
            <div className="prediction-row">
              <span className={markColorClass["◎"]}>◎</span>
              <span className="prediction-horse">{predictions.honmei}</span>
            </div>
          )}
          {predictions.taiko && (
            <div className="prediction-row">
              <span className={markColorClass["○"]}>○</span>
              <span className="prediction-horse">{predictions.taiko}</span>
            </div>
          )}
          {predictions.tanana && (
            <div className="prediction-row">
              <span className={markColorClass["▲"]}>▲</span>
              <span className="prediction-horse">{predictions.tanana}</span>
            </div>
          )}
          {predictions.renka && (
            <div className="prediction-row">
              <span className={markColorClass["△"]}>△</span>
              <span className="prediction-horse">{predictions.renka}</span>
            </div>
          )}
          {predictions.hoshi && (
            <div className="prediction-row">
              <span className={markColorClass["☆"]}>☆</span>
              <span className="prediction-horse">{predictions.hoshi}</span>
            </div>
          )}
        </div>
      </section>

      <section className="section-card">
        <div className="section-header">
          <h2 className="section-title">買い目</h2>
        </div>

        <div className="betting-box">
          <div className="betting-main">
            <span className="betting-type">{betting.type || "三連単フォーメーション"}</span>
            {betting.amount && <span className="betting-amount">{betting.amount}</span>}
          </div>

          {betting.formation && (
            <div className="formation-card">
              <div className="formation-row">
                <span className="formation-label">1着</span>
                <span className="formation-value">{betting.formation.first}</span>
              </div>
              <div className="formation-row">
                <span className="formation-label">2着</span>
                <span className="formation-value">{betting.formation.second}</span>
              </div>
              <div className="formation-row">
                <span className="formation-label">3着</span>
                <span className="formation-value">{betting.formation.third}</span>
              </div>
            </div>
          )}

          {betting.points && (
            <div className="betting-subinfo">
              <span className="sub-chip">点数: {betting.points}</span>
            </div>
          )}
        </div>
      </section>

      {featuredHorses.length > 0 && (
        <section className="section-card">
          <div className="section-header">
            <h2 className="section-title">注目馬</h2>
            <p className="section-desc">印付きの馬を先に表示</p>
          </div>

          <div className="horse-list">
            {featuredHorses.map((horse) => (
              <div className={`horse-card featured featured-${horse.mark || "none"}`} key={`featured-${horse.number}`}>
                <div className="horse-top">
                  <div className="number-badge">{horse.number}</div>
                  <div className="horse-main">
                    <div className="horse-name-row">
                      <h3 className="horse-name">{horse.name}</h3>
                      {horse.mark && <span className={markColorClass[horse.mark]}>{horse.mark}</span>}
                    </div>
                    <div className="horse-meta">
                      <span className="meta-chip">騎手: {horse.jockey || "-"}</span>
                      <span className="meta-chip">脚質: {getStyleLabel(horse.style)}</span>
                      <span className="meta-chip">オッズ: {horse.odds ?? "-"}</span>
                    </div>
                  </div>
                </div>

                {horse.comment && <p className="horse-comment">{horse.comment}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="section-card">
        <div className="section-header">
          <h2 className="section-title">出馬表</h2>
          <p className="section-desc">スマホで見やすいカード表示</p>
        </div>

        <div className="horse-list">
          {allHorses.map((horse) => (
            <div className={`horse-card ${horse.mark ? `featured-${horse.mark}` : ""}`} key={horse.number}>
              <div className="horse-top">
                <div className="number-badge">{horse.number}</div>

                <div className="horse-main">
                  <div className="horse-name-row">
                    <h3 className="horse-name">{horse.name}</h3>
                    {horse.mark && <span className={markColorClass[horse.mark]}>{horse.mark}</span>}
                  </div>

                  <div className="horse-meta">
                    <span className="meta-chip">騎手: {horse.jockey || "-"}</span>
                    <span className="meta-chip">脚質: {getStyleLabel(horse.style)}</span>
                    <span className="meta-chip">オッズ: {horse.odds ?? "-"}</span>
                  </div>
                </div>
              </div>

              {horse.comment && <p className="horse-comment">{horse.comment}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;