var sheetrange = { //寫入的範圍
    resStock: {
        gid: '19ZXwhENPrLmLURoKO4xXoCDahpyMG5wuU_8xsU74kyI',
        gname: '工作表1!'
    },
    yahooID: {
        gid: '1ve2C2zi_W8ctD4ObBdkEkheStQGgopHpGHXd_ygdNiI',
        gname: 'YAHOO拍賣!'
    },
    shopeeID: {
        gid: '1-m4Y_02IF82_o7dI3N8z9mA4GcuqspyaaPtHxmze1Uk',
        gname: '工作表1!'
    },
    pchomedID: {
        gid: '1Vm0WQTShQSCRswroN2N4MNq-ofJPAOvv_yPMqVTNqnc',
        gname: '大一!'
    },
    pchometID: {
        gid: '1Vm0WQTShQSCRswroN2N4MNq-ofJPAOvv_yPMqVTNqnc',
        gname: '梓原!'
    },
    RutenID: {
        gid: '1nimYD9iPgdHE7RXWqflBocOkj29mRVkCaatcWbq4Rvw',
        gname: '露天拍賣!'
    },
    songuoID: {
        gid: '1MRTaGo2H0xyhhyeA-Y0EDlVUzJ8J_djI6qCawZRt1Qw',
        gname: '工作表1!'
    }
}

var CLIENT_ID = '1010956056834-4thptaslrefke4ji4ctr3i6kipvpiuaq.apps.googleusercontent.com';
var API_KEY = 'AIzaSyAHl2xxKPSYdNRsAN8B-WAlYWUMuHa1LB8';
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
var SCOPES = "https://www.googleapis.com/auth/spreadsheets";


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
        if (pindex == productlist.products.length - 2) { //最後一個商品時//解放按鈕 -2是因為index從0開始 商品列又固定多1  因為後面找不到值會return 所以在這
            buttonevent.activButton()
            if (buttonevent.btnevent == 2) { //如果是刪除事件
                $("#orderdel").attr('disabled', 'disabled') //鎖定刪除按鈕
                $("#ordersubmit").removeAttr('disabled') //激活送出紐
                buttonevent.btnevent = '' //還原初始值
            }
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
        var dataLen = response.result.values.length + 1; //寫入的列數
        if (response.result.values[dataLen - 2][0] != buttonevent.todayDate()) { //比對最後一筆資料是否為今天日期 不是的話自動空一列
            dataLen = dataLen + 1;
        }
        webform.orderSheetRow = [dataLen, dataLen + productlist.products.length - 2] //輸出所在列數
        writesheetrangeAppend(getid, getname + "A" + dataLen.toString(), aryV)

    }, function (response) {
        console.log('Error: ' + response.result.error.message);
    });

}

function writesheetrange(setid, setrange, setvalues) { //寫入資料 update方法
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

function handleClientLoad() { //啟動
    gapi.load('client:auth2', initClient);
}

function initClient() { //初始化
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




function clearOrderSheet(gid, gname, row) { //刪除訂單
    gapi.client.sheets.spreadsheets.values.batchClear({
            spreadsheetId: gid,
            ranges: [gname + row[0] + ':' + row[1]]
        })
        .then(function (response) {}, function (reason) {
            console.error('error: ' + reason.result.error.message);
        });
}

function writesheetrangeAppend(setid, setrange,setvalues) { //append的方法
    gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: setid,
        range: setrange,
        valueInputOption: 'USER_ENTERED', //自動挑整格式
        majorDimension: "ROWS",
        values: setvalues

    }).then(function (response) {
        var result = response.result;
        console.log(`${result.updatedCells} cells updated.`);
    });

}
