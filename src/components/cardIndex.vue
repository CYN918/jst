<template>
    <div class="contain">
		<div class="head">
			<router-link to="/" class="back">
				<i class="icon-back"></i>
			</router-link>
			<span class="title">办卡吧</span>
		</div>
		<div class="main card-index">
			<div class="swiper-box">
				<div class="swiper-container swiper-banner">
					<div class="swiper-wrapper">
						<div class="swiper-slide"><img src="../assets/img/card-banner1.png"/></div>
						<div class="swiper-slide"><img src="../assets/img/card-banner2.png"/></div>
						<div class="swiper-slide"><img src="../assets/img/card-banner3.png"/></div>
					</div> 
                </div>
			</div>

			<div class="link-box">
				<div class="swiper-container swiper-link swiper-teshu">
					<div class="swiper-wrapper swiper-teshu">
						<div class="swiper-slide teshu">
							<router-link to="/cardChoose" class="link-item">
								<div class="item-img">
									<img src="../assets/img/card-apply-img.png" />
								</div>
								<div class="item-text">办卡申请</div>
							</router-link>
						</div>
						<div class="swiper-slide teshu">
							<!-- <a onclick="modalShow(0);" class="link-item"> -->
							<router-link to="/cardRecommend" class="link-item">
								<div class="item-img">
									<img src="../assets/img/recommend-card-img.png"/>
								</div>
								<div class="item-text">推荐办卡</div>
							</router-link>
						</div>
						<div class="swiper-slide teshu">
							<router-link to="/cardPoster" class="link-item">
								<div class="item-img">
									<img src="../assets/img/card-poster-img.png"/>
								</div>
								<div class="item-text">宣传海报</div>
							</router-link>
						</div>
						<div class="swiper-slide teshu">
							<router-link to="/cardCustomer" class="link-item">
								<div class="item-img">
									<img src="../assets/img/customer-manage-img.png"/>
								</div>
								<div class="item-text">客户管理</div>
							</router-link>
						</div>	
					</div>
					
				</div>
			</div>

			<div class="count-box">
				<div class="count-card">
				    <router-link to="/reward">
						<!-- <div class="banka">办卡佣金</div> -->
						<div class="card-top">
							<div class="card-text">本月办卡佣金(元)</div>
							<div class="card-count">{{sumCardAmount}}</div>
						</div>
						<div class="card-bottom clearfix">
							<div class="bottom-left fl">
								<div class="card-count">{{sumCardDirect}}</div>
								<div class="card-text">个人办卡佣金(元)</div>
							</div>
							<div class="bottom-right fr">
								<div class="card-count">{{sumCardTeam}}</div>
								<div class="card-text">团体办卡佣金(元)</div>
							</div>
						</div>
					</router-link>
				</div>
			</div>
			
		</div>
	</div>
</template>
<script>
import { Toast } from 'mint-ui';
import axios from 'axios'
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css'
export default {
	name: 'cardIndex',
	data () {
		return {
			sumCardTeam: '',
			sumCardAmount: '',
			sumCardDirect: '',
		}
	},
	components:{
		
	},
	methods: {
		getData(){
            axios.post('/api/card/cardIndex').then(respanse=>{
                if(respanse.data.code == 0){
					this.sumCardTeam = respanse.data.data.sumCardTeam;
                    this.sumCardAmount = respanse.data.data.sumCardAmount;
					this.sumCardDirect = respanse.data.data.sumCardDirect;
                }else{
                    Toast(respanse.data.message);
                }
            })
        },
	},
	mounted () {
		this.getData();
		var mySwiper = new Swiper('.swiper-banner', {
			autoplay: true,//可选选项，自动滑动
			pagination: {
				el: '.swiper-pagination',
			},
		})
	}
}
</script>
<style scoped="scoped">
	.swiper-wrapper .teshu{
		width:25% !important;
	}
	.swiper-teshu .link-box{
		width:468.75px !important;
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
	.banka{
		width: 60px;
		height: 13px;
		position: absolute;
		top: 23px;
		left: 20px;
		font-size: 14px;
		color: #FFFFFF;
	}
	.card-text{
		font-size: 12px;
		color: #FFFFFF;
	}
	.card-count{
		color: #FFFFFF;
	}
</style>
