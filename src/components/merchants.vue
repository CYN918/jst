<template>
    <div class="contain">
		<div class="head">
			<router-link to="/" class="back"><i class="icon-back"></i></router-link>
			<span class="title">我的商户</span>
			<!-- <router-link to="/addMerchants" class="head-link">添加商户</router-link> -->
		</div>
		<div class="main my-partner">
		    <mt-field style="margin-top:0.1rem;" placeholder="请输入姓名/手机号" v-model="keywork">
				<mt-button size="small" type="default" class="ve-send-code" @click="gosearch">搜索</mt-button>
			</mt-field>
			<div class="total">
			    <p>商户总数：<i>{{count}}</i>（个）</p>
			</div>
			<div class="togglebox">
			    <ul v-if="this.recordList.length != 0" v-infinite-scroll="loadMore"
					infinite-scroll-disabled="isMoreLoading"
					:infinite-scroll-immediate-check="true"
					infinite-scroll-distance="8">
				    <li v-for="(item,index) in recordList">
					    <input :id="'toggle_' + index" type="radio" name="toggle" class="top"/>
						<label class="teshu" :for="'toggle_' + index"><span class="name" v-if="index < 9">0{{index+1}}&nbsp;&nbsp;{{item.sequence}}</span><span class="name" v-else>{{index+1}}{{item.name}}</span></label>
						<section :id="'content_' + index" class="box">
							<ul>
								<li class="one"><span class="one-left">开通时间：<b>{{item.activationTime}}</b></span><span class="one-right">状态：<b v-if="item.isActivation == 1">已激活</b><b v-if="item.isActivation == 0">未激活</b></span></li>
								<li class="two"><span class="two-left">用户名：<b>{{item.userNames}}</b></span><span class="two-right">手机号：<b>{{item.mobile}}</b></span></li>
								<li class="three"><span class="three-left">累计交易金额：<b>{{item.sumamount}}</b></span><span class="three-right">所在区域：<b>{{item.area}}</b></span></li>
								<li class="three">
									<span class="three-left">物流公司：
										<b v-if="item.expCode == 'HTKY'">百世快递</b>
										<b v-if="item.expCode == 'ZTO'">中通快递</b>
										<b v-if="item.expCode == 'STO'">申通快递</b>
										<b v-if="item.expCode == 'YTO'">圆通快递</b>
										<b v-if="item.expCode == 'YD'">韵达快递</b>
										<b v-if="item.expCode == 'YZPY'">邮政快递包裹</b>
										<b v-if="item.expCode == 'EMS'">EMS</b>
										<b v-if="item.expCode == 'HHTT'">天天快递</b>
									</span>
									<span class="three-right">物流单号：<b><router-link :to="{path: '/logistics',query:{expCode:item.expCode,trackingNum:item.trackingNum}}">{{item.trackingNum}}</router-link></b></span>
								</li>
							</ul>
						</section>
					</li>
				</ul>
				<ul v-else>
					<img src="../assets/img/zanwushuju.png"/>
				    <p>暂无数据</p>
				</ul>
				<!--显示加载中转菊花-->
				<div class="loading-box tc" v-if="isLoading">
					<mt-spinner type="snake" class="loading-more"></mt-spinner>
					<span class="loading-more-txt">加载中...</span>
				</div>

				<div class="no-more" v-if="noMore">没有更多了~</div>
			</div>
			
			
		</div>
	</div>

	
