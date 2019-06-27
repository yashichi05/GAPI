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
        yahoot: {
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
            seven: 0,
            family: 0
        },
        buy123: {
            seven: 0,
            family: 0
        },
        facebook: {
            seven: 0,
            family: 0
        }
    },
    computed: {
        yahooAll: function () {
            return {
                seven: this.yahoo.seven + this.yahoot.seven,
                family: this.yahoo.family + this.yahoot.family
            }
        },
        pchomeAll: function () {
            return {
                seven: this.pchomed.seven + this.pchomet.seven,
                family: this.pchomed.family + this.pchomet.family
            }
        },
        sevencount: function () {
            return this.facebook.seven + this.shopee.seven + this.yahooAll.seven + this.pchomeAll.seven + this.Ruten.seven + this.buy123.seven +this.songuo.seven
        },
        familycount: function () {
            return this.facebook.family + this.shopee.family + this.yahooAll.family + this.pchomeAll.family + this.Ruten.family + this.buy123.family + this.songuo.family
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
            shipget('yahoo', 'L')
            shipget('facebook', 'J')
            shipget('yahoot', 'L')
            shipget('shopee', 'L')
            shipget('Ruten', 'L')
            shipget('pchomet', 'K')
            shipget('pchomed', 'K')
            shipget('buy123', 'K')
            shipget('songuo', 'O', 'final')
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
