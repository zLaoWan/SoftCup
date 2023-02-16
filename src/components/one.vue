<template>
  <div>
    <div id="barCharts"></div>
  </div>
</template>

<script>


import { inject, onMounted, reactive } from "vue";

export default {

  setup() {
    let $axios = inject("axios");
    let $echarts = inject("echarts")

    let data = reactive({});
    let quantity = reactive([]);
    let average = reactive([]);
    let educational = reactive([]);

    async function getdata(){
      await $axios.post("/two/oneA?year=2022").then((res)=> {
        console.log("data", res)
        data = res.data.data
      }) .catch((res)=> {
        console.log(res)
      })
    }
    function setdata() {
      quantity = data.map((value)=>
      value)
    }

    onMounted(()=> {
      let myCharts = $echarts.init(document.getElementById("barCharts"))
      getdata().then(() => {
        setdata()
      })
    });
    return {
      data,
      quantity,
      average,
      educational,
      getdata,
      setdata
    }
  }
}
</script>