</template>
<script>
import { InfiniteScroll } from 'mint-ui';
import { Spinner } from 'mint-ui';
import { Toast } from 'mint-ui';
import axios from 'axios'
export default {
	name: 'merchants',
	data () {
		return {
			keywork: '',
			recordList: [],
			sumPartner: '',
			reserve: '',
			activationNum: '',
			count: '',
			page: 1,
			pageSize: 8,
			isLoading: false, // 加载中转菊花
            isMoreLoading: true, // 加载更多中
			noMore: false, // 是否还有更多
		}
	},
	components:{
		
	},
	methods: {
		gosearch() {
			this.getData();
		},
		getData(type){
			var formData = new FormData();
			formData.append("searchStr", this.keywork);
			formData.append("pageNum", this.page);
			formData.append("pageSize", this.pageSize);
			axios({
                url: '/api/home/recordList_',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
					
					this.count = respanse.data.data.total;
					if (type === 'loadMore') {
                        this.recordList = this.recordList.concat(respanse.data.data.list)
                    } else {
                        this.recordList =  respanse.data.data.list;
                    }
				    this.total = respanse.data.data.total;
                    this.totalPage = Math.ceil(this.total / this.pageSize)
					//console.log('总页数', Math.ceil(this.total / this.pageSize))
					this.page += 1 // 增加分页
					this.isMoreLoading = true // 设置加载更多中
					this.isLoading = true // 加载中
					this.noMore = false
					//console.log(this.page)
					if (this.page > this.totalPage) { // 超过了分页
						this.noMore = false // 显示没有更多了
						this.isLoading = false // 关闭加载中
						return false
					}
                }else{
                    Toast(respanse.data.message);
				}
				this.isLoading = false
                this.isMoreLoading = false
            })
		},
		loadMore() {
            // 做个缓冲
            setTimeout(() => {
                this.getData('loadMore')
            }, 100)
        },
		// btn(id){
		// 	var formData = new FormData();
        //     formData.append("id", id);
        //     axios({
        //         url: '/api/partner/partnerDetail_',
        //         method: 'post',
        //         data: formData,
        //     }).then(respanse=>{
        //         if(respanse.data.code == 0){
        //             this.sumPartner = respanse.data.data.sumPartner;
		// 			this.reserve = respanse.data.data.reserve;
		// 			this.activationNum = respanse.data.data.activationNum;
        //         }else{
        //             Toast(respanse.data.message);
        //         }
        //     })
		// },
		
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
    .togglebox > ul > li{
		margin-top: 15px;
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
	.togglebox {
		width: 95%;
		height: 545px;
		margin: 0px auto;
		transform: translateZ(0);	
		overflow-y: scroll;
	}
	.togglebox > ul > img{
		margin-top: 1rem;
	}
	input[type="radio"] {
		position: absolute;
		opacity: 0;
	}
	label {
		position: relative;
		display: block;
		height: 55px;
		line-height: 55px;
		padding: 0 20px;
		font-size: 14px;
		color: #222222;
		cursor: pointer;
		text-align: left;
		background: #fff;
	}
	.teshu > b{
		color: #439CFF;
	}
	.teshu {
		border: 0;
	}
	.teshu:after {
		content: '\f077';
		position: absolute;
		top: 0px;
		right: 20px;
		font-family: fontawesome;
		transform: rotate(180deg);
		transition: 0.3s transform;
	}
	section {
		height: 0;
		transition: 0.3s all;
		overflow: hidden;
	}
	.top:checked ~ .teshu:after{
		transform: rotate(0deg);
	}
	.top:checked ~ .box{
		height: 164px;
		background: #fff;
	}
	.box > ul > li{
		width: 95%;
		margin: 0 auto;
		height: 41px;
		line-height: 40px;
	}
	.box > ul .one{
		border-top: 1px solid #EBEBEB;
	}
	.box > ul .one .one-left{
		float: left;
		display: block;
		font-size: 12px;
		color: #4D4D4D;
	}
	.box > ul .one .one-left > b{
		color: #FF6A48;
	}
	.box > ul .one .one-right{
		float: right;
		font-size: 12px;
		color: #4D4D4D;
	}
	.box > ul .one .one-right > b{
		color: #FF6A48;
	}
	
	.box > ul .two .two-left{
		float: left;
		display: block;
		font-size: 12px;
		color: #4D4D4D;
	}
	.box > ul .two .two-left > b{
		color: #FF6A48;
	}
	.box > ul .two .two-right{
		float: right;
		font-size: 12px;
		color: #4D4D4D;
	}
	.box > ul .two .two-right > b{
		color: #FF6A48;
	}
	.box > ul .three .three-left{
		float: left;
		display: block;
		font-size: 12px;
		color: #4D4D4D;
	}
	.box > ul .three .three-right{
		float: right;
		font-size: 12px;
		color: #4D4D4D;
	}
	.box > ul .three .three-left > b{
		color: #F29888;
	}
	.box > ul .three .three-right > b{
		color: #636363;
	}
	.line{
		width: 100%;
		height: 15px;
	}
	.Img{
		width: 42px;
		height: 42px;
		float: left;
		position: relative;
		top: 6px;
	}
	.name{
		color: #222222;
		font-size: 14px;
	}
	.state{
		color: #FF6A48;
		font-size: 13px;
		float: right;
		padding-right: 20px;
	}
	.states{
		color: #666666;
		font-size: 13px;
		float: right;
		padding-right: 20px;
	}
</style>
