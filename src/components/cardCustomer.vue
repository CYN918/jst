<template>
    <div class="contain">
		<div class="head">
			<router-link to="/cardIndex" class="back">
				<i class="icon-back"></i>
			</router-link>
			<span class="title">客户管理</span>
		</div>
		<div class="main card-customer">
			<mt-field style="margin-top:0.1rem;" placeholder="请输入姓名或手机号" v-model="keywork">
                    <mt-button size="small" type="default" class="ve-send-code" @click="gosearch">搜索</mt-button>
                </mt-field>
			<mt-navbar v-model="selected">
				<mt-tab-item id="1">登记信息用户</mt-tab-item>
				<mt-tab-item id="2"><span @click="handleCard">成功办卡用户</span></mt-tab-item>
			</mt-navbar>
			<!-- tab-container -->
			<mt-tab-container v-model="selected">
				<mt-tab-container-item id="1">
					<div class="box">
					    <ul v-if="this.list.length == 0"> 
						    <p>暂无数据</p>
						</ul>
						<ul v-else> 
						    <li v-for="item in list"><span class="name">{{item.checkinName}}</span><span class="phone">{{item.filterCheckinMobile}}</span><span class="timer">登记时间：<i>{{item.time}}</i></span></li>
						</ul>
					</div>
				</mt-tab-container-item>
				<mt-tab-container-item id="2">
					<div class="box">
					    <ul v-if="this.data.length == 0"> 
						    <p>暂无数据</p>
						</ul>
					    <ul v-else> 
						    <li v-for="item in data"><span class="name">{{item.checkinName}}</span><span class="phone">{{item.filterCheckinMobile}}</span><span class="timer">登记时间：<i>{{item.time}}</i></span></li>
						</ul>
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
	name: 'cardCustomer',
	data () {
		return {
			keywork: '',
			selected: '1',
			list: [],
			data: [],
		}
	},
	components:{
		
	},
	methods: {
		gosearch(){

		},
		getData(){
            var formData = new FormData();
            formData.append("M_", 1);
			formData.append("search", this.keywork);
            axios({
                url: '/api/card/checkUser',
                method: 'get',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
                    this.list = respanse.data.data;
                }else{
                    Toast(respanse.data.message);
                }
            })
        },
		handleCard(){
			var formData = new FormData();
            formData.append("M_", 1);
			formData.append("search", this.keywork);
            axios({
                url: '/api/card/checkUser',
                method: 'get',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
                    this.data = respanse.data.data;
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
	}
	.card-customer >>> .mint-navbar{
		margin-top: 10px;
	}
	.card-customer >>> .mint-tab-item-label{
		color: #FF6A48;
		font-size: 17px;
	}
	.card-customer >>> .is-selected{
		border-bottom: 3px solid #FF6A48;
	}
	.box{
		margin-top: 2px;
	}
	.box > ul > li{
		width: 95%;
		height: 60px;
		margin: 12px auto;
		line-height: 60px;
		background: #FFFFFF;
	}
	.box > ul > li .name{
		float: left;
		color: #222222;
		font-size: 14px;
		padding-left: 10px;
	}
	.box > ul > li .phone{
		float: left;
		color: #13D1A5;
		font-size: 14px;
		padding-left: 12px;
	}
	.box > ul > li .timer{
		float: right;
		color: #666666;
		font-size: 13px;
		padding-right: 10px;
	}
	.box > ul > li .timer > i{
		font-style: normal;
		color: #4D4D4D;
	}
</style>
