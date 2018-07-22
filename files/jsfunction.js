//vue



///////////////////////////////////////
var buttonevent = new Vue({ //按鈕事件 //送出時檢查 訂單金額是否為數字，若否則跳出alert
    el: '#buttonEvent',
    data: {},
    methods: {
        stockmanage: function () {
            for (var i = 0; i < productlist.products.length - 1; i++) {
                var miso = productlist.products[i].productIso;
                var mcount = productlist.products[i].productCount;
                GsubmitStockData(miso, mcount, i);
            }

        },
        todayDate: function () { //當日日期
            var todayDate = new Date();
            return todayDate.toLocaleDateString();
        },
        submitOrder: function () { //跨日需自動控行(未完成)
            if (webform.web == 'yahoo') { //yahoo訂單記錄寫入
                var orderkey = webform.orderAccount //設定KEY值 若KEY無值則不會傳送
                if (orderkey.length == 0) {
                    webform.orderAccount = '未輸入代號'
                    return
                }
                var aryV = []; //設定陣列
                aryV.push([this.todayDate(), webform.orderAccount, webform.orderCustomer, "'" + webform.orderTel, productlist.products[0].productIso, productlist.products[0].productName, productlist.products[0].productType, productlist.products[0].productCount, productlist.products[0].productPrice, productlist.products[0].productAllpirce, "'" + webform.orderShip, webform.orderShipPrice, webform.orderDiscount, "", "", "", "", webform.orderPrice]); //產生第一列

                for (var i = 1; i < productlist.products.length - 1; i++) { //-1是因為永遠會多一攔 從第二列開始新增
                    aryV.push([this.todayDate(), webform.orderAccount, webform.orderCustomer, "'" + webform.orderTel, productlist.products[i].productIso, productlist.products[i].productName, productlist.products[i].productType, productlist.products[i].productCount, productlist.products[i].productPrice, productlist.products[i].productAllpirce])
                };
                /////
                GsubmitOrderData(sheetrange.yahooID.gid, sheetrange.yahooID.gname, aryV); //資料送出
                this.stockmanage(); //扣數量

            } else if (webform.web == 'pchomet') {
                ///////KEY值
                var orderkey = webform.orderID; //設定KEY值 若KEY無值則不會傳送
                if (orderkey.length == 0) {
                    webform.orderID = '未輸入訂單編號'
                    return
                }
                ///////資料陣列
                var aryV = [];
                aryV.push([this.todayDate(), webform.orderID, webform.orderCustomer, "'" + webform.orderTel, "'" + productlist.products[0].productIso, productlist.products[0].productName, productlist.products[0].productType, productlist.products[0].productCount, productlist.products[0].productPrice, productlist.products[0].productAllpirce, "'" + webform.orderShip, webform.orderShipPrice, "", webform.orderPrice]); //產生第一列
                for (var i = 1; i < productlist.products.length - 1; i++) { //-1是因為永遠會多一攔 從第二列開始新增
                    aryV.push([this.todayDate(), webform.orderID, webform.orderCustomer, "'" + webform.orderTel, "'" + productlist.products[i].productIso, productlist.products[i].productName, productlist.products[i].productType, productlist.products[i].productCount, productlist.products[i].productPrice, productlist.products[i].productAllpirce])
                };

                //////執行送出
                GsubmitOrderData(sheetrange.pchometID.gid, sheetrange.pchometID.gname, aryV); //資料送出
                this.stockmanage(); //扣數量

            } else if (webform.web == 'pchomed') {
                ///////KEY值
                var orderkey = webform.orderID; //設定KEY值 若KEY無值則不會傳送
                if (orderkey.length == 0) {
                    webform.orderID = '未輸入訂單編號'
                    return
                }
                ///////資料陣列
                var aryV = [];
                aryV.push([this.todayDate(), webform.orderID, webform.orderCustomer, "'" + webform.orderTel, "'" + productlist.products[0].productIso, productlist.products[0].productName, productlist.products[0].productType, productlist.products[0].productCount, productlist.products[0].productPrice, productlist.products[0].productAllpirce, "'" + webform.orderShip, webform.orderShipPrice, "", webform.orderPrice]); //產生第一列
                for (var i = 1; i < productlist.products.length - 1; i++) { //-1是因為永遠會多一攔 從第二列開始新增
                    aryV.push([this.todayDate(), webform.orderID, webform.orderCustomer, "'" + webform.orderTel, "'" + productlist.products[i].productIso, productlist.products[i].productName, productlist.products[i].productType, productlist.products[i].productCount, productlist.products[i].productPrice, productlist.products[i].productAllpirce])
                };

                //////執行送出
                GsubmitOrderData(sheetrange.pchomedID.gid, sheetrange.pchomedID.gname, aryV); //資料送出
                this.stockmanage(); //扣數量

            } else if (webform.web == 'shopee') {
                ///////KEY值
                var orderkey = webform.orderID; //設定KEY值 若KEY無值則不會傳送
                if (orderkey.length == 0) {
                    webform.orderID = '未輸入訂單編號'
                    return
                }
                ///////資料陣列
                var aryV = [];
                aryV.push([this.todayDate(), webform.orderID, webform.orderCustomer, "'" + webform.orderTel, webform.orderAccount, "'" + productlist.products[0].productIso, productlist.products[0].productName, productlist.products[0].productType, productlist.products[0].productCount, productlist.products[0].productPrice, productlist.products[0].productAllpirce, "'" + webform.orderShip, webform.orderShipPrice, webform.orderPrice, "", webform.orderFeeCreditCal]); //產生第一列
                for (var i = 1; i < productlist.products.length - 1; i++) { //-1是因為永遠會多一攔 從第二列開始新增
                    aryV.push([this.todayDate(), webform.orderID, webform.orderCustomer, "'" + webform.orderTel, webform.orderAccount, "'" + productlist.products[i].productIso, productlist.products[i].productName, productlist.products[i].productType, productlist.products[i].productCount, productlist.products[i].productPrice, productlist.products[i].productAllpirce])
                };

                //////執行送出
                GsubmitOrderData(sheetrange.shopeeID.gid, sheetrange.shopeeID.gname, aryV); //資料送出
                this.stockmanage(); //扣數量

            } else if (webform.web == 'ruten') {
                ///////KEY值
                var orderkey = webform.orderID; //設定KEY值 若KEY無值則不會傳送
                if (orderkey.length == 0) {
                    webform.orderID = '未輸入訂單編號'
                    return
                }
                ///////資料陣列
                var aryV = [];
                aryV.push([this.todayDate(), webform.orderID, webform.orderID, webform.orderCustomer, "'" + webform.orderTel, "'" + productlist.products[0].productIso, productlist.products[0].productName, productlist.products[0].productType, productlist.products[0].productCount, productlist.products[0].productPrice, productlist.products[0].productAllpirce, "'" + webform.orderShip, webform.orderShipPrice, "", webform.orderPrice]); //產生第一列
                for (var i = 1; i < productlist.products.length - 1; i++) { //-1是因為永遠會多一攔 從第二列開始新增
                    aryV.push([this.todayDate(), webform.orderID, webform.orderCustomer, "'" + webform.orderTel, "'" + productlist.products[i].productIso, productlist.products[i].productName, productlist.products[i].productType, productlist.products[i].productCount, productlist.products[i].productPrice, productlist.products[i].productAllpirce])
                };

                //////執行送出
                GsubmitOrderData(sheetrange.RutenID.gid, sheetrange.RutenID.gname, aryV); //資料送出
                this.stockmanage(); //扣數量

            } else if (webform.web == 'songuo') {
                ///////KEY值
                var orderkey = webform.orderID; //設定KEY值 若KEY無值則不會傳送
                if (orderkey.length == 0) {
                    webform.orderID = '未輸入訂單編號'
                    return
                }
                ///////資料陣列
                ///先產生商品列
                var SGproductsISO = productlist.products[0].productIso + "*" + productlist.products[0].productCount;
                var SGproductsName = productlist.products[0].productName;
                var SGproductsType = productlist.products[0].productType + "*" + productlist.products[0].productCount;
                for (var i = 1; i < productlist.products.length - 1; i++) { //-1是因為永遠會多一攔 從第二列開始新增
                    SGproductsISO = SGproductsISO + "\n" + productlist.products[i].productIso + "*" + productlist.products[i].productCount
                };
                for (var i = 1; i < productlist.products.length - 1; i++) { //-1是因為永遠會多一攔 從第二列開始新增
                    SGproductsName = SGproductsName + "\n" + productlist.products[i].productName
                };
                for (var i = 1; i < productlist.products.length - 1; i++) { //-1是因為永遠會多一攔 從第二列開始新增
                    SGproductsType = SGproductsType + "\n" + productlist.products[i].productType + "*" + productlist.products[i].productCount
                };
                var aryV = [];
                aryV.push([this.todayDate(), webform.orderID, webform.orderCustomer, "'" + webform.orderTel, SGproductsISO, SGproductsName, SGproductsType, webform.SGcount + "入", webform.SGcountC, webform.SGPrice, webform.orderFee, webform.orderDiscount, webform.orderPrice]);


                //////執行送出
                GsubmitOrderData(sheetrange.songuoID.gid, sheetrange.songuoID.gname, aryV); //資料送出
                this.stockmanage(); //扣數量


            }

        },
        delOreder: function () {},
        nextOrder: function () {
            //清空訂單資料
            webform.orderID = ""
            webform.orderAccount = ""
            webform.orderCustomer = ""
            webform.orderTel = ""
            webform.orderDiscount = ""
            webform.orderFee = ""
            webform.orderFeeCredit = ""
            webform.SGcount = ""
            webform.SGcountC = "1"
            webform.SGPrice = ""
            //初始化商品資料
            productlist.products = []
            setTimeout(function () { //沒有設settimeout 不會重製第一欄
                productlist.products = [{
                        id: "0",
                        productIso: "",
                        productName: "",
                        productType: "",
                        productCount: "",
                        productPrice: "",
                        productAllpirce: ""
              }
          ]}, 1)

        }

    }

})

