var shipMenu = new Vue({
    el: "#shipmenu",
    data: {

        shopee: {
            seven: 5,
            family: 7,
            life: 1
        },
        yahoo: {
            seven: 5,
            family: 7
        },
        pchomed: {
            seven: 7,
            family: 7
        },
        pchomet: {
            seven: 5,
            family: 7
        },
        Ruten: {
            seven: 5,
            family: 7
        },
        songuo: {
            family: 7
        },
        buy123: {
            seven: 5,
            family: 7
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
        }
    },
    methods: {
        shipName: function (sv) {
            if (sv == 'seven') {
                return '7-11'
            }
        }
        else if (sv == 'family') {
            return '全家'
        }
        else if (sv == 'life') {
            return '萊爾富'
        }
    }

})
