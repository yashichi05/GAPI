//vue

var test = new Vue({
    el: '#test',
    data: {
        data1: 1,
        data2: 1,
        data3: 1,

    },
    methods: {
        cal1: function () {
            this.data3 = this.data1 * this.data2
        },
        cal2: function () {
            this.data3 = this.data1 * this.data2
        },
        cal3: function () {
            this.data2 = this.data3 / this.data1
        }

    }

})

///////////////////////////////////////
var buttonevent = new Vue({ //按鈕事件
    el: '#buttonEvent',
    data: {},
    methods: {
        test: function () {
            alert('成功')
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
<input :id="\'price-\'+comp_id.toString()" type="search" @keyup.enter="nextInput(\'price-\'+comp_id.toString())" @change="putToproductlist(\'productPrice\',comp_id)"  placeholder="價格" v-model="countP">\
<input :id="\'allprice-\'+comp_id.toString()" type="search" @change="putToproductlist(\'productAllpirce\',comp_id)"  placeholder="總價" v-model="countAP">\
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
        },
        putToproductlist: function (a, b) {
            if (a == 'productIso') {
                productlist.products[b].productIso = $("#Iso-" + b.toString()).val()
            } else if (a == 'productName') {
                console.log('run')
                productlist.products[b].productName = $("#Name-" + b.toString()).val()
            } else if (a == 'productType') {
                productlist.products[b].productType = $("#Type-" + b.toString()).val()
            } else if (a == 'productCount') {
                this.countAP = this.countC * this.countP //計算總價
                productlist.products[b].productCount = $("#count-" + b.toString()).val()
                productlist.products[b].productAllpirce = this.countAP //傳送總價
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
        splitpaste: function () {
            $('.pdtinput').bind('paste', null, function (e) {
                $this = $(this);
                setTimeout(function () {
                    var columns = $this.val().split("	");
                    var input = $this
                    for (var i = 0; i < columns.length; i++) {
                        input.val(columns[i]);

                        var t = input.attr('id').split('-');
                        if (t[0] != 'ph') { //貼上自動分攔 貼上後不能執行@change 所以自己附值
                            t = 'productlist.products[' + t[1] + '].product' + t[0] + '= columns[i]'
                            eval(t);
                        }
                        input = input.next();
                    }
                var t = '$("#count-' + $this.attr('id').split('-')[1] + '").focus()';//貼完 focus數量input
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
        web: 'yahoo',
        orderID_display: false,
        orderAccount_display: true,
        orderDiscount_display: true,
        orderFee_display: false,
        allnon: true, //手續費和折扣都沒有不要換行
        orderID: "",
        orderAccount: "",
        orderCustomer: "",
        orderTel: "",
        orderDiscount: "",
        orderFee: "",
        orderShip: "0",
        orderShipPrice: ""
    },
    computed:{//訂單總金額
        orderPrice: function(){
            var OP = 0
                for(var i = 0;i<productlist.products.length;i++){OP = OP+Number(productlist.products[i].productAllpirce)}
            return Number(this.orderShip)+OP;
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
        },
        ruten: function () { //個平台隱藏顯示項目
            this.orderID_display = false;
            this.orderFee_display = false;
            this.orderAccount_display = true;
            this.orderDiscount_display = false;
            this.ifallnon()
        },
        yahoo: function () {
            this.orderID_display = false;
            this.orderFee_display = false;
            this.orderAccount_display = true;
            this.orderDiscount_display = true, this.ifallnon()
        },
        pchomet: function () {
            this.orderID_display = true;
            this.orderFee_display = false;
            this.orderAccount_display = false;
            this.orderDiscount_display = false, this.ifallnon()
        },
        pchomed: function () {
            this.orderID_display = true;
            this.orderFee_display = false;
            this.orderAccount_display = false;
            this.orderDiscount_display = false, this.ifallnon()
        },
        shopee: function () {
            this.orderID_display = true;
            this.orderFee_display = false;
            this.orderAccount_display = true;
            this.orderDiscount_display = false, this.ifallnon()
        },
        songuo: function () {
            this.orderID_display = true;
            this.orderFee_display = true;
            this.orderAccount_display = false;
            this.orderDiscount_display = true, this.ifallnon()
        },
        ifallnon: function () { //如果手續費及折扣都沒有則不換行
            if (this.orderFee_display == false && this.orderDiscount_display == false) {
                this.allnon = false
            } else {
                this.allnon = true
            }
        }


    }
})
