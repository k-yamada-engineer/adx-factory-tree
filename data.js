const AI={cl:["Claude","--cl"],i2:["Image2.0","--i2"],nb:["NanoBanana","--nb"],sd:["Seedance","--sd"],vo:["音声/HeyGen","--vo"],co:["AI審議会","--co"],ceo:["CEO","--ceo"],ag:["エージェント","--ag"],sys:["自動","--sys"]};
const LEG=[["cl","Claude＝指揮・組立・critic"],["co","AI審議会＝Claude×Gemini/Codex討議"],["ag","リサーチ/解剖エージェント"],["nb","NanoBanana＝素材・連続edit"],["i2","Image2.0＝要素生成・文字入れ"],["sd","Seedance＝動画"],["vo","音声/HeyGen"],["sys","システム自動"],["ceo","CEO＝赤いところだけ"]];
document.getElementById("legend").innerHTML=LEG.map(([k,t])=>`<span class="lg" style="color:var(${AI[k][1]});border-color:var(${AI[k][1]})">${t}</span>`).join("");

const PHYS=[
["P1","生成は確率的サンプリング","同じ指示でも毎回違う → 多案・反復・判定(critic)・同一性制御が必然。初回多様性(§J)はこの帰結"],
["P2","言語化は非可逆圧縮","「おしゃれ」で情報が死ぬ → 参照画像・HEX・技法番号・数値仕様が必然。プール=対抗装置"],
["P3","モデルには事前分布の癖","=AIっぽさの正体(杖アイコン・淡色バッジ・digital dust) → 否定形リストで名指し禁止"],
["P4","人の注意は一度に1つ","中心窩2度・WM4±1 → 1画面1メッセージ・ジャンプ率・冒頭3秒フック・特徴3つ"],
["P5","信頼は同一性と整合から","顔が変わる/コストゼロの主張=信頼死 → drift対策・※注釈アンカー・返金保証等の高コストシグナル"]];
const ATOMS=[
["①","意図","誰に何を感じさせ何をさせるか。P0カルテと各ラインの企画が担う"],
["②","参照","何に寄せるか(←P2対抗)。プール168・catalog39・Drive12フォルダが担う"],
["③","構成","時間・空間への情報配置(←P4)。PASONA/AIDCA・タイムコード割付"],
["④","素材","被写体の同一性(←P1・P5)。100%一致指定・1ステップ1変更"],
["⑤","指示言語","エンジンへの翻訳(←P2・P3)。技法番号・7ブロック構文・否定形リスト"],
["⑥","判定","意図とのdiff測定(←P1閉ループ)。critic pass/flag/fail・敵対レビュー・修正は差分のみ"]];
document.getElementById("phys").innerHTML=PHYS.map(([id,t,d])=>`<div class="pnode hd-box" onclick="this.classList.toggle('open')"><div class="t"><span class="id">${id}</span>${t}</div><div class="d">${d}</div></div>`).join("");
document.getElementById("atoms").innerHTML=ATOMS.map(([id,t,d])=>`<div class="pnode hd-box2" style="width:178px" onclick="this.classList.toggle('open')"><div class="t"><span class="id">${id}</span>${t}</div><div class="d">${d}</div></div>`).join("");

