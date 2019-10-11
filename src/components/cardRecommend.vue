<template>
    <div class="contain">
		<div class="head">
			<router-link to="/cardIndex" class="back">
				<i class="icon-back"></i>
			</router-link>
			<span class="title">推荐办卡</span>
		</div>
		<div class="main card-recommend">
			<div class="recommend-bg">
				<div class="recommend-con">
					<div class="recommend-box">
						<div class="box-qrcode">
							<div class="qrcode-img" id="qrcode">
							    
							</div>
						</div>
						<div class="operation">
						    <ul>
							    <li class="teshu" v-clipboard:copy="shareUrl" v-clipboard:success="onCopy" v-clipboard:error="onError">复制链接</li>
								<li v-clipboard:copy="shareCode" v-clipboard:success="onCopy1" v-clipboard:error="onError1">分享二维码</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { Toast } from 'mint-ui';
import axios from 'axios'
import QRCode from 'qrcodejs2';
export default {
	name: 'cardRecommend',
	data () {
		return {
			shareUrl: '',
			shareCode: '',
		}
	},
	components:{
		
	},
	methods: {
		getData(){
            axios.post('/api/card/cardRecommend').then(respanse=>{
                if(respanse.data.code == 0){
					let qrcode = new QRCode('qrcode', { 
						text: respanse.data.data.shareUrl // 二维码内容  
				    }) 
					this.shareUrl = respanse.data.data.shareUrl;
					this.shareCode = respanse.data.data.shareCode;
                }else{
                    Toast(respanse.data.message);
                }
            })
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
		onCopy1 () {
			Toast({
				message: '复制成功！',
				type: 'success'
			});
		},
		onError1 () {
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
	.card-recommend{
		position: relative;
	}
	#qrcode{
		position: absolute;
		top: 52.5%;
		left: 29%;
	}
	#qrcode > img{
		width: 158px;
		height: 158px;
	}
	.operation{
		position: absolute;
		top: 85%;
		left: 7%;
	}
	.operation > ul > li{
		width: 140px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		border-radius: 15px;
		display: inline-block;
		background: #FFA303;
		color: #FFFFFF;
		font-size: 16px;
	}
	.operation .teshu{
		margin-right: 40px;
	}
	#qrcode >>> img{
		width: 4.2rem;
		height: 4.2rem;
	}
</style>
