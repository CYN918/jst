<template>
    <div class="contain">
        <div class="head">
            <router-link to="/merchants" class="back"><i class="icon-back"></i></router-link>
            <span class="title">物流追踪</span>
        </div>
		<div class="text">
            <ul>
                <li v-for="item in arr2"><span v-html="item"></span></li>
            </ul>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import axios from 'axios'
export default {
	name: 'logistics',
	data () {
		return {
			expCode: this.$route.query.expCode,
			trackingNum: this.$route.query.trackingNum,
			arr2: [],
		}
	},
	components:{
		
	},
	methods: {
		getData(){
			var formData = new FormData();
			formData.append("expCode", this.expCode);
			formData.append("trackingNum", this.trackingNum);
			axios({
                url: '/api/user/expressCheck',
                method: 'post',
                data: formData,
            }).then(respanse=>{
                if(respanse.data.code == 0){
                    this.Str = respanse.data.data.Str;
                    this.arr2 = this.Str.split("<br>");
                    // console.log(this.arr2)
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
    .text{
        text-align: left;
        margin-left: 15px;
        margin-right: 15px;
    }
    .text > ul > li{
        margin-top: 10px;
        line-height: 20px;
    }
</style>
