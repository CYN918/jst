<template>
    <div class="contain">
        <div class="head">
            <router-link to="/awardSearch" class="back"><i class="icon-back"></i></router-link>
            <span class="title">采购记录</span>
        </div>
        <div class="main award">
            <div class="merchantsList">
			    <ul>
				    <li v-for="item in list">
					    <router-link to="/service">
							<div class="one"><span class="one-left">{{item.name}}  {{item.mobile}}</span><span class="one-right" v-if="item.status == 1" style="color: #666666;">未支付</span><span class="one-right" v-if="item.status == 2" style="color: #666666;">清算中</span><span class="one-right" v-if="item.status == 3" style="color: #13D1A5;">已付款</span><span class="one-right" v-if="item.status == 4" style="color: #FF6A48;">确认中</span><span class="one-right" v-if="item.status == 5" style="color: #FF6A48;">已发货</span><span class="one-right" v-if="item.status == 6" style="color: #FF6A48;">已揽件</span><span class="one-right" v-if="item.status == 7" style="color: #FF6A48;">邮寄中</span><span class="one-right" v-if="item.status == 8" style="color: #FF6A48;">已收货</span><span class="one-right" v-if="item.status == 10" style="color: #666666;">付款失败</span><span class="one-right" v-if="item.status == 11" style="color: #666666;">撤销</span><span class="one-right" v-if="item.status == 12" style="color: #666666;">退货</span></div>
							<div class="two"><span class="two-left">日期：<b>{{item.time}}</b></span><span class="two-right" v-if="item.type == 14">即付宝智享版</span><span class="two-right" v-if="item.type == 11">即pos</span><span class="two-right" v-if="item.type == 8">尊享版Plus</span></div>
							<div class="three"><span class="three-left">单号：<b>{{item.orderNo}}</b></span><span class="three-right">数量：<b>{{item.number}}台</b></span></div>
						</router-link>
					</li>
				</ul>
			</div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import axios from 'axios'
export default {
    name: 'bonus',
    data () {
        return {
            list: [],
        }
    },
    components:{
        
    },
    methods: {
        getData(){
			axios.get('/api/home/buyList_').then(respanse=>{
                if(respanse.data.code == 0){
					this.list = respanse.data.data;
                }else{
                    Toast(respanse.data.message);
                }
            })
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
    .merchantsList > ul > li{
		width: 95%;
		margin: 10px auto;
		height: 136px;
		background: #FFFFFF;
		border-radius: 5px;
	}
	.merchantsList > ul > li > a > div{
		width: 95%;
		margin: 0 auto;
		height: 44px;
		line-height: 44px;
	}
	.merchantsList > ul > li .one{
		border-bottom: 1px solid #EBEBEB;
	}
	.merchantsList > ul > li .one .one-left{
		float: left;
		font-size: 14px;
		color: #222222;
		display: block;
	}
	.merchantsList > ul > li .one .one-right{
		float: right;
		font-size: 13px;
		display: block;
	}
	.merchantsList > ul > li .two{
		border-bottom: 1px solid #EBEBEB;
	}
	.merchantsList > ul > li .two .two-left{
		float: left;
		font-size: 12px;
		color: #4D4D4D;
		display: block;
	}
	.merchantsList > ul > li .two .two-left > b{
		color: #4D4D4D;
	}
	.merchantsList > ul > li .two .two-right{
		float: right;
		font-size: 12px;
		color: #FF6A48;
		display: block;
	}
	.merchantsList > ul > li .two .two-right > b{
		color: #FF6A48;
	}
	.merchantsList > ul > li .three .three-left{
		float: left;
		font-size: 12px;
		color: #4D4D4D;
		display: block;
	}
	.merchantsList > ul > li .three .three-left > b{
		color: #4D4D4D;
	}
	.merchantsList > ul > li .three .three-right{
		float: right;
		font-size: 12px;
		color: #4D4D4D;
		display: block;
	}
	.merchantsList > ul > li .three .three-right > b{
		color: #4D4D4D;
	}

</style>