////////////////////////////////////////
Vue.component('product-input', { //商品列表input,
    data: function () { //每個產生的元件皆有counter 變數，不共用
        return {
            countC: this.count1,
            countP: this.count2,
            countAP: this.count3
        }
    },
    props: ['comp_id', 'count1', 'count2', 'count3'],
    template: '<div :id="\'product-\'+comp_id.toString()">\
<div>\
<input :id="\'ph-\'+comp_id.toString()" class="pdtinput" type="search" placeholder="品項">\
<input :id="\'Iso-\'+comp_id.toString()" class="pdtinput" type="search" @change="putToproductlist(\'productIso\',comp_id )"  placeholder="國際條碼">\
<input :id="\'Name-\'+comp_id.toString()" class="pdtinput" type="search" @change="putToproductlist(\'productName\',comp_id)"  placeholder="商品名稱">\
<input :id="\'Type-\'+comp_id.toString()" class="pdtinput" type="search" @change="putToproductlist(\'productType\',comp_id)"  placeholder="款式">\
</div>\
\
<div>\
<input :id="\'count-\'+comp_id.toString()" type="search" v-on:focus.once="addinput" @keyup.enter="nextInput(\'count-\'+comp_id.toString()) "@change="putToproductlist(\'productCount\',comp_id)" placeholder="數量" v-model="countC">\
<input :id="\'price-\'+comp_id.toString()" class="SGdisplay" type="search" @keyup.enter="nextInput(\'price-\'+comp_id.toString())" @change="putToproductlist(\'productPrice\',comp_id)"  placeholder="價格" v-model="countP">\
<input :id="\'allprice-\'+comp_id.toString()" class="SGdisplay" type="search" @change="putToproductlist(\'productAllpirce\',comp_id)"  placeholder="總價" v-model="countAP">\
<span :id="\'getOres-\'+comp_id.toString()"></span><span style="padding-left:10px;" :id="\'getBres-\'+comp_id.toString()"></span>\
</div>\
</div>',
    computed: {},

    methods: {
        nextInput: function (target) {
            $('#' + target).next().focus();
        },
        addinput: function () {
            productlist.products.push({
                id: Number(this.comp_id) + 1,
                productIso: "",
                productName: "",
                productType: "",
                productCount: "",
                productPrice: "",
                productAllpirce: ""
            });
            productlist.SGdetect(); //松果偵測
        },
        putToproductlist: function (a, b) { //用手動輸入 值變化後 會觸發附值
            if (a == 'productIso') {
                productlist.products[b].productIso = $("#Iso-" + b.toString()).val()
            } else if (a == 'productName') {
                productlist.products[b].productName = $("#Name-" + b.toString()).val()
            } else if (a == 'productType') {
                productlist.products[b].productType = $("#Type-" + b.toString()).val()
            } else if (a == 'productCount') {
                if (this.countP) { //價格有值 再算總價 避免出現NAN
                    this.countAP = this.countC * this.countP //計算總價
                    productlist.products[b].productAllpirce = this.countAP //傳送總價
                }
                productlist.products[b].productCount = $("#count-" + b.toString()).val() //傳送count資料
            } else if (a == 'productPrice') {
                this.countAP = this.countC * this.countP //計算總價
                productlist.products[b].productPrice = $("#price-" + b.toString()).val()
                productlist.products[b].productAllpirce = this.countAP //傳送總價 
            } else if (a == 'productAllpirce') {
                this.countP = this.countAP / this.countC //計算單價
                productlist.products[b].productAllpirce = $("#allprice-" + b.toString()).val()
                productlist.products[b].productPrice = this.countP //傳送總價 
            }

        }
    }
})


