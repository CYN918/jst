<template>
    <div class="contain">
		<div class="head">
			<router-link to="/partnerIndex" class="back"><i class="icon-back"></i></router-link>
			<span class="title">伙伴详情</span>
		</div>
		<div class="main my-partner">
			<div class="merchantsList">
			    <ul>
				    <li>
					    <div class="one"><span class="one-left">{{userName}}</span><span class="one-right">{{mobile}}</span></div>
						<div class="two"><span class="two-left">加入团队时间</span><span class="two-right">{{time}}</span></div>
						<div class="three two"><span class="three-left">机具总数(台)</span><span class="three-right">{{totalterminalcount}}</span></div>
						<div class="three two"><span class="three-left">激活台数(台)</span><span class="three-right">{{terminalcount}}</span></div>
						<div class="three"><span class="three-left">业务区域</span><span class="three-right">{{area}}</span></div>
					</li>
				</ul>
			</div>
			<div class="deduction">
			    <span>设置抵扣参数</span>
				<router-link :to="{path: '/partnerIndexDeduction',query:{userId:this.id}}" v-if="this.deduction == 0">设置参数</router-link>
				<router-link :to="{path: '/partnerIndexDeductionPreview',query:{userId:this.id}}" v-else-if="this.deduction == 1">查看参数</router-link>
			</div>
			<div class="deduction">
			    <span>设置激活垫返</span>
				<router-link :to="{path: '/matReturnTo',query:{userId:this.id}}"  v-if="this.matReturn == 0">设置参数</router-link>
				<router-link :to="{path: '/matReturnToPreview',query:{userId:this.id}}" v-else-if="this.matReturn == 1">查看参数</router-link>
			</div>
			<div class="FenRun">
			    <p class="FenRun-one">设置分润参数</p>
			    <ul v-if="this.lists === 8">	    
					<li class="FenRun-two" v-if="this.zoxitatus == false"><span>尊享版Plus</span><router-link class="set-up" :to="{path: '/mentallyVersion',query:{id:this.lists,userId:this.id}}">设置参数</router-link></li>
					<li class="FenRun-two" v-else-if="this.zoxitatus != false"><span>尊享版Plus</span><router-link class="set-up" :to="{path: '/MentallyVersionPreviewT',query:{id:this.lists,userId:this.id}}">查看参数</router-link></li>
				</ul>
				<ul v-if="this.items === 11">
				    <li class="FenRun-three" v-if="this.zhuangtai == false"><span>即POS</span><router-link class="set-up" :to="{path: '/setParameters',query:{id:this.items,userId:this.id}}">设置参数</router-link></li>
					<li class="FenRun-three" v-else-if="this.zhuangtai != false"><span>即POS</span><router-link class="set-up" :to="{path: '/SetParametersPreviewT',query:{id:this.items,userId:this.id}}">查看参数</router-link></li>
				</ul>
				<ul v-if="this.datas === 14">
				    <li class="FenRun-three" v-if="this.zhuangtai == false"><span>即付宝智享版</span><router-link class="set-up" :to="{path: '/mentallyVersion',query:{id:this.datas,userId:this.id}}">设置参数</router-link></li>
					<li class="FenRun-three" v-else-if="this.zhuangtai != false"><span>即付宝智享版</span><router-link class="set-up" :to="{path: '/MentallyVersionPreviewT',query:{id:this.datas,userId:this.id}}">查看参数</router-link></li>
				</ul>
			</div>
			
		</div>
	</div>
