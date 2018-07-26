Vue.component('receipt-input', {
    props: ['oreder', 'name', 'orderindex', 'text'],
    data: function () {
        return {
            num: ""
        }
    },
    template: '<div><span>{{oreder}}</span><span>{{name}}</span><input :id=\"\'receiptInput-\'+orderindex\" @change="putvalue" v-model=\"num\" type=\"search\"><button @click=\"autoFill\">下拉</button></div>',
    methods: {
        autoFill: function () { //自動向下填滿
            var cal = this.num.slice(-8) //取最後8碼
            for (var i = this.orderindex + 1; i < receiptdiv.orders.length; i++) {
                cal = Number(cal) + 1
                $('#receiptInput-' + i).val(this.num.slice(0, -8) + cal.toString()) //取前面的頭+算出來的數字
                receiptdiv.orders[i].receiptNumber = this.num.slice(0, -8) + cal.toString() //將變動的數字輸出到外部物件中

            }
        },
        putvalue: function () { //input 變更後 將值傳到receiptdiv.orders
            receiptdiv.orders[this.orderindex].receiptNumber = this.num

        }

    }
})

var receiptdiv = new Vue({
    el: '#receiptdiv',
    data: {
        nowbutton:"",
        receiptCal:"",
        RowIndex: "", //yahoo今日所有定定單開頭
        orders: []
    },
    methods: {
        whichbutton:function(v,oi,on,ship,rn){ //按鈕執行 v為平台名稱 ship為貨運所在欄數 OI為訂單編號所在欄數 ON訂單客人欄數 rn 發票欄位
            receiptdiv.orders = [];//淨空試算表
            var gid = eval('sheetrange.'+v+'ID.gid')
            var gname = eval('sheetrange.'+v+'ID.gname')
            this.receiptCal = rn
            this.nowbutton = v
            getTodayOrder(gid,gname,oi,on,ship);
        },
        addOrdersObj: function (id, name ) { //增加物件
            this.orders.push({
                id: id,
                name: name,
                receiptNumber:""
            })
        },
        outputNumber:function(){ //輸出輸入的發票號碼
            for(var i = 0; i<this.orders.length;i++){
                var va = [[this.orders[i].receiptNumber]];
                var prg = 'writesheetrange(sheetrange.'+this.nowbutton+'ID.gid, sheetrange.'+this.nowbutton+'ID.gname+this.receiptCal+(this.RowIndex[i]+1), va)'
                console.log(prg)
                eval(prg)
            }
        }
    }

})
