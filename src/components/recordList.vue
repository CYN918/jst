<template>
    <div class="contain">
		<div class="head">
			<router-link to="/index" class="back"><i class="icon-back"></i></router-link>
			<span class="title">推广记录</span>
		</div>
		<div class="main my-partner">
		    <mt-field style="margin-top:0.1rem;" placeholder="请输入姓名/手机号" v-model="keywork">
				<mt-button size="small" type="default" class="ve-send-code" @click="gosearch">搜索</mt-button>
			</mt-field>
			<div class="togglebox">
			    <ul>
				    <li v-for="(item,index) in recordList">
					    <input :id="'toggle_' + index" type="radio" name="toggle" class="top"/>
						<label @click="btn(item.id)" class="teshu" :for="'toggle_' + index"><img class="Img" :src="item.photo"/><span class="name">{{item.name}}</span><span class="state" v-if="item.isActivation == 1">已激活</span><span class="states" v-if="item.isActivation == 0">未激活</span></label>

						<section :id="'content_' + index" class="box">
							<ul>
								<li class="one"><span class="one-left">电话：<b>{{item.filterMobile}}</b></span><span class="one-right">直属合伙人：<b>{{sumPartner}}个</b></span></li>
								<li class="two"><span class="two-left">总机具：<b>{{reserve}}台</b></span><span class="two-right">已激活：<b>{{activationNum}}台</b></span></li>
								<li class="three"><span class="three-left">业务区域：<b>{{item.area}}</b></span></li>
							</ul>
						</section>
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
	name: 'recordList',
	data () {
		return {
			keywork: '',
			recordList: [],
			sumPartner: '',
			reserve: '',
			activationNum: '',
		}
	},
	components:{
		
	},
	methods: {
		gosearch() {
			this.getData();
		},
		getData(){
			var formData = new FormData();
            formData.append("searchStr", this.keywork);
			axios({
                url: '/api/home/recordList_',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
                    this.recordList =  respanse.data.data.recordList;
                }else{
                    Toast(respanse.data.message);
                }
            })
		},
		btn(id){
			var formData = new FormData();
            formData.append("id", id);
            axios({
                url: '/api/partner/partnerDetail_',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
                    this.sumPartner = respanse.data.data.sumPartner;
					this.reserve = respanse.data.data.reserve;
					this.activationNum = respanse.data.data.activationNum;
                }else{
                    Toast(respanse.data.message);
                }
            })
		},
		
	},
	mounted () {
		this.getData();
	}
}
</script>
<style scoped="scoped">
    .togglebox > ul > li{
		margin-top: 15px;
	}
    .main{
		overflow-x: hidden;
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
	.togglebox {
		width: 95%;
		margin: 0px auto;
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
		height: 123px;
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
	.line{
		width: 100%;
		height: 15px;
	}
	.Img{
		width: 42px;
		height: 42px;
		float: left;
		position: relative;
		top: 6px;
	}
	.name{
		color: #222222;
		font-size: 14px;
		padding-left: 10px;
	}
	.state{
		color: #FF6A48;
		font-size: 13px;
		float: right;
		padding-right: 20px;
	}
	.states{
		color: #666666;
		font-size: 13px;
		float: right;
		padding-right: 20px;
	}
</style>
