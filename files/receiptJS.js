Vue.component('receipt-input', {
    props: ['oreder', 'name', 'price', 'orderindex', 'rn'],
    data: function () {
        return {
            num: this.rn
        } //v-model 會附值給rn 會出現警告 ，所以新增一個NUM 初值為rn的值，當她被附值後會脫離rn
    },
    template: '<tr><td class=\"align-middle\">{{oreder}}</td><td class="align-middle">{{name}}</td><td class="align-middle">{{price}}</td><td><input class=\"form-control\" :id=\"\'receiptInput-\'+orderindex\" @change="putvalue" v-model=\"num\" type=\"search\"></td><td><button class=\"btn btn-sm btn-outline-secondary\" @click=\"autoFill\">下拉</button></td></tr>',
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

        },
        fisrtRender: function () {}

    }
})

var receiptdiv = new Vue({
    el: '#receiptdiv',
    data: {
        activebtn: false,
        nowbutton: "", //目前平台名稱
        receiptCol: "",
        RowIndex: "", //今日所有定定單開頭
        orders: [],
        sgbtn: false,
        putvalary: [],
        todayrow: "",
        srdate: new Date().getFullYear().toString()+"-"+(new Date().getMonth()+1).toString()+"-"+new Date().getDate().toString()
    },
    computed:{
        rdate:{
            set:
            function(setdata){
                this.srdate = setdata},
            get:
            function(){
                if (this.srdate.slice(this.srdate.length-2,this.srdate.length-1)== "-"){//如果當天為個位數日期 補0
                    this.srdate = this.srdate.slice(0,-1)+"0"+this.srdate.slice(-1)
                } 
                return this.srdate},
        
        }
        
    },
    methods: {
        whichbutton: function (v, oi, on, rn, op, rnc) { //按鈕執行 v為平台名稱 tp預留值 OI為訂單編號所在欄數 ON訂單客人欄數 rn 發票欄位 op訂單金額
            this.activebtn = true; //顯示按鈕
            $("button").attr('disabled', 'disabled') //鎖定刪除按鈕
            receiptdiv.orders = []; //淨空試算表
            var gid = eval('sheetrange.' + v + 'ID.gid')
            var gname = eval('sheetrange.' + v + 'ID.gname')
            this.receiptCol = rnc //發票欄位 字母
            this.nowbutton = v //平台名稱
            if (v == 'songuo') {
                this.sgbtn = true
            } //如果是松果顯示 貨運按鈕
            else {
                this.sgbtn = false
            }
            getTodayOrder(gid, gname, oi - 1, on - 1, op - 1, rn - 1);
        },
        addOrdersObj: function (id, name, price, receiptN) { //增加物件
            this.orders.push({
                id: id,
                name: name,
                price: price,
                receiptNumber: receiptN
            })
        },
        outputNumber: function (sgs) { //輸出輸入的發票號碼

            this.putvalary = [] //初始化
            var ri = 0 //rowindex 的初始直
            for (var i = 0; i < this.RowIndex[this.RowIndex.length - 1] + 1; i++) {
                if (i == this.RowIndex[ri]) {
                    this.putvalary.push([this.orders[ri].receiptNumber])
                    ri = ri + 1; //有找到值，則下一個rowindex
                } else {
                    this.putvalary.push([])
                }
            }
            if (sgs == 'Y') {
                var prg = 'writesheetrange(sheetrange.' + this.nowbutton + 'ID.gid, sheetrange.' + this.nowbutton + 'ID.gname+String.fromCharCode(this.receiptCol.charCodeAt(0) + 2)+this.todayrow, this.putvalary)' //是松果貨運的話，寫入發票的前一欄
            } else {
                var prg = 'writesheetrange(sheetrange.' + this.nowbutton + 'ID.gid, sheetrange.' + this.nowbutton + 'ID.gname+this.receiptCol+this.todayrow, this.putvalary)'
            }
            //console.log(prg)
            eval(prg)
        }
    }

})
