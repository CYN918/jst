<template>
    <div class="contain">
        <div class="head">
            <router-link to="/terminal" class="back"><i class="icon-back"></i></router-link>
            <span class="title">终端管理</span>
        </div>
        <div class="main generalize-dredge">
            <mt-navbar v-model="selected">
				<mt-tab-item id="1" v-if="this.zuxiang == 8"><span>尊享版Plus</span></mt-tab-item>
				<mt-tab-item id="2" v-if="this.jipos == 11"><span @click="jiPos()">即POS</span></mt-tab-item>
				<mt-tab-item id="3" v-if="this.zhixiang == 14"><span @click="jifubao()">即付宝智享版</span></mt-tab-item>
			</mt-navbar>
			<!-- tab-container -->
			<mt-tab-container v-model="selected">
				<mt-tab-container-item id="1">
				    <div class="box">
					    <div class="search">
							<div class="search-top">
								<div class="one"><label>起始编号：</label><input type="text" placeholder="请输入起始编号" v-model="beginNum"/></div>
								<div class="two"><label>结束编号：</label><input type="text" placeholder="请输入起始编号" v-model="endNum"/><button type="button" @click="search()">查询</button></div>
							</div>
							<div class="search-bottom">查询结果：<i>共{{number}}台 可下拨{{number}}台</i></div>
						</div>
						<div class="list-news">
						    <ul class="list-news-one">
							    <li><div class="serial">机具编号</div><div class="serial">商户费率</div><div class="generations" @click="changeState">全选</div></li>
							</ul>
							<ul class="list-news-two" v-if="this.lists == null">
							    <img src="../assets/img/zanwushuju.png"/>
								<p>暂无数据</p>
							</ul>
							<ul class="list-news-two" v-else
							    v-infinite-scroll="loadMore1"
								infinite-scroll-disabled="isMoreLoading"
								:infinite-scroll-immediate-check="true"
								infinite-scroll-distance="10">
							    <li v-for="item in lists">
									<div class="checkbox-box" v-if="item.swiperate == null">
										<div class="number-ju">{{item.sequence}}</div>
										<div class="number-ju" style="color: #13D1A5;">{{item.swiperate}}</div>
										<input class="checkItem" type="checkbox" v-model="checkModel" :value="item.sequence"/>
									</div>
									<div class="checkbox-box" v-else>
										<div class="number-ju">{{item.sequence}}</div>
										<div class="number-ju" style="color: #13D1A5;">{{item.swiperate}}</div>
									</div>
								</li>
							</ul>
							<!--显示加载中转菊花-->
							<div class="loading-box tc" v-if="isLoading">
								<mt-spinner type="snake" class="loading-more"></mt-spinner>
								<span class="loading-more-txt">加载中...</span>
							</div>

							<div class="no-more" v-if="noMore">没有更多了~</div>
							<p v-if="this.lists != null">已选择{{this.checkModel.length}}台机具</p>
						</div>
						<div class="operation">
						    <button type="button" class="setUp" @click="setRate()">设置商户费率</button>
							<button type="button" class="immediately" @click="getSure()">选择代理商</button>
						</div>
					</div>

				</mt-tab-container-item>
				<mt-tab-container-item id="2">
					<div class="box">
					    <div class="search">
							<div class="search-top">
								<div class="one"><label>起始编号：</label><input type="text" placeholder="请输入起始编号" v-model="beginNum1"/></div>
								<div class="two"><label>结束编号：</label><input type="text" placeholder="请输入起始编号" v-model="endNum1"/><button type="button" @click="search1()">查询</button></div>
							</div>
							<div class="search-bottom">查询结果：<i>共{{number1}}台 可下拨{{number1}}台</i></div>
						</div>
						<div class="list-news">
						    <ul class="list-news-one">
							    <li><div class="serial">机具编号</div><div class="serial">商户费率</div><div class="generations" @click="changeState1">全选</div></li>
							</ul>
							<ul class="list-news-two" v-if="this.datas == null">
							    <img src="../assets/img/zanwushuju.png"/>
								<p>暂无数据</p>
							</ul>
							<ul class="list-news-two" v-else
							    v-infinite-scroll="loadMore"
								infinite-scroll-disabled="isMoreLoading"
								:infinite-scroll-immediate-check="true"
								infinite-scroll-distance="10">
							    <li v-for="item in datas">
									<div class="checkbox-box" v-if="item.swiperate == null">
										<div class="number-ju">{{item.sequence}}</div>
										<div class="number-ju" style="color: #13D1A5;">{{item.swiperate}}</div>
										<input class="checkItem1"  type="checkbox" v-model="checkModel1" :value="item.sequence"/>
									</div>
									<div class="checkbox-box" v-else>
										<div class="number-ju">{{item.sequence}}</div>
										<div class="number-ju" style="color: #13D1A5;">{{item.swiperate}}</div>
									</div>
								</li>
							</ul>
							<!--显示加载中转菊花-->
							<div class="loading-box tc" v-if="isLoading">
								<mt-spinner type="snake" class="loading-more"></mt-spinner>
								<span class="loading-more-txt">加载中...</span>
							</div>

							<div class="no-more" v-if="noMore">没有更多了~</div>
							<p v-if="this.datas != null">已选择{{this.checkModel1.length}}台机具</p>
						</div>
						<div class="operation">
						    <button type="button" class="setUp" @click="setRate1()">设置商户费率</button>
							<button type="button" class="immediately" @click="getSure1()">选择代理商</button>
						</div>
					</div>
				</mt-tab-container-item>
				<mt-tab-container-item id="3">
					<div class="box">
					    <div class="search">
							<div class="search-top">
								<div class="one"><label>起始编号：</label><input type="text" placeholder="请输入起始编号" v-model="beginNum2"/></div>
								<div class="two"><label>结束编号：</label><input type="text" placeholder="请输入起始编号" v-model="endNum2"/><button type="button" @click="search2()">查询</button></div>
							</div>
							<div class="search-bottom">查询结果：<i>共{{number2}}台 可下拨{{number2}}台</i></div>
						</div>
						<div class="list-news">
						    <ul class="list-news-one">
							    <li><div class="serial">机具编号</div><div class="serial">商户费率</div><div class="generations" @click="changeState2">全选</div></li>
							</ul>
							<ul class="list-news-two" v-if="this.items == null">
							    <img src="../assets/img/zanwushuju.png"/>
								<p>暂无数据</p>
							</ul>
							<ul class="list-news-two" v-else
							    v-infinite-scroll="loadMore2"
								infinite-scroll-disabled="isMoreLoading"
								:infinite-scroll-immediate-check="true"
								infinite-scroll-distance="10">
							    <li v-for="item in items">
									<div class="checkbox-box" v-if="item.swiperate == null">
										<div class="number-ju">{{item.sequence}}</div>
										<div class="number-ju" style="color: #13D1A5;">{{item.swiperate}}</div>
										<input class="checkItem2" type="checkbox" v-model="checkModel2" :value="item.sequence"/>
									</div>
									<div class="checkbox-box" v-else>
										<div class="number-ju">{{item.sequence}}</div>
										<div class="number-ju" style="color: #13D1A5;">{{item.swiperate}}</div>
									</div>
								</li>
							</ul>
							<!--显示加载中转菊花-->
							<div class="loading-box tc" v-if="isLoading">
								<mt-spinner type="snake" class="loading-more"></mt-spinner>
								<span class="loading-more-txt">加载中...</span>
							</div>

							<div class="no-more" v-if="noMore">没有更多了~</div>
							<p v-if="this.items != null">已选择{{this.checkModel2.length}}台机具</p>
						</div>
						<div class="operation">
						    <button type="button" class="setUp" @click="setRate2()">设置商户费率</button>
							<button type="button" class="immediately" @click="getSure2()">选择代理商</button>
						</div>
					</div>
				</mt-tab-container-item>
				<mt-tab-container-item id="4">

				</mt-tab-container-item>
			</mt-tab-container>
			<mt-popup
				v-model="popupVisible"
				position="bottom">
				<div class="model-play">
					<div class="model-play-top">
						<span>选择伙伴</span>
						<button @click="cancel">取消</button>
					</div>
					<mt-field placeholder="请输入姓名或手机号" v-model="keywork">
						<mt-button size="small" type="default" class="ve-send-code" @click="gosearch">搜索</mt-button>
					</mt-field>
					<ul class="model-play-bottom">
						<li v-for="item in childUser">
							<span class="name">{{item.name}}</span>
							<span class="phone">{{item.mobile}}</span>
							<router-link :to="{path: '/mentallyVersionPreviewT',query:{userId:item.id,id:8}}" v-if="item.status == 1">查看分润参数</router-link>
							<span v-else-if="item.status == 0">未设置分润参数</span>
							<input v-if="item.status == 1" type="checkbox" class="checkItem3" v-model="checkModel3" :value="item"/>
						</li>
					</ul>
					<div class="event">
						<button class="zjxiabo" @click="zjxiabo">直接下拨</button>
						<button class="blxiabo" @click="blxiabo">保理下拨</button>
					</div>
				</div>
			</mt-popup>
			<mt-popup
				v-model="popupVisible1"
				position="bottom">
				<div class="model-play">
					<div class="model-play-top">
						<span>选择伙伴</span>
						<button @click="cancel1">取消</button>
					</div>
					<mt-field placeholder="请输入姓名或手机号" v-model="keywork1">
						<mt-button size="small" type="default" class="ve-send-code" @click="gosearch1">搜索</mt-button>
					</mt-field>
					<ul class="model-play-bottom">
						<li v-for="item in childUser">
							<span class="name">{{item.name}}</span>
							<span class="phone">{{item.mobile}}</span>
							<router-link :to="{path: '/setParametersPreviewT',query:{userId:item.id,id:11}}" v-if="item.status == 1">查看分润参数</router-link>
							<span v-else-if="item.status == 0">未设置分润参数</span>
							<input v-if="item.status == 1" type="checkbox" class="checkItem3" v-model="checkModel4" :value="item"/>
						</li>
					</ul>
					<div class="event">
						<button class="zjxiabo" @click="zjxiabo1">直接下拨</button>
						<button class="blxiabo" @click="blxiabo1">保理下拨</button>
					</div>
				</div>
			</mt-popup>
			<mt-popup
				v-model="popupVisible2"
				position="bottom">
				<div class="model-play">
					<div class="model-play-top">
						<span>选择伙伴</span>
						<button @click="cancel2">取消</button>
					</div>
					<mt-field placeholder="请输入姓名或手机号" v-model="keywork2">
						<mt-button size="small" type="default" class="ve-send-code" @click="gosearch2">搜索</mt-button>
					</mt-field>
					<ul class="model-play-bottom">
						<li v-for="item in childUser">
							<span class="name">{{item.name}}</span>
							<span class="phone">{{item.mobile}}</span>
							<router-link :to="{path: '/mentallyVersionPreviewT',query:{userId:item.id,id:14}}" v-if="item.status == 1">查看分润参数</router-link>
							<span v-else-if="item.status == 0">未设置分润参数</span>
							<input v-if="item.status == 1" type="checkbox" class="checkItem3" v-model="checkModel5" :value="item"/>
						</li>
					</ul>
					<div class="event">
						<button class="zjxiabo" @click="zjxiabo2">直接下拨</button>
						<button class="blxiabo" @click="blxiabo2">保理下拨</button>
					</div>
				</div>
			</mt-popup>
		</div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { InfiniteScroll } from 'mint-ui';
