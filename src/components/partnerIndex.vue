<template>
    <div class="contain">
		<div class="head">
			<router-link to="/" class="back"><i class="icon-back"></i></router-link>
			<span class="title">我的伙伴</span>
		</div>
		<div class="main my-partner">
			<mt-field style="margin-top:0.1rem;" placeholder="请输入姓名/手机号" v-model="keywork">
				<mt-button size="small" type="default" class="ve-send-code" @click="gosearch">搜索</mt-button>
			</mt-field>
			<div class="superior" v-if="this.toppal != null">
			    <ul>
				    <li class="active"><span class="left">直属上级</span><span class="right-name">{{userName}}</span></li>
					<li><span class="left">联系电话</span><span class="right">{{mobile}}</span></li>
				</ul>
			</div>
			<div class="total">
			    <p>伙伴总数：<i>{{count}}</i>（个）</p>
			</div>
			<div class="merchantsList">
			    <ul v-if="this.downpal == null">
					<img src="../assets/img/zanwushuju.png"/>
				    <p>暂无数据</p>
				</ul>
			    <ul v-else>
				    <li v-for="item in downpal">
					    <router-link :to="{path: '/partnerIndexDetails',query:{id:item.id,userName:item.userName}}">
							<div class="one"><span class="one-left">{{item.userName}}</span><span class="one-right" v-if="item.isActivation == 1">已激活</span><span class="one-right" v-if="item.isActivation == 0">未激活</span></div>
							<div class="two"><span class="two-left">机具总数：<b>{{item.totalterminalcount}}</b></span><span class="two-right">激活台数：<b>{{item.terminalcount}}人</b></span></div>
							<div class="three"><span class="three-left">联系电话：<b>{{item.mobile}}</b></span><span class="three-right">直属伙伴：<b>{{item.palCount}}台</b></span></div>
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
	name: 'partnerIndex',
	data () {
		return {
			keywork: '',
			userName: '',
			mobile: '',
			count: '',
			downpal: [],
			toppal: '',
		}
	},
	components:{
		
	},
	methods: {
		gosearch() {
			var formData = new FormData();
            formData.append("searchStr", this.keywork);
            axios({
                url: '/api/partner/partnerList_',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
					this.downpal = respanse.data.data.downpal;
                }else{
                    Toast(respanse.data.message);
                }
            })
		},
		getData(){
			var formData = new FormData();
            formData.append("searchStr", this.keywork);
            axios({
                url: '/api/partner/partnerList_',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
					this.toppal = respanse.data.data.toppal;
					if(this.toppal != null){
						this.userName = respanse.data.data.toppal.userName;
						this.mobile = respanse.data.data.toppal.mobile;
					}
					this.count = respanse.data.data.count;
					this.downpal = respanse.data.data.downpal;
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
    .superior{
        width: 95%;
		margin: 10px auto;
		height: 90px;
		background: #FFFFFF;
		border-radius: 5px;
	}
	.merchantsList > ul > img{
		margin-top: 1rem;
	}
	.superior > ul > li{
		width: 95%;
		margin: 0px auto;
        height: 45px;
		line-height: 45px;
	}
	.superior > ul .active{
		border-bottom: 1px solid #EBEBEB;
	}
	.superior > ul > li .left{
		float: left;
		font-size: 14px;
		color: #4D4D4D;
	}
	.superior > ul > li .right{
		float: right;
		font-size: 14px;
		color: #FF6A48;
	}
	.superior > ul > li .right-name{
		float: right;
		font-size: 14px;
		color: #13D1A5;
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
	.total{
		width: 100%;
		height: 1rem;
		line-height: 1rem;
	}
	.total > p{
        text-align: left;
		padding-left: 0.5rem;
		font-size: 12px;
		color: #222222;
	}
	.total > p > i{
		font-style:normal;
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
		color: #13D1A5;
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
		color: #FF6A48;
	}
	.merchantsList > ul > li .two .two-right{
		float: right;
		font-size: 12px;
		color: #4D4D4D;
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
		color: #FF6A48;
	}
	.merchantsList > ul > li .three .three-right{
		float: right;
		font-size: 12px;
		color: #4D4D4D;
		display: block;
	}
	.merchantsList > ul > li .three .three-right > b{
		color: #FF6A48;
	}
</style>
