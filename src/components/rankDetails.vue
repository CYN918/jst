<template>
    <div class="contain">
		<div class="head">
			<router-link to="/rank" class="back">
				<i class="icon-back"></i>
			</router-link>
			<span class="title">龙虎榜详情</span>
		</div>
		<div class="main winners-list">
			<div class="list-con winner-con">
				<mt-navbar v-model="selected">
					<mt-tab-item id="1">综合</mt-tab-item>
					<mt-tab-item id="2"><span @click="jiPos()">即Pos</span></mt-tab-item>
					<mt-tab-item id="3"><span @click="jiFu()">即付宝智享版</span></mt-tab-item>
				</mt-navbar>

				<!-- tab-container -->
				<mt-tab-container v-model="selected">
					<mt-tab-container-item id="1">
					    <div class="box">
							<div class="box-top-title">{{name}}</div>
							<div class="box-center">
								<div class="box-center-t">
									<ul>
										<li><span class="terminal-total">终端总数(台)</span><span class="terminal-number">{{terCount}}台</span></li>
										<li><span class="activation-total">已激活(台)</span><span class="activation-number">{{terIsActivationCount}}台</span></li>
									</ul>
								</div>
								<div class="activation-proportion">激活率：{{activationRate}}%</div>
								<div class="box-center-b">
									<ul>
										<li><span class="trading-total">近30天交易总额</span><span class="trading-number">{{lastThirtyAmount}}万</span></li>
										<li><span class="volume-total">台均交易</span><span class="volume-number">{{terAvgAmount}}万</span></li>
									</ul>
								</div>
							</div>
							<div class="togglebox">

								<input id="toggle1" type="radio" name="toggle" />
								<label for="toggle1">月交易同期对比</label>

								<section id="content1" class="teshu">
									<ul>
										<li class="one" v-for="item in list"><span class="one-left">{{item.month}}月</span><span class="progress-bar"><mt-progress :value="item.amountMscale" :bar-height="5"></mt-progress></span><span class="one-right">{{item.sumAmount}}万元</span></li>
									</ul>
								</section>
								<div  class="line"></div>
								<input id="toggle2" type="radio" name="toggle" />
								<label for="toggle2">月激活同期对比</label>

								<section id="content2" class="teshu">
									<ul>
										<li class="one" v-for="item in list"><span class="one-left">{{item.month}}月</span><span class="progress-bar-1"><mt-progress :value="item.activationMscale" :bar-height="5"></mt-progress></span><span class="one-right">{{item.sumActivation}}台</span></li>
									</ul>
								</section>
							</div>

						</div>				
					</mt-tab-container-item>
					<mt-tab-container-item id="2">
						<div class="box">
							<div class="box-top-title">{{name}}</div>
							<div class="box-center">
								<div class="box-center-t">
									<ul>
										<li><span class="terminal-total">终端总数(台)</span><span class="terminal-number">{{terCount}}台</span></li>
										<li><span class="activation-total">已激活(台)</span><span class="activation-number">{{terIsActivationCount}}台</span></li>
									</ul>
								</div>
								<div class="activation-proportion">激活率：{{activationRate}}%</div>
								<div class="box-center-b">
									<ul>
										<li><span class="trading-total">近30天交易总额</span><span class="trading-number">{{lastThirtyAmount}}万</span></li>
										<li><span class="volume-total">台均交易</span><span class="volume-number">{{terAvgAmount}}万</span></li>
									</ul>
								</div>
							</div>
							<div class="togglebox">

								<input id="toggle3" type="radio" name="toggle" />
								<label for="toggle3">月交易同期对比</label>

								<section id="content3" class="teshu">
									<ul>
										<li class="one" v-for="item in list"><span class="one-left">{{item.month}}月</span><span class="progress-bar"><mt-progress :value="item.amountMscale" :bar-height="5"></mt-progress></span><span class="one-right">{{item.sumAmount}}万元</span></li>
									</ul>
								</section>
								<div  class="line"></div>
								<input id="toggle4" type="radio" name="toggle" />
								<label for="toggle4">月激活同期对比</label>

								<section id="content4" class="teshu">
									<ul>
										<li class="one" v-for="item in list"><span class="one-left">{{item.month}}月</span><span class="progress-bar-1"><mt-progress :value="item.activationMscale" :bar-height="5"></mt-progress></span><span class="one-right">{{item.sumActivation}}台</span></li>
									</ul>
								</section>
							</div>

						</div>
					</mt-tab-container-item>
					<mt-tab-container-item id="3">
						<div class="box">
							<div class="box-top-title">{{name}}</div>
							<div class="box-center">
								<div class="box-center-t">
									<ul>
										<li><span class="terminal-total">终端总数(台)</span><span class="terminal-number">{{terCount}}台</span></li>
										<li><span class="activation-total">已激活(台)</span><span class="activation-number">{{terIsActivationCount}}台</span></li>
									</ul>
								</div>
								<div class="activation-proportion">激活率：{{activationRate}}%</div>
								<div class="box-center-b">
									<ul>
										<li><span class="trading-total">近30天交易总额</span><span class="trading-number">{{lastThirtyAmount}}万</span></li>
										<li><span class="volume-total">台均交易</span><span class="volume-number">{{terAvgAmount}}万</span></li>
									</ul>
								</div>
							</div>
							<div class="togglebox">

								<input id="toggle5" type="radio" name="toggle" />
								<label for="toggle5">月交易同期对比</label>

								<section id="content5" class="teshu">
									<ul>
										<li class="one" v-for="item in list"><span class="one-left">{{item.month}}月</span><span class="progress-bar"><mt-progress :value="item.amountMscale" :bar-height="5"></mt-progress></span><span class="one-right">{{item.sumAmount}}万元</span></li>
									</ul>
								</section>
								<div  class="line"></div>
								<input id="toggle6" type="radio" name="toggle" />
								<label for="toggle6">月激活同期对比</label>

								<section id="content6" class="teshu">
									<ul>
										<li class="one" v-for="item in list"><span class="one-left">{{item.month}}月</span><span class="progress-bar-1"><mt-progress :value="item.activationMscale" :bar-height="5"></mt-progress></span><span class="one-right">{{item.sumActivation}}台</span></li>
									</ul>
								</section>
							</div>

						</div>
					</mt-tab-container-item>
				</mt-tab-container>
			</div>
		</div>
	</div>
