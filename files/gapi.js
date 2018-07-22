var sheetrange = { //寫入的範圍
    resStock: {
        gid: '1o14isxIEJIzNOraSgDbR0eGZqzRFSKpncFZM1C7cTCA',
        gname: 't!'
    },
    yahooID: {
        gid: '1o14isxIEJIzNOraSgDbR0eGZqzRFSKpncFZM1C7cTCA',
        gname: 'Y!'
    },
    shopeeID: {
        gid: '1o14isxIEJIzNOraSgDbR0eGZqzRFSKpncFZM1C7cTCA',
        gname: 'S!'
    },
    pchomedID: {
        gid: '1o14isxIEJIzNOraSgDbR0eGZqzRFSKpncFZM1C7cTCA',
        gname: 'PD!'
    },
    pchometID: {
        gid: '1o14isxIEJIzNOraSgDbR0eGZqzRFSKpncFZM1C7cTCA',
        gname: 'PT!'
    },
    RutenID: {
        gid: '1o14isxIEJIzNOraSgDbR0eGZqzRFSKpncFZM1C7cTCA',
        gname: 'R!'
    },
    songuoID: {
        gid: '1o14isxIEJIzNOraSgDbR0eGZqzRFSKpncFZM1C7cTCA',
        gname: 'SG!'
    }
}






function GsubmitStockData(iso, count, pindex) { //扣數量用 差回傳資料 還有相加數量


    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: sheetrange.resStock.gid,
        range: sheetrange.resStock.gname + "B:R" //原本只有取道O蘭，但因為鎖定的取貨蘭 包括本身即之後的欄位為空，會導致陣列較短，無法取值計算 而沒法附值
    }).then(function (response) {
        var stockISOAry = [];
        var setArysite
        if (webform.gsheetcol == "K") { //判斷KLMN 陣列位置 用來計算剩餘數量，不影響寫入
            setArysite = 9;
        } else if (webform.gsheetcol == "L") {
            setArysite = 10;

        } else if (webform.gsheetcol == "M") {
            setArysite = 11;

        } else if (webform.gsheetcol == "N") {
            setArysite = 12;

        }
        //console.log(response.result.values)
        for (var i = 0; i < response.result.values.length; i++) { //提取ISO
            stockISOAry.push(response.result.values[i][0]);
        }
        var findRow = stockISOAry.indexOf(iso) + 1; //找到的ISO列數
        if (pindex == productlist.products.length - 2) { //最後一個商品時//解放按鈕 -2是因為index從0開始 商品列又固定多1 
            buttonevent.activButton()
        }
        if (findRow - 1 == -1 || iso == "") { //如果找不到ISO 會返回-1 iso為空白字元 會自動找到80列 所以強制RETURN
            var errortext = "$('#getOres-" + pindex + "').text('找不到');";
            eval(errortext)
            return
        }
        var calV1 = response.result.values[findRow - 1][13] - count; //計算拍賣架上取貨後剩餘數量
        var caltext1 = "$('#getOres-" + pindex + "').text('架:" + calV1 + "');";
        var calV2 = response.result.values[findRow - 1][7]; //顯示批發倉庫數量
        var caltext2 = "$('#getBres-" + pindex + "').text('庫:" + calV2 + "');";
        count = Number(response.result.values[findRow - 1][setArysite]) + Number(count); //總取貨量 原取貨+現取貨
        //console.log(typeof(response.result.values[findRow-1][setArysite]));
        eval(caltext1);
        eval(caltext2); //計算剩餘庫存
        var wcol = sheetrange.resStock.gname + webform.gsheetcol + findRow.toString() //設定寫入欄位
        count = [[count]]

        writesheetrange(sheetrange.resStock.gid, wcol, count) //開始寫入數量

    }, function (response) {
        console.log('Error: ' + response.result.error.message);
    });

}

function GsubmitOrderData(getid, getname, aryV) { //取得最後一列，並寫入資料
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: getid,
        range: getname + "A:B"
    }).then(function (response) {

        //console.log(response.result.values)
        var dataLen = response.result.values.length + 1;
        if (response.result.values[dataLen - 2][0] != buttonevent.todayDate()) {
            dataLen = dataLen + 1;
        }
        writesheetrange(getid, getname + "A" + dataLen.toString(), aryV)

    }, function (response) {
        console.log('Error: ' + response.result.error.message);
    });

}


function writesheetrange(setid, setrange, setvalues) { //寫入資料
    var body = {
        values: setvalues
    };
    gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: setid,
        range: setrange,
        valueInputOption: 'USER_ENTERED', //自動挑整格式
        resource: body
    }).then(function (response) {
        var result = response.result;
        console.log(`${result.updatedCells} cells updated.`);
    });

}





/**顯示結果範例
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */



var CLIENT_ID = '1010956056834-4thptaslrefke4ji4ctr3i6kipvpiuaq.apps.googleusercontent.com';
var API_KEY = 'AIzaSyAHl2xxKPSYdNRsAN8B-WAlYWUMuHa1LB8';
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
var SCOPES = "https://www.googleapis.com/auth/spreadsheets";

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        if (gapi.auth2.getAuthInstance().isSignedIn.get() == false) {
            gapi.auth2.getAuthInstance().signIn();
        } else {

        }
    });
}
