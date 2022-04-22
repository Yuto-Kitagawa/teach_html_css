const timer_display = document.getElementById('timer-display');

const timer_button = document.getElementById('timer-button');
// 穴あき
timer_button.addEventListener('', timerButton);

/*
 * スタートボタンが押されたときに実行され
 * スタートボタンが押されてからの経過時間を表示する関数
 */
let start_time = 0; // スタートボタンが押された時間情報を記憶するための変数
let timer = 0;      // requestAnimationFrameを止めるために必要になる情報を記憶する変数

function timerButton() {
    switch (timer_button.textContent) {
        case 'スタート':
            // 経過時間の計算ができるように、スタートボタンが押された時間情報を記憶する
            start_time = Date.now();

            // 経過時間を表示する関数を呼び出し、経過時間を表示する
            timerDisplayUpdate();

            // ボタンの表示をストップに変更する
            timer_button.textContent = 'ストップ';
            break;
        default:
            // ストップボタンが押されたら
            // 経過時間表示処理を終了し
            // ボタンの表示をスタートに戻す
            cancelAnimationFrame(timer);
            timer_button.textContent = 'スタート';
    }
}


/*
 * 経過時間を表示する関数
 */
function timerDisplayUpdate() {
    // 現在の時間を取得
    const now_time = Date.now();

    // 現在の時間からスタートボタンが押された時間を引き算すると経過時間が求められる
    const diff = now_time - start_time;

    // textContentで表示を更新
    //timer_display.textContent = diff; // ←の場合ミリ秒が表示されてしまうので、秒、分、時に変換する関数を作成する
    timer_display.textContent = timerFormat(diff);

    // requestAnimationFrameで繰り返し呼び出しを行い表示を更新する
    timer = requestAnimationFrame(timerDisplayUpdate);
}


/*
 * 引数に渡された時間を秒と分と時に変換した値を返す関数
 *
 * (例)
 * 30秒の場合  timerFormat(30)  → 30
 * 1分の場合   timeFormat(60)   → 1:00
 * 1時間の場合 timeFormat(3600) → 1:00:00
 */
function timerFormat(time) {
    /*           ここのコードは無視してください          */
    // 　　　　ミリ秒は難しいので無視してください
    let ms = time % 1000;
    if (ms <= 9) {
        ms = '00' + ms;
    } else if (ms < 99) {
        ms = '0' + ms;
    }
    time = time / 1000;
    /*           ここのコードは無視してください          */


    /*
     * 時間の変換式
     *
     * 秒を求める場合は (時間) ÷ 60   の  余り  を求めると 秒 に変換できる
     * 分を求める場合は (時間) ÷ 60   の 割り算 を求めると 分 に変換できる
     * 時を求める場合は (時間) ÷ 3600 の 割り算 を求めると 時 に変換できる
     */

    /*
     * Math.floorで小数点の切り捨てができる
     * Math.floor(3.14) → 3
     * 時間表示に小数点は不必要なので切り捨てる
     */

    /*
     * 時間 から 秒 に変換
     * JavaScriptで 余り を求めるには % を使うと求めることができる 
     * なので  (時間) % 60  で 秒 が求められる
     */
    let sec = Math.floor(time % 60);


    /*
     * 時間 から 分 に変換
     * JavaScriptで 割り算(÷) を求めるには / を使うと求めることができる 
     * なので  (時間) (÷) 60  で 分 が求められる
     */
    let min = Math.floor(time / 60);


    /*
     * 時間 から 時 に変換
     * JavaScriptで 割り算(÷) を求めるには / を使うと求めることができる 
     * なので  (時間) (÷) 3600  で 時 が求められる
     */
    let hour = Math.floor(time / 3600);


    /*
     * このままだと秒数を表示した際、9秒以下の場合に
     * 1桁になりバランスが悪いので
     * 2桁に統一するために先頭に0を追加する
     * 
     * 5秒の場合 → 5 (このままだと1桁になるため以下のように修正する)
     *          → 05
     */
    if (sec <= 9) {
        sec = '0' + sec;
    }

    /* 
     * 分の場合も同上に処理する
     */
    if (min <= 9) {
        min = '0' + min;
    }

    /* 
     * 時の場合はですがお好みで調整してください
     */
    if (hour <= 9) {
        //hour = '0' + hour;
    }


    /*
     * 一時間以上の場合のみ 時(hour) を表示すればいいので、if文を使い条件分岐し
     * 時、分、秒を コロン ’：’  で挟みます。
     * このとき以下のように テンプレートリテラル　(バッククォーテーション `` )を使うとわかりやすく記述できます
     */
    if (hour >= 1) {
        return `${hour}:${min}:${sec}:${ms}`;
    } else {
        return `${min}:${sec}:${ms}`;
    }

}