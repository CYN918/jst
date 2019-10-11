<template>
    <div class="contain">
		<div class="head">
			<router-link to="/setRate" class="back"><i class="icon-back"></i></router-link>
			<span class="title">分润参数</span>
			<a @click="butClick" style="float: right;color: #FF6A48;font-size: 14px;padding-right: 14px;">修改参数</a>
		</div>
		<div class="main my-partner">
			<div class="unionpay-pay">
			    <p>设置伙伴费率</p>
				<div class="unionpay-pay-proportion">
				    <ul>
					    <li><span class="left">{{floorPrice}}%</span><span class="right">D0初始结算底价</span></li>
						<li><span class="left">{{poundage}}元</span><span class="right">提现手续费</span></li>
					</ul>
				</div>	
			</div>
			<div class="unionpay-pay-jiesuan">
			    <div class="unionpay-pay-left">银联二维码结算底价</div>
				<div class="unionpay-pay-right">{{value}}%</div>
				<div class="unionpay-pay-left">借记卡结算底价</div>
				<div class="unionpay-pay-right">{{val}}%</div>
			</div>

			<div class="FenRun-details">
			    <p>设置返现参数</p>
				<ul>
				    <li><div class="FenRun-details-left">激活返现(电签)</div><div class="FenRun-details-right">{{activation}}(元)</div></li>
					<li><div class="FenRun-details-left">激活返现(出纸)</div><div class="FenRun-details-right">{{Vipcash}}(元)</div></li>
					<li><div class="FenRun-details-left">电签达标返现(68万)</div><div class="FenRun-details-right">{{Vipback}}(元)</div></li>
					<li><div class="FenRun-details-left">出纸达标返现(88万)</div><div class="FenRun-details-right">{{activity}}(元)</div></li>
				</ul>
				<div class="tishi">温馨提示：<i>激活返现单价不能大于本级返现金额。</i></div>
			</div>
		</div>
	</div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
	name: 'setParametersPreviewO',
	data () {
		return {
			floorPrice: '0.53',
			poundage: '3',
			value: '0.38',
			val: '0.38',
			activation: '200',
			Vipcash: '200',
			Vipback: '200',
			activity: '200',
			dianfan: '20',
		}
	},
	components:{
		
	},
	methods: {
		copyTemplate(){
			Toast('拷贝成功!');
		},
		butClick(){
			this.$router.push({name: 'SetParameters',params:{id: '2'}});
		}
	},
	mounted () {
		
	}
}
</script>
<style scoped="scoped">
	.contain{
		overflow-x: hidden;
		min-height: 800px;
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
	.unionpay-pay{
		width: 95%;
		margin: 10px auto;
		height: 135px;
		border-radius: 5px;
		background: #FFFFFF;
	}
	.unionpay-pay > p{
		height: 39px;
		line-height: 39px;
		padding-left: 15px;
		font-size: 16px;
		color: #FFFFFF;
		text-align: left;
		background: #FF6A48;
		border-radius:5px 5px 0 0;
	}
	.unionpay-pay-proportion{
		width: 95%;
		margin: 0px auto;
		height: 60px;
	}
	.unionpay-pay-proportion > ul > li{
		width: 50%;
		float: left;
		padding-top: 20px;
        text-align: left;
	}
	.unionpay-pay-proportion > ul > li .left{
		float: left;
		width: 100%;
		display: block;
		text-align: center;
		font-size: 17px;
		color: #FF6A48;
		padding-top: 10px;
	}
	.unionpay-pay-proportion > ul > li .right{
		float: left;
		width: 100%;
		display: block;
		text-align: center;
		font-size: 13px;
		color: #222222;
		padding-top: 11px;
	}
	.unionpay-pay .tishi{
		width: 95%;
        margin: 0px auto;
		color: #222222;
		font-size: 14px;
		height: 35px;
		line-height: 35px;
		text-align: left;
	}
	.unionpay-pay .tishi-01{
		width: 95%;
        margin: 0px auto;
		color: #222222;
		font-size: 14px;
		height: 35px;
		line-height: 35px;
		text-align: left;
	}
	.unionpay-pay .tishi-01 > i{
		font-style: normal;
		font-size: 12px;
		color: #999999;
	}
	.unionpay-pay-jiesuan{
		width: 95%;
        height: 120px;
		line-height: 60px;
		margin: 12px auto;
		border-radius: 5px;
		background: #FFFFFF;
	}
	.unionpay-pay-jiesuan .unionpay-pay-left{
		width: 50%;
		float: left;
		color: #222222;
		font-size: 14px;
		text-align: left;
		padding-left: 12px;
	}
	.unionpay-pay-jiesuan .unionpay-pay-right{
		width: 50%;
		float: right;
		color: #FF6A48;
		font-size: 14px;
		text-align: right;
		padding-right: 23px;
	}
	.FenRun-details{
		width: 95%;
		height: 226px;
		margin: 10px auto;
		border-radius: 5px;
		background: #FFFFFF;
	}
	.FenRun-details > p{
		height: 39px;
		line-height: 39px;
		font-size: 16px;
		color: #FF6A48;
		padding-left: 15px;
		color: #FFFFFF;
		text-align: left;
		background: #FF6A48;
		border-radius:5px 5px 0 0;
	}
	.FenRun-details > ul > li{
		width: 95%;
		height: 50px;
		line-height: 50px;
		margin: 0px auto;
		border-bottom: 1px solid #EBEBEB;
	}
	.FenRun-details > ul > li .FenRun-details-left{
		float: left;
		color: #222222;
		font-size: 14px;
	}
	.FenRun-details > ul > li .FenRun-details-right{
		float: right;
		color: #FF6A48;
		font-size: 14px;
	}
    .FenRun-details .tishi{
		color: #666666;
		font-size: 12px;
		text-align: left;
		padding: 12px 0px 0px 12px;
	}
    .FenRun-details .tishi > i{
		color: #999999;
		font-style: normal;
	}
</style>
