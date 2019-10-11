<template>
    <div class="contain">
        <div class="head">
			<router-link to="/awardSearch" class="back"><i class="icon-back"></i></router-link>
			<span class="title">机具申请</span>
		</div>
        <div class="main my-voucher">
            <div class="goods">
                <div class="Img">
                    <img src="../assets/img/POS.png" />
                </div>
                <div class="goodsDetails">
                    <h2>{{type}}</h2>
                    <p v-html="intrDetails"></p>
                    <div class="goodsDetailsbottom"><div class="price">¥{{total}}</div><div class="tatol"><i style="float: left;" @click="cuts()">-</i><input type="text" value="" v-model="number"/><i style="float: left;" @click="add()">+</i></div></div>
                </div>
            </div>
            <div class="activity">
                <h2>活动详情</h2>
                <div class="activityDetails" v-html="acDetails">
                    
                </div>
            </div>
            <div class="activity">
                <h2>商户达标奖励</h2>
                <div class="activityDetails" v-html="rewDetails">
                    
                </div>
            </div>
            <div class="shippingAddress">
                <h2>收货地址</h2>
                <ul>
                    <li class="active"><label>收货人</label><input type="text" placeholder="请输入收货人姓名" v-model="name"/></li>
                    <li class="active"><label>手机号码</label><input type="text" placeholder="请输入手机号码" v-model="mobile"/></li>
                    <li><label>收货地址</label><input type="text" placeholder="请输入收货地址" v-model="address"/></li>
                </ul>
            </div>
            <div class="pay">
                <h2>支付方式</h2>
                <ul>
                    <li><img src="../assets/img/weixinpay.png"/><span>微信支付</span><input type="radio" value="1" v-model="payType"/></li>
                </ul>
            </div>
            <div class="footer">
                <span class="footerLeft">¥{{total}}</span>
                <span class="footerRight">数量：<i>{{number}}</i>台</span>
                <button @click="btn()">提交订单</button>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import axios from 'axios'
