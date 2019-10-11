<template>
    <div class="contain">
		<div class="head">
			<router-link to="/" class="back"><i class="icon-back"></i></router-link>
			<span class="title">机具申请</span>
			<router-link to="/bonus" class="head-link">采购记录</router-link>
		</div>
		<div class="main card-award">
			<ul>
			    <li v-for="item in list" @click="machines(item.id)">
				    <img class="Img" src="../assets/img/POS.png" />
					<p class="card-award-title">{{item.type}}</p>
					<p class="price">¥{{item.price}}</p>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import { Toast } from 'mint-ui';
import axios from 'axios'
export default {
	name: 'awardSearch',
	data () {
		return {
			list: [],
		}
	},
	components:{
		
	},
	methods: {
		machines(id){
			this.$router.push({path: '/voucher',query:{id:id}});
		},
		getData(){
			axios.get('/api/partner/posTypeList').then(respanse=>{
                if(respanse.data.code == 0){
					this.list = respanse.data.data;
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
		font-size: 14px;
	}
	.card-award{
		
	}
	.card-award > ul > li{
		width: 45%;
		height: 181px;
		background: #FFFFFF;
		float: left;
		margin-left: 3.5%;
		margin-top: 12px;
	}
	.Img{
		text-align: center;
		margin-top: 18px;
	}
	.card-award-title{
		font-size: 14px;
		color: #222222;
		margin-top: 18px;
	}
	.price{
		font-size: 13px;
		color: #FF6A48;
		margin-top: 10px;
	}
</style>
