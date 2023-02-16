<template>
  <div>
    <div class="chart" id="lineCharts"></div>
  </div>
</template>

<script>


import { inject, onMounted, reactive } from "vue";

export default {

  setup() {
    let $axios = inject("axios");
    let $echarts = inject("echarts")

    let data = reactive({});
    let moon = reactive([]);
    let city = reactive([]);
    let quantity = reactive([]);
    let gdp = reactive([]);

    async function getdata(){
      await $axios.post("/two/three?year=2022").then((res)=> {
        console.log("data", res.data.data)
        data = res.data.data
      }) .catch((res)=> {
        console.log(res)
      })
    }
    function setdata() {

      // for (const key in data) {
      //   for (const item in data[key]) {
      //     moon.push(item)
      //   }
      // }
      // console.log(moon)

      // console.log(city)
      // console.log(quantity)
      // console.log(gdp)

        for (const key in data) {
          console.log(data[key])
          
        }

    }

    onMounted(()=> {
      getdata().then(() => {

        setdata()
        let myCharts = $echarts.init(document.getElementById("lineCharts"))

        
      })
    });
    return {
      data,
      moon,
      city,
      quantity,
      gdp,
      getdata,
      setdata
    }
  }
}
</script>

<style>
  .chart {
    height: 600px
  }
</style>
