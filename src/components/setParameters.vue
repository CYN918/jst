<template>
    <div class="contain">
		<div class="head">
			<router-link to="/partnerIndex" class="back"><i class="icon-back"></i></router-link>
			<span class="title">分润参数</span>
		</div>
		<div class="main my-partner">
			<div class="unionpay-pay">
			    <p>设置伙伴费率</p>
				<div class="tishi unionpay-pay-proportion">
				    <ul>
					    <li>D0初始结算底价</li>
						<li style="margin-left: 90px;">单笔提现手续费</li>
					</ul>
				</div>
				<div class="unionpay-pay-proportion" style="padding-top: 20px;">
				    <ul>
					    <li><input type="text" v-model="initialRate" v-on:input="baseRate()" id="text"/>%<span>{{this.baseD0Price}}%~0.70%</span></li>
						<li style="margin-left: 25px;"><input type="text" v-model="param1"/><span>1~3(元)</span></li>
					</ul>
				</div>	
			</div>
			

			<div class="VerticalMenu-top">
				<div class="VerticalMenu">
					<div>
						<div class="VerticalMenu-box"><span>D0阶梯结算底价</span><i class="fa fa-angle-right"></i></div>
						<div name="xz" class="xz-list">
							<ul>
							    <li v-if="this.two != null"><b>V1</b><input type="text" class="one" v-model="one" readonly="readonly" /><b>万</b><i></i><input type="text" class="two"  v-model="two" v-on:input="inputFunc()"/><b>万</b><input type="text" class="three" id="One" v-model="rateOne" v-on:input="change()"/><b>%</b></li>
								<li v-if="this.three != null"><b>V2</b><input type="text" class="one" v-model="two" readonly="readonly"/><b>万</b><i></i><input type="text" class="two" v-model="three" readonly="readonly"/><b>万</b><input type="text" class="three" id="Two" v-model="rateTwo" v-on:input="changes()"/><b>%</b></li>
								<li v-if="this.four != null"><b>V3</b><input type="text" class="one" v-model="three" readonly="readonly"/><b>万</b><i></i><input type="text" class="two" v-model="four" readonly="readonly"/><b>万</b><input type="text" class="three" id="Three" v-model="rateThree" v-on:input="changesO()"/><b>%</b></li>
								<li v-if="this.five != null"><b>V4</b><input type="text" class="one" v-model="four" readonly="readonly"/><b>万</b><i></i><input type="text" class="two" v-model="five" readonly="readonly"/><b>万</b><input type="text" class="three" id="Four" v-model="rateFour" v-on:input="changesT()"/><b>%</b></li>
								<li v-if="this.six != null"><b>V5</b><input type="text" class="one" v-model="five" readonly="readonly"/><b>万</b><i></i><input type="text" class="two" v-model="six" readonly="readonly"/><b>万</b><input type="text" class="three" id="Five" v-model="rateFive" v-on:input="changesR()"/><b>%</b></li>
								<li v-if="this.seven != null"><b>V6</b><input type="text" class="one" v-model="six" readonly="readonly"/><b>万</b><i></i><input type="text" class="two" v-model="seven" readonly="readonly"/><b>万</b><input type="text" class="three" id="Six" v-model="rateSix" v-on:input="changesF()"/><b>%</b></li>
								<li v-if="this.eight != null"><b>V7</b><input type="text" class="one" v-model="seven" readonly="readonly"/><b>万</b><i></i><input type="text" class="two" v-model="eight" readonly="readonly"/><b>万</b><input type="text" class="three" id="Seven" v-model="rateSeven" v-on:input="changesW()"/><b>%</b></li>
								<li v-if="this.nine != null"><b>V8</b><input type="text" class="one" v-model="eight" readonly="readonly"/><b>万</b><i></i><input type="text" class="two" v-model="nine" readonly="readonly"/><b>万</b><input type="text" class="three" id="Eight" v-model="rateEight" v-on:input="changesX()"/><b>%</b></li>
								<li v-if="this.ten != null"><b>V9</b><input type="text" class="one" v-model="nine" readonly="readonly"/><b>万</b><i></i><input type="text" class="two" v-model="ten" readonly="readonly"/><b>万</b><input type="text" class="three" id="Nine" v-model="rateNine" v-on:input="changesY()"/><b>%</b></li>
								<li class="teshu" @click="copyTemplate()">拷贝上级为我设置的模板</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			


			<div class="unionpay-pay unionpay-pay-teshu">
			    <p class="union">银联二维码结算底价</p>
				<div class="unionpay-pay-proportion">
				    <ul>
					    <li style="margin-top: 20px;"><input type="text" v-model="value"/><span>0.28%~0.38%</span></li>
					</ul>
				</div>	
				<p class="union">借记卡结算底价</p>
				<div class="unionpay-pay-proportion">
				    <ul>
					    <li style="margin-top: 20px;"><input type="text" v-model="rate"/>+<input type="text" v-model="amount"/><span>封顶</span></li>
					</ul>
				</div>	
				<div class="tishi-01">温馨提示：<i>以上设置参数不能低于本级的结算底价</i></div>
			</div>

			<div class="FenRun-details">
			    <p>设置返现参数</p>
				<ul>
				    <li><div class="FenRun-details-left">激活返现(电签)</div><div class="FenRun-details-right"><input type="text" v-model="amountA"/><span>0~{{jhCashback}}元</span></div></li>
					<li><div class="FenRun-details-left">激活返现(出纸)</div><div class="FenRun-details-right"><input type="text" v-model="amount_b"/><span>0~{{vipFive}}元</span></div></li>
					<li><div class="FenRun-details-left">电签达标返现(68万)</div><div class="FenRun-details-right"><input type="text" v-model="amount_c"/><span>0~{{vipNine}}元</span></div></li>
					<li><div class="FenRun-details-left">出纸达标返现(88万)</div><div class="FenRun-details-right"><input type="text" v-model="amount_d"/><span>0~{{activityCashback}}元</span></div></li>
				</ul>
				<div class="tishi">温馨提示：<i>激活返现单价不能大于本级返现金额。</i></div>
			</div>

			<div class="btn-click">
				<mt-button  size="large" :disabled="subumting"  @click="withdrawal()" :plain="true" type="primary">
					<span v-if="!subumting">完成</span>
					<span style="display:table-cell;" v-else><mt-spinner :type="2" color="#26a2ff"></mt-spinner></span>
				</mt-button>
			</div>
		</div>
	</div>
