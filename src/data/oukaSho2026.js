export const oukaSho2026 = {
  raceName: "桜花賞",
  year: 2026,
  course: "阪神",
  distance: 1600,
  surface: "芝",
  turn: "右",
  courseLayout: "外回り",
  trackCondition: "良想定",
  pace: "ミドルペース想定",
  courseComment:
    "阪神芝1600m外回り。直線が長く、先行力だけでなく末脚の持続力も重要。",

  marks: {
    honmei: "◎ スターアニス",
    taikou: "○ ドリームコア",
    tanana: "▲ アランカール",
    renka: "△ フェスティバルヒル",
    ana: "☆ ギャラボーグ",
  },

  betting: {
    type: "3連単フォーメーション",
    first: ["14", "15"],
    second: ["1", "5", "7", "14", "15"],
    third: ["1", "5", "7", "10", "12", "13", "14", "15"],
    points: "48点",
    unit: "各100円",
    total: "4,800円",
  },

  horses: [
    { frame: 1, number: 1, name: "フェスティバルヒル", ageSex: "牝3", jockey: "坂井瑠星", style: "先行", odds: 29.6, mark: "△", comment: "前走完勝で能力証明。先行力と安定感抜群で崩れにくく軸向きの存在。" },
    { frame: 1, number: 2, name: "サンアントワーヌ", ageSex: "牝3", jockey: "荻野極", style: "先行", odds: 63.7, comment: "堅実な走り続くが決め手一歩足りない印象。展開次第で連下候補。" },

    { frame: 2, number: 3, name: "ディアダイヤモンド", ageSex: "牝3", jockey: "戸崎圭太", style: "先行", odds: 18.9, comment: "アネモネS勝ちで勢いあり。差し脚確かで流れ向けば突き抜けも。" },
    { frame: 2, number: 4, name: "エレガンスアスク", ageSex: "牝3", jockey: "岩田望来", style: "先行", odds: 194.2, comment: "近走着順冴えずも素質は高い。人気落ちなら穴で一考の余地あり。" },

    { frame: 3, number: 5, name: "ギャラボーグ", ageSex: "牝3", jockey: "西村淳也", style: "先行", odds: 16.9, mark: "☆", comment: "近走着順冴えずも素質は高い。人気落ちなら穴で一考の余地あり。" },
    { frame: 3, number: 6, name: "アイニードユー", ageSex: "牝3", jockey: "川田将雅", style: "逃げ", odds: 40.6, comment: "安定して脚使えるタイプ。展開ハマれば掲示板以上も十分狙える。" },

    { frame: 4, number: 7, name: "アランカール", ageSex: "牝3", jockey: "武豊", style: "差し", odds: 7.8, mark: "▲", comment: "チューリップ賞勝ちで実績上位。自在性ありG1でも勝ち負け濃厚。" },
    { frame: 4, number: 8, name: "ロンギングセリーズ", ageSex: "牝3", jockey: "石橋脩", style: "逃げ", odds: 83.9, comment: "差し脚鋭く一発の魅力。展開がハマれば上位食い込み可能。" },

    { frame: 5, number: 9, name: "ルールザウェイ", ageSex: "牝3", jockey: "原優介", style: "逃げ", odds: 85.1, comment: "新馬勝ちの素質馬。経験不足もポテンシャル高く一発秘める。" },
    { frame: 5, number: 10, name: "ナムラコスモス", ageSex: "牝3", jockey: "田口貫太", style: "先行", odds: 27.6, comment: "重賞好走で力は通用。安定感あり連下候補として面白い存在。" },

    { frame: 6, number: 11, name: "ジッピーチューン", ageSex: "牝3", jockey: "北村友一", style: "先行", odds: 93.4, comment: "未勝利勝ち後の上昇馬。勢いはあるが相手強化で試金石の一戦。" },
    { frame: 6, number: 12, name: "スウィートハピネス", ageSex: "牝3", jockey: "高杉吏麒", style: "先行", odds: 7.8, comment: "エルフィンS勝ちで実績十分。流れ向けば上位争い可能な一頭。" },

    { frame: 7, number: 13, name: "リリージョワ", ageSex: "牝3", jockey: "浜中俊", style: "逃げ", odds: 5.7, comment: "連勝中で勢い最上位。内容も優秀で一気のG1制覇まである。" },
    { frame: 7, number: 14, name: "ドリームコア", ageSex: "牝3", jockey: "ルメール", style: "差し", odds: 4.1, mark: "○", comment: "重賞連勝で能力上位。完成度高くここでも主役級の存在。" },
    { frame: 7, number: 15, name: "スターアニス", ageSex: "牝3", jockey: "松山弘平", style: "差し", odds: 3.5, mark: "◎", comment: "阪神JF勝ちで実績最上位。完成度・安定感ともに文句なしの本命候補。" },

    { frame: 8, number: 16, name: "ショウナンカリス", ageSex: "牝3", jockey: "池添謙一", style: "差し", odds: 327.0, comment: "近走苦戦続くも能力は秘める。展開ひとつで変わる可能性あり。" },
    { frame: 8, number: 17, name: "ブラックチャリス", ageSex: "牝3", jockey: "津村明秀", style: "先行", odds: 37.5, comment: "重賞勝ちで能力証明済み。展開次第で上位争い可能な実力馬。" },
    { frame: 8, number: 18, name: "プレセピオ", ageSex: "牝3", jockey: "富田暁", style: "先行", odds: 258.9, comment: "近走内容物足りずも末脚は秘める。展開待ちの穴候補。" },
  ],
};