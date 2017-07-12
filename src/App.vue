<template>
  <div id="app">
    <my-header>
    </my-header>
    <router-view></router-view>
    <my-footer></my-footer>
  </div>
</template>

<script>
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'


export default {
  name: 'app',
  components: { myFooter: Footer, myHeader: Header }
}
</script>

<style>

</style>
