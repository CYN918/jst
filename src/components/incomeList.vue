<template>
    <div class="contain">
		<div class="head">
			<router-link to="/" class="back"><i class="icon-back">
				</i>
			</router-link>
			<span class="title">邀请伙伴</span>
		</div>
		<div class="main my-earning">
			<img src="../assets/img/background.png"/>
			<img v-bind:src="Imgurl" id="Img"/>
			<div class="news">
			    <p class="name">{{name}}</p>
				<p class="phone">{{mobile}}</p>
			</div>
			<div class="qrCode" id="qrcode">
			    
			</div>
			<div style="position: absolute;top: 62%;left: 37%;font-size: 14px;">扫  /  码  /  注  /  册</div>
			
			<div class="bottom-footer">
			    <div class="bottom-footer-left">
				    <router-link to="/registerFace">
					    <img src="../assets/img/face.png"/><br/>
						<span>面对面开通</span>
					</router-link>
				</div>
				<div class="bottom-footer-right">
				    <a @click="shareWx">
					    <img src="../assets/img/weixin.png"/><br/>
						<span>微信分享</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
import axios from 'axios';
import QRCode from 'qrcodejs2';

export default {
	name: 'incomeList',
	data () {
		return {
			state: '0',
			name: '',
			mobile: '',
			Imgurl: '',
			appId: '',
			timestamp: '',
			nonceStr: '',
			signature: '',
			SHARE_PARTNER_TITLE: '',
			SHARE_PARTNER_DESC: '',
			link: '',
			Img: '',
		}
	},
	components:{
		
	},
	methods: {
		choose(obj){
			if(obj == 0){
				this.hobby1 = false;
				this.hobby = true;
			}else if(obj == 1){
				this.hobby1 = true;
				this.hobby = false;
				MessageBox.confirm('', {
					title: '设置参数',
					 message: '您还未置费率参数', 
					 confirmButtonText: '立即设置', 
					 cancelButtonText: '取消' 
				}).then(action => { 
					if (action == 'confirm') {     //确认的回调
						this.$router.push({path: '/setRate'});
				 	}
				}).catch(err => { 
				 	if (err == 'cancel') {     //取消的回调
                        this.hobby1 = false;
				        this.hobby = true;
				 	} 
				});
			}
		},
		Click(){
			MessageBox.confirm('', {
				title: '确认勾选',
				 message: '确认勾选固定费率', 
				 confirmButtonText: '修改费率', 
				 cancelButtonText: '确认' 
			}).then(action => { 
				if (action == 'confirm') {     //修改费率的回调
					
			 	}
			}).catch(err => { 
			 	if (err == 'cancel') {     //确认的回调
                    this.hobby1 = true;
				    this.hobby = false;
			 	} 
			});
		},
		getData(){
            axios.post('/api/home/registerCode').then(respanse=>{
				if(respanse.data.code == 0){
					 this.name = respanse.data.data.name;
					 this.mobile = respanse.data.data.mobile;
					 this.Imgurl = respanse.data.data.headPhoto;
					 let qrcode = new QRCode('qrcode', { 
						text: respanse.data.data.codurl // 二维码内容  
				    })  
				}else{
					Toast(respanse.data.message);
				}
			})
		},
		setData(){
            axios.post('/api/home/sharePartner').then(respanse=>{
				if(respanse.data.code == 0){
					this.appId = respanse.data.data.appId;
					this.timestamp = respanse.data.data.timestamp;
					this.nonceStr = respanse.data.data.nonceStr;
					this.signature = respanse.data.data.signature;
					this.SHARE_PARTNER_TITLE = respanse.data.data.SHARE_PARTNER_TITLE;
					this.SHARE_PARTNER_DESC = respanse.data.data.SHARE_PARTNER_DESC;
					this.link = respanse.data.data.link;
					this.Img = respanse.data.data.imgUrl;
				}else{
					Toast(respanse.data.message);
				}
			})	
		},
		shareWx() {
			// if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
			// 	this.$router.push({path: '/taskManage'}); 
			// } else {
			// 	this.$router.push({path: '/taskManage'}); 
			// }

			var wx = (function () { return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1 })();
			if (wx) {
				console.log(navigator.userAgent+"是微信");
				
				//配置参数
				
				wx.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: this.appId, // 必填，公众号的唯一标识
					timestamp: this.timestamp, // 必填，生成签名的时间戳
					nonceStr: this.nonceStr, // 必填，生成签名的随机串
					signature: this.signature,// 必填，签名，见附录1
					jsApiList: [
						'onMenuShareTimeline',
						'onMenuShareAppMessage',
						'onMenuShareQQ',
						'onMenuShareWeibo',
						'onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});



				/**
					* 通过ready接口处理成功验证
					* config信息验证成功后会执行ready方法
					* 需在用户可能点击分享按钮前就先调用
					*/
				var title = this.SHARE_PARTNER_TITLE;
				var desc = this.SHARE_PARTNER_DESC;
				var link = this.link;
				var imgUrl = this.Img;
				wx.ready(function() { //               
					let shareData = {
						title: title,
						desc: desc,//这里请特别注意是要去除html
						link: link,
						imgUrl: imgUrl,
					};

					// 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
					wx.onMenuShareAppMessage(shareData);
					
					// 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
					wx.onMenuShareTimeline(shareData);
					
					// 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
					wx.onMenuShareQQ(shareData);
					
					// 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
					wx.onMenuShareWeibo(shareData);
					
					// 2.5 监听“分享到QZone”按钮点击、自定义分享内容及分享接口
					wx.onMenuShareQZone(shareData);
		
						
					//兼容新老版本接口， 如不需要处理逻辑情况下， 调试好可以直接使用
					if(wx.onMenuShareAppMessage){ //微信文档中提到这两个接口即将弃用，故判断
						wx.onMenuShareAppMessage(shareData);//1.0 分享到朋友
						wx.onMenuShareTimeline(shareData);//1.0分享到朋友圈
					}else{
						wx.updateAppMessageShareData(shareData);//1.4 分享到朋友
						wx.updateTimelineShareData(shareData);//1.4分享到朋友圈
					}

				});
				wx.error(res =>{//通过error接口处理失败验证
					// config信息验证失败会执行error函数
					console.log(res);
				});
					
			} else {
				this.$router.push({path: '/taskManage'}); 
			}
					
		}
	},
	mounted () {
		this.getData();
		this.setData();
	}
}
</script>
<style scoped="scoped">
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
	.main{
		position: relative;
	}
	.main > img{
		width: 100%;
		height: auto;	
	}
	.main #Img{
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
		position: absolute;
		top: 15%;
		left: 43%;
	}
	.main .news{
		position: absolute;
		top: 4.2rem;
		left: 4rem;
	}
	.main .news .name{
		font-size: 14px;
		color: #222222;
		font-weight:bold;
	}
	.main .news .phone{
		font-size: 12px;
		color: #666666;
		margin-top: 10px;
	}
	.main .qrCode{
		width: 4.5rem;
		height: 4.5rem;
		border: 1px solid #222222;
		position: absolute;
		top: 33.2%;
		left: 26.5%;
		padding-top: 5px;
        padding-left: 5px;
	}
	#qrcode >>> img{
		width: 4rem;
		height: 4rem;
        position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -2rem;
		margin-top: -2rem;
	}
	.main .choose{
		position: absolute;
		top: 11rem;
		left: 1rem;
	}
	.main .choose .left > input{
		width: 13px;
		height: 13px;
		position: relative;
		top: 2px;
	}
	.main .choose .right > input{
		width: 13px;
		height: 13px;
		position: relative;
		top: 2px;
	}
	.main .choose .left{
		float: left;
		font-size: 14px;
		color: #222222;
		margin-left: 0.8rem;
	}
	.main .choose .right{
		float: right;
	    margin-left: 2.3rem;
		font-size: 14px;
		color: #222222;
	}
	.bottom-footer{
		position: absolute;
		bottom: 1.5rem;
		left: 2rem;
	}
	.bottom-footer .bottom-footer-left{
		float: left;
	}
	.bottom-footer .bottom-footer-left > a > img{
		width: 1rem;
		height: 1rem;
	}
	.bottom-footer .bottom-footer-left > a > span{
		font-size: 13px;
		color: #999999;
		margin-top: 0.2rem;
		display: block;
	}
	.bottom-footer .bottom-footer-right{
		float: right;
		margin-left: 3rem;
	}
	.bottom-footer .bottom-footer-right > a > img{
		width: 1rem;
		height: 1rem;
	}
	.bottom-footer .bottom-footer-right > a > span{
		font-size: 13px;
		color: #999999;
		margin-top: 0.2rem;
		display: block;
	}

</style>
