<template>
    <div class="contain">
        <div class="head">
            <router-link to="/terminal" class="back"><i class="icon-back"></i></router-link>
            <span class="title">货款转移</span>
        </div>
        <div class="main my-transfer" id="transferList">
            <mt-navbar v-model="selected">
                <mt-tab-item id="1">我收到的</mt-tab-item>
                <mt-tab-item id="2"><span @click="setData">我发出的</span></mt-tab-item>
                <mt-tab-item id="3"><span @click="theLoan">货款汇总</span></mt-tab-item>
            </mt-navbar>
            <!-- tab-container -->
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1">
                    <div class="box-list">
                        <ul v-if="this.list != null">
                            <li v-for="item in list">
                                <div class="active"><span class="left">时间:<b>{{item.createTime}}</b></span><span class="right">状态:<b style="color: #328EF4;" v-if="item.param2 == 0">待接受</b><b v-if="item.param2 == 1">已生效</b><b style="color: #222222;" v-if="item.param2 == 2">已拒绝</b></span></div>
                                <div class="active"><span class="left">订单号:<b>{{item.orderid}}</b></span><span class="right">划拨人:<b>{{item.username}}</b></span></div>
                                <div class="active"><span class="left">总机具款(元)：<b>{{item.sumamount}}</b></span><span class="right">机具数(台):<b>{{item.total}}</b></span></div>
                                <router-link :to="{path:'/transferDetails',query:{orderId:item.orderid,param2:item.param2}}">订单详情</router-link>
                            </li>
                        </ul>
                        <ul v-else>
                            <img src="../assets/img/zanwushuju.png"/>
                            <p>暂无数据</p>
                        </ul>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <div class="box-list">
                        <ul v-if="this.data != null">
                            <li v-for="item in data">
                                <div class="active"><span class="left">时间:<b>{{item.createTime}}</b></span><span class="right">状态:<b style="color: #328EF4;" v-if="item.param2 == 0">待接受</b><b v-if="item.param2 == 1">已生效</b><b style="color: #222222;" v-if="item.param2 == 2">已拒绝</b></span></div>
                                <div class="active"><span class="left">订单号:<b>{{item.orderid}}</b></span><span class="right">划拨人:<b>{{item.username}}</b></span></div>
                                <div class="active"><span class="left">总机具款(元)：<b>{{item.sumamount}}</b></span><span class="right">机具数(台):<b>{{item.total}}</b></span></div>
                                <router-link :to="{path:'/transferDetailsS',query:{orderId:item.orderid,param2:item.param2}}">订单详情</router-link>
                            </li>
                        </ul>
                        <ul v-else>
                            <img src="../assets/img/zanwushuju.png"/>
                            <p>暂无数据</p>
                        </ul>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="3">
                    <div class="tab">
                        <ul class="tab-tilte">
                            <li @click="cur=0" :class="{active:cur==0}" id="teshu">应付货款</li>
                            <li @click="cur=1" :class="{active:cur==1}">应收货款</li>
                        </ul>
                        <div class="tab-content">
                            <div v-show="cur==0">
                                <ul class="tab-content-top">
                                    <li><span class="top-left">货款总金额(元)</span><span class="top-right">{{payDebt}}</span></li>
                                </ul>
                                <ul class="tab-content-bottom" v-if="this.items != null">
                                    <li class="bottom-border" v-for="item in items"><span class="bottom-left"><i>订单号:</i>{{item.orderId}}</span><span class="bottom-right">{{item.amount}}</span></li>
                                </ul>
                                <ul v-else>
                                    <img src="../assets/img/zanwushuju.png" class="Img"/>
                                    <p>暂无数据</p>
                                </ul>
                            </div>
                            <div v-show="cur==1">
                                <ul class="tab-content-top">
                                    <li><span class="top-left">货款总金额(元)</span><span class="top-right">{{totalAmount}}</span></li>
                                </ul>
                                <div class="togglebox">
                                    <ul v-if="this.lists != null">
                                        <li v-for="(item,index) in lists">
                                            <input type="radio" name="toggle" class="top" id="toggle_0"/>
                                            <label class="teshu" for="toggle_0"><span class="name"><i v-if="index < 9">0{{index+1}}</i>{{item.downname}}</span><span class="state">总额：<i>{{item.payDebt}}</i></span></label>

                                            <section class="box" id="content_0">
                                                <ul v-for="tot in item.detailsList">
                                                    <li class="bottom-border"><span class="bottom-left"><i>订单号:</i>{{tot.orderId}}</span><span class="bottom-right">{{tot.amount}}</span></li>
                                                </ul>
                                            </section>
                                        </li>
                                    </ul>
                                    <ul v-else>
                                        <img src="../assets/img/zanwushuju.png" class="Img"/>
                                        <p>暂无数据</p>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
    </div>