</template>
<script>
import { Toast } from 'mint-ui';
import { Spinner } from 'mint-ui';
import axios from 'axios'
export default {
	name: 'setParameters',
	data () {
		return {
			subumting: false,
			value: '',
			one: '0',
			two: '',
			three: '',
			rateOne: '',
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
			nine: '',
			rateEight: '',
            ten: '',
			rateNine: '',
			rate: '',
			amount: '',
			id: this.$route.query.id,
			userId: this.$route.query.userId,
			initialRate: '',
			baseD0Price: '',
			param1: '',
			rateId: '',
			amountA: '',
			amount_b: '',
			amount_c: '',
			amount_d: '',
			jhCashback: '',
			vipFive: '',
			vipNine: '',
			activityCashback: '',
		}
	},
	components:{
		
	},
	methods: {
		copyTemplate(){
			Toast('拷贝成功!');
		},
		VerticalMenuJs(){
            $(document).ready(function () {
				$(".VerticalMenu>div>div:first-child").click(function () {
					let xz = $(".VerticalMenu>div>div:first-child");
					$(xz).not(this).children("i.fa-angle-right").css({ "transform": "rotate(0deg)", "color": "#000000" }).attr("leng", "")
					if ($(this).children("i.fa-angle-right").attr("leng") != "s") {
						$(this).children("i.fa-angle-right").attr("leng", "s")
						$(this).children("i.fa-angle-right").css({ "transform": "rotate(90deg)", "color": "#f9579e" })
					} else {
						$(this).children("i.fa-angle-right").attr("leng", "")
						$(this).children("i.fa-angle-right").css({ "transform": "rotate(0deg)", "color": "#000000" })
					}
					$(xz).not($(this)).siblings("[name='xz']").stop().slideUp(400)
					$(this).siblings("[name='xz']").slideToggle(400)

				})
				
			})
		},
		withdrawal(){
			if(!this.initialRate){
				Toast('D0初始结算底价不能为空');
				return false
			}
			if(!this.param1){
				Toast('单笔提现手续费不能为空');
				return false
			}
			if(!this.two){
				Toast('D0阶梯结算底价(单位：万元)不能为空');
				return false
			}
			if(!this.value){
				Toast('银联二维码结算底价不能为空');
				return false
			}
			if(this.value < 0.28||this.value > 0.38){
				Toast('银联二维码结算底价范围是0.28~0.38');
				return false
			}
			if(!this.rate){
				Toast('借记卡结算底价费率不能为空');
				return false
			}
			if(this.rate < 0.28||this.rate > 0.38){
				Toast('借记卡结算底价费率范围是0.28~0.38');
				return false
			}
			if(!this.amount){
				Toast('借记卡结算低价不能为空');
				return false
			}
			if(this.amount < 0){
				Toast('借记卡结算低价必须大于0');
				return false
			}
			if(!this.amountA){
				Toast('激活返现(电签)不能为空');
				return false
			}
			if(this.amountA < 0||this.amountA > this.jhCashback){
				Toast('激活返现(电签)参数设置超出范围');
				return false
			}
			if(!this.amount_b){
				Toast('激活返现(出纸)不能为空');
				return false
			}
			if(this.amount_b < 0||this.amount_b > this.vipFive){
				Toast('激活返现(出纸)参数设置超出范围');
				return false
			}
			if(!this.amount_c){
				Toast('电签达标返现(68万)不能为空');
				return false
			}
			if(this.amount_c < 0||this.amount_c > this.vipNine){
				Toast('电签达标返现(68万)参数设置超出范围');
				return false
			}
			if(!this.amount_d){
				Toast('出纸达标返现(88万)不能为空');
				return false
			}
			if(this.amount_d < 0||this.amount_d > this.activityCashback){
				Toast('出纸达标返现(88万)参数设置超出范围');
				return false
			}
			this.subumting = true
			var obj = {"V1":this.rateOne,"V2":this.rateTwo,"V3":this.rateThree,"V4":this.rateFour,"V5":this.rateFive,"V6":this.rateSix,"V7":this.rateSeven,"V8":this.rateEight,"V9":this.rateNine};
            var formData = new FormData();
            formData.append("userId", this.userId);
			formData.append("type", this.id);
			formData.append("baseD0Price", this.initialRate);
			formData.append("baseYlPrice", this.value);
			formData.append("amountRegion", this.rateId);
			formData.append("priceRegion", JSON.stringify(obj));
			formData.append("firstAmount", this.two);
			formData.append("amountA", this.amountA);
			formData.append("amountB", this.amount_b);
			formData.append("amountC", this.amount_c);
			formData.append("amountD", this.amount_d);
			formData.append("param1", this.param1);
			formData.append("param2", this.rate);
			formData.append("param3", this.amount);
            axios({
                url: '/api/partner/parameter',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
					Toast(respanse.data.message);
					this.$router.push({path: '/index'});
                }else{
                    Toast(respanse.data.message);
                }
            })
		},
		inputFunc(){
            var formData = new FormData();
            formData.append("type", this.two);
            axios({
                url: '/api/partner/paramTemplate',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
					if(respanse.data.data != null){
                        this.rateId = respanse.data.data.id;
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
		},
		getData(){
			var formData = new FormData();
            formData.append("type", this.id);
            axios({
                url: '/api/partner/doparamSelect',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
					this.initialRate = respanse.data.data.baseD0Price;
					this.baseD0Price = respanse.data.data.baseD0Price;
					this.jhCashback = respanse.data.data.amountA;
					this.vipFive = respanse.data.data.amountB;
					this.vipNine = respanse.data.data.amountC;
					this.activityCashback = respanse.data.data.amountD;
                }else{
                    Toast(respanse.data.message);
                }
            })
		},
		change(){
			var flag = true;
			var value = this.baseD0Price;
			document.getElementById('One').addEventListener('compositionstart',function(){
				flag = false;
			});
			document.getElementById('One').addEventListener('compositionend',function(){
				flag = true;
			});
			document.getElementById('One').addEventListener('input',function(){
				var _this = this;
				setTimeout(function(){
					if(flag){
						if($(_this).val() > value){
							Toast('输入费率非法');
							return false
						}
					}
				},0)
			});
			if(this.rateOne != ''){
                this.rateTwo = this.rateOne-0.005;
			    this.rateThree = this.rateOne-0.01;
				this.rateFour = this.rateOne-0.015;
				this.rateFive = this.rateOne-0.02;
				this.rateSix = this.rateOne-0.025;
				this.rateSeven = this.rateOne-0.03;
				this.rateEight = this.rateOne-0.035;
				this.rateNine = this.rateOne-0.04;
			}else{
				this.rateTwo = '';
			    this.rateThree = '';
				this.rateFour = '';
				this.rateFive = '';
				this.rateSix = '';
				this.rateSeven = '';
				this.rateEight = '';
				this.rateNine = '';
			}
			
		},
		baseRate(){
			var flag = true;
			var value = this.baseD0Price;
			document.getElementById('text').addEventListener('compositionstart',function(){
				flag = false;
			});
			document.getElementById('text').addEventListener('compositionend',function(){
				flag = true;
			});
			document.getElementById('text').addEventListener('input',function(){
				var _this = this;
				setTimeout(function(){
					if(flag){
						if($(_this).val() < value||$(_this).val() > 0.7){
							Toast('输入费率非法');
							return false
						}

					}
				},0)
			});
		},
		changes(){
			var flag = true;
			var value = this.rateOne;
			document.getElementById('Two').addEventListener('compositionstart',function(){
				flag = false;
			});
			document.getElementById('Two').addEventListener('compositionend',function(){
				flag = true;
			});
			document.getElementById('Two').addEventListener('input',function(){
				var _this = this;
				setTimeout(function(){
					if(flag){
						if($(_this).val() > value){
							Toast('输入费率非法');
							return false
						}
					}
				},0)
			});
		},
		changesO(){
			var flag = true;
			var value = this.rateTwo;
			document.getElementById('Three').addEventListener('compositionstart',function(){
				flag = false;
			});
			document.getElementById('Three').addEventListener('compositionend',function(){
				flag = true;
			});
			document.getElementById('Three').addEventListener('input',function(){
				var _this = this;
				setTimeout(function(){
					if(flag){
						if($(_this).val() > value){
							Toast('输入费率非法');
							return false
						}
					}
				},0)
			});
		},
		changesT(){
			var flag = true;
			var value = this.rateThree;
			document.getElementById('Four').addEventListener('compositionstart',function(){
				flag = false;
			});
			document.getElementById('Four').addEventListener('compositionend',function(){
				flag = true;
			});
			document.getElementById('Four').addEventListener('input',function(){
				var _this = this;
				setTimeout(function(){
					if(flag){
						if($(_this).val() > value){
							Toast('输入费率非法');
							return false
						}
					}
				},0)
			});
		},
		changesR(){
			var flag = true;
			var value = this.rateFour;
			document.getElementById('Five').addEventListener('compositionstart',function(){
				flag = false;
			});
			document.getElementById('Five').addEventListener('compositionend',function(){
				flag = true;
			});
			document.getElementById('Five').addEventListener('input',function(){
				var _this = this;
				setTimeout(function(){
					if(flag){
						if($(_this).val() > value){
							Toast('输入费率非法');
							return false
						}
					}
				},0)
			});
		},
		changesF(){
			var flag = true;
			var value = this.rateFive;
			document.getElementById('Six').addEventListener('compositionstart',function(){
				flag = false;
			});
			document.getElementById('Six').addEventListener('compositionend',function(){
				flag = true;
			});
			document.getElementById('Six').addEventListener('input',function(){
				var _this = this;
				setTimeout(function(){
					if(flag){
						if($(_this).val() > value){
							Toast('输入费率非法');
							return false
						}
					}
				},0)
			});
		},
		changesW(){
			var flag = true;
			var value = this.rateSix;
			document.getElementById('Seven').addEventListener('compositionstart',function(){
				flag = false;
			});
			document.getElementById('Seven').addEventListener('compositionend',function(){
				flag = true;
			});
			document.getElementById('Seven').addEventListener('input',function(){
				var _this = this;
				setTimeout(function(){
					if(flag){
						if($(_this).val() > value){
							Toast('输入费率非法');
							return false
						}
					}
				},0)
			});
		},
		changesX(){
			var flag = true;
			var value = this.rateSeven;
			document.getElementById('Eight').addEventListener('compositionstart',function(){
				flag = false;
			});
			document.getElementById('Eight').addEventListener('compositionend',function(){
				flag = true;
			});
			document.getElementById('Eight').addEventListener('input',function(){
				var _this = this;
				setTimeout(function(){
					if(flag){
						if($(_this).val() > value){
							Toast('输入费率非法');
							return false
						}
					}
				},0)
			});
		},
		changesY(){
			var flag = true;
			var value = this.rateEight;
			document.getElementById('Nine').addEventListener('compositionstart',function(){
				flag = false;
			});
			document.getElementById('Nine').addEventListener('compositionend',function(){
				flag = true;
			});
			document.getElementById('Nine').addEventListener('input',function(){
				var _this = this;
				setTimeout(function(){
					if(flag){
						if($(_this).val() > value){
							Toast('输入费率非法');
							return false
						}
					}
				},0)
			});
		}
	},
	mounted () {
		this.VerticalMenuJs();
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
	.unionpay-pay-teshu{
		height: 223px;
	}
	.unionpay-pay > p{
		width: 95%;
		margin: 0px auto;
		height: 39px;
		line-height: 39px;
		border-bottom: 1px solid #EBEBEB;
		font-size: 16px;
		color: #FF6A48;
		text-align: left;
	}
	.unionpay-pay-proportion{
		width: 95%;
		margin: 0px auto;
		height: 50px;
	}
	.unionpay-pay-proportion > ul > li{
		float: left;
        text-align: left;
	}
	.unionpay-pay-proportion > ul > li > input{
		width: 65px;
		height: 27px;
		background: #F7F7F7;
		font-size: 14px;
		text-align: right;
		border: none;
		outline: none;
		text-align: center;
		color: #328EF4;
	}
	.unionpay-pay-proportion > ul > li > span{
		font-size: 13px;
		color: #999999;
		padding-left: 10px;
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
	.union{
		color: #222222 !important;
		font-size: 14px !important;
	}
	.togglebox {
		width: 95%;
		margin: 0 auto;
		transform: translateZ(0);	
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
		padding: 0 20px;
		font-size: 14px;
		color: #222222;
		cursor: pointer;
		text-align: left;
		background: #fff;
		border-bottom: 1px solid #EBEBEB;
	}
	label > b{
		color: #439CFF;
	}
	label[for*='1'] {
		border: 0;
	}
	label:after {
		content: '\f077';
		position: absolute;
		top: 0px;
		right: 20px;
		font-family: fontawesome;
		transform: rotate(180deg);
		transition: 0.3s transform;
	}
	section {
		height: 0px;
		transition: 0.3s all;
		overflow: hidden;
	}
	#toggle1:checked ~ label[for*='1']:after {
		transform: rotate(0deg);
	}
	#toggle1:checked ~ #content1{
		height: 120px;
		background: #fff;
	}
	.VerticalMenu-top{
		width: 95%;	
		border-radius: 5px;
		margin: 0px auto;
	}
	.FenRun-details{
		width: 95%;
		height: 276px;
		margin: 10px auto;
		border-radius: 5px;
		background: #FFFFFF;
	}
	.FenRun-details > p{
		width: 95%;
		margin: 0px auto;
		height: 39px;
		line-height: 39px;
		border-bottom: 1px solid #EBEBEB;
		font-size: 16px;
		color: #FF6A48;
		text-align: left;
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
		color: #999999;
		font-size: 12px;
	}
	.FenRun-details > ul > li .FenRun-details-right > input{
		width: 65px;
		height: 27px;
		background: #F5F5F5;
		border: none;
		outline: none;
		margin-right: 15px;
	}
	.FenRun-details > ul > li .FenRun-details-right > span{
		width: 65px;
		display: inline-block;
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
	.btn-click{
        position: relative;
        top: 70px;
    }
    .btn-click > button{
        width: 94%;
        margin: 0 auto;
		border-radius: 30px;
		background: #FF6A48;
		color: #FFFFFF;
		border: none;
    }
	.xz-list{
		min-height: 327px;
		background: #FFFFFF;
		display: none;
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
		width: 50px;
		height: 27px;
		background: #F7F7F7;
		border: none;
		outline: none;
		float: left;
		margin-left: 5px;
		text-align: center;
		color: #328EF4;
	}
	.xz-list > ul .teshu{
		color: #328EF4;
		font-size: 13px;
		text-align: left;
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
	.xz-list > ul > li > b{
		display: block;
		float: left;
		position: relative;
		top: -4px;
		margin-left: 6px;
		margin-right: 6px;
		font-weight:normal;
	}
</style>
