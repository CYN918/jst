<template>
    <div class="contain">
		<div class="head">
			<router-link to="/" class="back"><i class="icon-back"></i><span>返回</span></router-link>
			<span class="title">机具物料</span>
		</div>
		<div class="main activity">
		    <mt-navbar v-model="selected">
				<mt-tab-item id="1">机具</mt-tab-item>
				<mt-tab-item id="2">物料</mt-tab-item>
			</mt-navbar>
			<!-- tab-container -->
			<mt-tab-container v-model="selected">
				<mt-tab-container-item id="1">
					
				</mt-tab-container-item>
				<mt-tab-container-item id="2">
					
				</mt-tab-container-item>
			</mt-tab-container>
		</div>
	</div>
</template>
<script>
export default {
	name: 'hotActivity',
	data () {
		return {
			selected: '1',           
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

</style>
