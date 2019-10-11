<template>
    <div class="contain">
		<div class="head">
			<router-link to="/cardIndex" class="back">
				<i class="icon-back"></i>
			</router-link>
			<span class="title">宣传海报</span>
			<a v-if="this.browserType == 1" @click="savePoster()" class="head-link">保存</a>
		</div>
		<div class="main card-poster">
			<div class="swiper-box">
				<div class="swiper-container">
					<div class="swiper-wrapper">
						<div class="swiper-slide">
							<div class="poster-con p1"></div>
						</div>
						<div class="swiper-slide">
							<div class="poster-con p2"></div>
						</div>
						<div class="swiper-slide">
							<div class="poster-con p3"></div>
						</div>
						<div class="swiper-slide">
							<div class="poster-con p4"></div>
						</div>
						<div class="swiper-slide">
							<div class="poster-con p5"></div>
						</div>
						<div class="swiper-slide">
							<div class="poster-con p6"></div>
						</div>
						<div class="swiper-slide">
							<div class="poster-con p7"></div>
						</div>
					</div>
					<div class="swiper-pagination"></div>
				</div>
			</div>
			<div class="poster-main">
				<div class="poster-qrcode">
					<div class="qrcode-img" id="qrcode"></div>
				</div>
				<div v-if="this.browserType == 1" id="share" class="poster-share" v-clipboard:copy="sharePoster" v-clipboard:success="onCopy" v-clipboard:error="onError">立即分享</div>
			</div>
		</div>
	</div>
</template>
<script>
import { Toast } from 'mint-ui';
import axios from 'axios'
import QRCode from 'qrcodejs2';
export default {
	name: 'cardPoster',
	data () {
		return {
			sharePoster: '',
			browserType: '',
			savePoster: '',
		}
	},
	components:{
		
	},
	methods: {
		getData(){
            axios.post('/api/card/cardPoster').then(respanse=>{
                if(respanse.data.code == 0){
					let qrcode = new QRCode('qrcode', {  
						text: respanse.data.data.shareUrl // 二维码内容  
					}) 
					this.browserType = respanse.data.data.browserType;
					if(this.browserType == 1){
						this.sharePoster = respanse.data.data.sharePoster;
						this.savePoster = respanse.data.data.savePoster;
					}else{
						
					}
                }else{
                    Toast(respanse.data.message);
                }
            })
        },
		savePoster(){

		},
		onCopy () {
			Toast({
				message: '复制成功！',
				type: 'success'
			});
		},
		onError () {
			Toast({
				message: '复制失败！',
				type: 'success'
			});
		},
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
	#qrcode >>> img{
		width: 3.9rem;
		height: 3.9rem;
	}
</style>
