var productL = new Vue({
    el: '#productsdiv',
    data: {
        productlist: "",
        col:""
    },
    methods: {
        doit: function(col){
            this.col = col
            $("button").attr('disabled', 'disabled')
            printporductslist(col);
        }
    }
})
