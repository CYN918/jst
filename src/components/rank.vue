<template>
    <div class="contain">
		<div class="head">
			<span class="title">龙虎榜</span>
			<router-link to="/myData" class="head-link">我的数据</router-link>
		</div>
		<div class="main winners-list">
			<div class="list-con winner-con">
				<mt-navbar v-model="selected">
					<mt-tab-item id="1">月总交易</mt-tab-item>
					<mt-tab-item id="2"><span @click="activation()">月总激活</span></mt-tab-item>
					<mt-tab-item id="3"><span @click="tradingVolume()">台均交易</span></mt-tab-item>
				</mt-navbar>
				<mt-tab-container v-model="selected" style="margin-top: 4px;">
					<mt-tab-container-item id="1">
						<div class="title-content">
							<ul class="title-top">
								<li style="width: 20%;">排名</li>
								<li style="width: 50%;">合伙人</li>
								<li style="width: 30%;">月激交易(万元)</li>
							</ul>
							<ul class="title-bottom" v-if="this.list == null" style="height: 14rem">
								<img src="../assets/img/kongkong_icon.png"/>
								<p style="font-size: 18px;">暂无数据</p>
							</ul>
							<ul class="title-bottom" v-else>
								<li v-for="(item,index) in list">
								    <a @click="rankDetails(item.userId)">
										<div class="one" v-if="index < 9">0{{index+1}}</div>
										<div class="one" v-else>{{index+1}}</div>
										<div class="two">{{item.name}}</div>
										<div class="three">{{item.sumActivation}}</div>
									</a>
								</li>
							</ul>
						</div>
					</mt-tab-container-item>
					<mt-tab-container-item id="2">
						<div class="title-content">
							<ul class="title-top">
								<li style="width: 20%;">排名</li>
								<li style="width: 50%;">合伙人</li>
								<li style="width: 30%;">月激活总数(台)</li>
							</ul>
							<ul class="title-bottom" v-if="this.datas.length == 0" style="height: 14rem">
								<img src="../assets/img/kongkong_icon.png"/>
								<p style="font-size: 18px;">暂无数据</p>
							</ul>

							<ul class="title-bottom" v-else>
								<li v-for="(item,index) in datas">
									<div class="one" v-if="index < 9">0{{index+1}}</div>
									<div class="one" v-else>{{index+1}}</div>
									<div class="two">{{item.name}}</div>
									<div class="three">{{item.sumActivation}}</div>
								</li>
							</ul>
						</div>
					</mt-tab-container-item>
					<mt-tab-container-item id="3">
						<div class="title-content-bot">
							<ul class="title-top-bot">
								<li style="width:10%;line-height: 1rem;">排名</li>
								<li style="width:40%;line-height: 1rem;">合伙人</li>
								<li style="width:25%;"><span style="width: 100%;display: block;margin-top: 3px;">台均交易</span><span style="color: #FF6A48;">(万元)</span></li>
								<li style="width:25%;"><span style="width: 100%;display: block;margin-top: 3px;">月激活总数</span><span style="color: #FF6A48;">(台)</span></li>
							</ul>
							<ul class="title-bottom-bot" v-if="this.data.length == 0" style="height: 14rem">
								<img src="../assets/img/kongkong_icon.png"/>
								<p style="font-size: 18px;">暂无数据</p>
							</ul>

							<ul class="title-bottom-bot" v-else>
								<li v-for="(item,index) in data">
									<div class="one" v-if="index < 9">0{{index+1}}</div>
									<div class="one" v-else>{{index+1}}</div>
									<div class="two">{{item.name}}</div>
									<div class="three">{{item.sumAvg}}</div>
									<div class="four">{{item.sumTerCount}}</div>
								</li>
							</ul>
						</div>
					</mt-tab-container-item>
				</mt-tab-container>
			</div>
		</div>
		<index-tab page="2"></index-tab>
	</div>