export default {
    name: 'voucher',
    data () {
        return {
            id: this.$route.query.id,
            type: '',
            number: 1,
            price: '',
            payType: '',
            name: '',
            mobile: '',
            address: '',
            intrDetails: '',
            acDetails: '',
            rewDetails: '',
        }
    },
    components:{
        
    },
    computed: {
        total:{
            get:function(){
                return this.price*this.number
            },
            set:function(value){
                //console.log(value)
            }
        }
    },
    methods: {
        btn(){
            if(!this.name){
                Toast("请输入收货人姓名");
                return false
            }
            if(!this.mobile){
                Toast("请输入手机号码");
                return false
            }
            if(!this.address){
                Toast("请输入收货人地址");
                return false
            }
            if(!this.payType){
                Toast("请选择支付方式");
                return false
            }
            var formData = new FormData();
            formData.append("type", this.id);
            formData.append("payType", this.payType);
            formData.append("num", this.number);
            formData.append("name", this.name);
            formData.append("mobile", this.mobile);
            formData.append("address", this.address);
            axios({
                url: '/api/home/buyCode',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
                    Toast(respanse.data.message);
                    this.$router.push({path: '/integral',query:{codeUrl:respanse.data.data.codeUrl}});
                }else{
                    Toast(respanse.data.message);
				}
            })    
        },
        getData(){
            var formData = new FormData();
            formData.append("type", this.id);
            axios({
                url: '/api/partner/posTypeDetails',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
                    this.type = respanse.data.data.type;
                    this.price = respanse.data.data.price;
                    this.intrDetails = respanse.data.data.intrDetails;
                    this.acDetails = respanse.data.data.acDetails;
                    this.rewDetails = respanse.data.data.rewDetails;
                }else{
                    Toast(respanse.data.message);
				}
            })
        },
        cuts(){
            this.number--;
            this.total = this.price*this.number;
            if(this.number < 1){
                this.number = 1;  
                this.total = this.price*this.number;
            }
        },
        add(){
            this.number++;
            this.total = this.price*this.number;
        }
    },
    mounted () {
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
    .goods{
        width: 95%;
        height: 146px;
        margin: 0px auto;
        background: #FFFFFF;
        border-radius: 10px;
        margin-top: 12px;
    }
    .goods .Img{
        width: 35%;
        height: 116px;
        line-height: 116px;
        border: 1px #EBEBEB dashed;
        float: left;
        text-align:center;
        margin: 15px 0px 0px 12px;
    }
    .goods .Img > img{
       vertical-align:middle;
    }
    .goods .goodsDetails{
        width: 60%;
        float: right;
        margin-top: 15px;
    }
    .goods .goodsDetails > h2{
        font-size: 17px;
        color: #222222;
        text-align: left;
    }
    .goods .goodsDetails > p{
        font-size: 14px;
        color: #4D4D4D;
        text-align: left;
        margin-top: 9px;
        line-height: 0.45rem;
    }
    .goods .goodsDetails .goodsDetailsbottom{
        margin-top: 20px;
    }
    .goods .goodsDetails .goodsDetailsbottom .price{
        width: 20%;
        float:left;
        color: #FF6A48;
        font-size: 15px;
        text-align: left;
    }
    .goods .goodsDetails .goodsDetailsbottom .tatol{
        width: 138px;
        height: 22px;
        line-height: 22px;
        float:right;
        color: #FF6A48;
        font-size: 15px;
        margin-right: 12px;
    }
    .goods .goodsDetails .goodsDetailsbottom .tatol > input{
        width: 58px;
        height: 22px;
        text-align: center;
        float: left;
        border: none;
        border-top: 1px #E6E6E6 solid;
        border-bottom: 1px #E6E6E6 solid;
        outline: none;
    }
    .goods .goodsDetails .goodsDetailsbottom .tatol > i{
        width: 40px;
        height: 22px;
        line-height: 22px;
        text-align: center;
        display: block;
        border: 1px #E6E6E6 solid;
    }
    .activity{
        width: 95%;
        height: 139px;
        margin: 0px auto;
        background: #FFFFFF;
        border-radius: 10px;
        margin-top: 12px;
    }
    .activity > h2{
        font-size: 13px;
        color: #FF6A48;
        height: 35px;
        line-height: 35px;
        text-align: left;
        width: 95%;
        margin: 0px auto;
        border-bottom: 1px #EBEBEB solid;
    }
    .activity .activityDetails > p{
        width: 95%;
        margin: 0px auto;
        text-align: left;
        font-size: 12px;
        line-height: 14px;
    }
    .activity .activityDetails .one,.activity .activityDetails .two,.activity .activityDetails .three{
        margin-top: 13px;
    }
    .activity .activityDetails .one > i,.activity .activityDetails .two > i,.activity .activityDetails .three > i{
        font-style: normal;
        color: #222222;
        font-weight:bold;
    }
    .shippingAddress{
        width: 95%;
        height: 164px;
        margin: 0px auto;
        background: #FFFFFF;
        border-radius: 10px;
        margin-top: 12px;
    }
    .shippingAddress > h2{
        font-size: 13px;
        color: #FF6A48;
        height: 35px;
        line-height: 35px;
        text-align: left;
        width: 95%;
        margin: 0px auto;
        border-bottom: 1px #EBEBEB solid;
    }
    .shippingAddress > ul > li{
        width: 95%;
        height: 43px;
        line-height: 43px;
        margin: 0px auto;
        text-align: left;
        font-size: 12px;
    }
    .shippingAddress > ul > li > label{
        width: 25%;
        display: block;
        float: left;
    }
    .shippingAddress > ul > li > input{
        border: none;
        outline: none;
        float: left;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
    }
    .active{
        border-bottom: 1px #EBEBEB solid;
    }
    .pay{
        width: 95%;
        height: 80px;
        margin: 0px auto;
        background: #FFFFFF;
        border-radius: 10px;
        margin-top: 12px;
    }
    .pay > h2{
        font-size: 13px;
        color: #FF6A48;
        height: 35px;
        line-height: 35px;
        text-align: left;
        width: 95%;
        margin: 0px auto;
        border-bottom: 1px #EBEBEB solid;
    }
    .pay > ul > li{
        width: 95%;
        margin: 0px auto;
        height: 45px;
        line-height: 45px;
    }
    .pay > ul > li > img{
        float: left;
        margin-top: 11px;
    }
    .pay > ul > li > span{
        float: left;
        color: #222222;
        font-size: 13px;
        margin-left: 6px;
    }
    .pay > ul > li > input{
        float: right;
        width: 15px;
        height: 15px;
        color: #FC6B4F;
        margin-top: 15px;
    }
    .footer{
        width: 100%;
        height: 50px;
        line-height: 50px;
        position: fixed;
        bottom: 0px;
        background: #FFFFFF;
    }
    .footer .footerLeft{
        font-size: 22px;
        color: #FF6A48;
        float: left;
        margin-left: 26px;
    }
    .footer .footerRight{
        font-size: 14px;
        color: #4D4D4D;
        float: left;
        margin-left: 14px;
    }
    .footer .footerRight > i{
        color: #FF6A48;
        font-style: normal;  
    }
    .footer > button{
        float: right;
        border: none;
        background: #FC6B4F;
        color: #FFFFFF;
        height: 50px;
        width: 113px;
        line-height: 50px;
        text-align: center;
        outline: none;
        font-size: 16px;
    }
</style>
