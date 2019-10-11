<template>
    <div class="login">
        <p>欢迎光临累计收益页</p>

        <index-tab page="2"></index-tab>
    </div>
</template>
<script>
import indexTab from '@/components/indexTabComponent';
import { Spinner } from 'mint-ui';
import { Field } from 'mint-ui';
import { Header } from 'mint-ui';
import { Toast } from 'mint-ui';

export default {
    name: 'incomeIndex',
    data () {
        return {
            
        }
    },
    components:{
        indexTab,
    },
    methods: {
        
    },
    mounted () {
        
    }
}
</script>
<style scoped>
    

</style>
