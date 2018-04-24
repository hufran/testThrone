<template>
  <div class="result">
    <slot name="result"></slot>
    <div class="resultList">
      <div v-if="data.length>0">
        <p v-for="result in data">
          =================================><br>
          <span :class="{redColor:result.singned==true||result.singned=='true'}">{{result.blockName}}模块返回结果({{result.execTime}}):</span>
          <pre :class="{redColor:result.singned==true||result.singned=='true'}">{{result.result}}</pre>
          <=================================
        </p>
      </div>
      <div class="noData" v-else>
        暂无数据
      </div>
    </div>
  </div>
</template>
<style>
  .redColor{
    color: #ff6548;
  }
  .result {
    text-align: left;
    margin:3% 3% 0;
    border: 1px solid #b6b6b6;
    padding: 3%;
    font-size: 14px;
    color: #2c3e50;
  }
  .resultList {
    background: #000;
    color:#fff;
    padding:2%;
    height: 150px;
    overflow-y: auto;
  }
  .noData{
    line-height: 150px;
    font-size:100%;
    text-align: center;
  }
</style>
<script>
  export default{
    name: 'result',
    data () {
      return {
        msg: 'hello vue',
        data: []
      }
    },
    mounted () {
      window.Event.$on('requestData', (data) => {
        if (typeof data === 'string') {
          data = JSON.parse(data)
        }
        this.data.push(data)
      })
      window.Event.$on('requestErr', (data) => {
        if (typeof data === 'string') {
          data = JSON.parse(data)
        }
        this.data.push(data)
      })
    },
    components: {}
  }
</script>
