<!--
**首页tab公用组件
**author:cyn
**导入     import 组件 from '@/components/'
**注册	components:{组件}
-->
<template>
	<div class="index_tab">
		<div class="ub mainTabBar">
			<div class="ub_f1 msgTipCont" v-if="tabBar.isShow" v-for="(tabBar, index) in tabBars" @click="clickTabBar(index)">
				<img v-if='isShowMain != index' :class="{ mainTabBar_li_img: true }" :src="tabBar.unCheckedImg"/>
				<img v-if='isShowMain == index' :class="{ mainTabBar_li_img: true }" :src="tabBar.chooseIme"/>
				<p :class="{ actTextTab: isShowMain == index, noActTextTab: isShowMain != index }">{{tabBar.text}}</p>
				<!--<p v-if="tabBar.msgTip == true && winning == true" class="msgTip"></p>-->
			</div>
		</div>
		
		<div v-if="isShowTip">
			<err-tip :errMsg="errTipMsg"></err-tip>
		</div>
	</div>
</template>

<script>
import imgYes from '../assets/tab_home_onselected.png.png';
import imgNo from '../assets/tab_home_unselected.png.png';
import imgsOneYes from '../assets/tab_yeji_onselected.png.png';
import imgsOneNo from '../assets/tab_yeji_unselected.png.png';
import imgsThreeYes from '../assets/tab_longhubang_onselected.png.png';
import imgsThreeNo from '../assets/tab_longhubang_unselected.png.png';
import imgsFourYes from '../assets/tab_wode_onselected.png.png';
import imgsFourNo from '../assets/tab_wode_unselected.png.png';

export default {
	name: 'indexTabComponent',
	props:['page'],
	data() {
		return {
			isShowTip:false,
			/*winning:true,*/
			isShowMain:0,
			errTipMsg:'',
			tabBars:[
				{'text':'首页','chooseIme':imgYes,'unCheckedImg':imgNo,'isShow':true,'msgTip':false},
				{'text':'业绩','chooseIme':imgsOneYes,'unCheckedImg':imgsOneNo,'isShow':true,'msgTip':false},
				{'text':'龙虎榜','chooseIme':imgsThreeYes,'unCheckedImg':imgsThreeNo,'isShow':true,'msgTip':false},
				{'text':'我的','chooseIme':imgsFourYes,'unCheckedImg':imgsFourNo,'isShow':true,'msgTip':false}
			]
		};
	},
	created(){
		this.isShowMain = this.page;
	},
	mounted(){
		/*this.axios.post('/apis/consumer/user/getUserMsg',{}).then((response) => {
			if(response.data.status == 'success'){
				this.$emit('has_msg',response.data.data.has_msg);
				this.winning = response.data.data.winning;
			}else{
				
			};
		}).catch((err) => {
			console.log(err.msg);
		});*/
	},
	components:{
		
	},
	methods: {
		clickTabBar(index){
			this.isShowMain = index;
			switch(index){
				case 0:
					this.$router.push('/');
					break;
				case 1:
					this.$router.push('/share');
					break;
				case 2:
					this.$router.push('/rank');
					break;
				case 3:
					this.$router.push('/userIndex');
					break;
			};
		}
	}
}
</script>

<style scoped>
	.msgTip{
		position: absolute;
		top: 0.05rem;
		right: 0.3rem;
		width: 0.35rem;
		height: 0.35rem;
		border-radius: 50%;
		background: red;
	}
	.msgTipCont{
		position: relative;
	}
	.actTextTab{
		color: #FF6A48;
	}
	.noActTextTab{
		color: #333;
	}
	.mainTabBar > div > p{
		font-size: 0.32rem;
	}
	.mainTabBar_li_img{
		height: 0.58rem;
		padding-bottom: 0.1rem;
	}
	.mainTabBar_li_img_dif{
		width: 1rem;
	}
	.mainTabBar > div{
		padding: 0.2rem 0;
		width: 25%;
		float: left;
	}
	.mainTabBar{
		z-index: 50;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		background: white;
		border-top: 0.02666rem solid #ddd;
		text-align: center;
	}
</style>