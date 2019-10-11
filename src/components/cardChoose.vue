<template>
    <div class="contain">
		<div class="head">
			<router-link to="/cardIndex" class="back">
				<i class="icon-back"></i>
			</router-link>
			<span class="title">信用卡</span>
		</div>
		<div class="main card-choose">
			<ul th:each="_: ${DATA_}">
				<li style = "text-align:center; width:32%; float:left;margin: 5px 2px;">
					<a th:onclick="'javascript:cardDetails(\''+${_?.stationChannelId}+'\')'" class="card-item">
						<div class="item-head flex">
							<div class="name flex-item">
								[[${_?.name}]]<span></span>
							</div>
							<!-- <div class="link">立即申请</div> -->
						</div>
						<div class="item-img">
							<img th:src="${_?.iconPath}" width="95" height="95"/>
						</div>
					</a> 
				</li>
			</ul>
			
		</div>
		<div class="clear"></div>
	</div>
</template>
<script>
export default {
	name: 'cardChoose',
	data () {
		return {
			
		}
	},
	components:{
		
	},
	methods: {
		
	},
	mounted () {
		
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
</style>
