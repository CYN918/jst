<template>
    <div class="main index">
        <div class="head">
            <router-link to="/onlinetopUp" class="back">
                <i class="icon-back"></i>
            </router-link>
            <span class="title">充值进度</span>
        </div>
        <div class="box">
            <div class="Img"><img src="../assets/img/tixianshibai_icon.png"/><p>充值审核失败</p></div>
            <div class="txt">
                <ul>
                    <li><span class="left">付款人姓名</span><span class="right">张晓</span></li>
                    <li><span class="left">充值金额</span><span class="right">¥ 1500.00</span></li>
                </ul>
            </div>
        </div>
        <div class="btn-click">
            <mt-button type="danger" @click="withdrawal()">确认</mt-button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'myRate',
    data () {
        return {
            
        }
    },
    components:{
        
    },
    methods: {
        withdrawal(){
            this.$router.push({path: '/'}); 
        },
    },
    mounted () {
        
    }
}
</script>
<style scoped="scoped">
    .main{
        overflow-x: hidden;
    }
    .head{
        background: #FFFFFF;
    }
    .head .title{
        color: #222222;
        font-size: 18px;
    }
    .head .back span{
        color: #222222;
    }
    .box{
        width: 95%;
        height: 219px;
        background: #FFFFFF;
        margin: 72px auto;
    }
    .Img{
        width: 95%;
        height: 146px;
        margin: 0px auto;
        border-bottom: 1px #EBEBEB solid;
    }
    .Img > p{
        color: #222222;
        font-size: 14px;
        margin-top: 13px;
    }
    .Img > img{
        width: 72px;
        height: 72px;
        margin: 0px auto;
        margin-top: 25px;
    }
    .txt{
        width: 95%;
        height: 73px;
        margin: 0px auto;
    }
    .txt > ul > li{
        height: 36.5px;
        line-height: 36.5px;
    }
    .txt > ul > li .left{
        float: left;
        color: #666666;
        font-size: 12px;
    }
    .txt > ul > li .right{
        float: right;
        color: #666666;
        font-size: 12px;
    }
    .btn-click > button{
        width: 90%;
        margin: 0 auto;
        border-radius:30px;
        color: #fff;
        background-color: #ef4f4f;
    }

</style>
