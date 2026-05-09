export const nhkMileCup2026 = {
  raceName: "NHKマイルカップ",
  year: 2026,
  course: "東京",
  distance: 1600,
  surface: "芝",
  turn: "左",
  courseLayout: "芝1600m",
  weather: "晴",
  track: "良",
  trackCondition: "良",
  pace: "ミドル〜ハイペース想定",
  courseComment:
    "東京芝1600m。直線が長く、スピードの持続力と末脚の質が問われるコース。差し・追込も届きやすいが、好位で運べる馬も有利。",

  marks: {
    honmei: "◎ 11 アドマイヤクワッズ",
    taikou: "○ 10 エコロアルバ",
    tanana: "▲ 7 ダイヤモンドノット",
    renka: "△ 16 アスクイキゴミ",
    ana: "☆ 12 アンドゥーリル",
  },

  betting: {
    type: "3連単軸1頭マルチ",
    first: ["11"],
    second: ["7", "10", "12", "16", "17"],
    third: [],
    points: "60点",
    unit: "各100円",
    total: "6,000円",
  },

  horses: [
    { frame: 1, number: 1, name: "リゾートアイランド", ageSex: "牡3", jockey: "佐々木大輔", style: "差し", odds: 105.2, mark: "", summary: "人気薄だが末脚勝負。展開が速くなれば浮上余地。" },
    { frame: 1, number: 2, name: "ユウファラオ", ageSex: "牡3", jockey: "松若風馬", style: "先行", odds: 91.6, mark: "", summary: "前で運べるタイプ。粘り込みには展開の助けが必要。" },

    { frame: 2, number: 3, name: "オルネーロ", ageSex: "牡3", jockey: "津村明秀", style: "差し", odds: 45.4, mark: "", summary: "差し脚を生かしたい一頭。直線勝負でどこまで。" },
    { frame: 2, number: 4, name: "カヴァレリッツォ", ageSex: "牡3", jockey: "西村淳也", style: "先行", odds: 7.7, mark: "", summary: "好位で運べる安定型。展開ひとつで上位争い。" },

    { frame: 3, number: 5, name: "ギリーズボール", ageSex: "牝3", jockey: "西塚洸二", style: "差し", odds: 32.1, mark: "", summary: "牝馬ながら切れ味あり。差しが届く流れなら注意。" },
    { frame: 3, number: 6, name: "ジーネキング", ageSex: "牡3", jockey: "斎藤新", style: "先行", odds: 29.9, mark: "", summary: "先行して粘る形が理想。内目でロスなく運びたい。" },

    { frame: 4, number: 7, name: "ダイヤモンドノット", ageSex: "牡3", jockey: "川田将雅", style: "差し", odds: 5.1, mark: "△", summary: "人気上位。東京マイルで末脚を発揮できれば主役候補。" },
    { frame: 4, number: 8, name: "ローベルクランツ", ageSex: "牡3", jockey: "松山弘平", style: "差し", odds: 24.6, mark: "", summary: "中団から脚を伸ばす形。展開が向けば馬券圏も。" },

    { frame: 5, number: 9, name: "サンダーストラック", ageSex: "牡3", jockey: "C.ルメール", style: "差し", odds: 18.7, mark: "", summary: "鞍上魅力。折り合って末脚を使えれば怖い存在。" },
    { frame: 5, number: 10, name: "エコロアルバ", ageSex: "牡3", jockey: "横山和生", style: "先行", odds: 5.1, mark: "○", summary: "先行力と安定感が魅力。展開を味方にできれば勝ち負け。" },

    { frame: 6, number: 11, name: "アドマイヤクワッズ", ageSex: "牡3", jockey: "坂井瑠星", style: "差し", odds: 10.5, mark: "◎", summary: "能力は上位圏。スムーズなら連下候補として警戒。" },
    { frame: 6, number: 12, name: "アンドゥーリル", ageSex: "牡3", jockey: "岩田望来", style: "差し", odds: 18.8, mark: "☆", summary: "中団待機から直線勝負。流れが向けば一発も。" },

    { frame: 7, number: 13, name: "ハッピーエンジェル", ageSex: "牝3", jockey: "三浦皇成", style: "追込", odds: 88.6, mark: "", summary: "後方から脚をためる形。展開待ちの穴候補。" },
    { frame: 7, number: 14, name: "バルセシート", ageSex: "牡3", jockey: "北村友一", style: "差し", odds: 18.8, mark: "", summary: "外めから脚を使う形。直線でスムーズなら上位も。" },
    { frame: 7, number: 15, name: "レザベーション", ageSex: "牡3", jockey: "原優介", style: "差し", odds: 30.9, mark: "", summary: "差し脚勝負。展開が速くなれば浮上余地あり。" },

    { frame: 8, number: 16, name: "アスクイキゴミ", ageSex: "牡3", jockey: "戸崎圭太", style: "先行", odds: 10.2, mark: "▲", summary: "外枠でも先行力あり。スムーズなら穴で面白い。" },
    { frame: 8, number: 17, name: "ロデオドライブ", ageSex: "牡3", jockey: "D.レーン", style: "差し", odds: 6.1, mark: "", summary: "能力上位。外から長く脚を使えれば勝ち負け。" },
    { frame: 8, number: 18, name: "フクチャンショウ", ageSex: "牡3", jockey: "横山武史", style: "差し", odds: 38.7, mark: "", summary: "外枠から差し狙い。展開の助けがあれば馬券圏も。" },
  ],
};