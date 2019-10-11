<template>
    <div class="contain">
        <div class="head">
            <router-link to="/transfer" class="back"><i class="icon-back"></i></router-link>
            <span class="title">订单详情</span>
        </div>
        <div class="main wallet-details">
            <div class="transferDetails-top">
                <ul>
                    <li class="active"><span class="left">保理总额(元)</span><span class="right">{{sumamount}}</span></li>
                    <!-- <li class="active"><span class="left">期数</span><span class="right">10</span></li>
                    <li class="active"><span class="left">每期金额(元)</span><span class="right">300.00</span></li> -->
                    <li class="active"><span class="left">扣款来源</span><span class="right">交易分润、激活返利</span></li>
                    <li class="active"><span class="left">终端类型</span><span class="right" v-if="this.type == 14">即付宝智享版</span><span class="right" v-if="this.type == 11">即pos</span><span class="right" v-if="this.type == 8">尊享版Plus</span></li>
                    <li class="active"><span class="left">生效时间</span><span class="right">{{createTime}}</span></li>
                    <li class="active"><span class="left">截止时间</span><span class="right">{{param4}}</span></li>
                    <li v-if="this.param1 == 1"><router-link to="/bonusWallet">- 查看扣款协议 -</router-link></li>
                </ul>
            </div>
            <!-- <div class="transferDetails-top">
                <h2>还款金额</h2>
                <ul>
                    <li class="active"><span class="left">第01期<i>2019-05-01</i></span><span class="right teshu">总金额(元)：<b>3000.00</b></span></li>
                    <li class="active"><span class="left">第02期<i>2019-05-01</i></span><span class="right teshu">总金额(元)：<b>3000.00</b></span></li>
                    <li class="active"><span class="left">第03期<i>2019-05-01</i></span><span class="right teshu">总金额(元)：<b>3000.00</b></span></li>
                    <li class="active"><span class="left">第04期<i>2019-05-01</i></span><span class="right teshu">总金额(元)：<b>3000.00</b></span></li>
                    <li class="active"><span class="left">第05期<i>2019-05-01</i></span><span class="right teshu">总金额(元)：<b>3000.00</b></span></li>
                    <li class="active"><span class="left">第06期<i>2019-05-01</i></span><span class="right teshu">总金额(元)：<b>3000.00</b></span></li>
                    <li class="active"><span class="left">第07期<i>2019-05-01</i></span><span class="right teshu">总金额(元)：<b>3000.00</b></span></li>
                    <li class="active"><span class="left">第08期<i>2019-05-01</i></span><span class="right teshu">总金额(元)：<b>3000.00</b></span></li>
                    <li class="active"><span class="left">第09期<i>2019-05-01</i></span><span class="right teshu">总金额(元)：<b>3000.00</b></span></li>
                    <li class="active"><span class="left">第10期<i>2019-05-01</i></span><span class="right teshu">总金额(元)：<b>3000.00</b></span></li>
                    <li class="active"><span class="left">第11期<i>2019-05-01</i></span><span class="right teshu">总金额(元)：<b>3000.00</b></span></li>
                    <li class="active"><span class="left">第12期<i>2019-05-01</i></span><span class="right teshu">总金额(元)：<b>3000.00</b></span></li>
                </ul>
            </div> -->
            <div class="agreement"></div>
            <div class="transferDetails-bottom" v-if="this.param2 == 0">
                <ul>
                    <li class="refused" @click="refused">拒绝保理</li>
                    <li class="accept" @click="accept">接受保理</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import { Toast } from 'mint-ui';
    import axios from 'axios'
    export default {
        name: 'transferDetails',
        data(){
            return{
                orderId: this.$route.query.orderId,
                param2: this.$route.query.param2,
                sumamount: '',
                type: '',
                createTime: '',
                param4: '',
                param1: '',
            }
        },
        components:{
            
        },
        methods:{
            refused(){
                var formData = new FormData();
                formData.append("orderId", this.orderId);
                axios({
                    url: '/api/user/receivedApprove',
                    method: 'post',
                    data: formData,
                }).then(respanse=>{
                    if(respanse.data.code == 0){
                        Toast('已拒绝');
                        this.$router.push({path: '/transfer'});
                    }else{
                        Toast(respanse.data.message);
                    }
                }) 
            },
            accept(){
                var formData = new FormData();
                formData.append("orderId", this.orderId);
                axios({
                    url: '/api/user/receivedApprove',
                    method: 'post',
                    data: formData,
                }).then(respanse=>{
                    if(respanse.data.code == 0){
                        Toast('已接受');
                        this.$router.push({path: '/transfer'});
                    }else{
                        Toast(respanse.data.message);
                    }
                }) 
            },
            getData(){
                var formData = new FormData();
                formData.append("orderId", this.orderId);
                axios({
                    url: '/api/user/receivedList',
                    method: 'post',
                    data: formData,
                }).then(respanse=>{
                    if(respanse.data.code == 0){
                        this.sumamount = respanse.data.data[0].sumamount;
                        this.type = respanse.data.data[0].type;
                        this.createTime = respanse.data.data[0].createTime;
                        this.param4 = respanse.data.data[0].param4;
                        this.param1 = respanse.data.data[0].param1;
                    }else{
                        Toast(respanse.data.message);
                    }
                })
            },
        },
        mounted(){
            this.getData();
        }
    }
</script>
<style scoped>
    .contain{
		overflow-x: hidden;
        margin-bottom: 2rem;
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
    .transferDetails-top{
        width: 95%;
        min-height: 287px;
        margin: 0px auto;
        margin-top: 12px;
        background: #FFFFFF;
        border-radius: 5px;
    }
    .transferDetails-top > ul > li{
        width: 95%;
        height: 47.8px;
        line-height: 47.8px;
        margin: 0px auto;
    }
    .transferDetails-top > ul .active{
        border-bottom: 1px #EBEBEB solid;
    }
    .transferDetails-top > ul > li .left{
        float: left;
        font-size: 14px;
        color: #4D4D4D;
    }
    .transferDetails-top > ul > li .right{
        float: right;
        font-size: 15px;
        color: #FF6A48;
    }
    .transferDetails-top > ul > li > a{
        color: #FF6A48;
        font-size: 14px;
        display: block;
        line-height: 49px;
    }
    .transferDetails-top > h2{
        height: 50px;
        line-height: 50px;
        border-bottom: 1px #EBEBEB solid;
    }
    .transferDetails-top > ul > li .left > i{
        font-style: normal;
        margin-left: 10px;
    }
    .transferDetails-top > ul > li .teshu{
        color: #4D4D4D;
    }
    .transferDetails-top > ul > li .teshu > b{
        color: #FF6A48;
    }
    .transferDetails-bottom{
        width: 100%;
        height: 50px;
        background: #FFFFFF;
        line-height: 50px;
        position: fixed;
        bottom: 0px;
    }
    .transferDetails-bottom > ul > li{
        width: 50%;
        float: left;
    }
    .refused{
        font-size: 18px;
        color: #222222;
    }
    .accept{
        background: #FF6A48;
        color: #FFFFFF;
        font-size: 18px;
    }

</style>
