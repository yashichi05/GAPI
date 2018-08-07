var productL = new Vue({
    el: '#productsdiv',
    data: {
        productlist: "",
        col: "",
        hctproducts: []
    },
    methods: {
        doit: function (col) {
            this.productlist = ""
            this.col = col
            $("button").attr('disabled', 'disabled')
            printporductslist(col);
        },
        mark: function (web) {
            hctmark(web);
        }
    }
})
