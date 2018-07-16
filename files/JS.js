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
        orderFee_display: false
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
        ruten: function () {},
        yahoo: function () {this.orderID_display=false;this.orderFee_display=false;this.orderAccount_display=true;this.orderDiscount_display=true},
        pchomet: function () {this.orderID_display=true;this.orderFee_display=false;this.orderAccount_display=false;this.orderDiscount_display=false},
        pchomed: function () {this.orderID_display=true;this.orderFee_display=false;this.orderAccount_display=false;this.orderDiscount_display=false},
        shopee: function () {this.orderID_display=true;this.orderFee_display=false;this.orderAccount_display=true;this.orderDiscount_display=false},
        songuo: function () {this.orderID_display=true;this.orderFee_display=true;this.orderAccount_display=false;this.orderDiscount_display=true}

    }
})
