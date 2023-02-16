<template>
  <router-view/>
</template>

<script>
import { provide } from "vue";
import * as echarts from "echarts";
import axios from "axios";

// 设置基准路径
axios.defaults.baseURL = "/api"

export default {
  setup() {
    // provide("另起名称", "传递的内容")
    provide("echarts", echarts)
    provide("axios", axios)
  }
}
</script>

<style>
* {
  text-align: center;
}
</style>