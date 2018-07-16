//jquery
$('.pdtinput').bind('paste', null, function (e) {
    $this = $(this);
    setTimeout(function () {
        var columns = $this.val().split("	");
        var input = $this
        for (var i = 0; i < columns.length; i++) {
            input.val(columns[i]);
            input = input.next()
        }
    }, 0);
});

//vue
var webform = new Vue({
    el: '#orderform',
    data: {
        web: 'yahoo',
        orderID_display: false,
        orderAccount_display: true,
        orderDiscount_display: true,
        orderFee_display: false,
        allnon: true //手續費和折扣都沒有不要換行
    },
    methods: {
        formchange: function () {
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
        ruten: function () {
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
            }
            else {
                this.allnon = true
            }
        }

    }
})
