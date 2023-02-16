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
    let alldata = reactive([]);
    let sum = reactive([]);
    let city = reactive([]);
    let quantity = reactive([]);

    async function getdata(){
      await $axios.post("/two/three?year=2022").then((res)=> {
        console.log("data", res.data.data)
        data = res.data.data
      }) .catch((res)=> {
        console.log(res)
      })
    }
    function setdata() {

        for (const key in data) {
          for (const item in data[key])
            for (const i in data[key][item]) {
              // console.log(i)
              // console.log(data[key][item][i])
              alldata.push(data[key][item][i])
            }
        }
        // console.log(alldata)
        alldata.forEach(value=> {
          // console.log(value)
          sum[value.city] = sum[value.city] === undefined ? 
          value.QUANTITY : sum[value.city] + value.QUANTITY
        })
        console.log(sum)
        for (const key in sum) {
          city.push(key)
        }
        for (const key in sum) {
          quantity.push(sum[key])
        }
        console.log(city)
        console.log(quantity)
    }

    onMounted(()=> {
      getdata().then(() => {

        setdata()
        let myCharts = $echarts.init(document.getElementById("lineCharts"))

        myCharts.setOption({
          
          xAxis: {
            type: 'category',
            data: city,
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: quantity,
              type:'bar'
            }
          ]
        })
      })
    });
    return {
      data,
      alldata,
      sum,
      getdata,
      setdata
    }
  }
}
</script>

<style>
  .chart {
    height: 720px;
  }
</style>
