var printorderobj = new Vue({
    el: '#printOrder',
    data: {
        rdate: new Date().getFullYear().toString()+"-"+(new Date().getMonth()+1).toString()+"-"+new Date().getDate().toString(),
        allorder: []
    },
    methods: {
        allshow: function () {
            for (var i = 0; i < this.allorder.length; i++) {
                this.allorder[i].applychkdisplay = true
            }
        },
        applychk: function () {
            for (var i = 0; i < this.allorder.length; i++) {
                this.allorder[i].applychkdisplay = !this.allorder[i].chkdisplay
            }
        },
        pushPobj: function (index, iso, pname, ptype, pcount, pprice) {
            this.allorder[index].products.push({
                iso: iso,
                pname: pname,
                ptype: ptype,
                pcount: pcount,
                pprice: pprice
            })
        },
        pushOobj: function (orderID, cusname, ship, shipprice, oprice) {
            this.allorder.push({
                orderID: orderID,
                cusname: cusname,
                ship: ship,
                shipprice: shipprice,
                oprice: oprice,
                chkdisplay: true,
                applychkdisplay: true,
                products: []
            })
        },
        doit: function (web) { //(web, okey, name, iso, pname, ptype, pcount, pprice, ship, shipprice, oprice)
            this.allorder = []
            $("button").attr('disabled', 'disabled') //鎖定按鈕
            if (web == "yahoo") {
                printOrders('yahoo', 1, 2, 4, 5, 6, 7, 8, 10, 11, 17);
            } else if (web == "shopee") {
                printOrders('shopee', 1, 2, 5, 6, 7, 8, 9, 11, 12, 13);
            } else if (web == "pchomed") {
                printOrders('pchomed', 1, 2, 4, 5, 6, 7, 8, 10, 11, 13);
            } else if (web == "pchomet") {
                printOrders('pchomet', 1, 2, 4, 5, 6, 7, 8, 10, 11, 13);
            } else if (web == "Ruten") {
                printOrders('Ruten', 1, 3, 5, 6, 7, 8, 9, 11, 12, 14);
            } else if (web == "songuo") {
                printOrders('songuo', 1, 2, 4, 5, 6, 16, 16, 7, 16, 12);
            } else if (web == "buy123") {
                printOrders('buy123', 2, 3, 4, 5, 6, 7, 16, 10, 16, 9);
            }


        }
    }
})
