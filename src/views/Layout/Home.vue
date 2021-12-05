<template>
  <div class="home-container">
    <Menu />
    <div :class="{'main-app': true, 'menu-unfold':$store.state.collapsed}">
      <SliderNav />
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import Menu from './components/menu.vue';
import SliderNav from './components/sliderNav.vue';

export default {
  components: {
    Menu,
    SliderNav,
  },
};
</script>

<style lang="less" >
@import url('~@/assets/css/home.less');
</style>
