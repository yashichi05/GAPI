Vue.component('order-list', {
    props: ['orderid', 'ship', 'shipprice', 'oprice'],
    template: '<div class="orderdiv">{{orderid}}</div>'
})
Vue.component('product-list', {
    props: ['pindex', 'iso', 'pname', 'ptype', 'pcount', 'pprice'],
    template: '<span>{{pindex}}{{iso}}{{pname}}{{ptype}}{{pcount}}{{pprice}}</span>'
})

var printorderobj = new Vue({
    el: '#printOrder',
    data: {
        allorder: []
    },
    methods: {
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
                products: []
            })
        },
        doit: function () { //(web, okey, name, iso, pname, ptype, pcount, pprice, ship, shipprice, oprice)
            printOrders('yahoo', 1, 2, 4, 5, 6, 7, 8, 10, 11, 17);
            printOrders('shopee', 1, 2, 5, 6, 7, 8, 9, 11, 12, 13);
        }
    }
})
