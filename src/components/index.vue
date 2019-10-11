<template>
    <div class="main index">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide"><img src="../assets/img/banner3.png"/></div>
                <div class="swiper-slide"><img src="../assets/img/banner3.png"/></div>
                <div class="swiper-slide"><img src="../assets/img/banner3.png"/></div>
            </div> 
            <div class="swiper-pagination"></div>   
        </div>

        <div class="item-list">
			<ul class="clearfix">
				<li>
					<router-link to="/incomeList" class="link-hover">
						<div class="item-icon">
							<img src="../assets/img/yaoqinghuoban_icon.png" />
						</div>
						<div class="item-text">邀请伙伴</div>
					</router-link>
				</li>
				<li>
					<router-link to="/partnerIndex" class="link-hover">
						<div class="item-icon">
							<img src="../assets/img/wodehuoban_icon.png" />
						</div>
						<div class="item-text">我的伙伴</div>
					</router-link>
				</li>
				<!-- <li>
					<router-link to="/recordList" class="link-hover">
						<div class="item-icon">
							<img src="../assets/img/shanghu_icon.png"/>
						</div>
						<div class="item-text">推广记录</div>
					</router-link>
				</li> -->
				<li>
					<router-link to="/merchants" class="link-hover">
						<div class="item-icon">
							<img src="../assets/img/shanghu_icon.png" />
						</div>
						<div class="item-text">我的商户</div>
					</router-link>
				</li>
				<li>
					<router-link to="/terminal" class="link-hover">
						<div class="item-icon">
							<img src="../assets/img/zhongduanguanli_icon.png" />
						</div>
						<div class="item-text">终端管理</div>
					</router-link>
				</li>
				<li>
					<router-link to="/awardSearch" class="link-hover">
						<div class="item-icon">
							<img src="../assets/img/jijuwuliao_icon.png" />
						</div>
						<div class="item-text">机具采购</div>
					</router-link>
				</li>
				<li>
					<router-link to="/classRoom" class="link-hover">
						<div class="item-icon">
							<img src="../assets/img/jiaoyijilu_icon.png" />
						</div>
						<div class="item-text">交易记录</div>
					</router-link>
				</li>
				<li>
					<router-link to="/cardIndex" class="link-hover">
						<div class="item-icon">
							<img src="../assets/img/tuijianbanka_icon.png" />
						</div>
						<div class="item-text">推荐办卡</div>
					</router-link>
				</li>
			</ul>
		</div>
		<div class="index-performance" onclick="performance();">
			<div class="performance-main">
			    <router-link to="/share">
					<div class="main-money">
						<div class="deal-text">
							<!-- <span class="results">本月业绩</span> -->
							<span class="turnover">本月交易额(元)</span>
						</div>
						<div class="deal-count shadow">{{sumAmount}}</div>
					</div>
					<div class="main-number clearfix">
						<div class="fl">
							<div class="count shadow">{{activeCount}}</div>
							<div class="text">激活终端(台)</div>
						</div>
						<div class="fl">
							<div class="count shadow">{{sumDirect}}</div>
							<div class="text">团队收益(元)</div>
						</div>
						<div class="fr">
							<div class="count shadow">{{sumPartner}}</div>
							<div class="text">新增合伙人(个)</div>
						</div>
					</div>
				</router-link>
			</div>
		</div>

        <index-tab page="0"></index-tab>
    </div>
</template>
<script>
import indexTab from '@/components/indexTabComponent';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css'
import { Spinner } from 'mint-ui';
import { Field } from 'mint-ui';
import { Header } from 'mint-ui';
import { Toast } from 'mint-ui';
import axios from 'axios';
export default {
	name: 'index',
	data () {
		return {
			sumAmount: '',
			sumDirect: '',
			sumPartner: '',
			activeCount: '',
		}
	},
	components:{
		indexTab,
	},
	methods: {
		getData(){
			axios.post('/api/home/homeIndex').then(respanse=>{
                if(respanse.data.code == 0){
					this.sumAmount = respanse.data.data.sumAmount;
					this.sumDirect = respanse.data.data.sumDirect;
					this.sumPartner = respanse.data.data.sumPartner;
					this.activeCount = respanse.data.data.activeCount;
                }else{
					Toast(respanse.data.message);
                }
            })
		},
		shufFling(){
            var mySwiper = new Swiper('.swiper-container', {
				autoplay: true,//可选选项，自动滑动
				pagination: {
					el: '.swiper-pagination',
				},
			})
		},
	},
	mounted () {
		this.getData();
		this.shufFling();
	}
}
</script>
<style scoped="scoped">
.main{
    overflow-x: hidden;
	overflow-y: hidden;
	margin-bottom: 1rem;
}
.swiper-slide > img{
    width: 100%;
}
.index .item-list{
    padding:25px 10px 0;
    background:#fff;
    height: 185px;
}
.index .item-list li{
    float:left;
    width:25%;
    margin-bottom:15px;
    text-align: center;
    list-style: none;
}
.index .item-list li a{
    display: inline-block;
    text-decoration: none;
}
.index .item-list li .item-icon{
    line-height:40px;
    height:40px;
    margin-bottom:8px;
}
.index .item-list li .item-icon img{
    max-width:40px;
    max-height: 40px;
}
.index .item-list li .item-text{
    font-size: 12px;
    color:#666;
}
.index .performance-main{
	width: 95%;
    height:180px;
	margin: 0px auto;
	border-radius: 5px;
    color:#fff;
    background: #FF7A57;
}
.index .performance-main .main-money{
    text-align: center;
    padding-top:15px;
}
.index .performance-main .main-money .deal-text{
    font-size:12px;
}
.index .performance-main .main-money .deal-count{
    font-size:24px;
    letter-spacing: 3px;
    margin-top:10px;
	color: #FFFFFF;
}
.index .performance-main .main-money .earnings{
    padding-top:16px;
    height:39px;
}
.index .performance-main .main-money .earnings span{
    font-size:12px;
    padding:5px 14px;
    border:1px solid #e5e5e5;
    border-radius:12px;
    display: inline-block;
}
.index .performance-main .main-number{
    padding:60px 10px;
}
.index .performance-main .main-number>div{
    width:33%;
    text-align: center;
}
.index .performance-main .main-number .count{
    font-size:18px;
	color: #FFFFFF;
}
.index .performance-main .main-number .text{
    font-size: 11px;
    margin-top:5px;
	color: #FFFFFF;
}
.index .index-performance {
    margin-top: 10px;
}
.index .performance-head {
    height: 40px;
    background: #fff;
    line-height: 40px;
}
.index .performance-head>div:first-child {
    padding: 0 10px;
}
.fl {
    float: left;
}
.fr {
    float: right;
}
.results{
	float: left;
	padding-left: 15px;
	color: #FFFFFF;
}
.turnover{
	text-align: center;
	color: #FFFFFF;
}
</style>
