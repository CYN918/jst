<template>
    <div class="contain">
        <div class="head">
            <router-link to="/" class="back"><i class="icon-back"></i></router-link>
            <span class="title">终端管理</span>
        </div>
        <div class="main generalize-dredge">
            <div class="index-performance">
				<div class="performance-main">
					<div class="main-money">
						<div class="deal-count shadow">{{totalcount}}</div>
						<div class="deal-text">
							<span class="turnover">当前机具总数量(台)</span>
						</div>
					</div>
					<div class="main-number clearfix">
						<div class="fl teshu">
							<div class="count shadow">{{alreadycount}}</div>
							<div class="text">已划拨具(台)</div>
						</div>
						<div class="fl teshu">
							<div class="count shadow">{{activcount}}</div>
							<div class="text">已激活机具(台)</div>
						</div>
						<div class="fr">
							<div class="count shadow">{{notcount}}</div>
							<div class="text">未下拨机具(台)</div>
						</div>
					</div>
				</div>
			</div>
			<div class="listDetails">
			    <ul>
				    <li>
					    <router-link to="/terminalAllocated">
						    <img src="../assets/img/img_yihuabo_icon .png"/>
							<span>已划拨终端</span>
							<div class="symbol">
							    <i class="icon-arrow"></i>
							</div>
						</router-link>
					</li>
				</ul>
			</div>
			<div class="listDetails">
			    <ul>
				    <li>
					    <router-link to="/terminalManagement">
						    <img src="../assets/img/img_zhongduanhuabo_icon.png"/>
							<span>终端划拨</span>
							<div class="symbol">
							    <i class="icon-arrow"></i>
							</div>
						</router-link>
					</li>
				</ul>
			</div>
			<div class="listDetails">
			    <ul>
				    <li>
					    <router-link to="/transfer">
						    <img src="../assets/img/img_huokuanzhuanyi_icon.png"/>
							<span>货款转移</span>
							<div class="symbol">
							    <i class="icon-arrow"></i>
							</div>
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
	name: 'terminal',
	data () {
		return {
			totalcount: '',
			activcount: '',
			alreadycount: '',
			notcount: '',
		}
	},
	components:{
		
	},
	methods: {
		getData(){
			axios.get('/api/user/transferAll_').then(respanse=>{
                if(respanse.data.code == 0){
					this.totalcount = respanse.data.data.totalcount;
					this.activcount = respanse.data.data.activcount;
					this.alreadycount = respanse.data.data.alreadycount;
					this.notcount = respanse.data.data.notcount;

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
<style scoped>
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
	.performance-main{
		height:160px;
		width: 97%;
		margin: 0 auto;
		border-radius: 5px;
		color:#fff;
		background:#FF7A57;
	}
	.performance-main .main-money{
		text-align: center;
		padding-top:15px;
	}
	.performance-main .main-money .deal-text{
		font-size:12px;
		padding-top: 10px;
	}
	.performance-main .main-money .deal-count{
		font-size:22px;
		padding-top:10px;
	}
	.performance-main .main-money .earnings{
		padding-top:16px;
		height:39px;
	}
	.performance-main .main-money .earnings span{
		font-size:12px;
		padding:5px 14px;
		border:1px solid #e5e5e5;
		border-radius:12px;
		display: inline-block;
	}
	.performance-main .main-number{
		padding:30px 10px;
	}
	.performance-main .main-number>div{
		width:33%;
		text-align: center;	
	}
	.teshu{
        border-right: 1px solid #FFFFFF;
	}
	.performance-main .main-number .count{
		font-size:16px;
	}
	.performance-main .main-number .text{
		font-size: 12px;
		padding-top:5px;
	}
	.index-performance {
		margin-top: 10px;
	}
	.performance-head {
		height: 40px;
		background: #fff;
		line-height: 40px;
	}
	.performance-head>div:first-child {
		padding: 0 10px;
	}
	.fl {
		float: left;
	}
	.fr {
		float: right;
	}
	.listDetails > ul > li > a{
		width: 97%;
		margin: 10px auto;
		height: 60px;
		line-height: 60px;
		background: #FFFFFF;
		border-radius: 5px;
		display: block;
	}
	.listDetails > ul > li > a > img{
		width: 22px;
		height: 18px;
        float: left;
		position: relative;
		top: 21px;
		left: 12px;
	}
	.listDetails > ul > li > a > span{
		float: left;
		font-size: 15px;
		color: #5C5C5C;
		display: block;
		padding-left: 20px;
	}
	.symbol{
		width: 14px;
		height: 14px;
		float: right;
		position: relative;
        right: 15px;
	}
	.symbol > i{
        width: 14px;
		height: 14px;
		display: inline-block;
		background-repeat: no-repeat;
		background-position: center bottom;
		right: 10px;
		top: 17px;
	}
</style>