import { Spinner } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import localStore from '@/localstorage.js';
import axios from 'axios';
export default {
	name: 'terminalManagement',
	data () {
		return {
			keywork: '',
			keywork1: '',
			keywork2: '',
			selected: '1',
			zuxiang: '',
			jipos: '',
			zhixiang: '',
			list: [],
			lists: [],
			total: 0,
			page: 1,
			pages: 1,
			lastpage: 1,
			data: '',
			datas: [],
			items: [],
			isLoading: false, // 加载中转菊花
      isMoreLoading: true, // 加载更多中
			noMore: false, // 是否还有更多
			totalPage: 1, // 总分页数
			pageSize: 15,
			beginNum: '',
			endNum: '',
			beginNum1: '',
			endNum1: '',
			beginNum2: '',
			endNum2: '',
			number: '0',
			number1: '0',
			number2: '0',
			checkModel: [],
			checkModel1: [],
			checkModel2: [],
			checkModel3: [],
			checkModel4: [],
			checkModel5: [],
			storeData: [],
			popupVisible: false,
			popupVisible1: false,
			popupVisible2: false,
			childUser: [],
			name: [],
		}
	},
	components:{

	},
	watch: {
        storeData: {
			handler: function (storeData) {
				localStore.save(storeData)
			},
		deep: true
		}
	},
	methods: {
		gosearch(){
      this.setData();
		},
		gosearch1(){
      this.setData1();
		},
		gosearch2(){
      this.setData2();
		},
		cancel(){
      this.popupVisible = false;
		},
		cancel1(){
      this.popupVisible1 = false;
		},
		cancel2(){
      this.popupVisible2 = false;
		},
		zjxiabo(){
			if(this.checkModel3.length == 0){
				Toast({
					message: '请选择代理商',
					duration: 2000,
					className: 'teshu'
				});
				return false
			}
			if(this.checkModel3.length > 1){
				Toast({
					message: '只能选择一位代理商',
					duration: 2000,
					className: 'teshu'
				});
				return false
			}
			MessageBox.confirm('', {
           message: '是否直接下拨', 
           confirmButtonText: '确定', 
           cancelButtonText: '取消' 
        }).then(action => { 
				if (action == 'confirm') {     //确认的回调
          var formData = new FormData();
					formData.append("agentId", this.checkModel3[0].id);
					formData.append("type", 8);
					formData.append("sequences", this.checkModel);
					formData.append("total", this.checkModel.length);
					formData.append("param1", 0)
					axios({
						url: '/api/user/allocate',
						method: 'post',
						data: formData,
					}).then(respanse=>{
						if(respanse.data.code == 0){
							Toast('下拨成功')
							this.$router.push({path: '/transfer'});
						}else{
							this.data = respanse.data.data;
						}
					})
             	}
            }).catch(err => { 
             	if (err == 'cancel') {     //取消的回调

             	} 
            });

		},
		blxiabo(){
			if(this.checkModel3.length == 0){
				Toast({
					message: '请选择代理商',
					duration: 2000,
					className: 'teshu'
				});
				return false
			}
			if(this.checkModel3.length > 1){
				Toast({
					message: '只能选择一位代理商',
					duration: 2000,
					className: 'teshu'
				});
				return false
			}
			var storeData = this.checkModel;
			localStore.save(storeData);
			this.$router.push({path: '/reimbursement',query:{total:this.checkModel.length,id:this.checkModel3[0].id,type:8,name:this.checkModel3[0].name}});
		},
		zjxiabo1(){
			if(this.checkModel4.length == 0){
				Toast({
					message: '请选择代理商',
					duration: 2000,
					className: 'teshu'
				});
				return false
			}
			if(this.checkModel4.length > 1){
				Toast({
					message: '只能选择一位代理商',
					duration: 2000,
					className: 'teshu'
				});
				return false
			}
			MessageBox.confirm('', {
         message: '是否直接下拨', 
         confirmButtonText: '确定', 
         cancelButtonText: '取消' 
      }).then(action => { 
          if (action == 'confirm') {     //确认的回调
          var formData = new FormData();
					formData.append("agentId", this.checkModel4[0].id);
					formData.append("type", 11);
					formData.append("sequences", this.checkModel1);
					formData.append("total", this.checkModel1.length);
					formData.append("param1", 0)
					axios({
						url: '/api/user/allocate',
						method: 'post',
						data: formData,
					}).then(respanse=>{
						if(respanse.data.code == 0){
							Toast('下拨成功')
							this.$router.push({path: '/transfer'});
						}else{
							this.data = respanse.data.data;
						}
					})
             	}
            }).catch(err => { 
             	if (err == 'cancel') {     //取消的回调

             	} 
            });

		},
		blxiabo1(){
			if(this.checkModel4.length == 0){
				Toast({
					message: '请选择代理商',
					duration: 2000,
					className: 'teshu'
				});
				return false
			}
			if(this.checkModel4.length > 1){
				Toast({
					message: '只能选择一位代理商',
					duration: 2000,
					className: 'teshu'
				});
				return false
			}
			var storeData = this.checkModel1;
			localStore.save(storeData);
			this.$router.push({path: '/reimbursement',query:{total:this.checkModel1.length,id:this.checkModel4[0].id,type:11,name:this.checkModel4[0].name}});
		},
		zjxiabo2(){
			if(this.checkModel5.length == 0){
				Toast({
					message: '请选择代理商',
					duration: 2000,
					className: 'teshu'
				});
				return false
			}
			if(this.checkModel5.length > 1){
				Toast({
					message: '只能选择一位代理商',
					duration: 2000,
					className: 'teshu'
				});
				return false
			}
			MessageBox.confirm('', {
         message: '是否直接下拨', 
         confirmButtonText: '确定', 
         cancelButtonText: '取消' 
      }).then(action => { 
          if (action == 'confirm') {     //确认的回调
          var formData = new FormData();
					formData.append("agentId", this.checkModel5[0].id);
					formData.append("type", 14);
					formData.append("sequences", this.checkModel2);
					formData.append("total", this.checkModel2.length);
					formData.append("param1", 0)
					axios({
						url: '/api/user/allocate',
						method: 'post',
						data: formData,
					}).then(respanse=>{
						if(respanse.data.code == 0){
							Toast('下拨成功')
							this.$router.push({path: '/transfer'});
						}else{
							this.data = respanse.data.data;
						}
					})
             	}
            }).catch(err => { 
             	if (err == 'cancel') {     //取消的回调

             	} 
            });

		},
		blxiabo2(){
			if(this.checkModel5.length == 0){
				Toast({
					message: '请选择代理商',
					duration: 2000,
					className: 'teshu'
				});
				return false
			}
			if(this.checkModel5.length > 1){
				Toast({
					message: '只能选择一位代理商',
					duration: 2000,
					className: 'teshu'
				});
				return false
			}
			var storeData = this.checkModel2;
			localStore.save(storeData);
			this.$router.push({path: '/reimbursement',query:{total:this.checkModel2.length,id:this.checkModel5[0].id,type:14,name:this.checkModel5[0].name}});
		},
		search(){
			if(!this.beginNum){
				Toast({
					message: '请输入起始编号',
					duration: 2000,
				});
				return false
			}
			if(!this.endNum){
				Toast({
					message: '请输入结束编号',
					duration: 2000,
				});
				return false
			}
      var formData = new FormData();
      formData.append("type", 8);
			formData.append("pageNum", 1);
			formData.append("pageSize", 100000);
			formData.append("beginNum", this.beginNum);
			formData.append("endNum", this.endNum);
			this.checkModel = [];
			this.checkModel.length = 0;
            axios({
                url: '/api/user/transferManage',
                method: 'post',
                data: formData,
            }).then(respanse=>{
        if(respanse.data.code == 0){
					this.lists = respanse.data.data.list;
					this.number = respanse.data.data.total;
					this.noMore = false;
                }else{
                  Toast(respanse.data.message);
                  this.lists = respanse.data.data;
				}
            })
		},
		search1(){
			if(!this.beginNum1){
				Toast({
					message: '请输入起始编号',
					duration: 2000,
				});
				return false
			}
			if(!this.endNum1){
				Toast({
					message: '请输入结束编号',
					duration: 2000,
				});
				return false
			}
      var formData = new FormData();
      formData.append("type", 11);
			formData.append("pageNum", 1);
			formData.append("pageSize", 100000);
			formData.append("beginNum", this.beginNum1);
			formData.append("endNum", this.endNum1);
			this.checkModel1 = [];
			this.checkModel1.length = 0;
            axios({
                url: '/api/user/transferManage',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
					this.datas = respanse.data.data.list;
					this.number1 = respanse.data.data.total;
					this.noMore = false;
                }else{
                  Toast(respanse.data.message);
                    this.datas = respanse.data.data;
				}
            })
		},
		search2(){
			if(!this.beginNum2){
				Toast({
					message: '请输入起始编号',
					duration: 2000,
				});
				return false
			}
			if(!this.endNum2){
				Toast({
					message: '请输入结束编号',
					duration: 2000,
				});
				return false
			}
      var formData = new FormData();
      formData.append("type", 14);
			formData.append("pageNum", 1);
			formData.append("pageSize", 100000);
			formData.append("beginNum", this.beginNum2);
			formData.append("endNum", this.endNum2);
			this.checkModel2 = [];
			this.checkModel2.length = 0;
            axios({
                url: '/api/user/transferManage',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
					this.items = respanse.data.data.list;
					this.number2 = respanse.data.data.total;
					this.noMore = false;
                }else{
                  Toast(respanse.data.message);
                    this.items = respanse.data.data;
				}
            })
		},
		changeState(){
			this.storeData = [];
			this.checkModel.length = 0;
			if(this.checked){
				this.checkModel = [];
			}else{
				this.lists.forEach((item) => {
					if(item.swiperate == null){
                        if(this.checkModel.indexOf(item.sequence) == -1){
							this.checkModel.push(item.sequence)
							var storeData = this.checkModel;
							localStore.save(storeData);
						}
					}
				})
			}
		},
		changeState1(){
			this.storeData = [];
			this.checkModel1.length = 0;
			if(this.checked){
				this.checkModel1 = [];
			}else{
				this.datas.forEach((item) => {
					if(item.swiperate == null){
                        if(this.checkModel1.indexOf(item.swiperate) == -1){
							this.checkModel1.push(item.sequence)
							var storeData = this.checkModel1;
							localStore.save(storeData);
						}
					}
				})
			}
		},
		changeState2(){
			this.storeData = [];
			this.checkModel2.length = 0;
			if(this.checked){
				this.checkModel2 = [];
			}else{
				this.items.forEach((item) => {
					if(item.swiperate == null){
                        if(this.checkModel2.indexOf(item.sequence) == -1){
							this.checkModel2.push(item.sequence)
							var storeData = this.checkModel2;
							localStore.save(storeData);
						}
					}
				})
			}
        },
		setRate(){
			if(this.checkModel.length == 0){
				Toast('请勾选机具');
				return false
			}else{
                this.$router.push({path: '/rate'});
			}
		},
		setRate1(){
			if(this.checkModel1.length == 0){
				Toast('请勾选机具');
				return false
			}else{
                this.$router.push({path: '/rate'});
			}

		},
		setRate2(){
			if(this.checkModel2.length == 0){
				Toast('请勾选机具');
				return false
			}else{
                this.$router.push({path: '/rate'});
			}

		},
		getSure(){
			if(this.checkModel.length == 0){
				Toast('请勾选机具');
				return false
			}
			this.popupVisible = true;
            this.setData();
		},
		getSure1(){
			if(this.checkModel1.length == 0){
				Toast('请勾选机具');
				return false
			}
			this.popupVisible1 = true;
			this.setData1();
		},
		getSure2(){
			if(this.checkModel2.length == 0){
				Toast('请勾选机具');
				return false
			}
			this.popupVisible2 = true;
			this.setData2();
		},
		getData(){
			axios.get('/api/partner/posTypeList').then(respanse=>{
        if(respanse.data.code == 0){
					this.list = respanse.data.data;
					this.zuxiang = respanse.data.data[0].id;
					this.jipos = respanse.data.data[1].id;
					this.zhixiang = respanse.data.data[2].id;
                }else{
                    Toast(respanse.data.message);
                }
            })
		},
		zunxiang(type){
			var formData = new FormData();
      formData.append("type", 8);
			formData.append("pageNum", this.page);
			formData.append("pageSize", this.pageSize);
			this.isLoading = true
            axios({
                url: '/api/user/transferManage',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
					if (type === 'loadMore1') {
                        this.lists = this.lists.concat(respanse.data.data.list)
                    } else {
                        this.lists = respanse.data.data.list
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
						this.noMore = true // 显示没有更多了
						this.isLoading = false // 关闭加载中
						return false
					}

                }else{
                    this.data = respanse.data.data;
				}
				this.isLoading = false
                this.isMoreLoading = false
            })
		},
		loadMore1 () { // 加载更多
            // 做个缓冲
            setTimeout(() => {
                this.zunxiang('loadMore1')
            }, 100)
        },
		loadMore() {
            // 做个缓冲
            setTimeout(() => {
                this.jiPos('loadMore')
            }, 100)
        },
		jiPos(type){
			var formData = new FormData();
            formData.append("type", 11);
			formData.append("pageNum", this.pages);
			formData.append("pageSize", this.pageSize);
			this.isLoading = true
            axios({
                url: '/api/user/transferManage',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
					if (type === 'loadMore') {
                        this.datas = this.datas.concat(respanse.data.data.list)
                    } else {
                        this.datas = respanse.data.data.list
                    }
					this.total = respanse.data.data.total;
                    this.totalPage = Math.ceil(this.total / this.pageSize)
					//console.log('总页数', Math.ceil(this.total / this.pageSize))
					this.pages += 1 // 增加分页
					this.isMoreLoading = true // 设置加载更多中
					this.isLoading = true // 加载中
					this.noMore = false
					//console.log(this.pages)
					if (this.pages > this.totalPage) { // 超过了分页
						this.noMore = true // 显示没有更多了
						this.isLoading = false // 关闭加载中
						return false
					}
                }else{
					this.data = respanse.data.data;

				}
				this.isLoading = false
                this.isMoreLoading = false

            })
		},
		loadMore2() {
            // 做个缓冲
            setTimeout(() => {
                this.jifubao('loadMore2')
            }, 100)
        },
		jifubao(type){
			var formData = new FormData();
            formData.append("type", 14);
			formData.append("pageNum", this.lastpage);
			formData.append("pageSize", this.pageSize);
			this.isLoading = true
            axios({
                url: '/api/user/transferManage',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
					if (type === 'loadMore2') {
                        this.items = this.items.concat(respanse.data.data.list)
                    } else {
                        this.items = respanse.data.data.list
                    }
					this.total = respanse.data.data.total;
                    this.totalPage = Math.ceil(this.total / this.pageSize)
					//console.log('总页数', Math.ceil(this.total / this.pageSize))
					this.lastpage += 1 // 增加分页
					this.isMoreLoading = true // 设置加载更多中
					this.isLoading = true // 加载中
					this.noMore = false
					//console.log(this.lastpage)
					if (this.lastpage > this.totalPage) { // 超过了分页
						this.noMore = true // 显示没有更多了
						this.isLoading = false // 关闭加载中
						return false
					}
                }else{
                    this.data = respanse.data.data;
				}
				this.isLoading = false
                this.isMoreLoading = false
            })
		},
		setData(){
			var formData = new FormData();
			formData.append("search", this.keywork);
			formData.append("type", 8);
            axios({
                url: '/api/user/childUser',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
					this.childUser = respanse.data.data;
                }else{
                    Toast(respanse.data.message);
				}
            })
		},
		setData1(){
			var formData = new FormData();
			formData.append("search", this.keywork1);
			formData.append("type", 11);
            axios({
                url: '/api/user/childUser',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
					this.childUser = respanse.data.data;
                }else{
                    Toast(respanse.data.message);
				}
            })
		},
		setData2(){
			var formData = new FormData();
			formData.append("search", this.keywork2);
			formData.append("type", 14);
            axios({
                url: '/api/user/childUser',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
					this.childUser = respanse.data.data;
                }else{
                    Toast(respanse.data.message);
				}
            })
		}
	},
	mounted () {
		this.getData();
		this.zunxiang();

	}
}
</script>
<style>
    .teshu{
		z-index: 666666 !important;
	}