</template>
<script>
import { Toast } from 'mint-ui';
import axios from 'axios'
export default {
	name: 'rankDetails',
	data () {
		return {
			selected: '1',
			rangeValue: '80',
			id: this.$route.params.id,
			name: '',
			terCount: '',
			terIsActivationCount:'',
			lastThirtyAmount: '',
			terAvgAmount: '',
			activationRate: '',
			list: [],
		}
	},
	components:{
		
	},
	methods: {
		getData(){
			var formData = new FormData();
            formData.append("userId", this.id);
			formData.append("type", '');
            axios({
                url: '/api/home/rankDetails',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
                    this.name = respanse.data.data.info.name;
					this.terCount = respanse.data.data.info.terCount;
					this.terIsActivationCount = respanse.data.data.info.terIsActivationCount;
					this.lastThirtyAmount = respanse.data.data.info.lastThirtyAmount;
					this.terAvgAmount = respanse.data.data.info.terAvgAmount;
					this.activationRate = respanse.data.data.info.activationRate;
					this.list = respanse.data.data.activation;
                }else{
                    Toast(respanse.data.message);
                }
            })
		},
		jiPos(){
			var formData = new FormData();
            formData.append("userId", this.id);
			formData.append("type", 3);
            axios({
                url: '/api/home/rankDetails',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
                    this.name = respanse.data.data.info.name;
					this.terCount = respanse.data.data.info.terCount;
					this.terIsActivationCount = respanse.data.data.info.terIsActivationCount;
					this.lastThirtyAmount = respanse.data.data.info.lastThirtyAmount;
					this.terAvgAmount = respanse.data.data.info.terAvgAmount;
					this.activationRate = respanse.data.data.info.activationRate;
					this.list = respanse.data.data.activation;
                }else{
                    Toast(respanse.data.message);
                }
            })
		},
		jiFu(){
			var formData = new FormData();
            formData.append("userId", this.id);
			formData.append("type", 1);
            axios({
                url: '/api/home/rankDetails',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
                    this.name = respanse.data.data.info.name;
					this.terCount = respanse.data.data.info.terCount;
					this.terIsActivationCount = respanse.data.data.info.terIsActivationCount;
					this.lastThirtyAmount = respanse.data.data.info.lastThirtyAmount;
					this.terAvgAmount = respanse.data.data.info.terAvgAmount;
					this.activationRate = respanse.data.data.info.activationRate;
					this.list = respanse.data.data.activation;
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
<style scoped="scoped" css="less">
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
	.head-link{
		color: #222222;
		font-size: 14px;
	}
	.box{
		margin-top: 5px;
	}
	.box .box-top-title{
		font-size: 13px;
		color: #FF6A48;
		text-align: left;
		padding: 10px 0px 0px 15px;
	}
	.box .box-center{
		width: 95%;
		margin: 10px auto;
		height: 180px;
		position: relative;
		background: #FFFFFF;
	}
	.box .box-center .box-center-t{
		width: 95%;
		margin: 0px auto;
		height: 90px;
		border-bottom: 1px solid #EBEBEB;
	}
	.box .box-center .box-center-t > ul > li{
		width: 50%;
		float: left;
		text-align: center;
	}
	.box .box-center .box-center-t > ul > li .terminal-total,.box .box-center .box-center-t > ul > li .activation-total{
		font-size: 12px;
		color: #3C3C3C;
		display: block;
		padding-top: 15px;
	}
	.box .box-center .box-center-t > ul > li .terminal-number{
		font-size: 17px;
		color: #439CFF;
		display: block;
		padding-top: 20px;
	}
	.box .box-center .box-center-t > ul > li .activation-number{
		font-size: 17px;
		color: #FF6A48;
		display: block;
		padding-top: 20px;
	}
	.box .box-center .activation-proportion{
		width: 99px;
		height: 25px;
		line-height: 25px;
		text-align: center;
		font-size: 12px;
		color: #FB824B;
		position: absolute;
		border: 1px solid #FB824B;
		border-radius: 10px;
		top: 2.05rem;
		left: 3.5rem;
		background: #FFFFFF;
	}
	.box .box-center .box-center-b{
		width: 95%;
		margin: 0px auto;
		height: 90px;
	}
	.box .box-center .box-center-b > ul > li{
		width: 50%;
		float: left;
		text-align: center;
	}
	.box .box-center .box-center-b > ul > li .trading-total,.box .box-center .box-center-b > ul > li .volume-total{
		font-size: 12px;
		color: #3C3C3C;
		display: block;
		padding-top: 25px;
	}
	.box .box-center .box-center-b > ul > li .trading-number{
		font-size: 17px;
		color: #13D1A5;
		display: block;
		padding-top: 20px;
	}
	.box .box-center .box-center-b > ul > li .volume-number{
		font-size: 17px;
		color: #7D64F2;
		display: block;
		padding-top: 20px;
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
		height: 0;
		transition: 0.3s all;
		overflow: hidden;
	}
	#toggle1:checked ~ label[for*='1']:after,
	#toggle2:checked ~ label[for*='2']:after,
	#toggle3:checked ~ label[for*='3']:after,
	#toggle4:checked ~ label[for*='4']:after,
	#toggle5:checked ~ label[for*='5']:after,
	#toggle6:checked ~ label[for*='6']:after {
		transform: rotate(0deg);
	}
	#toggle1:checked ~ #content1,
	#toggle2:checked ~ #content2,
	#toggle3:checked ~ #content3,
	#toggle4:checked ~ #content4,
	#toggle5:checked ~ #content5,
	#toggle6:checked ~ #content6 {
		height: 241px;
		background: #fff;
	}
	.teshu > ul > li{
		width: 95%;
		margin: 0 auto;
		height: 30px;
		line-height: 30px;
	}
	.teshu > ul .one{
		border-bottom: 1px solid #EBEBEB;
	}
	.teshu > ul .one .one-left{
		float: left;
		display: block;
		font-size: 11px;
		color: #222222;
	}
	.teshu > ul .one .one-right{
		float: right;
		font-size: 11px;
		color: #FF6A48;
	}
	.teshu > ul .one .progress-bar{
		width: 70%;
		float: left;
		display: block;
	}
	.teshu > ul .one .progress-bar-1{
		width: 70%;
		float: left;
		display: block;
	}
	.teshu > ul .one .progress-bar >>> .mt-progress-progress{
		background: #13D1A5 !important;
	}
	.teshu > ul .one .progress-bar-1 >>> .mt-progress-progress{
		background: #FF6A48 !important;
	}
	.line{
		width: 100%;
		height: 15px;
	}
	.mt-progress-content{
		width: 90%;
	}
</style>
