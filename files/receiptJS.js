Vue.component('receipt-input', {
    props: ['oreder','name','orderindex'],
    template: '<div><span>{{oreder}}</span><span style=\"padding: 20px;\">{{name}}</span><input type=\"search\"><button @click="autoFill">下拉</button></div>',
    methods:{
        autoFill: function(){
        receiptdiv.orders[this.orderindex].receiptNumber = 'go'
    }
        
    }
})

var receiptdiv = new Vue({
    el: '#receiptdiv',
    data: {
        orders: [{
            id: 'id1',name:'王王王1',receiptNumber:''
        }, {
            id: 'id1',name:'王王王2',receiptNumber:''
        }, {
            id: 'id1',name:'王王王3',receiptNumber:''
        }, {
            id: 'id1',name:'王王王4',receiptNumber:''
        }]
    }

})
