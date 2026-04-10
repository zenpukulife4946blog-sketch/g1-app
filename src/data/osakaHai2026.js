export const osakaHai2026 = {
  raceName: "大阪杯",
  year: 2026,
  course: "阪神",
  distance: 2000,
  surface: "芝",
  turn: "右",
  courseLayout: "内回り",
  weather: "晴",
  track: "良",
  trackCondition: "良",
  pace: "ミドルペース想定",
  courseComment:
    "阪神芝2000m内回り。先行力と立ち回りが重要で、4コーナーでの位置取りが結果に直結しやすいコース。",

  marks: {
    honmei: "◎ メイショウタバル",
    taikou: "○ クロワデュノール",
    tanana: "▲ ダノンデサイル",
    renka: "△ ショウヘイ",
    ana: "☆ レーベンスティール",
  },

  betting: {
    type: "3連単フォーメーション",
    first: ["6"],
    second: ["4", "5", "12", "15"],
    third: ["3", "4", "5", "7", "11", "12", "15"],
    points: "24点",
    unit: "各300円",
    total: "7,200円",
  },

  horses: [
    { frame: 1, number: 1, name: "サンストックトン", ageSex: "牡7", jockey: "高杉吏麒", style: "追込", odds: 336.7, mark: "", summary: "後方から脚をためる形。展開が速くなれば浮上余地。" },

    { frame: 2, number: 2, name: "マテンロウレオ", ageSex: "牡7", jockey: "横山典弘", style: "差し", odds: 66.7, mark: "", summary: "差し脚質。展開待ちだが流れれば台頭。" },
    { frame: 2, number: 3, name: "セイウンハーデス", ageSex: "牡7", jockey: "幸英明", style: "先行", odds: 64.9, mark: "", summary: "先行してしぶとさを発揮。" },

    { frame: 3, number: 4, name: "ダノンデサイル", ageSex: "牡5", jockey: "坂井瑠星", style: "差し", odds: 3.9, mark: "▲", summary: "好位差し。展開合えば勝ち負け。" },
    { frame: 3, number: 5, name: "ショウヘイ", ageSex: "牡4", jockey: "川田将雅", style: "先行", odds: 6.1, mark: "△", summary: "先行力あり。展開向けば粘り込み。" },

    { frame: 4, number: 6, name: "メイショウタバル", ageSex: "牡5", jockey: "武豊", style: "逃げ", odds: 4.8, mark: "◎", summary: "逃げて展開支配。単騎なら粘り込み濃厚。" },
    { frame: 4, number: 7, name: "エコロディノス", ageSex: "牡4", jockey: "池添謙一", style: "先行", odds: 44.9, mark: "", summary: "先行して残り目狙い。" },

    { frame: 5, number: 8, name: "エコロヴァルツ", ageSex: "牡5", jockey: "浜中俊", style: "差し", odds: 45.4, mark: "", summary: "差し脚。流れが向けば浮上。" },
    { frame: 5, number: 9, name: "ヨーホーレイク", ageSex: "牡8", jockey: "西村淳也", style: "差し", odds: 68.0, mark: "", summary: "末脚勝負。展開依存。" },

    { frame: 6, number: 10, name: "ボルドグフーシュ", ageSex: "牡7", jockey: "松山弘平", style: "追込", odds: 162.1, mark: "", summary: "後方一気型。展開待ち。" },
    { frame: 6, number: 11, name: "デビットバローズ", ageSex: "セ7", jockey: "岩田望来", style: "先行", odds: 58.9, mark: "", summary: "先行して器用に立ち回る。" },

    { frame: 7, number: 12, name: "レーベンスティール", ageSex: "牡6", jockey: "C.ルメール", style: "差し", odds: 9.9, mark: "☆", summary: "差し脚堅実。展開次第で上位。" },
    { frame: 7, number: 13, name: "ファウストラーゼン", ageSex: "牡4", jockey: "岩田康誠", style: "先行", odds: 102.1, mark: "", summary: "前残りなら注意。" },

    { frame: 8, number: 14, name: "タガノデュード", ageSex: "牡5", jockey: "古川吉洋", style: "追込", odds: 113.2, mark: "", summary: "後方から差し狙い。" },
    { frame: 8, number: 15, name: "クロワデュノール", ageSex: "牡4", jockey: "北村友一", style: "差し", odds: 2.5, mark: "○", summary: "能力上位。展開向けば最有力。" },
  ],
};
