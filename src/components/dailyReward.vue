<template>
    <div class="login">
        <div class="head">
            <router-link to="/userIndex" class="back"><i class="icon-back"></i></router-link>
            <span class="title">日结奖励</span>
            <router-link to="/walletDetails" class="head-link">日结明细</router-link>
        </div>
        <div class="special-effects">
            <div class="circle" id="circles-1"></div>
        </div>
        <div class="main my-wallet">
            <div class="content">
                <h3>立即提现<a @click="allWithdrawal()">全部提现</a></h3>
                <div class="withdrawal">
                    <label>￥</label>
                    <input type="text" placeholder="请输入提现金额" v-model="amount" />
                    
                </div>
                <span class="prompt">最小提现金额为{{MIN_WITHDRAW_CASH}}元</span>
            </div>
            <div class="bankLogo">
                <h3>到账银行卡</h3>
                <div class="logo">
                    <img :src="bankImg" :onerror="defaultImg"/>
                </div>
                <span class="bankName">{{bankName}}</span>
                <span class="bankInstructions">{{cardNo}}储蓄卡</span>
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
    name: 'dailyReward',
    data () {
        return {
            amount: '',
            cardNo: '',
            bankName: '',
            balance: '',
            MIN_WITHDRAW_CASH: '',
            bankImg: '',
            defaultImg: 'this.src="'+ require('../assets/img/default_icon.png') +'"',
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
                    this.bankImg = respanse.data.data.bankImg;
                    this.setData();
                }else{
                    Toast(respanse.data.message);
                }
            })
        },
        withdrawal(){
            if(!this.amount){
                Toast("请输入提现金额");
                return false
            }
            if(this.balance < this.MIN_WITHDRAW_CASH){
                Toast("最小提现金额为" + this.MIN_WITHDRAW_CASH + "元");
                return false
            }
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
        },
        setData(){
            var myCircle = Circles.create({
                id:                  'circles-1',
                radius:              60,
                value:               this.balance,
                maxValue:            200000.00,
                width:               10,
                text:                function(value){return '<p class="price">' + value + '</p>' + '<p class="wenzi">' + '可用余额(元)' + '</p>';},
                colors:              ['#FFDAD1', '#FF6A48'],
                duration:            400,
                wrpClass:            'circles-wrp',
                textClass:           'circles-text',
                valueStrokeClass:    'circles-valueStroke',
                maxValueStrokeClass: 'circles-maxValueStroke',
                styleWrapper:        true,
                styleText:           true
            })
        }
    },
    mounted () {
        this.getData();
        
    },
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
    .head-link{
		color: #222222;
		font-size: 14px;
	}
    .special-effects{
        width: 97%;
        height: 154px;
        background: #FFFFFF;
        margin: 0px auto;
        margin-top: 5px;
        border-radius: 10px;
    }
    .special-effects >>> .circles-wrp{
        margin-top: 16px;
    }
    .special-effects >>> .circles-text{
        line-height: 0px;
    }
    .special-effects >>> .circles-text .price{
        font-size: 24px;
        color: #222222;
        width: 89px;
        height: 20px;
        line-height: 20px;
        margin: 0px auto;
        margin-top: 1.2rem;
        border-bottom: 1px solid #FFDAD1;
        padding-bottom: 0.6rem;
    }
    .special-effects >>> .circles-text .wenzi{
        font-size: 12px;
        color: #333333;
        width: 68px;
        height: 12px;
        line-height: 12px;
        margin: 0px auto;
        margin-top: 0.2rem;
    }
    .bankLogo{
        width: 97%;
        margin: 15px auto;
        height: 105px;
        background: #FFFFFF;
        border-radius: 10px;
    }
    .bankLogo > h3{
        height: 40px;
        width: 95%;
        margin: 0px auto;
        border-bottom: 1px solid #EBEBEB;
        line-height: 40px;
        text-align: left;
        font-size: 14px;
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
    }
    .content > h3{
        width: 95%;
        height: 40px;
        line-height: 40px;
        margin: 0 auto;
        text-align: left;
        font-size: 14px;
        color: #333333;
        border-bottom: 1px solid #EBEBEB;
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
    .content h3 > a{
        float: right;
        color: #FF6A48;
        font-size: 14px;
        margin-right: 15px;
    }
    .content .prompt{
        font-size: 12px;
        color: #999999;
        display: block;
        margin-top: 10px;
        text-align: left;
        margin-left: 13px;
    }
    .my-wallet{
        margin-bottom: 2rem;
    }
    .btn-click > button{
        width: 94%;
        margin: 0 auto;
        border-radius: 50px;
        background: #FF6A48;
    }
</style>
