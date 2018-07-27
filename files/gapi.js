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
    },
    buy123: {
        gid: '1jztvn3KG-e6ffWfEfUYF7pBS_vdYFGofM2dH8C4Krrs',
        gname: '工作表!'
    }
}

var CLIENT_ID = '830462167717-2hh5u6k5fo2iuscsfohas2fide5n9g24.apps.googleusercontent.com';
var API_KEY = 'AIzaSyBj8xjZ75lF9oEirYXbEQA-pyJcZKgkHgE';
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

function writesheetrangeAppend(setid, setrange, setvalues) { //append的方法
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


//receipt 專用
function getTodayOrder(getid, getname, oi, on, op, rn) { //取得今日訂單的第一列
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: getid,
        range: getname + "A:U" //讀取整個試算表，A:Z 必須包含發票 金額 資料
    }).then(function (response) {

        var todayDate = new Date();
        var aryA = []
        var aryPindex = []
        for (var i = 0; i < response.result.values.length; i++) { //提取日期
            aryA.push(response.result.values[i][0]);
        }
        var getV = aryA.indexOf(todayDate.toLocaleDateString()); //尋找當天日期列數
        if (getV == -1) { //如果找不到返回
            $('#cantFindp').remove()
            $('#receiptdiv').append('<p id=\"cantFindp\">找不到資料</p>')
            return
        };
        $('#cantFindp').remove() //如果有找到則刪除html"找不到"訊息
        for (var i = getV; i < response.result.values.length; i++) {
            if (response.result.values[i][op]) { //有值則執行 新增物件
                aryPindex.push(i)
                receiptdiv.addOrdersObj(response.result.values[i][oi], response.result.values[i][on], response.result.values[i][op], response.result.values[i][rn]) //增加V-FOR物件
            }
        }

        receiptdiv.RowIndex = aryPindex //回傳各訂單開頭列數陣列，寫入用



    }, function (response) {
        console.log('Error: ' + response.result.error.message);
    });

}

//貨運統計
function shipget(web,ship,col) { //取得貨運那蘭 web 哪個平台 ship 哪個貨運 col 貨運於哪個欄位
    var getid = eval("sheetrange."+web+"ID.gid")
    var getname = eval("sheetrange."+web+"ID.gname")
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: getid,
        range: getname + "A:"+col
    }).then(function (response) {

        var todayDate = new Date();
        var aryA = [] //存放日期
        var aryS = [] //存放貨運資料
        for (var i = 0; i < response.result.values.length; i++) { //提取日期
            aryA.push(response.result.values[i][0]);
        }
        var getV = aryA.indexOf(todayDate.toLocaleDateString()); //尋找當天日期列數
        if (getV == -1) { //如果找不到返回
            return
        };
        var shipcolindex = response.result.values.length-1 //貨運的欄位INDEX
        for (var i = getV; i < response.result.values.length; i++) {
            if (response.result.values[i][shipcolindex]) { //有值則執行 將貨運推至陣列
                aryS.push(i)
            }
        }
        var sc =[] //存放宅配方式
        for (var i = 0; i < aryS.length; i++) {
            if (aryS[i]==ship) { //符合要尋找的貨運方式 將貨運推至陣列 ship要設定成7-11 全家 萊爾富
                sc.push(i)
            }
        }
        eval("shipMenu."+web+"."+ship+" = sc.length")
        




    }, function (response) {
        console.log('Error: ' + response.result.error.message);
    });

}
