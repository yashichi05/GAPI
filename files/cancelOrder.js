var cancel = new Vue({
    el:'#cancelDIV',
    data:{
        web:'yahoo',
        rpNum:''
    },
    methods:{
        vueCancel:function(){
            cancelapi(this.web,this.rpNum)
        },
        togglebtn:function(web){
            $("button").removeAttr('disabled') //激活送出紐
            $("#"+web+"_btn").attr('disabled', 'disabled')
            this.web = web
        }
    }
    
})