</template>
<script>
import indexTab from '@/components/indexTabComponent';
import { Toast } from 'mint-ui';
import axios from 'axios'
export default {
	name: 'rank',
	data () {
		return {
			selected: '1',
			list: [],
			data: [],
			datas: [],
		}
	},
	components:{
		indexTab,
	},
	methods: {
		getData(){
			var formData = new FormData();
            formData.append("M_", 1);
            axios({
                url: '/api/home/rank_',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
					this.list = respanse.data.data;
                }else{
                    Toast(respanse.data.message);
                }
            })
		},
		rankDetails(id){
			this.$router.push({name: 'RankDetails',params:{id: id}});
		},
		tradingVolume(){
			axios.post('/api/home/average_').then(respanse=>{
                if(respanse.data.code == 0){
					this.data = respanse.data.data;
                }else{
                    Toast(respanse.data.message);
                }
            })
		},
		activation(){
			axios.post('/api/home/average_').then(respanse=>{
                if(respanse.data.code == 0){
					this.datas = respanse.data.data;
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
		margin-bottom: 2rem;
	}
    .winners-list >>> .is-selected{
		color: #FF6A48;
		border-bottom: 3px solid #FF6A48;
	}
	.winners-list >>> .mint-tab-item-label{
		font-size: 17px;
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
	.head-link{
		color: #222222;
		font-size: 14px;
	}
	.title-content{
		margin-top: 4px;
	}
	.title-content .title-top,.title-content .title-bottom{
        width: 95%;
		margin: 0 auto;
		height: 39px;
		line-height: 39px;
		background: #FFFFFF;
	}
	.title-content .title-bottom > img{
		margin-top: 2rem;
	}
	.title-content .title-top > li{
		float: left;
		text-align:center;
		font-size: 13px;
		color: #222222;
		font-weight:bold;
		border-bottom: 1px solid #EBEBEB;
	}
	.title-content .title-bottom > li{
		width: 100%;
		height: 40px;
		background: #FFFFFF;
		border-bottom: 1px solid #EBEBEB;
	}
	.title-content .title-bottom > li > a > div{
		float: left;
		text-align: center;
	}
	.title-content .title-bottom > li > a .one{
		color: #222222;
		font-size: 14px;
		width: 20%;
	}
	.title-content .title-bottom > li > a .three{
		color: #FF6A48;
		font-size: 14px;
		width: 30%;
	}
	.title-content .title-bottom > li > a .one,.title-content .title-bottom > li > a .two,.title-content .title-bottom > li > a .three{
		line-height: 40px;
	}
	.title-content .title-bottom > li > a .two{
		font-size: 13px;
		color: #222222;
		width: 50%;
	}
	.title-content .title-bottom > li > a .one .one-left{
        font-size: 12px;
		color: #222222;
		padding-top: 7px;
		display: block;
	}
	.title-content .title-bottom > li > a .one .one-right{
		font-size: 11px;
		color: #666666;
		padding-top: 5px;
		display: block;
	}

	.title-content-bot{
		margin-top: 4px;
	}
	.title-content-bot .title-top-bot,.title-content-bot .title-bottom-bot{
        width: 95%;
		margin: 0 auto;
		height: 1rem;
		background: #FFFFFF;
		border-bottom: 1px solid #EBEBEB;
	}
	.title-content-bot .title-bottom-bot > img{
		margin-top: 2rem;
	}
	.title-content-bot .title-top-bot > li{
		float: left;
		text-align:center;
		font-size: 13px;
		color: #222222;
		font-weight:bold;
		
	}
	.title-content-bot .title-bottom-bot > li{
		width: 100%;
		height: 40px;
		background: #FFFFFF;
		border-bottom: 1px solid #EBEBEB;
		float: left;
	}
	.title-content-bot .title-bottom-bot > li .one{
		width: 10%;
		color: #FF6A48;
		font-size: 14px;
		float: left;
		text-align: center;
	}
	.title-content-bot .title-bottom-bot > li .three{
		color: #FF6A48;
		font-size: 14px;
	}
	.title-content-bot .title-bottom-bot > li .one,.title-content-bot .title-bottom-bot > li .two,.title-content-bot .title-bottom-bot > li .three{
		line-height: 40px;
	}
	.title-content-bot .title-bottom-bot > li .three,.title-content-bot .title-bottom-bot > li .four{
		width: 25%;
		float: left;
		text-align: center;
		line-height: 40px;
	}
	.title-content-bot .title-bottom-bot > li .two{
		width: 40%;
		font-size: 13px;
		color: #222222;
		float: left;
		text-align: center;
	}
	.title-content-bot .title-bottom-bot > li .one .one-left{
        font-size: 12px;
		color: #222222;
		padding-top: 7px;
		display: block;
	}
	.title-content-bot .title-bottom-bot > li .one .one-right{
		font-size: 11px;
		color: #666666;
		padding-top: 5px;
		display: block;
	}

</style>
