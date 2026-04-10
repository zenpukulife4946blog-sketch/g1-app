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
    third: ["1", "5", "7", "10", "14", "15"],
    points: "32点",
    unit: "各200円",
    total: "6,400円",
  },

  horses: [
    { frame: 1, number: 1, name: "フェスティバルヒル", ageSex: "牝3", jockey: "坂井瑠星", style: "先行", odds: 29.6, mark: "△", comment: "前走ファンタジーSを完勝し能力証明。先行力と安定感が武器で崩れにくく、G1でも軸候補の一頭。" },
    { frame: 1, number: 2, name: "サンアントワーヌ", ageSex: "牝3", jockey: "荻野極", style: "先行", odds: 63.7, comment: "フィリーズレビュー2着で安定感は上位。勝ち切れないが崩れにくく、展開次第で馬券圏内濃厚。" },

    { frame: 2, number: 3, name: "ディアダイヤモンド", ageSex: "牝3", jockey: "戸崎圭太", style: "先行", odds: 18.9, comment: "アネモネS勝ちで桜花賞切符獲得。差し脚鋭く展開ハマれば一気に突き抜ける破壊力あり。" },
    { frame: 2, number: 4, name: "エレガンスアスク", ageSex: "牝3", jockey: "岩田望来", style: "先行", odds: 194.2, comment: "近走結果は物足りないが素質は高い一頭。人気落ちなら一変の可能性秘める穴候補。" },

    { frame: 3, number: 5, name: "ギャラボーグ", ageSex: "牝3", jockey: "西村淳也", style: "先行", odds: 16.9, mark: "☆", comment: "阪神JF4着で能力はG1級。経験値と安定感あり、展開次第で一気の上位進出も十分可能。" },
    { frame: 3, number: 6, name: "アイニードユー", ageSex: "牝3", jockey: "川田将雅", style: "逃げ", odds: 40.6, comment: "フィリーズレビュー3着で安定感示す。末脚確実で展開ひとつで上位進出狙える堅実タイプ。" },

    { frame: 4, number: 7, name: "アランカール", ageSex: "牝3", jockey: "武豊", style: "差し", odds: 7.8, mark: "▲", comment: "チューリップ賞3着、阪神JF5着でも素質は上位。人気を背負った実績からも巻き返し十分。" },
    { frame: 4, number: 8, name: "ロンギングセリーズ", ageSex: "牝3", jockey: "石橋脩", style: "逃げ", odds: 83.9, comment: "フィリーズレビュー4着と安定感あり。鋭い差し脚で展開ハマれば上位進出狙える一頭。" },

    { frame: 5, number: 9, name: "ルールザウェイ", ageSex: "牝3", jockey: "原優介", style: "逃げ", odds: 85.1, comment: "未勝利勝ちで勢いあり素質は感じる一頭。経験不足も能力未知で一発の可能性秘める。" },
    { frame: 5, number: 10, name: "ナムラコスモス", ageSex: "牝3", jockey: "田口貫太", style: "先行", odds: 27.6, comment: "チューリップ賞2着で力示す実力馬。安定感あり展開次第で上位争い可能な一頭。" },

    { frame: 6, number: 11, name: "ジッピーチューン", ageSex: "牝3", jockey: "北村友一", style: "先行", odds: 93.4, comment: "未勝利勝ちで勢いある上昇馬。相手強化も未知の魅力あり一発の可能性秘める。" },
    { frame: 6, number: 12, name: "スウィートハピネス", ageSex: "牝3", jockey: "高杉吏麒", style: "先行", odds: 7.8, comment: "エルフィンS勝ちで勢い十分。差し脚確かで流れハマれば上位争い可能な一頭。" },

    { frame: 7, number: 13, name: "リリージョワ", ageSex: "牝3", jockey: "浜中俊", style: "逃げ", odds: 5.7, comment: "フラワーC勝ちで勢い最上位。先行力と粘り強さあり、流れ次第で一気のG1制覇も狙える。" },
    { frame: 7, number: 14, name: "ドリームコア", ageSex: "牝3", jockey: "ルメール", style: "差し", odds: 4.1, mark: "○", comment: "クイーンC勝ちで能力証明。完成度高く安定感抜群で崩れにくく、桜花賞でも勝ち負け濃厚。" },
    { frame: 7, number: 15, name: "スターアニス", ageSex: "牝3", jockey: "松山弘平", style: "差し", odds: 3.5, mark: "◎", comment: "阪神JF勝ちの世代女王。完成度と安定感ともに最上位で崩れにくく、桜花賞でも勝ち負け必至。" },

    { frame: 8, number: 16, name: "ショウナンカリス", ageSex: "牝3", jockey: "池添謙一", style: "差し", odds: 327.0, comment: "近走は着順平凡も崩れてはいない。展開ひとつで浮上可能で、人気落ちなら狙いたい穴候補。" },
    { frame: 8, number: 17, name: "ブラックチャリス", ageSex: "牝3", jockey: "津村明秀", style: "先行", odds: 37.5, comment: "フェアリーS勝ちでマイル適性を証明。重賞で安定して走れており、流れ次第で上位争い可能。" },
    { frame: 8, number: 18, name: "プレセピオ", ageSex: "牝3", jockey: "富田暁", style: "先行", odds: 258.9, comment: "未勝利勝ち直後で勢いあるが重賞では苦戦。展開の助けが必要で一発狙いの穴候補。" },
  ],
};