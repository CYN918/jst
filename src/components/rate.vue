<template>
    <div class="contain">
		<div class="head">
			<router-link to="/terminalManagement" class="back">
				<i class="icon-back"></i>
			</router-link>
			<span class="title">商户费率</span>
		</div>
		<div class="main winners-list">
			<div class="credit-card-payment">
			    <p>刷卡支付</p>
				<div class="proportion">
				    <ul>
					    <li><input type="text" placeholder="%" v-model="swiperate"/><span>0.52%~0.60%</span></li>
						<li><input type="text" v-model="swipemoney"/><span>1~3(元)</span></li>
					</ul>
				</div>
			</div>
			<div class="unionpay-pay">
			    <p>银联二维码支付</p>
				<div class="unionpay-pay-proportion">
				    <ul>
					    <li><input type="text" v-model="qrpay"/><span>0.38%</span></li>
					</ul>
				</div>
				<p class="tishi">温馨提示：<i>以上设置参数不能低于本级的结算底价</i></p>
			</div>
		</div>
		<div class="btn-click">
			<mt-button type="danger" @click="withdrawal()">完成</mt-button>
		</div>
	</div>
</template>
<script>
import { Toast } from 'mint-ui';
import axios from 'axios'
import localStore from '@/localstorage.js'
export default {
	name: 'rate',
	data () {
		return {
			checkModel:localStore.fetch(),
			qrpay: '',
			swiperate: '',
			swipemoney: '',
		}
	},
	components:{
		
	},
	methods: {
		withdrawal(){
			var formData = new FormData();
            formData.append("sequences", this.checkModel);
			formData.append("qrpay", this.qrpay);
			formData.append("swiperate", this.swiperate);
			formData.append("swipemoney", this.swipemoney);
            axios({
                url: '/api/user/transferRate',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
					Toast(respanse.data.message);
					this.$router.push({path: '/terminalManagement'});
                }else{
                    Toast(respanse.data.message);
				}
            })
			
		}
	},
	mounted () {
		
	}
}
</script>
<style scoped="scoped">
	.contain{
		overflow-x: hidden;
		min-height: 600px;
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
	.head-link{
		color: #222222;
		font-size: 14px;
	}
	.credit-card-payment{
		width: 95%;
		margin: 10px auto;
		height: 124px;
		border-radius: 5px;
		background: #FFFFFF;
	}
    .credit-card-payment > p,.unionpay-pay > p{
		width: 95%;
		margin: 0px auto;
		height: 40px;
		line-height: 40px;
		border-bottom: 1px solid #EBEBEB;
		font-size: 15px;
		color: #222222;
		text-align: left;
	}
	.proportion{
		width: 95%;
		margin: 0px auto;
		height: 83px;
	}
	.unionpay-pay-proportion{
		width: 95%;
		margin: 0px auto;
		height: 60px;
		border-bottom: 1px solid #EBEBEB;
	}
	.proportion > ul > li{
		width: 50%;
		float: left;
		padding-top: 30px;
	}
	.unionpay-pay-proportion > ul > li{
		width: 50%;
		float: left;
		padding-top: 20px;
        text-align: left;
	}
	.proportion > ul > li > input,.unionpay-pay-proportion > ul > li > input{
		width: 65px;
		height: 27px;
		background: #F7F7F7;
		font-size: 14px;
		text-align: right;
		border: none;
		outline: none;
	}
	.proportion > ul > li > span,.unionpay-pay-proportion > ul > li > span{
		font-size: 13px;
		color: #999999;
		padding-left: 10px;
	}
	.unionpay-pay{
		width: 95%;
		margin: 10px auto;
		height: 135px;
		border-radius: 5px;
		background: #FFFFFF;
	}
	.unionpay-pay .tishi{
		color: #666666;
		font-size: 12px;
	}
	.unionpay-pay .tishi > i{
		font-style: normal;
		font-size: 12px;
		color: #999999;
	}
	.btn-click{
        position: relative;
        top: 70px;
    }
    .btn-click > button{
        width: 94%;
        margin: 0 auto;
		border-radius: 30px;
    }
</style>
