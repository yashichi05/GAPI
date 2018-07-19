var sheetrange = { //寫入的範圍
    findLastRow: function (sheetId, sheetName) { //隨找最後一列新增(未完成)
        sheetName = sheetName + 'A:A';
        return sheetName
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
//測試VALUES
var arte = [];

function testar() {
    for (var i = 0; i < productlist.products.length-1; i++) {//-1是因為永遠會多一攔
        arte.push(['日期', webform.orderAccount, webform.orderCustomer, webform.orderTel,productlist.products[i].productIso,productlist.products[i].productName,productlist.products[i].productType,productlist.products[i].productCount,productlist.products[i].productPrice,productlist.products[i].productAllpirce])

    }

}


//案送出後執行的城市
var clickEvent = {
    submitOrder: function () {
        if (webform.web == 'yahoo') { //yahoo訂單記錄寫入
            var orderValues = [['日期', webform.orderAccount, webform.orderCustomer, webform.orderTel,
webform.orderDiscount,
webform.orderShip,
webform.orderShipPrice,
productlist.products]] //yahoo訂單記錄寫入需要的值(未完成) 需要處理products 的城市 先偵測有效商品數量 → 開同數量的陣列長度→填入資料→再將商品依序 填入陣列的陣列內資料
            writesheetrange(sheetrange.yahooID.gid, findLastRow(sheetrange.yahooID.gid, sheetrange.yahooID.gname, orderValues))
        } else if (webform.web == 'pchomet') {

        } else if (webform.web == 'pchomed') {

        } else if (webform.web == 'shopee') {

        } else if (webform.web == 'ruten') {

        } else if (webform.web == 'songuo') {

        }

    },
    delOreder: function () {},
    nextOrder: function () {}
}

function getrange() { //test

    console.log("value");
    id1 = document.getElementById('1').value;
    id2 = document.getElementById('2').value;
    id3 = document.getElementById('3').value;
    id4 = document.getElementById('4').value;
    id5 = document.getElementById('5').value;
    var setv = [[id1, id2, id3, id4, id5]];
    console.log(setv);
    writesheetrange("A1", setv)

}

function writesheetrange(setid, setrange, setvalues) { //寫入資料
    var body = {
        values: setvalues
    };
    gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: setid,
        range: setrange,
        valueInputOption: 'RAW',
        resource: body
    }).then(function (response) {
        var result = response.result;
        console.log(`${result.updatedCells} cells updated.`);
    });

}


function getsheetrange(getid, getrange, ) { //讀取資料
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: getid,
        range: getrange,
    }).then(function (response) {
        console.log(response.result.values);

    }, function (response) {
        console.log('Error: ' + response.result.error.message);
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