</template>
<script>
import { Toast } from 'mint-ui';
import axios from 'axios'
export default {
    name: 'transfer',
    data () {
        return {
            selected: '1',
            cur: 0, //默认选中第一个tab
            list: [],
            lists: [],
            data: [],
            items: [],
            payDebt: '',
            totalAmount: '',
        }
    },
    components:{
        
    },
    methods: {
        getData(){
			axios.post('/api/user/receivedList').then(respanse=>{
                if(respanse.data.code == 0){
                    this.list = respanse.data.data;
                }else{
                    this.list = respanse.data.data;
                    Toast(respanse.data.message);
                }
            })
        },
        setData(){
			axios.post('/api/user/sendoutList').then(respanse=>{
                if(respanse.data.code == 0){
					this.data = respanse.data.data;
                }else{
                    this.data = respanse.data.data;
                    Toast(respanse.data.message);
                }
            })
        },
        theLoan(){
            axios.post('/api/user/payDebt').then(respanse=>{
                if(respanse.data.code == 0){
                    this.items = respanse.data.data.list[0].detailsList;
                    this.payDebt = respanse.data.data.totalAmount;
                }else{
                    this.items = respanse.data.data;
                    Toast(respanse.data.message);
                }
            })
        },
        shouldBe(){
            axios.post('/api/user/receiveDebt').then(respanse=>{
                if(respanse.data.code == 0){
                    this.lists = respanse.data.data.list;
                    this.totalAmount = respanse.data.data.totalAmount;
                }else{
                    this.lists = respanse.data.data;
                    Toast(respanse.data.message);
                }
            })
        }
    },
    mounted () {
        this.getData();
        this.shouldBe();
        
    }
}
</script>
<style scoped>
    .contain{
		overflow-x: hidden;
        margin-bottom: 2rem;
	}
    .box-list > ul > img{
        margin-top: 1rem;
    }
    .Img{
        margin-top: 1rem;
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
    #transferList >>> .mint-tab-item-label{
        font-size: 16px;
    }
    #transferList >>> .is-selected{
        border-bottom: 3px solid #FF6A48;
        color: #FF6A48;
    }
    .box-list > ul > li{
        width: 95%;
        height: 177px;
        margin: 0px auto;
        background: #FFFFFF;
        margin-top: 10px;
        border-radius: 5px;
    }
    .box-list > ul > li > div{
        width: 95%;
        height: 43.5px;
        line-height: 43.5px; 
        margin: 0px auto;
    }
    .box-list > ul > li > a{
        display: block;
        color: #222222;
        font-size: 13px;
        line-height: 43.5px;
        font-weight:bold;
    }
    .box-list > ul > li > div > span > b{
        color: #FF6A48;
        margin-left: 2px;
    }
    .box-list > ul > li .active{
        border-bottom: 1px #EBEBEB solid;
    }
    .box-list > ul > li > div .left{
        float: left;
        font-size: 13px;
        color: #4D4D4D;
    }
    .box-list > ul > li > div .right{
        float: right;
    }
    .tab{
        width: 100%;
        min-height: 354px;
        margin: 12px auto;
    }
    .tab .tab-tilte{
        width: 95%;
        height: 44px;
        margin: 0px auto;
        border-bottom: 1px solid #EBEBEB;
        background: #FFFFFF;
    }
    .tab .tab-content{
        width: 95%;
        min-height: 309px;
        margin: 0px auto;
    }
    .tab .tab-content .tab-content-top{
        height: 43px;
        border-bottom: 1px solid #EBEBEB;
        line-height: 43px;
        background: #FFFFFF;
    }
    .tab .tab-content .tab-content-top .top-left{
        float: left;
        font-size: 13px;
        color: #222222;
        margin-left: 15px;
    }
    .tab .tab-content .tab-content-top .top-right{
        float: right;
        font-size: 13px;
        color: #FF6A48;
        margin-right: 15px;
    }
    .tab .tab-content .tab-content-bottom{
        min-height: 265px;
    }
    .tab .tab-content .tab-content-bottom > li{
        height: 46px;
        line-height: 46px;
        background: #FFFFFF;
    }
    .tab .tab-content .tab-content-bottom .bottom-left{
        float: left;
        font-size: 13px;
        color: #222222;
    }
    .tab .tab-content .tab-content-bottom .bottom-left > i{
        font-style: normal;
        color: #4D4D4D;
    }
    .tab .tab-content .tab-content-bottom .bottom-right{
        float: right;
        font-size: 13px;
        color: #222222;
    }
    .tab .tab-tilte > li{
        width: 50%;
        float: left;
        height: 20px;
        font-size: 15px;
        line-height: 20px;
        margin-top: 12px;
    }
    .active{
        color: #FF6A48;
    }
    #teshu{
        border-right: 1px solid #EBEBEB;
    }
    .bottom-border{
        border-bottom: 1px solid #EBEBEB;
    }
    .togglebox {
		width: 100%;
		margin: 0px auto;
		transform: translateZ(0);	
        
	}
    .bottom-left{
        float: left;
        font-size: 13px;
        color: #222222;
    }
    .bottom-left > i{
        font-style: normal;
        color: #4D4D4D;
    }
    .bottom-right{
        float: right;
        font-size: 13px;
        color: #222222;
    }
    .togglebox > ul > li{
        margin-top: 12px;
        background: #FFFFFF;
    }
	input[type="radio"] {
		position: absolute;
		opacity: 0;
	}
	label {
		position: relative;
		display: block;
		height: 55px;
		line-height: 55px;
		font-size: 14px;
		color: #222222;
		cursor: pointer;
		text-align: left;
		background: #fff;
	}
    .name{
        float: left;
        font-size: 13px;
        color: #222222;
        margin-left: 15px;
    }
    .name > i{
        color: #FF6A48;
        font-style: normal;
        margin-right: 10px;
    }
    .state{
        float: left;
        margin-left: 3.9rem;
    }
    .state > i{
        color: #FF6A48;
        font-style: normal;
        margin-right: 10px;
    }
	.teshu > b{
		color: #439CFF;
	}
	.teshu {
		border: 0;
	}
	.teshu:after {
		content: '\f077';
		position: absolute;
		top: 0px;
		right: 20px;
		font-family: fontawesome;
		transform: rotate(180deg);
		transition: 0.3s transform;
	}
	section {
		height: 0;
		transition: 0.3s all;
		overflow: hidden;
	}
	.top:checked ~ .teshu:after{
		transform: rotate(0deg);
	}
	.top:checked ~ .box{
		min-height: 221px;
		background: #fff;
	}
	.box > ul > li{
		width: 95%;
		margin: 0 auto;
		height: 41px;
		line-height: 40px;
	}
	.box > ul .one{
		border-top: 1px solid #EBEBEB;
	}
	.box > ul .one .one-left{
		float: left;
		display: block;
		font-size: 12px;
		color: #4D4D4D;
	}
	.box > ul .one .one-left > b{
		color: #FF6A48;
	}
	.box > ul .one .one-right{
		float: right;
		font-size: 12px;
		color: #4D4D4D;
	}
	.box > ul .one .one-right > b{
		color: #FF6A48;
	}
	
	.box > ul .two .two-left{
		float: left;
		display: block;
		font-size: 12px;
		color: #4D4D4D;
	}
	.box > ul .two .two-left > b{
		color: #FF6A48;
	}
	.box > ul .two .two-right{
		float: right;
		font-size: 12px;
		color: #4D4D4D;
	}
	.box > ul .two .two-right > b{
		color: #FF6A48;
	}
	.box > ul .three .three-left{
		float: left;
		display: block;
		font-size: 12px;
		color: #4D4D4D;
	}
	.box > ul .three .three-right{
		float: right;
		font-size: 12px;
		color: #4D4D4D;
	}
	.box > ul .three .three-left > b{
		color: #F29888;
	}
	.box > ul .three .three-right > b{
		color: #636363;
	}
</style>