</template>
<script>
import { Toast } from 'mint-ui';
import axios from 'axios'
export default {
	name: 'partnerIndexDetails',
	data () {
		return {
			keywork: '',
			state: '',
			zhuangtai: '',
			zoxitatus: '',
			deduction: '',
			matReturn: '',
			id: this.$route.query.id,
			userName: this.$route.query.userName,
			mobile: '',
			totalterminalcount: '',
			terminalcount: '',
			area: '',
			time: '',
			lists: '',
			items: '',
			datas: '',
		}
	},
	components:{
		
	},
	methods: {
		getData(){
            var formData = new FormData();
            formData.append("searchStr", this.userName);
            axios({
                url: '/api/partner/partnerList_',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
					this.mobile = respanse.data.data.downpal[0].mobile;
					this.totalterminalcount = respanse.data.data.downpal[0].totalterminalcount;
					this.terminalcount = respanse.data.data.downpal[0].terminalcount;
					this.area = respanse.data.data.downpal[0].area;
					this.time = respanse.data.data.downpal[0].time;
                }else{
                    Toast(respanse.data.message);
                }
            })
		},
		parameterSelect(){
			var formData = new FormData();
            formData.append("userId", this.id);
            axios({
                url: '/api/partner/parameterSelect',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
					this.zhuangtai = respanse.data.data.jposstatus;
					this.state = respanse.data.data.zxstatus;
					this.zoxitatus = respanse.data.data.zoxitatus;
					this.deduction = respanse.data.data.dikstatus;
					this.matReturn = respanse.data.data.jihstatus;
                }else{
                    Toast(respanse.data.message);
                }
            })
		},
		setting(){
			axios.get('/api/partner/posTypeList').then(respanse=>{
                if(respanse.data.code == 0){
					this.list = respanse.data.data;
					this.lists = respanse.data.data[0].id;
					this.items = respanse.data.data[1].id;
					this.datas = respanse.data.data[2].id;
                }else{
                    this.$router.push({path: '/login'});
                }
            })
		}
	},
	mounted () {
		this.getData();
		this.parameterSelect();
		this.setting();

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
		height: 224px;
		background: #FFFFFF;
		border-radius: 5px;
	}
	.merchantsList > ul > li > div{
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
		color: #575757;
		display: block;
	}
	.merchantsList > ul > li .one .one-right{
		float: right;
		font-size: 15px;
		color: #FF6A48;
		display: block;
	}
	.merchantsList > ul > li .two{
		border-bottom: 1px solid #EBEBEB;
	}
	.merchantsList > ul > li .two .two-left{
		float: left;
		font-size: 14px;
		color: #575757;
		display: block;
	}
	.merchantsList > ul > li .two .two-right{
		float: right;
		font-size: 15px;
		color: #FF6A48;
		display: block;
	}
	.merchantsList > ul > li .three .three-left{
		float: left;
		font-size: 14px;
		color: #575757;
		display: block;
	}
	.merchantsList > ul > li .three .three-right{
		float: right;
		font-size: 15px;
		color: #FF6A48;
		display: block;
	}
	.deduction{
		width: 95%;
		margin: 10px auto;
		height: 55px;
		line-height: 55px;
		background: #FFFFFF;
		border-radius: 5px;
	}
	.deduction > span{
		float: left;
		padding-left: 10px;
		font-size: 14px;
		color: #222222;
		font-weight:bold;
	}
	.deduction > a{
		float: right;
		padding-right: 10px;
		font-size: 14px;
		color: #FF6A48;
	}
	.FenRun{
		width: 95%;
		margin: 10px auto;
		min-height: 153px;
		background: #FFFFFF;
		border-radius: 5px;
	}
	.FenRun-one{
		width: 95%;
		text-align: left;
		margin: 0px auto;
		height: 51px;
		line-height: 51px;
		font-size: 14px;
		color: #222222;
		font-weight: bold;
	}
	.FenRun > ul > li{
		width: 95%;
		margin: 0px auto;
		height: 51px;
		line-height: 51px;
	}
	.FenRun > ul .FenRun-one{
		font-size: 14px;
		color: #222222;
		text-align: left;
		font-weight:bold;
	}
	.FenRun > ul .FenRun-two > span{
        float: left;
		font-size: 14px;
		color: #575757;
	}
	.FenRun > ul .FenRun-two .set-up{
        float: right;
		font-size: 14px;
		color: #FF6A48;
	}
	.FenRun > ul .FenRun-three > span{
        float: left;
		font-size: 14px;
		color: #575757;
	}
	.FenRun > ul .FenRun-three .set-up{
        float: right;
		font-size: 14px;
		color: #FF6A48;
	}
</style>
