<template>
    <div class="box">
        <div class="main my">
            <div class="user-info clearfix">
                <div class="my-portrait fl">
                    <img :src="photo" :onerror="defaultImg"/>
                </div>
                <div class="info-box fl">
                    <div class="info-name">
                    {{name}}&nbsp;&nbsp;&nbsp;&nbsp;
                    <img v-if="this.isActivation == true" id="Img" src="../assets/img/yijihuo_icon.png"/>
                    <img v-if="this.isActivation == false" id="Img" src="../assets/img/weijihuo_icon.png"/>
                    </div>
                    <div class="info-number"></div>
                    <div class="info-bottom">
                        <div class="info-vip fl">
                            <span>{{mobile}}</span>
                        </div>
                    </div>
                </div>
                <div class="message">
                    <router-link to="/newsList" class="flex">
                        <img src="../assets/img/xiaoxi_icon.png"/>
                    </router-link>
                </div>
            </div>
            <div class="theWallet">
                <div class="theWallet-bottom">
                    <div class="daily">      
                        <span class="amount"><img src="../../static/img/qianbao.png"/>钱包余额</span>
                        <span class="instructions">{{balance}}</span>
                    </div>
                    
                </div>
                <div class="theWallet-top">
                    <!-- <router-link to="/walletDetails" class="flex_left">
                        钱包明细
                    </router-link>
                    <router-link to="/wallet" class="flex_right">
                        立即提现
                    </router-link> -->
                    <router-link to="/dailyReward" class="flex_left">
                        日结奖励
                    </router-link>
                    <router-link to="/monthlyReward" class="flex_right">
                        月结奖励
                    </router-link>
                </div>
            </div>

            <div class="theWallet theWallet-top-teshu">
                <div class="theWallet-bottom">
                    <div class="daily">      
                        <span class="amount"><img src="../../static/img/dianfanzhanghu_icon.png"/>垫返账户</span>
                        <span class="instructions">{{matReturn}}</span>
                    </div>
                    
                </div>
                <div class="theWallet-top">
                    <router-link to="/mattoReturn" class="flex_left">
                        垫返明细
                    </router-link>
                    <router-link to="/onlinetopUp" class="flex_right">
                        在线充值
                    </router-link>
                </div>
            </div>

            <div class="my-item-list teshu">
                <div class="my-item active">
                    <router-link to="/approve" class="flex" v-if="this.isFlag == false">
                        <div class="item-icon">
                            <i class="icon-approve"></i>
                        </div>
                        <div class="flex-item item-text">实名认证</div>
                        <div class="item-right">
                            <i class="icon-right"></i>
                        </div>
                    </router-link>
                    <router-link to="/certifiedApprove" class="flex" v-if="this.isFlag == true">
                        <div class="item-icon">
                            <i class="icon-approve"></i>
                        </div>
                        <div class="flex-item item-text">实名认证</div>
                        <div class="item-right">
                            <i class="icon-right"></i>
                        </div>
                    </router-link>
                </div>
                <div class="my-item">
                    <router-link to="/instruction" class="flex">
                        <div class="item-icon">
                            <i class="icon-instructions"></i>
                        </div>
                        <div class="flex-item item-text">操作说明</div>
                        <div class="item-right">
                            <i class="icon-right"></i>
                        </div>
                    </router-link>
                </div>
            </div>
            
            <div class="my-item-list last">        
                <div class="my-item active">
                    <a  @click="getcustom()" class="flex" >
                        <div class="item-icon">
                            <i class="icon-service"></i>
                        </div>
                        <div class="flex-item item-text">在线客服</div>
                        <div class="item-right">
                            <i class="icon-right"></i>
                        </div>
                    </a>
                </div>
                <div class="my-item">
                    <router-link to="/setting" class="flex" >
                        <div class="item-icon">
                            <i class="icon-setting"></i>
                        </div>
                        <div class="flex-item item-text">设置</div>
                        <div class="item-right">
                            <i class="icon-right"></i>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
        
        <index-tab page="3"></index-tab>
    </div>
