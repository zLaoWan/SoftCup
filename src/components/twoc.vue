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
    let alldata = reactive([['city', 'quantity', 'gdp', 'moon']]);
    let countries = reactive([]);

    let option = reactive({})
    let datasetWithFilters = reactive([]);
    let seriesList = reactive([]);


    async function getdata(){
      await $axios.post("/two/three?year=2022").then((res)=> {
        data = res.data.data
        console.log("data", res.data.data)
      }) .catch((res)=> {
        console.log(res)
      })
    }
    function setdata() {
      for (const key in data) {
          for (const item in data[key])
            for (const i in data[key][item]) {
              alldata.push([
                data[key][item][i].city, // 城市
                data[key][item][i].QUANTITY, // 需求
                data[key][item][i].gdp, 
                item //月份
              ])
            }
        }
      console.log(alldata)
      run(alldata)
    }

    function run(alldata) {

      countries = [
        '北京', '上海', '深圳', '杭州', '广州', '成都', '武汉', '南京', '苏州', '西安',
      ]
    }

    onMounted(()=> {
      getdata().then(() => {

        setdata()
        let myCharts = $echarts.init(document.getElementById("lineCharts"))

        $echarts.util.each(countries, function(city) {
          // console.log(city)
          var datasetId = 'dataset_' + city;
          datasetWithFilters.push({
            id: datasetId,
            fromDatasetId: 'dataset_raw',
            transform: {
              type: 'filter',
              config: {
                and: [
                  { dimension: 'city', '=': city}
                ]
              }
            }
          });

          seriesList.push({
            type: 'line',
            datasetId: datasetId,
            showSymbol: false,
            name: city,
            endLabel: {
              show: true,
              formatter: function(params) {
                return params.value[0] + ":" + params.value[1]
              }
            },
            labelLayout: {
              moveOverlap: 'shifty'
            },
            emphasis: {
              focus: 'series'
            },
            encode: {
              x: 'moon',
              y: 'quantity',
              label: ['city', 'quantity'],
              iteamName: 'moon',
              tooltip: ['quantity']
            }
          });
        });

        option = {
          animationDuration: 1000,
          dataset: [
            {
              id: 'dataset_raw',
              source: alldata
            },
            ...datasetWithFilters
          ],
          title: {
            text: '20**最热门城市'
          },
          tooltip: {
            order: 'valueDesc',
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            nameLocation: 'middle'
          },
          yAxis: {
            name: 'city'
          },
          grid: {
            right: 140
          },
          series: seriesList
        };
        myCharts.setOption(option)
      })
    });
    return {
      data,
      alldata,
      countries,

      option,
      datasetWithFilters,
      seriesList,

      getdata,
      setdata,
      run,
    }
  }
}
</script>

<style>
  .chart {
    height: 600px
  }
</style>