///////////////////////////////////////////////////////////
var productlist = new Vue({ //商品列表資料
    el: '#productlist',
    data: {
        products: [
            {
                id: "0",
                productIso: "",
                productName: "",
                productType: "",
                productCount: "",
                productPrice: "",
                productAllpirce: ""
              }
          ]
    },
    methods: {
        SGdetect: function () { //偵測是否是松果 控制商品列顯示欄位
            if (webform.web == 'songuo') { //判斷是否為松果、是的話隱藏商品價格
                $(".SGdisplay").css("display", "none");
            } else {
                $(".SGdisplay").css("display", "inline");
            }
        },
        splitpaste: function () {
            $('.pdtinput').bind('paste', null, function (e) {
                $this = $(this);
                setTimeout(function () {
                    var columns = $this.val().split("	");
                    var input = $this
                    for (var i = 0; i < columns.length; i++) {
                        input.val(columns[i]);
                        var vAry = input.attr('id')
                        if (vAry) {
                            vAry = vAry.split('-') //貼上多出一欄，會有錯訊息 所以上面要判斷vAry是否有值
                            if (vAry[0] != 'ph') { //貼上自動分攔 貼上後不能執行@change 所以自己附值
                                vAry = 'productlist.products[' + vAry[1] + '].product' + vAry[0] + '= columns[i]'
                                eval(vAry);
                            }
                        }
                        input = input.next();
                    }
                    var t = '$("#count-' + $this.attr('id').split('-')[1] + '").focus()'; //貼完 focus數量input
                    eval(t);
                }, 0);
            });
        }

    }

})
///////////////////////////////////////////////////
var webform = new Vue({ //訂單客人資料
    el: '#orderform',
    data: {
        gsheetcol: 'L', //庫存表存取欄位
        orderID_display: false,
        orderAccount_display: true,
        orderDiscount_display: true,
        orderFeeCredit_display: false,
        SGCdisplay: false, //松果，手續費，入數顯示
        web: 'yahoo',
        orderID: "",
        orderAccount: "",
        orderCustomer: "",
        orderTel: "",
        orderDiscount: "",
        orderFee: "",
        orderShip: "7-11",
        orderShipPrice: "0",
        orderFeeCredit: "",
        SGcount: "",
        SGcountC: "1",
        SGPrice: ""
    },
    computed: { //訂單總金額
        orderFeeCreditCal: function () {
            if (this.orderFeeCredit) { //有值計算
                var cal = Math.round(this.orderPrice * 0.015) //信用卡付款 *0.015輸出 四捨五入到整數
                return cal
            } else {
                //否則返回空直
                return ""
            }
        },
        orderPrice: function () {
            var OP = 0
            for (var i = 0; i < productlist.products.length; i++) {
                OP = OP + Number(productlist.products[i].productAllpirce)
            }
            return Number(this.orderShipPrice) + OP - this.orderDiscount + Number(this.SGPrice) + Number(this.orderFee);
        },
        ifallnon: function () { //如果手續費及折扣都沒有則不換行
            if (this.SGCdisplay == false && this.orderDiscount_display == false) {
                return false
            } else {
                return true
            }
        }
    },
    methods: {
        formchange: function () { //判斷平台
            if (this.web == 'ruten') {
                this.ruten();
            } else if (this.web == 'yahoo') {
                this.yahoo();
            } else if (this.web == 'pchomet') {
                this.pchomet();
            } else if (this.web == 'pchomed') {
                this.pchomed();
            } else if (this.web == 'shopee') {
                this.shopee();
            } else if (this.web == 'songuo') {
                this.songuo();
            }
            productlist.SGdetect()
        },
        ruten: function () { //個平台隱藏顯示項目
            this.orderID_display = true;
            this.SGCdisplay = false;
            this.orderFeeCredit_display = false;
            this.orderAccount_display = true;
            this.orderDiscount_display = false;
        },
        yahoo: function () {
            this.orderID_display = false;
            this.SGCdisplay = false;
            this.orderFeeCredit_display = false;
            this.orderAccount_display = true;
            this.orderDiscount_display = true;
        },
        pchomet: function () {
            this.orderID_display = true;
            this.SGCdisplay = false;
            this.orderFeeCredit_display = false;
            this.orderAccount_display = false;
            this.orderDiscount_display = false;
        },
        pchomed: function () {
            this.orderID_display = true;
            this.SGCdisplay = false;
            this.orderFeeCredit_display = false;
            this.orderAccount_display = false;
            this.orderDiscount_display = false;
        },
        shopee: function () {
            this.orderID_display = true;
            this.SGCdisplay = false;
            this.orderFeeCredit_display = true;
            this.orderAccount_display = true;
            this.orderDiscount_display = false;
        },
        songuo: function () {
            this.orderID_display = true;
            this.SGCdisplay = true;
            this.orderFeeCredit_display = false;
            this.orderAccount_display = false;
            this.orderDiscount_display = true;
        }



    }
})