const LANES={
P0:{title:"P0 受付・事業カルテ",cmd:"新規案件はまずここ（カルテなしに製造しない）",nodes:[
 {id:"P0-A",t:"受付6点セット",ai:["ceo"],g:1,det:{w:"①自社HP/LP(なければベンチマーク) ②検索KW2〜5 ③画像素材(ロゴ/代表/お客様/商品) ④参考LP/HP ⑤参考バナー ⑥備考",d:"6点を渡す（不足はClaudeが制作前に依頼）",o:"6点が揃う or 不足の合意",y:"参考④⑤はL0学習にも同時投入される"}},
 {id:"P0-B1",t:"商材・業界理解",ai:["cl"],det:{w:"何を・いくらで・誰に・どう届けるか＋商流・規制・繁忙期・業界用語",o:"1文で説明できる＋規制リスト(薬機法/景表法/金商法)明記"}},
 {id:"P0-B3",t:"3C＋5Forces 実測リサーチ",ai:["ag"],det:{w:"競合・市場・自社の分析",o:"KW Volが実数（推定レンジは不合格）",tool:"desk-research / search-demand-mapping / PR Times / Yahoo知恵袋",y:"生声と実数だけが証拠"}},
 {id:"P0-B4",t:"N1確定 → ジャーニー → 媒体対応表",ai:["cl"],det:{w:"ペルソナを1人に絞り脳内セリフまで→認知→比較→契約→入金の全段階(状態/感情/接点/障壁/引き金)→段階×媒体の対応表",o:"任意の制作物のジャーニー位置が即答できる粒度",ref:"psychology-core 67原則"}},
 {id:"P0-C",t:"カルテ保存＋業種型ツリー生成",ai:["cl","sys"],det:{w:"00_事業カルテ.mdに保存＋Vault 50_型ライブラリ/{業種}_型ツリー.md を必ず同時生成(6章構成・固有情報は{変数}化)",o:"以後の全制作が最初にカルテを読む状態",ref:"50_型ライブラリ/_TEMPLATE_業種型ツリー.md",y:"蓄積=資産。型はCEO承認で正式認定"}},
 {id:"P0-D",t:"出力時: 媒体指定 → 訴求決定",ai:["ceo","cl"],g:1,det:{d:"使う媒体を一言で指定（例:「Meta広告の動画」）",w:"ジャーニー位置から訴求とトーンを決定",y:"動画広告=UGC感／リスティング=顕在直答／看板=1メッセージ／自社SNS=具体性"}}
]},
L0:{title:"L0 学習ライン（常時稼働）",cmd:"貼るだけ／Drive「デザイン参考」に入れるだけ",nodes:[
 {id:"L0-A",t:"参考を投入",ai:["ceo"],g:1,det:{w:"チャット直貼り or Driveフォルダへ放り込むだけ（指示不要）",tool:"毎朝7:30の自動便が巡回（design-brain-inbox-sweep）"}},
 {id:"L0-B",t:"並列解剖 → 3分類仕分け",ai:["ag","cl"],det:{w:"①スタイル参照(画像現役) ②デザイン原則(言語化して引退) ③マーケ施策(エンジンに渡さない)。実物LPは①+③二重登録",d:"タイブレーク一問「生成プロンプトに入って画質を上げるか？」Yes=①② No=③",o:"HEX・ジャンプ率・配置が数値で解剖されている（主観語禁止）"}},
 {id:"L0-C",t:"プール焼付け＋Drive12フォルダへ自動分類",ai:["cl","sys"],det:{w:"技法番号化(現113種)・定番昇格(2回で)・マーケ施策はpsychology-core親リンク付きでM原則へ",o:"pool-index更新＋Drive分類済＋processed-ids記録",ref:"CTA/比較表/実績・エンブレム/FV・バナー/文字組/フォント/配色/レイアウト・図解/写真加工/区切り・あしらい/特典・オファー/マーケ施策 の12フォルダ"}},
 {id:"L0-D",t:"📚学習レポート",ai:["cl"],det:{w:"分類/学んだくせ/新技法/次から変わること/プール状況を定型で報告",o:"CEOが「何が変わるか」を1行で把握できる"}}
]},
INF:{title:"INF 蓄積インフラ＝工場の脳",cmd:"全ラインが毎回ここを読む",nodes:[
 {id:"INF-1",t:"参照資産（実測値）",ai:["sys"],det:{w:"プール15引き出し168エントリ／技法113種／catalog現役39枚／マーケ施策26原則／Drive12フォルダ／FB台帳68行",ref:"design-brain/pool/ ・ embellishment-library.md ・ catalog.json"}},
 {id:"INF-3",t:"critic規約",ai:["cl"],det:{w:"pass/flag/failの3判定・flagのみ再生成",d:"3反復で収束しなければ参照を絞る（増やすのは逆効果）",o:"失敗は4分類記録: 参照選定ミス/スペック曖昧/エンジン天井/transient——インフラの天気を品質統計に混ぜない"}},
 {id:"INF-5",t:"コスト階層 Tier S/A/B",ai:["cl"],det:{w:"S(FV・主CTA)=完全アセンブリ+発散2-4案／A(実績帯・比較表)=単一生成+fail時のみ再／B(区切り・小物)=catalog再利用かCSS/SVG直組み",d:"「この要素が悪いとCVに致命的か」でTier判定",y:"アセンブリの本質=故障の局所化。全要素発散だと最大16倍コスト"}},
 {id:"INF-6",t:"自浄システム",ai:["sys"],det:{w:"在庫警報(catalog60枚超)／死蔵検知(登録からの経過案件数30超で引用0のみ)／AB2トラック(発散1案をプール不使用コントロール+縦断ログ)",o:"生成回数・コスト・反復を全件ログ→20件で損益分岐点レポート(現在0件=未測定)"}},
 {id:"INF-8",t:"型ライブラリ（Build-to-Stock・自己増殖）",ai:["ceo","sys"],g:1,det:{w:"型が無ければフル工場→完成品を{変数}化して型として在庫→自己増殖。新規業種はタクソノミー近傍型で仮返し→裏でフル生成→差し替え通知",d:"型認定=CEO初回必須承認（生成≠認定）",ref:"業種タクソノミー大25×小150-200・優先20型・50_型ライブラリ/（業種型ツリーmd）",y:"ユーザーが買うのは「型と勝ちパターンからの高速カスタマイズ」"}},
 {id:"INF-9",t:"品質保証の階層",ai:["ag"],det:{w:"敵対レビュー(Fable×Codex)の配置: L2=視覚+コピー必須／L4=企画+生成後／L1・L3・L5・L6=自己critic+CEO高速FBで代替",y:"自己criticは作る者と判定者が同一という構造的弱点への対策"}}
]},
ASM:{title:"ASM 横断原則: 要素単位アセンブリ",cmd:"L1・L2の作り方の憲法",nodes:[
 {id:"ASM-1",t:"一発生成の禁止",ai:["cl"],det:{w:"Image2.0でFV/LPを一発生成しない",y:"一発生成は全素因子にP1(確率ブレ)とP3(AIっぽさ)が同時に乗り品質が平均化して落ちる"}},
 {id:"ASM-2",t:"素因子ごとに個別生成",ai:["i2","nb"],det:{w:"意図確定→素因子分解→要素別フォルダ参考激選→要素ごとに専用プロンプトで生成→要素critic",y:"本質的効能=故障の局所化（1/8要素の失敗で残り7/8を捨てない）"}},
 {id:"ASM-3",t:"文字の憲法",ai:["cl"],det:{w:"見せる文字(キャッチ・CTA文言・バッジ)=エンジン産のみ・HTML素打ち禁止／読む文字(FAQ回答・長文)=HTML",y:"速度・SEO・可読性の担保"}},
 {id:"ASM-4",t:"Claudeは組立とモーションのみ",ai:["cl"],det:{w:"パレットHEX統一・光源方向統一で合成、スクロールモーション実装。意匠を1pxも足さない（三権分立§K）",o:"全ビジュアルが要素/カンプのトレースで説明可能"}}
]},
L1:{title:"L1 バナー単体",cmd:"◯◯のバナー作って ＋使う媒体",nodes:[
 {id:"L1-A",t:"カルテ読込 → 訴求決定",ai:["cl"],det:{w:"媒体・ジャーニー位置を特定して訴求とトーンを決める",o:"訴求軸が1行で言える"}},
 {id:"L1-B",t:"素因子分解",ai:["cl"],det:{w:"メインビジュアル/キャッチ/サブ/権威バッジ(SP2つまで)/CTA一式(帯・食い込みバッジ)/マイクロコピー/オファー/緊急性リボン に分解しTier S/A/B判定",o:"全要素にTierが付いている"}},
 {id:"L1-C",t:"要素ごとに個別生成",ai:["i2","nb"],det:{w:"要素ごとにDrive該当フォルダ+pool激選2件→技法番号+処方(CTA4点セット等)を注入した専用プロンプトで生成。Tier Sは構図×トンマナ2軸の複数案",tool:"gen_image.py(自動リトライ) ¥33/枚(Image2.0 high)・¥20(NanoBanana)",o:"要素criticで文字正確性・技法適用・AIっぽさ3禁止・景表法が全pass"}},
 {id:"L1-D",t:"組立（アセンブリ）",ai:["cl"],det:{w:"合格要素をパレットHEX・光源方向統一で合成。意匠は1pxも足さない",o:"要素間トンマナ不整合ゼロ"}},
 {id:"L1-E",t:"CEO一言FB",ai:["ceo"],g:1,det:{d:"どれが良い/どこが違う（一言でOK）",w:"部分FBはその要素だけ再生成orインペイント——全体作り直し禁止(§M)",o:"「正解」or採用→fb-log記録"}}
]},
L2:{title:"L2 LP一気通貫",cmd:"◯◯のLP作って ＋参考URL",nodes:[
 {id:"L2-A",t:"参考の実測解剖＋リサーチ",ai:["cl","ag"],det:{w:"参考LPのフォント・色・構造を実数値で解剖＋不足リサーチ追補",tool:"lp_anatomize.mjs(Playwright) / Figma REST API",o:"実測トークンが取れている"}},
 {id:"L2-B",t:"コピー執筆",ai:["cl"],det:{w:"psychology-core原則ID付き。scent一致(広告↔FV)・高単価はELM中心ルート→証拠厚く・PASONA/AIDCA・冒頭3秒フック",ref:"lp-fv-axioms.md（公理集）",o:"設計根拠ブロックあり＋FVが3秒テストを通る想定"}},
 {id:"L2-C",t:"方向カンプ2〜4案 → CEOが選ぶ",ai:["i2","ceo"],g:1,det:{w:"構図×トンマナ2軸で発散（方向確認用・トレース元ではない）",d:"A/Bの一言で方向選択——通過まで実装しない",o:"CEOの選択が出ている"}},
 {id:"L2-D",t:"素因子分解 → 要素別生成",ai:["cl","i2","nb"],det:{w:"FV各パーツ＋Body各セクション(CTAブロック/比較表/実績帯/声/エンブレム/ステップ図/料金カード/区切り)を選択トンマナで個別生成→要素critic",ref:"Drive要素別12フォルダ＋業種型ツリーのデザイン処方",o:"全要素pass（比較表=自社列浮かせ+締め文 等プール処方適用）"}},
 {id:"L2-E",t:"組立・実装",ai:["cl"],det:{w:"見せる文字=エンジン産の配置のみ／読む文字=HTML。スクロールモーション(cubic-bezier(.4,0,.2,1)・linear禁止)・カウントアップ・Body15-20セクション・レスポンシブ",o:"意匠判断ゼロ＋LCP2.5秒以内",ref:"ui-patterns.md / improve-animations"}},
 {id:"L2-F",t:"敵対レビュー → 公開",ai:["ag","ceo"],g:1,det:{w:"公理チェック(輝度4.5:1・CTA局所コントラスト・フォーム≤8)→Fable×Codexが視覚+コピー(scent・Conviction)を検証→公開→LP上タップFBモード",o:"致命傷ゼロ＋CEO公開承認",tool:"codex-cross-check"}}
]},
L3:{title:"L3 動くFV（シネマグラフ）",cmd:"FV動かして",nodes:[
 {id:"L3-A",t:"素材画生成",ai:["nb"],det:{w:"FVカンプのトンマナで素材を生成",tool:"NanoBanana ¥20/枚"}},
 {id:"L3-B",t:"文字入りバナー化 横+縦",ai:["i2"],det:{w:"横16:9とスマホ縦9:16を別生成。edits APIで素材の同一性維持",o:"日本語文字ノーミス"}},
 {id:"L3-C",t:"文字固定シネマグラフ1080p",ai:["sd"],det:{w:"文字レイヤーを「locked screen-space graphic layer」指定で固定し背景/人物だけ動かす",tool:"Higgsfield CLI: upload create → generate create seedance_2_0 --resolution 1080p → wait（45cr/本）",y:"Kling比較済: 同一性94%vs85%でSeedance優位→継続採用"}},
 {id:"L3-D",t:"FV実装 → CEO FB",ai:["cl","ceo"],g:1,det:{w:"poster+動画で実装。crf20以下・GIF禁止・本番はファイル配信",o:"画質の掟全pass＋CEO FB",y:"Body側は動画なし=静止画×スクロールアニメが確定型"}}
]},
L4:{title:"L4 マルチショットCM動画",cmd:"CM風の動画作って",nodes:[
 {id:"L4-A",t:"AI審議会で企画決定シート",ai:["co"],det:{w:"Claude起案→Gemini/Codexが批評・代案→統合。シート8項目: ①シーン②必要な人物③人物の印象④場所⑤切り取る瞬間⑥トーン(色・光・温度)⑦1メッセージ⑧感情曲線",d:"最初の3秒=フック最重要。弱ければここで差し戻し",y:"企画のノイズは下流全工程で増幅される→最上流に討議コスト"}},
 {id:"L4-A2",t:"CEOシート承認",ai:["ceo"],g:1,det:{d:"決定シート8項目を承認",o:"承認まで下流に進まない"}},
 {id:"L4-B",t:"ショット構成",ai:["cl"],det:{w:"15秒≈8-11カット。最強カットを冒頭3秒に。各カット役割1つ(役割なし=削除)。タイムコード+Hard cut・カメラ言語(手持ち/FPV/ダッチ・NEVER static)・音設計",o:"役割のないカットゼロ"}},
 {id:"L4-C",t:"アセット生成",ai:["nb","i2","cl"],det:{w:"キャラ=matches input 100%／場所=STYLE REFERENCE ONLY→権利・実在類似チェック"}},
 {id:"L4-D",t:"7ブロック構文 → 一発生成",ai:["cl","sd"],det:{w:"Style宣言(60:30:10)/SUBJECT/PRACTICAL VFX/LOCATION/ACTION/CAMERA/CONSTRAINTS＋否定形リスト(no game engine/NOT digital dust/NO slow-motion)",tool:"Seedance 2.0 1080p（編集済みマルチショットを一発出し=編集工程の中抜き）",ref:"motion-3d.md Higgsfield構文"}},
 {id:"L4-E",t:"critic → 審議会生成後判定 → CEO",ai:["cl","co","ceo"],g:1,det:{w:"物理・identity drift・文字・感情の一貫性・画質→flagのみ再生成→審議会でも生成後判定(CM redoは高コスト)→crf20納品",o:"3反復以内全pass＋CEO FB"}}
]},
L5:{title:"L5 AIアバター動画（話す案内）",cmd:"話す案内動画作って",nodes:[
 {id:"L5-A",t:"審議会: 誰が話すと信頼最大か",ai:["co","ceo"],g:1,det:{w:"権威(A3)か親近(A2)か・人物の印象・トーンを討議→CEO承認",d:"視聴文脈(LP埋込/サイネージ/LINE)→尺・字幕"}},
 {id:"L5-B",t:"台本",ai:["cl"],det:{w:"冒頭3秒フック→要点3つ以内→CTA(1文40字)。ひらがな化・短文・「えー、」の間・句読点=リズム",o:"音読して不自然ゼロ",ref:"cognitive-rhythm-writing"}},
 {id:"L5-C",t:"アバター画像",ai:["i2"],det:{w:"正面・顔面積大・口元露出・バストショット・肉眼質感・一般スタッフ感",o:"リップシンク適性critic pass＋実在類似なし",y:"引きの画は同期精度が落ちる（物理条件）"}},
 {id:"L5-D",t:"音声生成 → 調整ループ",ai:["vo","cl"],det:{w:"声選定→感情タグ→生成→試聴→句読点調整→再生成の反復",tool:"ElevenLabs(高品質・クローン可) / VOICEVOX(無料・規約確認)",o:"聞いて違和感ゼロ＝品質の8割はここ"}},
 {id:"L5-E",t:"リップシンク → CEO FB",ai:["vo","cl","ceo"],g:1,det:{w:"HeyGen Avatar IVで合成→critic(口の同期・まばたき・背景)→字幕・圧縮→納品",o:"CEO FB"}}
]},
L6:{title:"L6 建築パース",cmd:"パース作って ＋部屋写真",nodes:[
 {id:"L6-A",t:"審議会:「見せる暮らし」決定",ai:["co","ceo"],g:1,det:{w:"シーン・住む人物像・時間帯(夕景=情緒)・トーンを討議→CEO承認",y:"家具でなく「この部屋での自分の生活」を見せる=保有効果の先取り"}},
 {id:"L6-B",t:"連続editチェーン",ai:["nb"],det:{w:"①空室補正→②家具ステージング→③夕景ライティング→④アイソメ断面（1ステップ1変更=同一性維持）",tool:"NanoBanana edit連続チェーン 約¥80/セット"}},
 {id:"L6-C",t:"同一性チェック",ai:["cl"],det:{w:"窓・建具・寸法が変わっていないか各ステップで検査",o:"構造の改変ゼロ",y:"不動産は虚偽表示リスク（P5）"}},
 {id:"L6-D",t:"法務注記 → 納品",ai:["cl","sd","ceo"],g:1,det:{w:"「家具・内装はイメージです」注記必須→動画化は任意でL3接続→CEO FB",o:"注記あり＋CEO承認"}}
]},
FB:{title:"FB このシステム自体の育て方",cmd:"なんか違う、の一言でいい",nodes:[
 {id:"FB-1",t:"FBの入口3つ",ai:["ceo"],g:1,det:{w:"①この図をスクショ+ID+一言 ②制作物への一言FB ③参考を貼るだけ(自動学習)",y:"構造化はAI側の仕事。雑・曖昧でよい"}},
 {id:"FB-2",t:"AIの処理",ai:["cl"],det:{w:"4点推定(事実/基準/範囲/格納先)→本質的な質問だけタップ形式→復唱1行→即修正",d:"範囲不明時のデフォルト=その案件限定。同一FB2回で恒久昇格",o:"正本md＋この図の両方に反映済み",ref:"fb-log.md(全68行の台帳)"}},
 {id:"FB-3",t:"ショートハンド",ai:["ceo"],det:{w:"「永続」=全案件昇格／「今回だけ」=保存取消／「逆・違う◯◯」=訂正再実行／「正解」=確定パターン保存"}}
]}
};
function aiTag(a){const[l,c]=AI[a];return `<span class="ai" style="color:var(${c});border-color:var(${c})">${l}</span>`}
function det(d){if(!d)return"";let s="";
 const map=[["w","やること"],["d","決める"],["o","完了"],["tool","ツール"],["ref","参照"],["y","なぜ"]];
 for(const[k,lab]of map){if(d[k])s+=`<div class="r"><span class="k">${lab}</span><span class="v">${d[k]}</span></div>`}
 return `<div class="det">${s}</div>`}
function lane(key,i){const L=LANES[key];
 let s=`<div class="lane ${i%2?"hd-box2":"hd-box"}"><h2><span class="lid">${key}</span>${L.title}</h2><span class="cmd">${L.cmd}</span>`;
 L.nodes.forEach((n,j)=>{
  if(j>0)s+=`<div class="arrow ${L.nodes[j-1].g?"red":""}">↓</div>`;
  s+=`<div class="fnode ${n.g?"gate":""} ${j%2?"hd-box2":"hd-box"}" onclick="this.classList.toggle('open')"><div class="head"><span class="id">${n.id}</span>${(n.ai||[]).map(aiTag).join("")}<b>${n.t}</b></div>${det(n.det)}</div>`});
 return s+"</div>"}
document.getElementById("row1").innerHTML=["P0","L0","INF"].map(lane).join("");
document.getElementById("row2").innerHTML=["ASM","L1","L2"].map(lane).join("");
document.getElementById("row3").innerHTML=["L3","L4","L5"].map(lane).join("");
document.getElementById("row4").innerHTML=["L6","FB"].map(lane).join("")+"<div></div>";
