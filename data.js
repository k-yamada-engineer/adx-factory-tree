const AI={cl:["Claude","--cl"],i2:["Image2.0","--i2"],nb:["NanoBanana","--nb"],sd:["Seedance","--sd"],vo:["音声/HeyGen","--vo"],co:["AI審議会","--co"],ceo:["CEO","--ceo"],ag:["エージェント","--ag"],sys:["自動","--sys"]};
const LEG=[["cl","Claude＝指揮・組立・critic"],["co","AI審議会＝Claude×Gemini/Codex討議"],["ag","リサーチ/解剖エージェント"],["nb","NanoBanana＝素材・連続edit"],["i2","Image2.0＝要素生成・文字入れ"],["sd","Seedance＝動画"],["vo","音声/HeyGen"],["sys","システム自動"],["ceo","CEO＝赤いところだけ"]];
document.getElementById("legend").innerHTML=LEG.map(([k,t])=>`<span class="lg" style="color:var(${AI[k][1]});border-color:var(${AI[k][1]})">${t}</span>`).join("");

const SKILLS={
 "adx-design":["制作の正解DB・工程・掟(三権分立/critic/部分修正)。全ラインの親スキル","全ライン共通"],
 "creative-direction":["生成前CDブリーフ必須(実写デフォルト/トンマナ/参考枚数記録)＋製造ドクトリン正本","ASM全体・L1-B・L2-B"],
 "copy-transform":["説明文→コピー変換3ゲート(禁止ワード/技法15案/棄却ルーブリック)","L1-C・L2-C 全H1/見出し"],
 "image-prompt-director":["実写の写真設計図(9観点・英語連結・のっぺり対策)","実写生成全般"],
 "youtube-comment-mining":["YTコメント欄の生声自動収集・分類(insight/Schwartz/N1候補)","P0-B3"],
 "design-brain":["参考学習・プール激選・技法辞書・catalog・critic基準","L0全体・L1-C・L2-C/D・INF全体"],
 "psychology-core":["心理67原則。N1設計・コピー・訴求根拠","P0-B4・L2-B・L5-B"],
 "writing":["LP文・広告コピー・LINE配信文の執筆","L2-B"],
 "cognitive-rhythm-writing":["読み物の緩急規範(観察→逡巡→断定)","L2-B・L5-B"],
 "desk-research":["市場・競合の自動デスクリサーチ(3C/5Forces)","P0-B3"],
 "search-demand-mapping":["検索KW Volから需要構造を診断","P0-B3"],
 "improve-animations":["LPアニメーション品質の診断・改善","L2-E"],
 "codex-cross-check":["重要アウトプットをCodexで独立検証","L2-F・L4-E"],
 "first-principles":["第一原理思考。前提を疑い根本から再構築","戦略判断全般(このツリー自体もこれで検証)"],
 "vault-ops":["Vault(Drive)への保存・frontmatter・命名規則","P0-C・型ライブラリ書込み全般"]
};
document.getElementById("skillrow").innerHTML=Object.entries(SKILLS).map(([k,[d,w]])=>`<span><span class="nm">${k}</span>${d}<br><span style="opacity:.75">→ ${w}</span></span>`).join("");

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
 {id:"P0-B1",t:"商材・業界理解",ai:["cl"],det:{w:"何を・いくらで・誰に・どう届けるか＋商流・規制・繁忙期・業界用語",o:"1文で説明できる＋規制リスト(薬機法/景表法/金商法)明記",skl:["first-principles"]}},
 {id:"P0-B3",t:"3C＋5Forces 実測リサーチ（8サブスキル武器庫）",ai:["ag"],det:{w:"①regulation-check(消費者庁・特商法処分DB→NG訴求) ②competitor-financial-intel(法人番号→EDINET/gBizINFO→競合財務) ③crowdfunding-pricing-intel(CAMPFIRE/Makuake→価格受容性実数) ④stat-market-sizing(e-Stat/矢野経済→市場規模) ⑤pr-times-scan(RSS→競合動向時系列) ⑥review-mining(知恵袋/小町→生声) ⑦ad-library-scan(Google透明性/Meta→競合CR・要ブラウザ) ⑧kanpo-check(官報90日窓)",d:"KW VolはCEO実測（3段バトン: Claudeがサジェスト+枠→CEOがプランナー/ラッコ有料で実数→再開）。AI推定=不合格",o:"Excelテンプレ13シートが実数4点セット(値+単位/一次URL/取得日/推定フラグ)で埋まる。空欄禁止=N/A理由コード",tool:"EDINET/e-Stat/gBizINFO/法人番号API(キー申請中)・PR TIMES RSS・TDnet非公式",ref:"research-arsenal.md(正本)・_TEMPLATE_MARKETING_STRATEGY_FRAMEWORK_v3.xlsx",skl:["desk-research","search-demand-mapping","youtube-comment-mining"],y:"マーケは必ず実数ベース。生声と一次ソースだけが証拠"}},
 {id:"P0-B3k",t:"KW Vol実測",ai:["ceo"],g:1,det:{d:"Claudeが用意したKWリストにキーワードプランナー/ラッコ有料で実数を記入",o:"全KWにVol実数+取得日。90日で再実測",y:"Vol実数は有料ツールでしか取れない=人間ゲートの中核"}},
 {id:"P0-B4",t:"N1確定 → ジャーニー → 媒体対応表",ai:["cl"],det:{w:"ペルソナを1人に絞り脳内セリフまで→認知→比較→契約→入金の全段階(状態/感情/接点/障壁/引き金)→段階×媒体の対応表",o:"任意の制作物のジャーニー位置が即答できる粒度",skl:["psychology-core"]}},
 {id:"P0-C",t:"カルテ保存＋業種型ツリー生成",ai:["cl","sys"],det:{w:"00_事業カルテ.mdに保存＋Vault 50_型ライブラリ/{業種}_型ツリー.md を必ず同時生成(6章構成・固有情報は{変数}化)",o:"以後の全制作が最初にカルテを読む状態",ref:"50_型ライブラリ/_TEMPLATE_業種型ツリー.md",skl:["vault-ops"],y:"蓄積=資産。型はCEO承認で正式認定"}},
 {id:"P0-D",t:"出力時: 媒体指定 → 訴求決定",ai:["ceo","cl"],g:1,det:{d:"使う媒体を一言で指定（例:「Meta広告の動画」）",w:"ジャーニー位置から訴求とトーンを決定",y:"動画広告=UGC感／リスティング=顕在直答／看板=1メッセージ／自社SNS=具体性"}}
]},
L0:{title:"L0 学習ライン（常時稼働）",cmd:"貼るだけ／Drive「デザイン参考」に入れるだけ",nodes:[
 {id:"L0-A",t:"参考を投入",ai:["ceo"],g:1,det:{w:"チャット直貼り or Driveフォルダへ放り込むだけ（指示不要）",tool:"毎朝7:30の自動便が巡回（design-brain-inbox-sweep）"}},
 {id:"L0-B",t:"並列解剖 → 3分類仕分け",ai:["ag","cl"],det:{w:"①スタイル参照(画像現役) ②デザイン原則(言語化して引退) ③マーケ施策(エンジンに渡さない)。実物LPは①+③二重登録",d:"タイブレーク一問「生成プロンプトに入って画質を上げるか？」Yes=①② No=③",o:"HEX・ジャンプ率・配置が数値で解剖されている（主観語禁止）",skl:["design-brain"]}},
 {id:"L0-C",t:"プール焼付け＋Drive12フォルダへ自動分類",ai:["cl","sys"],det:{w:"技法番号化(現113種)・定番昇格(2回で)・マーケ施策はpsychology-core親リンク付きでM原則へ",o:"pool-index更新＋Drive分類済＋processed-ids記録",ref:"CTA/比較表/実績・エンブレム/FV・バナー/文字組/フォント/配色/レイアウト・図解/写真加工/区切り・あしらい/特典・オファー/マーケ施策 の12フォルダ",skl:["design-brain","psychology-core"]}},
 {id:"L0-D",t:"📚学習レポート",ai:["cl"],det:{w:"分類/学んだくせ/新技法/次から変わること/プール状況を定型で報告",o:"CEOが「何が変わるか」を1行で把握できる"}}
]},
INF:{title:"INF 蓄積インフラ＝工場の脳",cmd:"全ラインが毎回ここを読む",nodes:[
 {id:"INF-1",t:"参照資産（実測値）",ai:["sys"],det:{w:"プール15引き出し168エントリ／技法113種／catalog現役39枚／マーケ施策26原則／Drive12フォルダ／FB台帳68行",ref:"design-brain/pool/ ・ embellishment-library.md ・ catalog.json"}},
 {id:"INF-2",t:"業種別参考ライブラリ（品質の決定変数）",ai:["ceo","sys"],g:1,det:{w:"Drive 業種別参考/20業種フォルダ。品質=参考の保有数×業種マッチ率。投入ルート: ①CEOがURL/画像を貼る(自動格納) ②DPROエクスポート→消化額上位LPのFVを自動スクショ収集(勝ちの実証付き) ③案件の勝ち生成物を還流",d:"該当業種3枚未満なら制作前に投入依頼",o:"実測: DPRO初回収集58本格納済み",y:"2026-07-20確定: 参考ライブラリが品質の上限を決める"}},
 {id:"INF-3",t:"critic規約",ai:["cl"],det:{w:"pass/flag/failの3判定・flagのみ再生成",d:"3反復で収束しなければ参照を絞る（増やすのは逆効果）",o:"失敗は4分類記録: 参照選定ミス/スペック曖昧/エンジン天井/transient——インフラの天気を品質統計に混ぜない"}},
 {id:"INF-5",t:"コスト階層 Tier S/A/B",ai:["cl"],det:{w:"S(FV・主CTA)=完全アセンブリ+発散2-4案／A(実績帯・比較表)=単一生成+fail時のみ再／B(区切り・小物)=catalog再利用かCSS/SVG直組み",d:"「この要素が悪いとCVに致命的か」でTier判定",y:"アセンブリの本質=故障の局所化。全要素発散だと最大16倍コスト"}},
 {id:"INF-6",t:"自浄システム",ai:["sys"],det:{w:"在庫警報(catalog60枚超)／死蔵検知(登録からの経過案件数30超で引用0のみ)／AB2トラック(発散1案をプール不使用コントロール+縦断ログ)",o:"生成回数・コスト・反復を全件ログ→20件で損益分岐点レポート(現在0件=未測定)"}},
 {id:"INF-8",t:"型ライブラリ（Build-to-Stock・自己増殖）",ai:["ceo","sys"],g:1,det:{w:"型が無ければフル工場→完成品を{変数}化して型として在庫→自己増殖。新規業種はタクソノミー近傍型で仮返し→裏でフル生成→差し替え通知",d:"型認定=CEO初回必須承認（生成≠認定）",ref:"業種タクソノミー大25×小150-200・優先20型・50_型ライブラリ/（業種型ツリーmd）",y:"ユーザーが買うのは「型と勝ちパターンからの高速カスタマイズ」"}},
 {id:"INF-9",t:"品質保証の階層",ai:["ag"],det:{w:"敵対レビュー(Fable×Codex)の配置: L2=視覚+コピー必須／L4=企画+生成後／L1・L3・L5・L6=自己critic+CEO高速FBで代替",y:"自己criticは作る者と判定者が同一という構造的弱点への対策"}}
]},
ASM:{title:"ASM 製造ドクトリン: 模倣ファースト1枚絵",cmd:"2026-07-20確定。全制作物(キャラ/バナー/FV/LP Body)の憲法",nodes:[
 {id:"ASM-1",t:"参考マスト（ゼロベース禁止）",ai:["cl"],det:{w:"マスター参考1〜2枚を確保してから制作開始。無ければCEOに投入依頼 or 近接業種で代替提案",ref:"Drive 業種別参考/20フォルダ",skl:["creative-direction"],y:"品質=参考の保有数×業種マッチ率。参考ライブラリが事業資産そのもの"}},
 {id:"ASM-2",t:"1枚絵が意匠の正本",ai:["i2"],det:{w:"参考をfew-shotで渡し→レイアウト文法・密度を踏襲→1枚絵で生成。カンプ・バナー・SNS・FVはこれで完成品",d:"部分FBはインペイントのみ（全体再生成禁止）",y:"部品を別々に作ると統一感が死ぬ（実証済み）。1枚絵は呼吸が1回で決まる"}},
 {id:"ASM-3",t:"オリジナルは色味とコピーだけ（パクリ境界線）",ai:["cl"],det:{w:"借りてよいのは骨格(配置・面積比・重なり・密度)のみ。色味=自トンマナ変換必須／コピー=copy-transform産のみ(構文直訳禁止)／署名あしらいは置換",o:"参考と並べて「別のキャンペーン」に見えたら合格",skl:["copy-transform"]}},
 {id:"ASM-4",t:"アセンブリはLP実装時のみ",ai:["cl","i2"],det:{w:"承認済み1枚絵をマスターにfew-shotで部品を切り出し生成→HTMLは配置と本文テキストのみ",d:"CSSでグラデ/光沢/ボタン等の意匠を描いたら工程違反=作り直し",y:"UI部品(検索窓・CTA・バッジ)も全てエンジン産"}},
 {id:"ASM-5",t:"文字の憲法",ai:["cl"],det:{w:"見せる文字(キャッチ・CTA文言・バッジ)=エンジン産のみ／読む文字(FAQ回答・長文・特商法)=HTML",y:"速度・SEO・可読性の担保"}}
]},
L1:{title:"L1 バナー・FV（1枚絵）",cmd:"◯◯のバナー/FV作って ＋使う媒体",nodes:[
 {id:"L1-A",t:"カルテ読込 → 訴求決定",ai:["cl"],det:{w:"媒体・ジャーニー位置を特定して訴求とトーンを決める",o:"訴求軸が1行で言える"}},
 {id:"L1-B",t:"CDブリーフ",ai:["cl"],det:{w:"①実写/イラスト判定(デフォルト実写) ②トンマナ(参考実画像を最低2枚目視) ③コピー精度の掟 ④リサーチ接続 ⑤マスター参考の記録(業種フォルダの枚数・マッチ度)",d:"業種フォルダ3枚未満なら制作前にCEOへ投入依頼",skl:["creative-direction","image-prompt-director"],o:"CDブリーフmd保存"}},
 {id:"L1-C",t:"コピー独立開発",ai:["cl"],det:{w:"Gate1 What確定→Gate2 禁止ワード+技法タグ15案量産→Gate3 棄却ルーブリック→Top3。一等コピー10〜15字・切り口4型・行動経済学3点",skl:["copy-transform","psychology-core"],o:"技法タグ+選定理由付きTop3"}},
 {id:"L1-D",t:"few-shot模倣で1枚絵生成",ai:["i2"],det:{w:"業種フォルダのマスター参考を実画像で渡す→骨格踏襲・色味変換・コピー差し替えで生成。A/Bは切り口違い",tool:"gen_image.py(生成/edits・自動リトライ) ¥33/枚",o:"critic: 文言一字一句/NG訴求7/あしらいの格/実写4項目(影・質感・光の方向・縮小テスト) 全pass",skl:["design-brain"]}},
 {id:"L1-E",t:"CEO一言FB",ai:["ceo"],g:1,det:{d:"どれが良い/どこが違う（一言でOK）",w:"部分FBはインペイントで該当箇所のみ修正——全体作り直し禁止",o:"「正解」or採用→fb-log記録・勝ち参考を業種フォルダへ還流"}}
]},
L2:{title:"L2 LP一気通貫",cmd:"◯◯のLP作って",nodes:[
 {id:"L2-A",t:"言葉と構成のAI審議会",ai:["co"],det:{w:"FVの文言・セクション構成・全体文言・フォーム部分・CTA文言をClaude起案→Gemini/Codexが批評・代案→統合。参考LP解剖(価格の見せ方・CTA反復)も入力に",d:"Claude単独の言葉・構成で製造に進むこと禁止",skl:["copy-transform","writing","psychology-core"],o:"審議会通過済みのセクション構成表+全文言",y:"企画のノイズは下流全工程で増幅される(L4と同じ思想)"}},
 {id:"L2-B",t:"FV: 参考の型違いで複数案 → CEO選択",ai:["i2","ceo"],g:1,det:{w:"業種フォルダの参考をマスターに、型違い(高密度/信頼/診断/実例証明 等)で1枚絵を2〜4案",d:"どれを本命にするか一言",o:"FV正本確定",skl:["creative-direction","design-brain"]}},
 {id:"L2-C",t:"Body: セクション別・参考複製",ai:["cl","i2"],det:{w:"リズム表でセクション並びを設計→**各セクションにDrive参考を必ず1つ割当**(CTA参考/比較表参考/実績・エンブレム/業種別…)→Image2.0でfew-shot複製(コピー・色味だけ差し替え)→連結",d:"参考なしのセクション自作は禁止。該当参考が無ければCEOに投入依頼。**参考が空でも『構成意図だけで作る』例外の提案自体を禁止**(2026-07-20 TAKETO Body v3事故: 例外で無参考生成→CEO評価「微妙」。空なら収集エンジン/CEO投入で埋めてから作るが唯一の道)",o:"全セクションに割当参考IDが記録されcritic pass＋割当表(セクション×参考×出典)を成果物に添付",skl:["creative-direction"]}},
 {id:"L2-D",t:"組立・実装",ai:["cl"],det:{w:"セクション画像の縦積み＋CTAは正本FVから切り出し再利用＋読む文字(FAQ/特商法/フッター)=HTML＋追従CTA＋スクロールモーション",o:"CSS意匠ゼロ・LCP2.5秒以内",skl:["improve-animations","adx-design"]}},
 {id:"L2-E",t:"敵対レビュー → 公開",ai:["ag","ceo"],g:1,det:{w:"公理チェック→Fable×Codex視覚+コピー検証→CEO公開承認→LP上タップFB",skl:["codex-cross-check"],o:"致命傷ゼロ＋公開"}}
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
 {id:"L4-D",t:"7ブロック構文 → 一発生成",ai:["cl","sd"],det:{w:"Style宣言(60:30:10)/SUBJECT/PRACTICAL VFX/LOCATION/ACTION/CAMERA/CONSTRAINTS＋否定形リスト(no game engine/NOT digital dust/NO slow-motion)",tool:"Seedance 2.0 1080p（編集済みマルチショットを一発出し=編集工程の中抜き）",ref:"motion-3d.md Higgsfield構文",skl:["adx-design"]}},
 {id:"L4-E",t:"critic → 審議会生成後判定 → CEO",ai:["cl","co","ceo"],g:1,det:{w:"物理・identity drift・文字・感情の一貫性・画質→flagのみ再生成→審議会でも生成後判定(CM redoは高コスト)→crf20納品",o:"3反復以内全pass＋CEO FB",skl:["codex-cross-check"]}}
]},
L5:{title:"L5 AIアバター動画（話す案内）",cmd:"話す案内動画作って",nodes:[
 {id:"L5-A",t:"審議会: 誰が話すと信頼最大か",ai:["co","ceo"],g:1,det:{w:"権威(A3)か親近(A2)か・人物の印象・トーンを討議→CEO承認",d:"視聴文脈(LP埋込/サイネージ/LINE)→尺・字幕"}},
 {id:"L5-B",t:"台本",ai:["cl"],det:{w:"冒頭3秒フック→要点3つ以内→CTA(1文40字)。ひらがな化・短文・「えー、」の間・句読点=リズム",o:"音読して不自然ゼロ",skl:["cognitive-rhythm-writing","writing"]}},
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
 {id:"FB-2",t:"AIの処理",ai:["cl"],det:{w:"4点推定(事実/基準/範囲/格納先)→本質的な質問だけタップ形式→復唱1行→即修正",d:"範囲不明時のデフォルト=その案件限定。同一FB2回で恒久昇格",o:"正本md＋この図の両方に反映済み",ref:"fb-log.md(全68行の台帳)",skl:["vault-ops"]}},
 {id:"FB-3",t:"ショートハンド",ai:["ceo"],det:{w:"「永続」=全案件昇格／「今回だけ」=保存取消／「逆・違う◯◯」=訂正再実行／「正解」=確定パターン保存"}}
]}
};
function aiTag(a){const[l,c]=AI[a];return `<span class="ai" style="color:var(${c});border-color:var(${c})">${l}</span>`}
function det(d){if(!d)return"";let s="";
 if(d.skl)s+=`<div class="r"><span class="k skl">Skill</span><span class="v skl-v">${(d.skl||[]).join(" / ")}</span></div>`;
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
