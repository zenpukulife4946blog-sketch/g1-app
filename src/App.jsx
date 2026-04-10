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

  const years = useMemo(() => {
    return [...new Set(raceCatalog.map((race) => race.year))];
  }, [raceCatalog]);

  const courses = useMemo(() => {
    if (!selectedYear) return [];
    return [
      ...new Set(
        raceCatalog
          .filter((race) => race.year === selectedYear)
          .map((race) => race.course)
      ),
    ];
  }, [selectedYear, raceCatalog]);

  const raceOptions = useMemo(() => {
    if (!selectedYear || !selectedCourse) return [];
    return raceCatalog.filter(
      (race) => race.year === selectedYear && race.course === selectedCourse
    );
  }, [selectedYear, selectedCourse, raceCatalog]);

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

  const stripMarkSymbol = (value = "", symbol = "") => {
    return value.replace(symbol, "").trim();
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
    if (horse.mark) return horse.mark;
    if (!currentRace?.marks) return "";

    const honmei = stripMarkSymbol(currentRace.marks.honmei || "", "◎");
    const taikou = stripMarkSymbol(currentRace.marks.taikou || "", "○");
    const tanana = stripMarkSymbol(currentRace.marks.tanana || "", "▲");
    const renka = stripMarkSymbol(currentRace.marks.renka || "", "△");
    const ana = stripMarkSymbol(currentRace.marks.ana || "", "☆");

    if (horse.name === honmei) return "◎";
    if (horse.name === taikou) return "○";
    if (horse.name === tanana) return "▲";
    if (horse.name === renka) return "△";
    if (horse.name === ana) return "☆";
    return "";
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setSelectedCourse("");
    setSelectedRaceKey("");
    setCurrentRace(null);
    setSelectedHorse(null);
  };

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
    setSelectedRaceKey("");
    setCurrentRace(null);
    setSelectedHorse(null);
  };

  const handleRaceChange = (e) => {
    setSelectedRaceKey(e.target.value);
    setCurrentRace(null);
    setSelectedHorse(null);
  };

  const handleLoadRace = () => {
    const foundRace = raceCatalog.find(
      (race) =>
        race.year === selectedYear &&
        race.course === selectedCourse &&
        race.key === selectedRaceKey
    );

    if (!foundRace) return;

    setCurrentRace(foundRace.data);
    setSelectedHorse(null);
  };

  const handleHorseClick = (horse) => {
    setSelectedHorse({
      ...horse,
      mark: getHorseMark(horse),
    });

    setTimeout(() => {
      detailRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <div className="app">
      <div className="container">
        <header className="page-header">
          <h1>G1情報アプリ</h1>
          <p className="page-subtitle">
            年・競馬場・レース名を選んで、予想印・買い目・出馬表を確認
          </p>
        </header>

        <section className="panel">
          <h2 className="section-title">レース選択</h2>

          <div className="filters">
            <div className="field">
              <label>年</label>
              <select value={selectedYear} onChange={handleYearChange}>
                <option value="">年を選択</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}年
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>競馬場</label>
              <select
                value={selectedCourse}
                onChange={handleCourseChange}
                disabled={!selectedYear}
              >
                <option value="">競馬場を選択</option>
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
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
                  <option key={race.key} value={race.key}>
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
                disabled={!selectedYear || !selectedCourse || !selectedRaceKey}
              >
                情報表示
              </button>
            </div>
          </div>
        </section>

        {currentRace && (
          <>
            <section className="panel">
              <h2 className="section-title strong-title">レース概要</h2>

              <div className="race-grid">
                <div className="grid-label">年</div>
                <div className="grid-value">{selectedYear}年</div>

                <div className="grid-label">競馬場</div>
                <div className="grid-value">{currentRace.course}競馬場</div>

                <div className="grid-label">レース名</div>
                <div className="grid-value">{currentRace.raceName}</div>

                <div className="grid-label">条件</div>
                <div className="grid-value">
                  {currentRace.surface}
                  {currentRace.distance}m / {currentRace.turn} /{" "}
                  {currentRace.courseLayout}
                </div>

                <div className="grid-label">天候</div>
                <div className="grid-value">{currentRace.weather || "晴れ"}</div>

                <div className="grid-label">馬場</div>
                <div className="grid-value">
                  {currentRace.track || currentRace.trackCondition || "未設定"}
                </div>

                <div className="grid-label">展開</div>
                <div className="grid-value">{currentRace.pace || "未設定"}</div>

                <div className="grid-label">コース解説</div>
                <div className="grid-value course-comment">
                  {currentRace.courseComment || "未設定"}
                </div>
              </div>
            </section>

            {currentRace.marks && (
              <section className="panel">
                <h2 className="section-title strong-title">予想印</h2>

                <div className="marks-box">
                  <div className="mark-item mark-red">
                    <span className="mark-symbol">◎</span>
                    <span>{stripMarkSymbol(currentRace.marks.honmei || "", "◎")}</span>
                  </div>
                  <div className="mark-item mark-blue">
                    <span className="mark-symbol">○</span>
                    <span>{stripMarkSymbol(currentRace.marks.taikou || "", "○")}</span>
                  </div>
                  <div className="mark-item mark-green">
                    <span className="mark-symbol">▲</span>
                    <span>{stripMarkSymbol(currentRace.marks.tanana || "", "▲")}</span>
                  </div>
                  <div className="mark-item mark-orange">
                    <span className="mark-symbol">△</span>
                    <span>{stripMarkSymbol(currentRace.marks.renka || "", "△")}</span>
                  </div>
                  <div className="mark-item mark-purple">
                    <span className="mark-symbol">☆</span>
                    <span>{stripMarkSymbol(currentRace.marks.ana || "", "☆")}</span>
                  </div>
                </div>
              </section>
            )}

            {currentRace.betting && (
              <section className="panel">
                <h2 className="section-title strong-title">買い目</h2>

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
              <h2 className="section-title strong-title">出馬表</h2>

              <div className="horse-card-list">
                {(currentRace.horses || []).map((horse) => (
                  <button
                    key={horse.number}
                    type="button"
                    className="horse-card"
                    onClick={() => handleHorseClick(horse)}
                  >
                    <div className="horse-row-top">
                      <span className="horse-number">{horse.number}</span>
                      <span className="horse-name">{horse.name}</span>
                      <span className="horse-style">{getStyleIcon(horse.style)}</span>
                      <span className="horse-odds">
                        単 {horse.odds ?? "-"}
                      </span>
                    </div>
                    <div className="horse-row-bottom">{horse.jockey || "未設定"}</div>
                  </button>
                ))}
              </div>
            </section>

            <section className="panel" ref={detailRef}>
              <h2 className="section-title strong-title">馬詳細</h2>

              {selectedHorse ? (
                <div className="horse-detail">
                  <div className="detail-title">
                    {selectedHorse.mark ? `${selectedHorse.mark} ` : ""}
                    {selectedHorse.name}
                  </div>

                  <div className="detail-grid">
                    <div>
                      <span className="info-label">騎手</span>
                      <span>{selectedHorse.jockey || "未設定"}</span>
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
                    <div>
                      <span className="info-label">印</span>
                      <span>{selectedHorse.mark || "なし"}</span>
                    </div>
                  </div>

                  <div className="detail-summary">
                    <span className="info-label">コメント</span>
                    <p>{getHorseComment(selectedHorse)}</p>
                  </div>
                </div>
              ) : (
                <div className="empty-message">
                  馬カードをクリックすると、ここにコメントが表示されます。
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