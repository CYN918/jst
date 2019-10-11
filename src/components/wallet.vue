<template>
    <div class="contain">
        <div class="head">
            <router-link to="/userIndex" class="back">
                <i class="icon-back"></i>
            </router-link>
            <span class="title">立即提现</span>
        </div>
        <div class="main my-wallet">
            <div class="bankLogo">
                <div class="logo">
                    <img src="../assets/img/bank_logo.png"/>
                </div>
                <span class="bankName">{{bankName}}</span>
                <span class="bankInstructions">{{cardNo}}储蓄卡</span>
            </div>
            <div class="content">
                <h3>可提现金额:<i>{{balance}}</i></h3>
                <div class="withdrawal">
                    <label>￥</label>
                    <input type="text" placeholder="请输入提现金额" v-model="amount" />
                    <a @click="allWithdrawal()">全部提现</a>
                </div>
                <span class="prompt">最小提现金额为{{MIN_WITHDRAW_CASH}}元</span>
            </div>
            <div class="btn-click">
                <mt-button type="danger" @click="withdrawal()">立即提现</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import axios from 'axios'
export default {
    name: 'wallet',
    data () {
        return {
            amount: '',
            cardNo: '',
            bankName: '',
            balance: '',
            MIN_WITHDRAW_CASH: '',
        }
    },
    components:{
        
    },
    methods: {
        getData(){
            axios.get('/api/user/wallet').then(respanse=>{
                if(respanse.data.code == 0){
					this.cardNo = respanse.data.data.cardNo;
                    this.bankName = respanse.data.data.bankName;
                    this.balance = respanse.data.data.balance;
                    this.MIN_WITHDRAW_CASH = respanse.data.data.MIN_WITHDRAW_CASH;
                }else{
                    Toast(respanse.data.message);
                }
            })
        },
        withdrawal(){
            var formData = new FormData();
            formData.append("cash", this.amount);
            axios({
                url: '/api/user/present',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
                    Toast(respanse.data.message);
                    this.$router.push({path:'/walletSuccessful'});
                }else{
                    Toast(respanse.data.message);
                    this.$router.push({path:'/walletErro'});
                }
            })
        },
        allWithdrawal(){
            if(this.balance < this.MIN_WITHDRAW_CASH){
                Toast("最小提现金额为" + this.MIN_WITHDRAW_CASH + "元");
                return false
            }else{
                this.amount = this.balance;
            }    
        }
    },
    mounted () {
        this.getData();
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
    .bankLogo{
        width: 97%;
        margin: 15px auto;
        height: 65px;
        background: #FFFFFF;
        border-radius: 10px;
    }
    .bankLogo .logo{
        width: 30px;
        height: 30px;
        float: left;
        margin: 20px 0px 0px 20px;
    }
    .bankLogo .logo > img{
        width: 30px;
        height: 30px;
    }
    .bankLogo .bankName{
        font-size: 15px;
        color: #222222;
        float: left;
        margin: 25px 0px 0px 20px;
    }
    .bankLogo .bankInstructions{
        font-size: 13px;
        color: #999999;
        float: right;
        margin: 25px 10px 0px 0px;
    }
    .content{
        width: 97%;
        margin: 15px auto;
        height: 146px;
        background: #FFFFFF;
        border-radius: 10px;
        padding: 20px 0px 0px 20px;
    }
    .content > h3{
        width: 95%;
        margin: 0 auto;
        text-align: left;
        font-size: 13px;
        color: #333333;
    }
    .content > h3 > i{
        font-style: normal;
        color: #FF6A48;
    }
    .content .withdrawal{
        height: 30px;
        width: 95%;
        margin: 0 auto;
        border-bottom: 1px solid #EBEBEB;
        text-align: left;
        margin-top: 42px;
        padding-bottom: 35px;
    }
    .content .withdrawal > label{
        font-size: 24px;
    }
    .content .withdrawal > input{
        width: 132px;
        height: 30px;
        font-size: 19px;
        color: #999999;
        border: none;
    }
    .content .withdrawal > a{
        float: right;
        color: #FF6A48;
        font-size: 12px;
        margin-right: 15px;
        margin-top: 5px;
    }
    .content .prompt{
        font-size: 12px;
        color: #999999;
        display: block;
        margin-top: 10px;
        text-align: left;
        margin-left: 13px;
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
