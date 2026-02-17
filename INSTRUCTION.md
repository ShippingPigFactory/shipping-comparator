# 配送業者料金比較アプリ 開発指示書

## 1. プロジェクト概要
自社で使用している配送業者（佐川急便、ヤマト運輸）の配送料金を計算し、2つのパターンで比較するWebアプリケーションを作成してください。
「佐川BtoBで120サイズ2個」vs「ヤマトで100サイズ3個」のようなシミュレーションを行い、どちらが安価か即座に判定します。

## 2. 技術スタック
*   **Framework:** React + TypeScript (Vite)
*   **Styling:** SCSS (CSS Modules 推奨)
    *   **禁止事項:** Tailwind CSSは使用しないでください。
*   **State Management:** React Context または Local State

## 3. データソース (定数データ)
以下のJSONデータをアプリケーション内の定数ファイル (`src/constants/shippingRates.ts`) として保持し、計算に使用してください。

```json
{
  "sagawa": {
    "btob": {
      "60": { "hokkaido": 510, "kita_tohoku": 480, "minami_tohoku": 480, "kanto": 450, "shinetsu": 450, "tokai": 410, "hokuriku": 410, "kansai": 450, "chugoku": 450, "shikoku": 440, "kita_kyushu": 460, "minami_kyushu": 460 },
      "80": { "hokkaido": 620, "kita_tohoku": 570, "minami_tohoku": 550, "kanto": 490, "shinetsu": 490, "tokai": 450, "hokuriku": 450, "kansai": 480, "chugoku": 490, "shikoku": 470, "kita_kyushu": 510, "minami_kyushu": 510 },
      "100": { "hokkaido": 830, "kita_tohoku": 710, "minami_tohoku": 680, "kanto": 540, "shinetsu": 540, "tokai": 490, "hokuriku": 490, "kansai": 540, "chugoku": 560, "shikoku": 510, "kita_kyushu": 580, "minami_kyushu": 600 },
      "120": { "hokkaido": 1250, "kita_tohoku": 1000, "minami_tohoku": 900, "kanto": 690, "shinetsu": 740, "tokai": 660, "hokuriku": 660, "kansai": 640, "chugoku": 660, "shikoku": 610, "kita_kyushu": 680, "minami_kyushu": 720 },
      "140": { "hokkaido": 1250, "kita_tohoku": 1000, "minami_tohoku": 900, "kanto": 690, "shinetsu": 740, "tokai": 660, "hokuriku": 660, "kansai": 640, "chugoku": 660, "shikoku": 610, "kita_kyushu": 680, "minami_kyushu": 720 },
      "160": { "hokkaido": 1900, "kita_tohoku": 1460, "minami_tohoku": 1330, "kanto": 1050, "shinetsu": 1040, "tokai": 900, "hokuriku": 920, "kansai": 770, "chugoku": 860, "shikoku": 660, "kita_kyushu": 940, "minami_kyushu": 1010 },
      "170": { "hokkaido": 4877, "kita_tohoku": 3913, "minami_tohoku": 3550, "kanto": 3277, "shinetsu": 3113, "tokai": 2795, "hokuriku": 2895, "kansai": 2522, "chugoku": 2413, "shikoku": 2313, "kita_kyushu": 2686, "minami_kyushu": 3113 },
      "180": { "hokkaido": 5522, "kita_tohoku": 4350, "minami_tohoku": 3913, "kanto": 3595, "shinetsu": 3431, "tokai": 3059, "hokuriku": 3168, "kansai": 2686, "chugoku": 2686, "shikoku": 2577, "kita_kyushu": 2895, "minami_kyushu": 3377 },
      "200": { "hokkaido": 7022, "kita_tohoku": 5468, "minami_tohoku": 4877, "kanto": 4395, "shinetsu": 4186, "tokai": 3704, "hokuriku": 3813, "kansai": 3222, "chugoku": 3222, "shikoku": 3113, "kita_kyushu": 3486, "minami_kyushu": 4131 }
    },
    "normal": {
      "60": { "hokkaido": 510, "kita_tohoku": 480, "minami_tohoku": 480, "kanto": 450, "shinetsu": 450, "tokai": 410, "hokuriku": 410, "kansai": 450, "chugoku": 450, "shikoku": 440, "kita_kyushu": 460, "minami_kyushu": 460 },
      "80": { "hokkaido": 620, "kita_tohoku": 570, "minami_tohoku": 550, "kanto": 490, "shinetsu": 490, "tokai": 450, "hokuriku": 450, "kansai": 480, "chugoku": 490, "shikoku": 470, "kita_kyushu": 510, "minami_kyushu": 510 },
      "100": { "hokkaido": 830, "kita_tohoku": 710, "minami_tohoku": 680, "kanto": 540, "shinetsu": 540, "tokai": 490, "hokuriku": 490, "kansai": 540, "chugoku": 560, "shikoku": 510, "kita_kyushu": 580, "minami_kyushu": 600 },
      "120": { "hokkaido": 1680, "kita_tohoku": 1350, "minami_tohoku": 1250, "kanto": 1030, "shinetsu": 1030, "tokai": 940, "hokuriku": 940, "kansai": 830, "chugoku": 890, "shikoku": 740, "kita_kyushu": 960, "minami_kyushu": 1010 },
      "140": { "hokkaido": 1680, "kita_tohoku": 1350, "minami_tohoku": 1250, "kanto": 1030, "shinetsu": 1030, "tokai": 940, "hokuriku": 940, "kansai": 830, "chugoku": 890, "shikoku": 740, "kita_kyushu": 960, "minami_kyushu": 1010 },
      "160": { "hokkaido": 2780, "kita_tohoku": 2150, "minami_tohoku": 1960, "kanto": 1560, "shinetsu": 1540, "tokai": 1380, "hokuriku": 1380, "kansai": 1160, "chugoku": 1290, "shikoku": 1000, "kita_kyushu": 1410, "minami_kyushu": 1510 }
    }
  },
  "yamato": {
    "default": {
      "60": { "hokkaido": 890, "kita_tohoku": 590, "minami_tohoku": 590, "kanto": 450, "shinetsu": 450, "hokuriku": 410, "chubu": 410, "kansai": 360, "chugoku": 360, "shikoku": 360, "kyushu": 410, "okinawa": 810 },
      "80": { "hokkaido": 930, "kita_tohoku": 630, "minami_tohoku": 630, "kanto": 490, "shinetsu": 490, "hokuriku": 450, "chubu": 450, "kansai": 400, "chugoku": 400, "shikoku": 400, "kyushu": 450, "okinawa": 1310 },
      "100": { "hokkaido": 980, "kita_tohoku": 670, "minami_tohoku": 670, "kanto": 540, "shinetsu": 540, "hokuriku": 490, "chubu": 490, "kansai": 450, "chugoku": 450, "shikoku": 450, "kyushu": 490, "okinawa": 1810 }
    }
  }
}
4. 地域（Region）のマッピング要件
ユーザーが選択する地域名は1つですが、データ上のキーは業者ごとに異なります。以下のルールでマッピングして計算してください。
UI表示と内部キーの対応:
UI選択肢 (日本語)	Sagawa Key	Yamato Key	備考
北海道	hokkaido	hokkaido	
北東北	kita_tohoku	kita_tohoku	
南東北	minami_tohoku	minami_tohoku	
関東	kanto	kanto	
信越	shinetsu	shinetsu	
北陸	hokuriku	hokuriku	
東海	tokai	chubu	佐川はTokai, ヤマトはChubuを使用
関西	kansai	kansai	
中国	chugoku	chugoku	
四国	shikoku	shikoku	
北九州	kita_kyushu	kyushu	ヤマトは九州全域で共通価格
南九州	minami_kyushu	kyushu	ヤマトは九州全域で共通価格
沖縄	(対応不可)	okinawa	佐川選択時はエラーまたは0円表示
5. 機能要件
A. 比較画面の構成
画面を左右に分割し、「パターンA」「パターンB」として独立した入力フォームを配置してください。
B. 入力項目 (各パターン共通)
配送業者タイプ選択:
Sagawa (BtoB)
Sagawa (Normal)
Yamato (Default)
地域選択:
上記の「UI選択肢」のリストから選択。
荷物リスト (追加・削除可能):
サイズ: 業者のタイプによって選択可能なサイズを制限してください。
Sagawa BtoB: 60, 80, 100, 120, 140, 160, 170, 180, 200
Sagawa Normal: 60, 80, 100, 120, 140, 160
Yamato: 60, 80, 100
個数: 1以上の整数。
「＋ 行を追加」ボタンで複数のサイズ違いの荷物を登録可能にしてください。
C. 計算と結果表示
合計金額: 各パターンごとに、すべての荷物の送料合計をリアルタイムで表示してください。
勝者判定:
両方のパターンで計算が完了している場合、金額が安い方のパターンを緑色で強調表示してください。
差額を表示してください（例：「パターンAの方が 500円 お得です」）。
6. 実装のポイント
コンポーネント設計:
ShippingCalculator: 親コンポーネント。2つのパターンの状態管理と比較ロジックを持つ。
PatternForm: 1パターン分の入力と計算結果を表示する子コンポーネント。
ロジック分離:
計算ロジックはフック (useShippingCalculator) または純粋な関数として分離し、テストしやすくしてください。
エラーハンドリング:
佐川で「沖縄」が選択された場合、「佐川急便は沖縄に対応していません（データなし）」等のメッセージを表示し、計算結果を無効にしてください。
デザイン:
SCSSを使用し、業務利用に耐えうるシンプルで見やすいデザインにしてください。
サイズごとの行入力は、テーブル形式やフレックスボックスを使って整列させてください。
7. 開発フロー
Typescriptの型定義 (ShippingRates, Region, CarrierType 等)
計算ロジックの実装
UIコンポーネントの実装とスタイル適用