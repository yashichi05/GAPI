function btnclick() {

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

function writesheetrange(setrange, setvalues) {
    var body = {
        values: setvalues
    };
    gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: '1o14isxIEJIzNOraSgDbR0eGZqzRFSKpncFZM1C7cTCA',
        range: 't!' + setrange,
        valueInputOption: 'RAW',
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
function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}




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
