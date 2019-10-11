<template>
    <div class="contain">
		<div class="head">
			<router-link to="/" class="back"><i class="icon-back"></i></router-link>
			<span class="title">交易记录</span>
		</div>
		<div class="main instructions classroom">
			<div class="instructions-list">
				<div class="col-50">
					<div class="select" @click="selectData">{{val}}-{{value}}<img src="../assets/img/duobianxing.png"/></div>
					<div class="pickerPop" @touchmove.prevent>
						<!-- 年月日时分选择 -->
						<mt-datetime-picker
							lockScroll="true"
							ref="picker"
							v-model="dateVal"
							class="myPicker"
							type="date"
							year-format="{value}"
							month-format="{value}"
							date-format="{value}"
							@confirm="dateConfirm()">
						</mt-datetime-picker>
					</div>
				    <div class="FenRun"><span>总分润(元)<b>{{shareCount}}</b></span></div>
                </div>
				<div class="title-content">
				    <ul class="title-top">
					    <li>时间</li>
						<li>用户</li>
						<li>交易(元)</li>
						<li>分润(元)</li>
						<li>合伙人</li>
					</ul>
					<ul class="title-bottom" v-if="this.list != null">
					    <li v-for="item in list">
						    <div class="one"><span class="one-left">{{item.time}}</span></div>
							<div class="two">{{item.userName}}</div>
							<div class="three">{{item.amount}}</div>
							<div class="four">{{item.share}}</div>
							<div class="five">{{item.toUserName}}</div>
						</li>
					</ul>
					<ul class="results" v-else>    
                        <img src="../assets/img/zanwushuju.png"/>
                        <p>暂无数据</p>    
                    </ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { Toast } from 'mint-ui';
import axios from 'axios'
export default {
	name: 'classRoom',
	data () {
		return {
			val: '2019',
			value: '08',
			shareCount: '',
			list: [],
			dateVal: '',
		}
	},
	components:{
		
	},
	methods: {
		selectData () {
            if(!this.dateVal){
                this.dateVal = new Date()
            }
            this.$refs['picker'].open()
            var a = document.getElementsByClassName('picker-slot');
            for(let i=0;a && i < a.length;i++){
                if(i==2){
                    a[i].style.display="none";
                }
            }
		},
		 dateConfirm () { // 时间选择器确定按钮，并把时间转换成我们需要的时间格式
            this.val = this.dateVal.getFullYear();
            if(this.dateVal.getMonth() + 1 <= 9){
                this.value = '0' + (this.dateVal.getMonth() + 1);
            }else{
                this.value = this.dateVal.getMonth() + 1;
            }
            this.getData(); 
		},
		formatDate(date) {
            const y = date.getFullYear()
            let m = date.getMonth() + 1
            m = m < 10 ? '0' + m : m
            let d = date.getDate()
            d = d < 10 ? ('0' + d) : d
            return y + ' ' + m + ' ' + d
        },
		getData(){
			var formData = new FormData();
			let time = this.val + this.value;
            formData.append("M_", 1);
			formData.append("type", 0);
			formData.append("time", time);
            axios({
                url: '/api/home/profitList_',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
                    this.shareCount = respanse.data.data.info.shareCount;
					this.list = respanse.data.data.list;
                }else{
                    Toast(respanse.data.message);
                    
                }
            })
		}
	},
	mounted () {
		this.getData();
	}
}
</script>
<style scoped="scoped">
    .head{
        background: #FFFFFF;
    }
	.results > img{
		margin-top: 1rem;
	}
    .head .title{
        color: #222222;
        font-size: 18px;
    }
    .head .back span{
        color: #222222;
    }
	.col-50{
        width: 100%;
        height: 44px;
        line-height: 44px;
        background: #FFFFFF;
        margin-top: 4px;
    }
	.col-50 .FenRun{
		float: right;
		padding-left: 10px;
	}
	.col-50 .FenRun > span{
		font-size: 18px;
		color: #222222;
		margin-right: 15px;
	}
	.col-50 .FenRun > span > b{
		font-size: 18px;
		color: #FF6A48;
		padding-left: 10px;
	}
    .col-50 > select{
        border: none;
        color: #222222;
        font-size: 17px;
        outline: none;
		background: none;
    }
	.title-content{
		margin-top: 15px;
	}
	.title-content .title-top{
        width: 100%;
		height: 39px;
		line-height: 39px;
		background: #FFFFFF;
	}
	.title-content .title-top > li{
		width: 20%;
		float: left;
		text-align:center;
		font-size: 13px;
		color: #222222;
		font-weight:bold;
		border-bottom: 1px solid #EBEBEB;
	}
	.title-content .title-bottom > li{
		width: 100%;
		height: 40px;
		background: #FFFFFF;
		border-bottom: 1px solid #EBEBEB;
	}
	.title-content .title-bottom > li > div{
		width: 20%;
		float: left;
		text-align: center;
	}
	.title-content .title-bottom > li .two,.title-content .title-bottom > li .three,.title-content .title-bottom > li .four,.title-content .title-bottom > li .five{
		line-height: 40px;
	}
	.title-content .title-bottom > li .two,.title-content .title-bottom > li .three,.title-content .title-bottom > li .four{
		font-size: 13px;
		color: #222222;
	}
	.title-content .title-bottom > li .five{
		font-size: 13px;
		color: #13D1A5;
	}
	.title-content .title-bottom > li .one .one-left{
        font-size: 12px;
		color: #222222;
		padding-top: 7px;
		display: block;
	}
	.title-content .title-bottom > li .one .one-right{
		font-size: 11px;
		color: #666666;
		padding-top: 5px;
		display: block;
	}
	.select{
		width: 97px;
		height: 25px;
		line-height: 25px;
		float: left;
		font-size: 13px;
		margin: 11px 0px 0px 15px;
	}
	.select > img{
		margin-left: 16px;
	}
	.select > select{
		border: none;
		outline: none;
		background: none;
	}
	.select > select > option{
		border: none;
	}

</style>
