export const victoriaMile2026 = {
  raceName: "ヴィクトリアマイル",
  year: 2026,
  course: "東京",
  distance: 1600,
  surface: "芝",
  turn: "左",
  courseLayout: "芝1600m",
  weather: "晴",
  track: "良",
  trackCondition: "良",
  pace: "ミドルペース想定",
  courseComment:
    "東京芝1600m。直線が長く、瞬発力と持続力の両方が問われるマイルG1。差しも届くが、好位で運べる馬の安定感も重要。",

  marks: {
    honmei: "◎ 12 エンブロイダリー",
    taikou: "○ 8 カムニャック",
    tanana: "▲ 7 クイーンズウォーク",
    renka: "△ 16 ニシノティアモ",
    ana: "☆ 6 ラヴァンダ",
  },

  betting: {
    type: "3連単フォーメーション1,2着軸",
    first: ["12"],
    second: ["6","7", "8", "11", "16", "17"],
    third: ["6","7", "8", "11", "16", "17"],
    points: "60点",
    unit: "各100円",
    total: "6,000円",
  },

  horses: [
    { frame: 1, number: 1, name: "カピリナ", ageSex: "牝5", jockey: "横山典弘", style: "差し", odds: 80.9, mark: "", summary: "人気薄だが末脚勝負。展開が速くなれば浮上余地。" },
    { frame: 1, number: 2, name: "ワイドラトゥール", ageSex: "牝5", jockey: "横山武史", style: "差し", odds: 127.5, mark: "", summary: "後方から脚をためたいタイプ。展開待ち。" },

    { frame: 2, number: 3, name: "マピュース", ageSex: "牝4", jockey: "F.ゴンサルベス", style: "差し", odds: 68.1, mark: "", summary: "差し脚を生かしたい一頭。流れが向けば。" },
    { frame: 2, number: 4, name: "エリカエクスプレス", ageSex: "牝4", jockey: "武豊", style: "先行", odds: 20.6, mark: "", summary: "先行力あり。内目でロスなく運べれば粘り込みも。" },

    { frame: 3, number: 5, name: "ケリフレッドアスク", ageSex: "牝4", jockey: "M.ディー", style: "差し", odds: 90.4, mark: "", summary: "差し脚勝負。展開の助けが欲しい。" },
    { frame: 3, number: 6, name: "ラヴァンダ", ageSex: "牝5", jockey: "岩田望来", style: "先行", odds: 21.0, mark: "", summary: "好位で運べるタイプ。流れひとつで馬券圏も。" },

    { frame: 4, number: 7, name: "クイーンズウォーク", ageSex: "牝5", jockey: "西村淳也", style: "差し", odds: 8.6, mark: "▲", summary: "能力上位。東京マイルで末脚を発揮できれば上位争い。" },
    { frame: 4, number: 8, name: "カムニャック", ageSex: "牝4", jockey: "川田将雅", style: "差し", odds: 5.9, mark: "○", summary: "人気上位。決め手があり、スムーズなら勝ち負け。" },

    { frame: 5, number: 9, name: "ココナッツブラウン", ageSex: "牝6", jockey: "北村友一", style: "差し", odds: 25.9, mark: "", summary: "東京マイルで末脚を生かしたい。展開次第で浮上。" },
    { frame: 5, number: 10, name: "ドロップオブライト", ageSex: "牝7", jockey: "松若風馬", style: "先行", odds: 67.1, mark: "", summary: "前で運べれば粘り込みも。展開の助けが必要。" },

    { frame: 6, number: 11, name: "ボンドガール", ageSex: "牝5", jockey: "丹内祐次", style: "差し", odds: 32.1, mark: "", summary: "末脚は魅力。流れが速くなれば穴で注意。" },
    { frame: 6, number: 12, name: "エンブロイダリー", ageSex: "牝4", jockey: "C.ルメール", style: "差し", odds: 2.1, mark: "◎", summary: "人気の中心。能力上位で、直線勝負なら最有力。" },

    { frame: 7, number: 13, name: "カナテープ", ageSex: "牝7", jockey: "松山弘平", style: "差し", odds: 31.1, mark: "", summary: "差し脚堅実。展開が向けば連下候補。" },
    { frame: 7, number: 14, name: "ジョスラン", ageSex: "牝4", jockey: "戸崎圭太", style: "差し", odds: 21.7, mark: "", summary: "中団から脚を伸ばす形。スムーズなら上位も。" },
    { frame: 7, number: 15, name: "アイサンサン", ageSex: "牝4", jockey: "幸英明", style: "先行", odds: 32.8, mark: "", summary: "先行して粘る形が理想。外めから位置を取れるか。" },

    { frame: 8, number: 16, name: "ニシノティアモ", ageSex: "牝5", jockey: "津村明秀", style: "差し", odds: 11.3, mark: "△", summary: "外枠でも末脚は魅力。展開次第で上位圏。" },
    { frame: 8, number: 17, name: "パラディレーヌ", ageSex: "牝4", jockey: "坂井瑠星", style: "差し", odds: 34.0, mark: "", summary: "差し脚勝負。外からスムーズなら穴で一考。" },
    { frame: 8, number: 18, name: "チェルヴィニア", ageSex: "牝5", jockey: "D.レーン", style: "差し", odds: 18.8, mark: "☆", summary: "実績上位。外枠でも能力で巻き返しに注意。" },
  ],
};