<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>

import { inject, onMounted, reactive } from "vue";

export default {

  setup() {
    let $axios = inject("axios");
    let $echarts = inject("echarts")

    // async function getdata(){
    //   await $axios.post("/Base/one").then((res)=> {
    //     console.log("data", res)
    //   }) .catch((error)=> {
    //     console.log(error)
    //   })
    // }
    

    onMounted(()=> {
      // getdata()
    });
    return {
      // getdata,
    }
  }
}
</script>
