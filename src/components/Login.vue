<template>
  <div class="loginComponent">
    <div class="clearFix">
      <label><span>客户端ID：</span><input type="text" :disabled="true" :value="paramList['clientId']" /></label>
      <label><span>登录验证类型：</span><input type="text" :disabled="true" :value="paramList['grantType']" /></label>
      <button @click="loginIn">登录</button>
    </div>
    <p>注意：由于属于测试环境以及接口提供问题，该处暂不允许修改，建议使用默认值</p>
  </div>
</template>
<style>
  .loginComponent{
    font-size:100%;
  }
  .loginComponent label{
    padding-right:3%;
    overflow: hidden;
    float: left;
    width:37%;
    line-height: 30px;
  }
  .loginComponent span{
    margin-right:2%;
    float: left;
  }
  .loginComponent button{
    background: #2ab261;
    padding:5px 10px;
    -webkit-border-radius:5px;
    -moz-border-radius:5px;
    border-radius:5px;
    color:#fff;
    border:0;
    font-size:14px;
    outline: none;
  }
  .loginComponent input{
    float: left;
    width:100px;
    height:30px;
    line-height: 30px;
  }
  .loginComponent p{
    color: #ff6255;
  }
  .clearFix{
    overflow: hidden;
    clear:both;
  }
</style>
<script>
  import * as $ from 'jquery'
  export default{
    name: 'login',
    data () {
      return {
        loginStatus: false,
        paramList: {
          clientId: 'ceshi',
          grantType: 'CLIENT'
        }
      }
    },
    mounted () {
      console.log('ccat:', document.cookie.indexOf('ccat=') !== -1)
      if (document.cookie.indexOf('ccat=') !== -1) {
        this.loginStatus = true
        window.Event.$emit('loginStatus', this.loginStatus)
      }
    },
    methods: {
      loginIn: function () {
        let self = this
        if (typeof this.paramList['clientId'] !== 'undefined' && typeof this.paramList['grantType'] !== 'undefined' && this.paramList['clientId'] !== '' && this.paramList['grantType'] !== '') {
          document.cookie = 'clientId=' + self.paramList.clientId
          $.ajax({
            url: 'http://10.4.34.220:9000/oauth/token',
            data: self.paramList,
            method: 'post',
            timeout: 1000,
            success: (data) => {
              self.loginStatus = true
              document.cookie = 'accessToken=' + data.data
              console.log('loginStatus:', self.loginStatus)
              window.Event.$emit('loginStatus', self.loginStatus)
            },
            error: () => {
              console.log('获取用户token失败！')
              window.Event.$emit('loginStatus', false)
            }
          })
        } else {
          alert('请填写用户名和密码')
        }
      }
    }
  }
</script>