</template>
<script>
import indexTab from '@/components/indexTabComponent';
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
import axios from 'axios'

export default {
    name: 'userIndex',
    data () {
        return {
            balance: '',
            isActivation: '',
            photo: '',
            name: '',
            mobile: '',
            matReturn: '',
            isFlag: '',
            obj: '',
            defaultImg: 'this.src="'+ require('../assets/img/portrait.png') +'"',
        }
    },
    components:{
        indexTab,
    },
    methods: {
        getcustom () {
            MessageBox.confirm('', {
                 message: '400-1668-961', 
                 confirmButtonText: '呼叫', 
                 cancelButtonText: '取消' 
            }).then(action => { 
                if (action == 'confirm') {     //确认的回调
                    window.location.href = "tel:://4001668961"
             	}
            }).catch(err => { 
             	if (err == 'cancel') {     //取消的回调

             	} 
            });
        },
        getData(){
			axios.get('/api/user/userIndex').then(respanse=>{
                if(respanse.data.code == 0){
					this.balance = respanse.data.data.balance;
                    this.isActivation = respanse.data.data.isActivation;
                    this.photo = respanse.data.data.photo;
                    this.mobile = respanse.data.data.mobile.substring(0,3)+"****"+respanse.data.data.mobile.substring(8,11);
                    this.name = respanse.data.data.name;
                    this.matReturn = respanse.data.data.matReturn;
                    this.isFlag = respanse.data.data.isFlag;
                }else{
                    Toast(respanse.data.message);
                }
            })
		},
    },
    mounted () {
        this.getData();
    }
}
</script>
<style scoped>
    .info-name{
        width: 102px;
        height: 23px;
    }
    .active{
        border-bottom: 1px solid #e5e5e5;
    }
    #Img{
        width: 40px;
        height: 16px;
        position: relative;
        top: 3px;
    }
    .message{
        width: 18px;
        height: 17px;
        position: absolute;
        top: 20px;
        right: 17px;
    }
    .message > a > img{
        width: 18px;
        height: 17px;
    }
    .theWallet{
        width: 95%;
        margin: 0 auto;
        height: 140px;
        border-radius: 10px;
        background: #FFFFFF;
        position: relative;
        top: -20px;
    }
    .theWallet-top{
        height: 39px;
        line-height: 39px;
    }
    .theWallet-top .flex_left{
        float: left;
        font-size: 13px;
        color: #4D4D4D;
        display: block;
        text-align: center;
        width: 50%;
    }
    .theWallet-top .flex_left > img{
        width: 20px;
        height: 14px;
    }
    .theWallet-top .flex_right{
        float: right;
        font-size: 13px;
        color: #4D4D4D;
        text-align: center;
        width: 50%;
        display: block;
    }
    .theWallet-bottom{
        height: 93px;
        width: 95%;
        margin: 0px auto;
        border-bottom: 1px solid #EBEBEB;
    }
    .theWallet-bottom .daily{
        width: 100%;
        height: 30px;
        float: left;
        text-align: center;
    }
    .theWallet-bottom .monthlyStatement{
        width: 50%;
        height: 30px;
        float: right;
        text-align: center;
    }
    .amount{
        font-size: 15px;
        color: #222222;
        padding-top: 14px;
        display: block;
        text-align: left;
    }
    .amount > img{
        width: 26px;
        height: 19px;
        position: relative;
        top: 5px;
        margin-right: 5px;
    }
    .instructions{
        font-size: 25px;
        color: #FF6A48;
        padding-top: 17px;
        display: block;
    }
    .instructions > img{
        width: 7px;
        height: 9px;
        margin-left: 5px;
    }
    .theWallet-bottom .line{
        width: 1px;
        height: 30px;
        background: #FF9881;
        float: left;
    }
    .theWallet-top-teshu{
        margin-top: 0.2rem;
    }

</style>
