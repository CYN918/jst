<template>
    <div class="contain">
		<div class="head">
            <router-link to="/awardSearch" class="back"><i class="icon-back"></i></router-link>
            <span class="title">微信支付</span>
        </div>
		<div class="main order">
		    <div class="order-top">
			    <div id="qrcode"></div>
			    <div class="title"><img src="../assets/img/weixinpay.png"/><span>微信扫码支付</span></div>
			</div>
			<div class="order-bottom">
			    <p>请在5分钟内完成微信支付，未支付订单可在<router-link to="/bonus">采购记录</router-link>重新发起支付</p>
			</div>
		</div>
	</div>
</template>
<script>
import QRCode from 'qrcodejs2';
export default {
	name: 'integral',
	data () {
		return {
			codeUrl: this.$route.query.codeUrl,
		}
	},
	components:{
		
	},
	methods: {
		getData(){
            var qrcode = new QRCode("qrcode", {
				text: this.codeUrl,
				width: 155,
				height: 155
			});
		}
	},
	mounted () {
		this.getData();
	}
}
</script>
<style scoped>
    #qrcode{
		width: 155px;
		height: 155px;
		margin: 0px auto;
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
    .order{
		width: 95%;
		height: 307px;
		margin: 12px auto;
		background: #FFFFFF;
	}
	.order-top{
		width: 95%;
		margin: 0px auto;
		height: 237px;
		border-bottom: 1px #EBEBEB solid;
	}
	.order-top .title{
		margin-top: 14px;
	}
	.order-top .title > img{
		position:relative;
		top: 5px;
	}
	.order-top .title > span{
		font-size: 15px;
		color: #222222;
		margin-left: 6px;
	}
	.order-bottom{
		margin-top: 19px;

	}
	.order-bottom > p{
		font-size: 13px;
		color: #4D4D4D;
		padding-left: 12px;
		padding-right: 16px;
		text-align:left;
		line-height: 0.5rem;
	}
	.order-bottom > p > a{
        color: #FF6A48;
	}
</style>
