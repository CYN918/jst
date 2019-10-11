<template>
    <div class="login">
        <div class="head">
            <router-link to="/bonus" class="back"><i class="icon-back"></i></router-link>
            <span class="title">订单详情</span>
        </div>
        <div class="main award">
            <div class="merchantsList">
			    <ul>
				    <li>
					    <router-link to="/service">
							<div class="one"><span class="one-left">订单号</span><span class="one-right">1542429608127</span></div>
							<div class="two"><span class="two-left">机具类型</span><span class="two-right">即付宝尊享版</span></div>
							<div class="two"><span class="two-left">单价</span><span class="two-right">100元</span></div>
                            <div class="two"><span class="two-left">购买数量</span><span class="two-right">5台</span></div>
							<div class="two"><span class="two-left">收货人</span><span class="two-right">张某某</span></div>
							<div class="two"><span class="two-left">手机号码</span><span class="two-right">137****5586</span></div>
							<div class="two"><span class="two-left">收货地址</span><span class="two-right">广东省深圳市龙华新区民治大道展涛科技大厦1311</span></div>
							<div class="two"><span class="two-left">处理时间</span><span class="two-right">2019-08-30</span></div>
							<div class="two"><span class="two-left">快递公司</span><span class="two-right">圆通速递</span></div>
							<div class="two"><span class="two-left">快递单号</span><span class="two-right">YT1003220000122</span></div>
                            <div class="three" v-if="this.state == 1"><span class="three-left">状态：</span><span class="three-right">待付款</span></div>
                            <div class="three" v-if="this.state == 2"><span class="three-left">状态：</span><span class="three-right">邮寄中</span></div>
                            <div class="three" v-if="this.state == 3"><span class="three-left">状态：</span><span class="three-right">已收货</span></div>
						</router-link>
					</li>
				</ul>
			</div>
            <div class="btn-click" @click="upDate" v-if="this.state == 1">
                <mt-button type="danger" class="complete">前往付款</mt-button>
            </div>
            <div class="btn-click" @click="upDate" v-if="this.state == 2">
                <mt-button type="danger" class="complete">确认收货</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    name: 'service',
    data () {
        return {
            state: '2',
        }
    },
    components:{
        
    },
    methods: {
        upDate(){
            if(this.state == 1){
                this.$router.push({path: '/integral'});
            }else if(this.state == 2){
                Toast('交易完成');
				this.state = 3;
                this.$router.push({path: '/service'});
            }
            
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
    .merchantsList > ul > li{
		width: 95%;
		margin: 10px auto;
		height: 560px;
		background: #FFFFFF;
		border-radius: 5px;
	}
	.merchantsList > ul > li > a > div{
		width: 95%;
		margin: 0 auto;
		height: 50px;
		line-height: 50px;
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
		color: #222222;
		display: block;
	}
	.merchantsList > ul > li .two{
		border-bottom: 1px solid #EBEBEB;
	}
	.merchantsList > ul > li .two .two-left{
		float: left;
		font-size: 14px;
		color: #4D4D4D;
		display: block;
	}
	.merchantsList > ul > li .two .two-left > b{
		color: #4D4D4D;
	}
	.merchantsList > ul > li .two .two-right{
		float: right;
		font-size: 14px;
		color: #222222;
		display: block;
	}
	.merchantsList > ul > li .two .two-right > b{
		color: #222222;
	}
	.merchantsList > ul > li .three .three-left{
		float: left;
		font-size: 14px;
		color: #4D4D4D;
		display: block;
	}
	.merchantsList > ul > li .three .three-left > b{
		color: #4D4D4D;
	}
	.merchantsList > ul > li .three .three-right{
		float: right;
		font-size: 14px;
		color: #FF6A48;
		display: block;
	}
	.merchantsList > ul > li .three .three-right > b{
		color: #4D4D4D;
	}
    .btn-click{
        position: relative;
        top: 50px;
    }
    .btn-click .complete{
        width: 92%;
        border-radius: 30px;
    }

</style>
