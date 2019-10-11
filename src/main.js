// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import baseCont from './baseCont';
import  VueResource  from 'vue-resource';
import MintUI from 'mint-ui';
import VueClipboard from 'vue-clipboard2';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'mint-ui/lib/style.css';
import axios from 'axios';

//开启debug模式
Vue.config.debug = true;
axios.defaults.withCredentials=true;
Vue.prototype.$axios = axios;

Vue.use(VueClipboard);
Vue.use(MintUI);
Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(ElementUI);
Vue.prototype.baseCont = baseCont;
Vue.config.productionTip = false;



//设置eventbus来传值
window.eventBus = new Vue();

router.beforeEach((to, from, next) => {
  //NProgress.start();
  if(to.path === "/login" || to.path === "/register" || to.path === "/password"){
    next()  
  }else{  
    axios.get('/api/login/loginCheck').then(respanse=>{
        if(respanse.data.code == 0){
            next() 
        }else{
            next('/login') 
        }
    }) 
  }
})


// 添加全局事件监控方法
Vue.prototype.resetSetItem = function (key, newVal) {
    if (key === 'watchStorage') {

        // 创建一个StorageEvent事件
        var newStorageEvent = document.createEvent('StorageEvent');
        const storage = {
            setItem: function (k, val) {
                sessionStorage.setItem(k, val);

                // 初始化创建的事件
                newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);

                // 派发对象
                window.dispatchEvent(newStorageEvent)
            }
        }
        return storage.setItem(key, newVal);
    }
}

Vue.prototype.resetSetItem = function (key, newVal) {
    if (key === 'watchStorage') {

        // 创建一个StorageEvent事件
        var newStorageEvent = document.createEvent('StorageEvent');
        const storage = {
            setItem: function (k, val) {
                localStorage.setItem(k, val);

                // 初始化创建的事件
                newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);

                // 派发对象
                window.dispatchEvent(newStorageEvent)
            }
        }
        return storage.setItem(key, newVal);
    }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
