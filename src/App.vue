<template>
  <div id="app">
    <div class="nav">
      <ul>
        <li>
          <router-link :to="{ name: 'HelloWorld'}">HelloWorld</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'testThrone'}">接口测试</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'TestBatchTask'}">批量任务测试</router-link>
        </li>
      </ul>
    </div>
    <div class="head">
      <img src="./assets/logo.png"><br /><span>testThrone(后台接口测试)</span>
    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
*{
  padding:0;
  margin:0;
}
a{
  text-decoration: none;
}
ul,li{
  list-style: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
#app img{
  width:100px;
}
#app .head span{
  font-size:25px;
  display: inline-block;
}
#app .nav{
  margin-bottom: 60px;
  background: #42b983;
  font-size: 120%;
  color:#fff;
  line-height:60px;
  overflow: hidden;
  text-align: center;
}
#app .nav ul{
  display: flex;
  justify-content: center;
}
#app .nav li{
  display: inline-block;
}
#app li .router-link-exact-active{
  background: #1fa86a;
}
#app .nav a{
  color:#fff;
  display: block;
  padding:0 10px;
}
</style>
