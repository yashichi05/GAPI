var printorderobj = new Vue({
    el: '#printOrder',
    data: {
        srdate: new Date().getFullYear().toString()+"-"+(new Date().getMonth()+1).toString()+"-"+new Date().getDate().toString(),
        allorder: []
    },
    computed:{
        rdate:{
            set:
            function(setdata){
                this.srdate = setdata},
            get:
            function(){
                var spdate = this.srdate.split("-")
                if (spdate[1].length<2){
                    spdate[1] = "0"+spdate[1]
                }
                if (spdate[2].length<2){
                    spdate[2] = "0"+spdate[2]
                }
                this.srdate = spdate[0]+"-"+spdate[1]+"-"+spdate[2]
                return this.srdate},
        
        }
        
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
                printOrders('yahoo', 1, 2, 5, 6, 7, 8, 9, 11, 12, 14);
            } else if (web == "shopee") {
                printOrders('shopee', 1, 2, 5, 6, 7, 8, 9, 11, 12, 13);
            } else if (web == "yahoot") {
                printOrders('yahoot',   1, 2, 5, 6, 7, 8, 9, 11, 12, 14);
            } else if (web == "pchomet") {
                printOrders('pchomet', 1, 2, 4, 5, 6, 7, 8, 10, 11, 12);
            } else if (web == "Ruten") {
                printOrders('Ruten', 1, 3, 5, 6, 7, 8, 9, 11, 12, 13);
            } else if (web == "songuo") {
                printOrders('songuo', 1, 2, 4, 5, 6, 7, 9, 14, 16, 12);
            } else if (web == "buy123") {
                printOrders('buy123', 2, 3, 4, 5, 6, 7, 9, 10, 11, 9);
            } else if (web == "LINE") {
                printOrders('LINE', 1, 1, 3, 4, 5, 6, 7, 9, 12, 10);
            }


        }
    }
})
