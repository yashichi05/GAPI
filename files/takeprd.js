var takeprd = new Vue({
    el: '#inputbox',
    data: {
        iso: '',
        count: '',
        isoAry: '',
        countAry: ''
        ,Col:'L'
    },
    methods: {
        submit: function () {
            this.isoAry = this.iso.split("\n")
            this.countAry = this.count.split("\n")
            $("#errordiv").text("")
            if (this.isoAry.length == this.countAry.length) {
                cancelprd(this.Col) //要改拿的欄位
            } else {
                $("#errordiv").append("長度不正確")
            }

        }
    }

})
