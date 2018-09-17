var shipMenu = new Vue({
    el: "#shipmenu",
    data: {

        shopee: {
            seven: 0,
            family: 0,
            life: 0,
            OK: 0
        },
        yahoo: {
            seven: 0,
            family: 0
        },
        pchomed: {
            seven: 0,
            family: 0
        },
        pchomet: {
            seven: 0,
            family: 0
        },
        Ruten: {
            seven: 0,
            family: 0
        },
        songuo: {
            family: 0
        },
        buy123: {
            seven: 0,
            family: 0
        }
    },
    computed: {
        pchomeAll: function () {
            return {
                seven: this.pchomed.seven + this.pchomet.seven,
                family: this.pchomed.family + this.pchomet.family
            }
        },
        sevencount: function () {
            return this.shopee.seven + this.yahoo.seven + this.pchomeAll.seven + this.Ruten.seven + this.buy123.seven
        },
        familycount: function () {
            return this.shopee.family + this.yahoo.family + this.pchomeAll.family + this.Ruten.family + this.buy123.family + this.songuo.family
        },
        lifecount: function () {
            return this.shopee.life
        },
        OKcount: function () {
            return this.shopee.OK
        }
    },
    methods: {
        getallweb: function () { //執行查找
            $("#shipget").attr('disabled', 'disabled') //鎖定按鈕
            shipget('yahoo', 'K')
            shipget('shopee', 'L')
            shipget('Ruten', 'L')
            shipget('pchomed', 'K')
            shipget('pchomet', 'K')
            shipget('buy123', 'K')
            shipget('songuo', 'N', 'final')
        },

        shipName: function (sv) {
            if (sv == 'seven') {
                return '7'
            } else if (sv == 'family') {
                return '全'
            } else if (sv == 'life') {
                return '萊'
            } else if (sv == 'OK') {
                return 'O'
            }
        }
    }

})
