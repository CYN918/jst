<template>
    <div class="contain">
        <div class="head">
            <router-link to="/walletDetails" class="back">
                <i class="icon-back"></i>
            </router-link>
            <span class="title">提现详情</span>
        </div>
        <div class="main my-wallet">
            <div class="box">
                <img src="../assets/img/tixianchenggong_icon.png"/>
                <p>提现申请提交成功</p>
            </div>
            <div class="detail">
                <ul>
                    <li><span class="left">银行卡</span><span class="right">中国银行 尾号0086</span></li>
                    <li><span class="left">提现金额</span><span class="right">¥ 1000.00</span></li>
                    <li><span class="left">提现项目</span><span class="right">月结奖励</span></li>
                </ul>
            </div>
            <div class="btn-click">
                <mt-button type="danger" @click="btn">确认</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'walletSuccessful',
    data () {
        return {
            amount: '',
        }
    },
    components:{
        
    },
    methods: {
        btn(){
            this.$router.push({path:'/userIndex'});
        }
    },
    mounted () {
        
    }
}
</script>
<style scoped>
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
    .main{
        width: 95%;
        margin: 10px auto;
        height: 262px;
        background: #FFFFFF;
        border-radius: 10px;
    }
    .main .box{
        height: 155px;
        width: 95%;
        margin: 0 auto;
        border-bottom: 1px solid #EBEBEB;
    }
    .main .box > img{
        width: 72px;
        height: 72px;
        margin-top: 35px;
    }
    .main .box > p{
        font-size: 14px;
        color: #222222;
        text-align: center;
        margin-top: 13px;
    }
    .main .detail{
        height: 107px;

    }
    .main .detail > ul > li{
        width: 95%;
        height: 35px;
        line-height: 35px;
        margin: 0 auto;
    }
    .main .detail > ul > li .left{
        float: left;
        font-size: 12px;
        color: #666666;
    }
    .main .detail > ul > li .right{
        float: right;
        font-size: 12px;
        color: #333333;
    }
    .btn-click{
        position: relative;
        top: 70px;
    }
    .btn-click > button{
        width: 94%;
        margin: 0 auto;
    }

</style>