</style>
<style scoped>
    .contain{
		height:100vh;
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
	.box{
		padding-top: 12px;
		margin-bottom: 1rem;
	}
	.box .search{
		width: 95%;
		margin: 0px auto;
		height: 157px;
		background: #FFFFFF;
	}
	.box .search .search-top{
		width: 95%;
		margin: 0px auto;
		height: 121px;
		border-bottom: 1px solid #EBEBEB;
	}
	.box .search .search-top .one{
		text-align: left;
		position: relative;
		top: 20px;
	}
	.box .search .search-top .two{
		text-align: left;
		position: relative;
		top: 40px;
	}
	.box .search .search-top > div{
		height: 30px;
	}
	.box .search .search-top > div > label{
		color: #222222;
		font-size: 14px;
	}
	.box .search .search-top > div > input{
		width: 160px;
		height: 30px;
		background: #F7F7F7;
		font-size: 14px;
		border: none;
		ouline: none;
		padding-left: 15px;
	}
	.box .search .search-top > div > button{
		width: 68px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		border-radius: 15px;
		background: #FF6A48;
		border: none;
		outline: none;
		color: #FFFFFF;
		font-size: 14px;
		position: relative;
        left: 25px;
	}
	.box .search .search-bottom{
		height: 35px;
		line-height: 35px;
		text-align: left;
		color: #4D4D4D;
		font-size: 12px;
		padding-left: 15px;
	}
	.box .search .search-bottom > i{
		font-style: normal;
	}
	.box .list-news{
		width: 95%;
		height: 100%;
		margin: 10px auto;
		background: #FFFFFF;
		margin-bottom: 1.5rem;
	}
	.box .list-news .list-news-one{
		width: 95%;
		margin: 0px auto;
		height: 37px;
		line-height: 37px;
		border-bottom: 1px solid #EBEBEB;
	}
	.box .list-news .list-news-one > li > div{
		width: 33.33%;
		float: left;
		text-align: center;
	}
	.box .list-news .list-news-one > li .generations{
		color: #FF6A48;
		font-size: 14px;
	}
	.box .list-news .list-news-one > li .serial{
		color: #222222;
		font-size: 14px;
	}
	.box .list-news .list-news-two > li{
		width: 95%;
		margin: 0px auto;
		height: 30px;
		line-height: 30px;
		border-bottom: 1px solid #EBEBEB;
	}
	.box .list-news .list-news-two > li > div{
		width: 100%;
		float: left;
		text-align: center;
	}
	.number-ju{
        width: 33.33%;
		height: 30px;
		float: left;
	}
	.box .list-news > p{
		height: 35px;
		line-height: 35px;
		text-align: center;
		color: #4D4D4D;
		font-size: 13px;
	}
	.box .operation{
		position: fixed;
		bottom: 0px;
		width: 100%;
		height: 50px;
		line-height: 50px;
	}
	.box .operation > button{
		width: 50%;
		height: 50px;
		text-align: center;
		border: none;
		outline: none;
		font-size: 16px;
		float: left;
	}
	.box .operation .setUp{
        background: #FFFFFF;
		color: #222222;
	}
	.box .operation .immediately{
		background: #FF6A48;
		color: #FFFFFF;
	}
	.list-news-two{
		height: 420px;
        overflow-y: auto;
		width: 95%;
		margin: 0px auto;
	}
	.list-news-two > img{
		margin-top: 2rem;
	}
	.loading-more{
		display:inline-block;
		vertical-align: middle;
		margin-right:.2rem;
	}
	.loading-more-txt{
		vertical-align: middle;
		font-size:.22rem;
	}
	.loading-box{
        padding:.1rem 0;
	}
	.no-more{
		font-size:.16rem;
		padding:.1rem 0 .2rem;
	}
	.contain >>> .mint-popup{
        width: 100%;
		height: 566px;
		border-radius: 5px 5px 0px 0px;
		background: #FFFFFF;
	}
    .model-play .model-play-top{
		height: 51px;
		line-height: 51px;
	}
	.model-play .model-play-top > span{
		font-size: 15px;
		color: #222222;
	}
	.model-play .model-play-top > button{
		float: right;
		border: none;
		outline: none;
		font-size: 14px;
		color: #FF6A48;
		background: none;
		padding-top: 16px;
        padding-right: 13px;
	}
	.model-play-bottom{
		width: 97%;
		height: 412px;
		margin: 0px auto;
		overflow-y: auto;
	}
	.model-play-bottom > li{
		height: 51px;
		line-height: 51px;
		width: 95%;
		margin: 0px auto;
		font-size: 14px;
	}
	.model-play-bottom > li .name{
		float: left;
		color: #222222;
		width: 50px;
	}
	.model-play-bottom > li .phone{
		float: left;
		color: #4D4D4D;
		margin-left: 17px;
	}
	.model-play-bottom > li > input{
		float: right;
		margin-top: 19px;
	}
	.event{
		height: 49px;
		line-height: 49px;
	}
	.event > button{
		border: none;
		outline: none;
		background: #FF6A48;
		color: #FFFFFF;
		font-size: 16px;
		width: 126px;
		height: 32px;
		line-height: 32px;
		text-align: center;
		border-radius: 18px;
		position: relative;
        top: 10px;
	}
	.zjxiabo{
		float: left;
		margin-left: 16px;
	}
	.blxiabo{
		float: right;
		margin-right: 16px;
	}
</style>
