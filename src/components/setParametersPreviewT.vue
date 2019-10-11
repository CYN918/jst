<template>
    <div class="contain">
		<div class="head">
			<router-link to="/index" class="back"><i class="icon-back"></i></router-link>
			<span class="title">分润参数</span>
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
			

			<div class="VerticalMenu-top" v-if="this.priceRegion != null">
				<div class="VerticalMenu">
					<div>
						<div style="border-bottom: 1px solid #EBEBEB;" class="VerticalMenu-box"><span>D0阶梯结算底价</span><i class="fa fa-angle-right" style="display: none;"></i></div>
						<div name="xz" class="xz-list">
							<ul>
							    <li v-if="this.two != null"><b>V1</b><input type="text" class="one" v-model="one" readonly="readonly" /><b>万</b><i></i><input type="text" class="two"  v-model="two" readonly="readonly"/><b>万</b><input type="text" class="three" id="One" v-model="rateOne" readonly="readonly"/><b>%</b></li>
								<li v-if="this.three != null"><b>V2</b><input type="text" class="one" v-model="two" readonly="readonly"/><b>万</b><i></i><input type="text" class="two" v-model="three" readonly="readonly"/><b>万</b><input type="text" class="three" id="Two" v-model="rateTwo" readonly="readonly"/><b>%</b></li>
								<li v-if="this.four != null"><b>V3</b><input type="text" class="one" v-model="three" readonly="readonly"/><b>万</b><i></i><input type="text" class="two" v-model="four" readonly="readonly"/><b>万</b><input type="text" class="three" id="Three" v-model="rateThree" readonly="readonly"/><b>%</b></li>
								<li v-if="this.five != null"><b>V4</b><input type="text" class="one" v-model="four" readonly="readonly"/><b>万</b><i></i><input type="text" class="two" v-model="five" readonly="readonly"/><b>万</b><input type="text" class="three" id="Four" v-model="rateFour" readonly="readonly"/><b>%</b></li>
								<li v-if="this.six != null"><b>V5</b><input type="text" class="one" v-model="five" readonly="readonly"/><b>万</b><i></i><input type="text" class="two" v-model="six" readonly="readonly"/><b>万</b><input type="text" class="three" id="Five" v-model="rateFive" readonly="readonly"/><b>%</b></li>
								<li v-if="this.seven != null"><b>V6</b><input type="text" class="one" v-model="six" readonly="readonly"/><b>万</b><i></i><input type="text" class="two" v-model="seven" readonly="readonly"/><b>万</b><input type="text" class="three" id="Six" v-model="rateSix" readonly="readonly"/><b>%</b></li>
								<li v-if="this.eight != null"><b>V7</b><input type="text" class="one" v-model="seven" readonly="readonly"/><b>万</b><i></i><input type="text" class="two" v-model="eight" readonly="readonly"/><b>万</b><input type="text" class="three" id="Seven" v-model="rateSeven" readonly="readonly"/><b>%</b></li>
								<li v-if="this.nine != null"><b>V8</b><input type="text" class="one" v-model="eight" readonly="readonly"/><b>万</b><i></i><input type="text" class="two" v-model="nine" readonly="readonly"/><b>万</b><input type="text" class="three" id="Eight" v-model="rateEight" readonly="readonly"/><b>%</b></li>
								<li v-if="this.ten != null"><b>V9</b><input type="text" class="one" v-model="nine" readonly="readonly"/><b>万</b><i></i><input type="text" class="two" v-model="ten" readonly="readonly"/><b>万</b><input type="text" class="three" id="Nine" v-model="rateNine" readonly="readonly"/><b>%</b></li>
								<li class="teshu" @click="copyTemplate()">拷贝上级为我设置的模板</li>
							</ul>
						</div>
					</div>
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
				    <li><div class="FenRun-details-left">激活返现(电签)</div><div class="FenRun-details-right">{{activation}}元</div></li>
					<li><div class="FenRun-details-left">激活返现(出纸)</div><div class="FenRun-details-right">{{Vipcash}}元</div></li>
					<li><div class="FenRun-details-left">电签达标返现(68万)</div><div class="FenRun-details-right">{{Vipback}}元</div></li>
					<li><div class="FenRun-details-left">出纸达标返现(88万)</div><div class="FenRun-details-right">{{activity}}元</div></li>
				</ul>
				<div class="tishi">温馨提示：<i>激活返现单价不能大于本级返现金额。</i></div>
			</div>
		</div>
	</div>
