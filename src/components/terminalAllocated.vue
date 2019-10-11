<template>
    <div class="contain">
        <div class="head">
            <router-link to="/terminal" class="back"><i class="icon-back"></i></router-link>
            <span class="title">已划拨终端</span>
        </div>
        <div class="main generalize-dredge">
		    <mt-field style="margin-top:0.1rem;" placeholder="请输入接收人姓名/手机号/订单号" v-model="keywork">
				<mt-button size="small" type="default" class="ve-send-code" @click="gosearch">搜索</mt-button>
			</mt-field>
            <div class="orderOn" v-if="this.message != null">
			    <ul>
				    <li v-for="item in list">
						<div class="active"><span class="left">接收人</span><span class="right">{{item.username}}</span></div>
						<div class="active"><span class="left">订单号</span><span class="right">{{item.orderid}}</span></div>
						<div class="active"><span class="left">总机具(台)</span><span class="right">{{item.total}}0</span></div>
						<div class="active"><span class="left">保理总额(元)</span><span class="right">{{item.sumamount}}</span></div>
						<div><span class="left">终端类型</span><span class="right" v-if="item.type == 8">尊享Plus</span><span class="right" v-if="item.type == 11">即pos</span><span class="right" v-if="item.type == 14">即付宝智享版</span></div>
					</li>
				</ul>	
			</div>
			<div class="orderOn" v-else>
                <ul>
				    <img src="../assets/img/zanwushuju.png"/>
                    <p>无数据</p>
				</ul>
			</div>
			
		</div>       
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import axios from 'axios'
export default {
	name: 'terminal',
	data () {
		return {
			keywork: '',
			list: [],
			message: '',
		}
	},
	components:{
		
	},
	methods: {
		gosearch(){
            this.getData();
		},
		getData(){
			var formData = new FormData();
            formData.append("pageNum", 1);
			formData.append("pageSize", 10);
			formData.append("search", this.keywork);
            axios({
                url: '/api/user/pushTransList',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
					this.list = respanse.data.data.list;
                }else{
					Toast(respanse.data.message);
					this.message = respanse.data.data;
                }
            })
		}
	},
	mounted () {
		this.getData();
	}
}
</script>
<style scoped>
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
	.orderOn > ul > img{
		margin-top: 2rem;
	}
	.orderOn > ul > li{
		min-height: 200px;
		background: #FFFFFF;
		width: 95%;
		margin: 10px auto;
		border-radius: 5px;
	}
	.orderOn > ul > li > div{
		width: 95%;
		height: 40px;
		line-height: 40px;
		margin: 0px auto;
	}
	.active{
		border-bottom: 1px solid #EBEBEB;
	}
	.orderOn > ul > li > div .left{
		float: left;
		color: #4D4D4D;
		font-size: 14px;
	}
	.orderOn > ul > li > div .right{
		float: right;
		color: #FF6A48;
		font-size: 14px;
	}
</style>
