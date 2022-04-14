//htmlのul要素（id = 'messages'）を呼び出し
var messageList = $('#messages');

//（天気予報API）に接続
var request = new XMLHttpRequest();
var owmURL = "https://weather.tsukumijima.net/api/forecast/city/270000";

request.open('GET', owmURL, true);
//結果をjson型で受け取る
request.responseType = 'json';

request.onload = function () {
    var data = this.response;
    console.log(data);
    tenki = data["forecasts"][0]["telop"];
    var messageElement = $("<il><p class='weather'>" + tenki + "</p></il>");
    //HTMLに取得したデータを追加する
    messageList.append(messageElement);
};

request.send();