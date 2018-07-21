var sheetrange = { //寫入的範圍
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





//案送出後執行的城市
var btnclickEvent = {
    todayDate: function () { //當日日期
        var todayDate = new Date();
        return todayDate.toLocaleDateString()
    },
    submitOrder: function () {
        if (webform.web == 'yahoo') { //yahoo訂單記錄寫入
            var yahookey = webform.orderAccount //設定KEY值 若KEY無值則不會新增任何東西
            if (yahookey.length == 0) {
                webform.orderAccount = '未輸入代號'
                return
            }



            var aryV = []; //設定陣列
            aryV.push([this.todayDate(), webform.orderAccount, webform.orderCustomer, webform.orderTel, productlist.products[0].productIso, productlist.products[0].productName, productlist.products[0].productType, productlist.products[0].productCount, productlist.products[0].productPrice, productlist.products[0].productAllpirce, "'" + webform.orderShip, webform.orderShipPrice, webform.orderDiscount, "", "", "", "", webform.orderPrice]); //產生第一列
            for (var i = 1; i < productlist.products.length - 1; i++) { //-1是因為永遠會多一攔 從第二列開始新增
                aryV.push([this.todayDate(), webform.orderAccount, webform.orderCustomer, webform.orderTel, productlist.products[i].productIso, productlist.products[i].productName, productlist.products[i].productType, productlist.products[i].productCount, productlist.products[i].productPrice, productlist.products[i].productAllpirce])
            };



            submitData(sheetrange.yahooID.gid, sheetrange.yahooID.gname, aryV); //資料送出

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


function submitData(getid, getname, aryV) { //取得最後一列，並寫入資料
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: getid,
        range: getname + "B:B"
    }).then(function (response) {

        //console.log(response.result.values)
        var dataLen = response.result.values.length + 1;
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