</template>
<script>
import { Toast } from 'mint-ui';
import axios from 'axios'
export default {
	name: 'setParametersPreviewT',
	data () {
		return {
			floorPrice: '',
			poundage: '',
			value: '',
			val: '',
			activation: '',
			Vipcash: '',
			Vipback: '',
			activity: '',
			one: '0',
			two: '',
			rateOne: '',
			three: '',
			rateTwo: '',
			four: '',
			rateThree: '',
			five: '',
			rateFour: '',
			six: '',
			rateFive: '',
			seven: '',
			rateSix: '',
			eight: '',
			rateSeven: '',
			rateEight: '',
			rateNine: '',
			rateSeven: '',
			dianfan: '',
			nine: '',
			ten: '',
			id: this.$route.query.userId,
			type: this.$route.query.id,
			priceRegion: '',
		}
	},
	components:{
		
	},
	methods: {
		copyTemplate(){
			Toast('拷贝成功!');
		},
		getData(){
            var formData = new FormData();
            formData.append("userId", this.id);
			formData.append("type", this.type);
            axios({
                url: '/api/partner/parameterSelect',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
					this.floorPrice = respanse.data.data.list[0].baseD0Price;
					this.poundage = respanse.data.data.list[0].param1;
					this.value = respanse.data.data.list[0].baseYlPrice;
					this.activation = respanse.data.data.list[0].amountA;
					this.Vipcash = respanse.data.data.list[0].amountB;
					this.Vipback = respanse.data.data.list[0].amountC;
					this.activity = respanse.data.data.list[0].amountD;
					this.priceRegion = respanse.data.data.list[0].priceRegion;
					this.val = respanse.data.data.list[0].param2;
					var priceRegions = JSON.parse(this.priceRegion);
					this.rateOne = priceRegions.V1;
					this.rateTwo = priceRegions.V2;
					this.rateThree = priceRegions.V3;
					this.rateFour = priceRegions.V4;
					this.rateFive = priceRegions.V5;
					this.rateSix = priceRegions.V6;
					this.rateSeven = priceRegions.V7;
					this.rateEight = priceRegions.V8;
					this.rateNine = priceRegions.V9;
					this.firstAmount = respanse.data.data.list[0].firstAmount;
					this.two = respanse.data.data.list[0].firstAmount;
					this.setData(this.firstAmount)
                }else{
                    Toast(respanse.data.message);
                }
            })
		},
		setData(firstAmount){
			var formData = new FormData();
            formData.append("type", firstAmount);
            axios({
                url: '/api/partner/paramTemplate',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
					if(respanse.data.data != null){
						this.three = respanse.data.data.v2;
						this.four = respanse.data.data.v3;
						this.five = respanse.data.data.v4;
						this.six = respanse.data.data.v5;
						this.seven = respanse.data.data.v6;
                        this.eight = respanse.data.data.v7;
                        this.nine = respanse.data.data.v8;
                        this.ten = respanse.data.data.v9;						
					}else{
						this.rateId = '';
						this.three = '';
						this.four = '';
						this.five = '';
						this.six = '';
						this.seven = '';
						this.eight = '';
						this.nine = '';
						this.ten = '';
					}	
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
<style scoped="scoped">
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
	.unionpay-pay{
		width: 95%;
		margin: 10px auto;
		height: 135px;
		border-radius: 5px;
		background: #FFFFFF;
	}
	.xz-list > ul > li > b{
		display: block;
		float: left;
		position: relative;
		top: -4px;
		margin-left: 6px;
		margin-right: 6px;
		font-weight: normal;
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
        height: 60px;
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
	.VerticalMenu-top{
		width: 95%;	
		border-radius: 5px;
		margin: 0px auto;
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
	.FenRun-details > ul > li .FenRun-details-right > input{
		width: 65px;
		height: 27px;
		background: #F5F5F5;
		border: none;
		outline: none;
		margin-right: 15px;
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
	.xz-list{
		min-height: 327px;
		background: #FFFFFF;
		padding-top: 5px;
	}
	.xz-list > ul > li{
		width: 97%;
		margin: 0px auto;
        height: 39px;
		line-height: 39px;
	}
	.xz-list > ul > li .one,.xz-list > ul > li .two{
		width: 82px;
		height: 27px;
		background: #F7F7F7;
		border: none;
		outline: none;
		float: left;
		text-align: center;
		color: #328EF4;
	}
	.xz-list > ul > li > i{
		width: 10px;
		height: 1px;
		display: block;
		background: #999999;
		float: left;
		position: relative;
		top: 13px;
		margin-left: 6px;
		margin-right: 6px;
	}
	.xz-list > ul > li .three{
		width: 40px;
		height: 27px;
		background: #F7F7F7;
		border: none;
		outline: none;
		float: left;
		margin-left: 20px;
		text-align: center;
		color: #328EF4;
	}
	.xz-list > ul .teshu{
		color: #328EF4;
		font-size: 13px;
		text-align: left;
	}
</style>
