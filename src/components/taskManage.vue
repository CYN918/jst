<template>
    <div>
      <div class="head">
        <router-link to="/" class="back"><i class="icon-back">
          </i>
        </router-link>
        <span class="title">分享</span>
      </div>
      <div class="Img">
         <img src="../assets/img/share-partner-img.png"/>
      </div>
      
    </div>
</template>
<script>
export default {
    name: 'taskManage',
    data() {
      return {
      
      }
    },
    methods: {
      
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
    .Img{
        width: 100%;
        height: auto;
        background: #07A77F;
    }
    .Img > img{
        width: 100%;
        height: auto;
        padding-top: 0.2rem;
    }
</style>
