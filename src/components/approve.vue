<template>
    <div class="contain">
        <div class="head">
            <router-link to="/userIndex" class="back"><i class="icon-back"></i><span>返回</span></router-link>
            <span class="title">实名认证</span>
        </div>
        <div class="main generalize-dredge" style="background: #f7f7f7;padding-bottom: 30px;min-height: 620px;">
		
			<div class="dredge-form">
				<div>
					<div class="box-top">
						<div class="new-flex">
							<div class="line-left clearfix">
								真实姓名
							</div>
							<div class="flex-item">
								<input id="name" name="name" v-model="name" type="text" placeholder="请输入真实姓名" maxlength="8" autocomplete="off"/>
							</div>
						</div>
						<div style="width: 100%;height: 1px;background-color: #dcdcdc;"></div>
						<div class="new-flex" >
							<div class="line-left clearfix">
								身份证号码
							</div>
							<div class="flex-item" >
								<input id="idNo" name="idNo" v-model="idNo" type="text" placeholder="请输入姓名对应的身份证号码" maxlength="18" autocomplete="off"/>
							</div>
						</div>
					</div>

					<div class="box-bottom">
						<div class="new-flex">
							<div class="line-left clearfix">
								银行卡卡号
							</div>
							<div class="flex-item">
								<input id="cardNo" name="cardNo" v-model="cardNo" type="text" placeholder="请输入银行卡卡号" autocomplete="off"/>
							</div>
						</div>
						<div style="width: 100%;height: 1px;background-color: #dcdcdc;"></div>
                        <div class="new-flex">
							<div class="line-left clearfix">
								开户行
							</div>
							<div class="flex-item" id="bankArea">
								<district class="title" @areaChange="getBank" :sendsrt="bankName"></district>
							</div>
							<div class="line-left clearfix">
								<div class="line-icon">
									<i class="icon-arrow"></i>
								</div>
							</div>
						</div>
						<div style="width: 100%;height: 1px;background-color: #dcdcdc;"></div>
                        <div class="new-flex">
							<div class="line-left clearfix">
								开户地
							</div>
							<div class="flex-item" id="expressArea">
								<districtBase class="title" @areaChange="getArea" :sendsrt="myAdress"></districtBase>
							</div>
							<div class="line-left clearfix">
								<div class="line-icon">
									<i class="icon-arrow"></i>
								</div>
							</div>
						</div>
						
						<div style="width: 100%;height: 1px;background-color: #dcdcdc;"></div>
						<div class="new-flex">
							<div class="line-left clearfix">
								开户支行
							</div>
							<div class="flex-item" id="branchArea">
								<div class="districtbase">
									<div @click="areagook" ><span id="tishiTwo" style="color: #BFBFBF;font-size: 14px;">请选择开户支行</span><span>{{itembranchName}}</span>{{ sendsrt }}</div>
									<mt-popup
										v-model="popupVisible"
										position="bottom">
										<div class="ve-choice-yn">
											<span @click="areagocancel">取消</span>
											<span @click="areagocancel">确定</span>
										</div>
										<mt-picker style="width: 100vw;" :slots="slots" value-key="branchName" @change="onValuesChange"></mt-picker> 
									</mt-popup>
								</div>
							</div>
							<div class="line-left clearfix">
								<div class="line-icon">
									<i class="icon-arrow"></i>
								</div>
							</div>
						</div>
						<div style="width: 100%;height: 1px;background-color: #dcdcdc;"></div>
						<div class="new-flex">
							<div class="line-left clearfix">
								手机号码
							</div>
							<div class="flex-item">
								<input id="mobile" name="mobile" v-model="mobile" type="text" placeholder="请输入银行预留手机号码" maxlength="11" autocomplete="off"/>
							</div>
						</div>
						<div style="width: 100%;height: 1px;background-color: #dcdcdc;"></div>
						<div class="new-flex"  style="border-bottom: none;">
							<div class="line-left clearfix">
								验证码
							</div>
							<div class="flex-item">
								<input id="code" name="code" v-model="telCode" type="text" placeholder="请输入验证码" maxlength="6" autocomplete="off"/>
								<mt-button id="teleTime" v-if="phoneCodeStatus" size="small" type="default" class="ve-send-code"  @click="postphonecode">发送验证码</mt-button>
                                <mt-button id="teleTime" v-else-if="!phoneCodeStatus" size="small" type="default" class="ve-send-code" >倒计时{{ count }}S</mt-button>
							</div>
						</div>
					</div>
                </div>
                <div class="btn-click" @click="confirm">
                    <mt-button type="danger" class="complete">保存</mt-button>
                </div>
            </div>
        </div>

        
        
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { Picker } from 'mint-ui';
import districtBase from '@/components/districtbase';
import district from '@/components/district';
import axios from 'axios'
export default {
	name: 'approve',
	data () {
		return {
			name: '',
			idNo: '',
			cardNo: '',
			bankName: '',
			address: '',
			branchName: [],
			itembranchName: '',
			mobile: '',
			telCode: '',
			phoneCodeStatus: true,
			timer: null,
			count: 0,
			actions: [],
			myAdress: null,
			popupVisible: false,
            slots: [],
			sendsrt: '',
		}
	},
	components:{
		districtBase,
		district
	},
	methods: {
		postphonecode () {
			if(this.mobile.length != 11){
				Toast({
					message: '请填写正确手机号码',
					duration: 2000
				});
				return false
			}
			var formData = new FormData();
			formData.append("mobile", this.mobile);
			formData.append("type", 4); 
			axios({
				url: '/api/user/sendCode',
				method: 'post',
				data: formData,
			}).then(respanse=>{
				this.subumting = false
				if(respanse.data.code == 0){
					Toast(respanse.data.message); 
					let _this = this
					const TIME_COUNT = 60;//倒计时60s
					this.count = TIME_COUNT;//赋值，以便判断时间
					this.phoneCodeStatus = false
					this.timer = setInterval(function() {
						if (_this.count > 0 && _this.count <= TIME_COUNT) {
							_this.count--;
						} else {
							_this.phoneCodeStatus = true
							clearInterval(_this.timer);
							_this.timer = null;
						}
					}, 1000) 
				}else{
					Toast(respanse.data.message);
				}
			})
		},
		confirm(){
			if(!this.name){
				Toast('请输入真实姓名');
				return false
			}
			if(!this.idNo){
				Toast('请输入身份证号码');
				return false
			}
			if(!this.cardNo){
				Toast('请输入银行卡号');
				return false
			}
			if(!this.mobile){
				Toast('请输入手机号码');
				return false
			}
			if(!this.telCode){
				Toast('请输入验证码');
				return false
			}
			var formData = new FormData();
			formData.append("name", this.name);
			formData.append("idNo", this.idNo); 
			if(this.district.provinceName == this.district.cityName){
                formData.append("address", this.district.provinceName);
			}else{
				formData.append("address", this.myAdress);
			}	 
			formData.append("bankName", this.bankName); 
			formData.append("cardNo", this.cardNo); 
			formData.append("branchName", this.itembranchName); 
			formData.append("mobile", this.mobile); 
			formData.append("telCode", this.telCode); 
			axios({
				url: '/api/user/atc',
				method: 'post',
				data: formData,
			}).then(respanse=>{
				this.subumting = false
				if(respanse.data.code == 0){
					Toast(respanse.data.message); 
					this.$router.push({path: '/'}); 
				}else{
					Toast(respanse.data.message);
				}
			})
		},
		getArea (obj) {
			this.myAdress = obj.myAdress
			this.district = obj.district
		},
		getBank (obj) {
			this.bankName = obj.bankName
		},
		onValuesChange(picker, values) {
			if (values[0]) {
				document.getElementById("tishiTwo").style.display = "none";
				picker.setSlotValue(1, values[0]);
				this.itembranchName = values[0].branchName
			}
		},
		areagocancel () {
			this.popupVisible = false
		},
		areagook () {
			if(this.branchName.length == 0){
				this.getAddress()
			}
			this.popupVisible = true
		},
		getAddress () {
			var formData = new FormData();
			if(this.district.provinceName == this.district.cityName){
				formData.append("provinceName", this.district.provinceName);
				formData.append("cityName", "市辖区"); 
				formData.append("bankName", this.bankName); 
			}else{
                formData.append("provinceName", this.district.provinceName);
				formData.append("cityName", this.district.cityName); 
				formData.append("bankName", this.bankName); 
			} 
            axios({
                url: '/api/cnaps/branchName',
                method: 'post',
                data: formData,
            }).then(respanse=>{
				this.branchName = respanse.data.data
				this.slots = [{
					flex: 1,
					values: this.branchName,
					className: 'slot1',
					textAlign: 'center'
				}];          
            })
		},
	},
	mounted () {
	    
	}
}
</script>
<style scoped>
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
    .btn-click{
        position: relative;
        top: 100px;
    }
    .btn-click .complete{
        width: 92%;
		border-radius: 25px;
    }
	.box-top{
		width: 95%;
		margin: 15px auto;
		height: 100px;
	}
	.box-bottom{
		width: 95%;
		margin: 0px auto;
	}
	.ve-send-code{
        color: #2f2d2d;
        padding:0rem .2rem;
        width: 80px;
        height: 28px;
        background: #FF6A48;
        color: #FFFFFF;
        font-size: 12px;
        text-align: center;
        line-height: 28px;
        border-radius: 14px;
    }
	.districtbase{
        font-size: 0.4rem;
        text-align: right;
        padding-right: 25px;
    }
    .districtbase .ve-choice-yn>span{
        width: 49%;
        display: inline-block;
        text-align: center;
        padding: 0.3rem 0rem;
        color: #1296DB;
        font-size: 0.4rem;
    }

</style>
