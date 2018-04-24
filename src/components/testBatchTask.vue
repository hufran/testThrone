<template>
  <div class="container">
    <div class="throneTitle">
      <p>
        <label class="batchLabel">
          <b>请根据提示选择方法：</b>
        </label>
        <label class="batchLabel">
          <span>选择批次</span>
          <select name="majorBatch" v-model="batchValue">
            <option v-for="(batch,index) in data" :value="index" :selected="index==0?true:false">{{batch.describe}}
            </option>
          </select>
        </label>
        <label class="batchLabel">
          <span>选择方法</span>
          <select name="majorBatch" v-model="methodValue">
            <option v-for="(methodList,index) in data[batchValue].list" :value="index">{{methodList.describe}}</option>
          </select>
        </label>
      </p>
      <p class="describe">
        <b>方法描述： &nbsp;</b>{{data[batchValue].description}} &nbsp;&nbsp;&nbsp;--- &nbsp;&nbsp;&nbsp;{{data[batchValue].list[methodValue].description}}
      </p>
      <p>
        <b>接口测试需要填写字段值： &nbsp;</b><label class="batchLabel"><input type="number" placeholder="请输入执行时间（单位为秒）" v-model="timer"></label>(秒)
      </p>
      <p class="textCenter">
        <button @click="execJob">立即执行</button>
      </p>
    </div>
    <result-component>
      <p class="mgr3B" slot="result"><b>批量任务执行结果：</b></p>
    </result-component>
  </div>
</template>
<style>
  .mgr3B {
    margin-bottom: 3%;
  }
  .describe{
    text-indent: 5em;
  }
  .textCenter {
    text-align: center;
  }

  .container {
    margin: 3% auto;
  }

  select {
    line-height: 30px;
    height: 30px;
    margin-right: 1%;
  }

  .throneTitle {
    border: 1px solid #b6b6b6;
    padding: 3%;
    line-height: 30px;
    margin: 3% 3%;
    text-align: left;
  }

  .throneTitle span {
    margin-right: 1%;
  }

  button {
    margin-top: 3%;
    background: #2ab261;
    padding: 10px 20px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    color: #fff;
    border: 0;
    font-size: 18px;
  }
  label.batchLabel{
    display: inline-block;
    width:27%;
  }
</style>
<script>
  import * as $ from 'jquery'
  import ResultComponent from './result.vue'
  export default{
    data () {
      return {
        webSocket: '',
        timer: 0,
        data: [
          {
            name: '',
            describe: '--请选择--',
            description: '',
            list: [{name: '', url: '', describe: '--请选择--', description: ''}]
          },
          {
            name: 'day',
            describe: '日间任务',
            description: '日间需要被执行的全部任务列表',
            list: [
              {name: 'all', url: '/batchStart/allJob?group=dailyJob&timer={timer}', describe: '全部执行', description: '按照需求文档顺序执行', status: false},
              {
                name: 'AllocationJob',
                url: '/batchStart/SingleJob?name=AllocationJob&group=dailyJob&timer={timer}',
                describe: '执行配资',
                description: '执行配资',
                status: false
              },
              {
                name: 'DeliverJob',
                url: '/batchStart/SingleJob?name=DeliverJob&group=dailyJob&timer={timer}',
                describe: '交割任务',
                description: '交割任务',
                status: false
              },
              {
                name: 'DepoInvestQueueJob',
                url: '/batchStart/SingleJob?name=DepoInvestQueueJob&group=dailyJob&timer={timer}',
                describe: '投资意向入队列',
                description: '投资意向入队列',
                status: false
              },
              {
                name: 'FundMachingJob',
                url: '/batchStart/SingleJob?name=FundMachingJob&group=dailyJob&timer={timer}',
                describe: '资金撮合',
                description: '资金撮合',
                status: false
              },
              {
                name: 'GenerateLoanJob',
                url: '/batchStart/SingleJob?name=GenerateLoanJob&group=dailyJob&timer={timer}',
                describe: '贷款生成',
                description: '贷款生成',
                status: false
              },
              {
                name: 'RepayBillJob',
                url: '/batchStart/SingleJob?name=RepayBillJob&group=dailyJob&timer={timer}',
                describe: '贷款账单支付(含正常、逾期)',
                description: '贷款账单支付(含正常、逾期)',
                status: false
              }
            ]
          },
          {
            name: 'night',
            describe: '日终任务',
            description: '日终需要被执行的全部任务列表',
            list: [
              {name: 'all', url: '/batchStart/allJob?group=nightlyJob&timer={timer}', describe: '全部执行', description: '按照需求文档顺序执行', status: false},
              {
                name: 'DailyLockJob',
                url: '/batchStart/SingleJob?name=DailyLockJob&group=nightlyJob&timer={timer}',
                describe: '日批启动，设置锁',
                description: '日批启动，设置锁',
                status: false
              },
              {
                name: 'CleanupCashSettleJob',
                url: '/batchStart/SingleJob?name=CleanupCashSettleJob&group=nightlyJob&timer={timer}',
                describe: '收付指令最后确认',
                description: '收付指令最后确认',
                status: false
              },
              {
                name: 'CleanupWithdrawJob',
                url: '/batchStart/SingleJob?name=CleanupWithdrawJob&group=nightlyJob&timer={timer}',
                describe: '收付指令最后确认',
                description: '收付指令最后确认',
                status: false
              },
              {
                name: 'CleanupCreditJob',
                url: '/batchStart/SingleJob?name=CleanupCreditJob&group=nightlyJob&timer={timer}',
                describe: '到期未使用授信到期处理',
                description: '到期未使用授信到期处理',
                status: false
              },
              {
                name: 'CleanupLoanBillJob',
                url: '/batchStart/SingleJob?name=CleanupLoanBillJob&group=nightlyJob&timer={timer}',
                describe: '存量账单支付清理',
                description: '存量账单支付清理',
                status: false
              },
              {
                name: 'AdvanceLoanBillJob',
                url: '/batchStart/SingleJob?name=AdvanceLoanBillJob&group=nightlyJob&timer={timer}',
                describe: '当日应还未还账单垫付',
                description: '当日应还未还账单垫付',
                status: false
              },
              {
                name: 'RegularDepositJob',
                url: '/batchStart/SingleJob?name=RegularDepositJob&group=nightlyJob&timer={timer}',
                describe: '理财按日生成处理',
                description: '理财按日生成处理',
                status: false
              },
              {
                name: 'TodayValuationJob',
                url: '/batchStart/SingleJob?name=TodayValuationJob&group=nightlyJob&timer={timer}',
                describe: '日终估值计算',
                description: '日终估值计算',
                status: false
              },
              {
                name: 'DateSwichJob',
                url: '/batchStart/SingleJob?name=DateSwichJob&group=nightlyJob&timer={timer}',
                describe: '系统日切',
                description: '系统日切',
                status: false
              },
              {
                name: 'GenerateLoanBillJob',
                url: '/batchStart/SingleJob?name=GenerateLoanBillJob&group=nightlyJob&timer={timer}',
                describe: '生成第二日贷款账单',
                description: '生成第二日贷款账单',
                status: false
              },
              {
                name: 'TodayAddValuationJob',
                url: '/batchStart/SingleJob?name=TodayAddValuationJob&group=nightlyJob&timer={timer}',
                describe: '日初估值计算',
                description: '日初估值计算',
                status: false
              },
              {
                name: 'OverdueLoanBillJob',
                url: '/batchStart/SingleJob?name=OverdueLoanBillJob&group=nightlyJob&timer={timer}',
                describe: '未结清账单应还款信息更新',
                description: '未结清账单应还款信息更新',
                status: false
              },
              {
                name: 'DailyUnlockJob',
                url: '/batchStart/SingleJob?name=DailyUnlockJob&group=nightlyJob&timer={timer}',
                describe: '业务锁释放及第二日业务初始化',
                description: '业务锁释放及第二日业务初始化',
                status: false
              }
            ]
          }
        ],
        batchValue: 0,
        methodValue: 0
      }
    },
    created () {
      this.webSocket = new WebSocket('ws://10.4.34.220:9000/webSocketIMServer?ccat=88E0656E9BDE637812D07D019A09CF7B')
      this.webSocket.onopen = (event) => {
        console.log('WebSocket:已连接')
        console.log(event)
      }
      this.webSocket.onerror = (event) => {
        console.log('WebSocket:发生错误')
        console.log(event)
      }
      this.webSocket.onclose = (event) => {
        console.log('WebSocket:服务器被关闭')
        console.log(event)
      }
      this.webSocket.onmessage = (event) => {
        let json = '"{' + event.data.substring(1, event.data.length - 1) + '}"'
        var data = JSON.parse(json)
        console.log('解析收到消息：', data)
        if (data.singned === 'true') {
          window.Event.$emit('requestData', data)
        } else {
          window.Event.$emit('requestErr', data)
        }
      }
    },
    methods: {
      execJob: function () {
        let self = this
        let batchValue = this.batchValue
        let methodValue = this.methodValue
        if (batchValue !== 0 && !self.data[batchValue].list[methodValue].status) {
          let checkValue = true
          for (let i = 0, length = this.data.length; i < length; i++) {
            for (let j = 0, len = this.data[i].length; j < len; j++) {
              if (this.data[i].list[j].status) {
                checkValue = false
              }
            }
          }
          console.log((checkValue && methodValue === 0))
          if (!checkValue && methodValue === 0) {
            alert('您有任务已经启动无法启动全部命令')
          } else {
            $.ajax({
              url: 'http://10.4.34.220:9000' + self.parseUrl(self.data[batchValue].list[methodValue].url, {timer: self.timer}),
              method: 'post',
              timeout: 8000,
              success: (data) => {
                if (data.status === '1000' || data.status === '1100') {
                  self.data[batchValue].list[methodValue].status = true
                  window.Event.$emit('requestData', {
                    blockName: self.data[batchValue].list[methodValue].describe,
                    singned: false,
                    execTime: self.getExecTime(),
                    result: data
                  })
                } else {
                  window.Event.$emit('requestErr', {
                    blockName: self.data[batchValue].list[methodValue].describe,
                    singned: true,
                    execTime: self.getExecTime(),
                    result: data
                  })
                }
              },
              error: (err) => {
                console.log(err)
                window.Event.$emit('requestErr', {
                  blockName: self.data[batchValue].list[methodValue].describe,
                  singned: true,
                  execTime: self.getExecTime(),
                  result: err
                })
              }
            })
          }
        } else {
          alert('请选择正确的方法后再执行')
          return false
        }
      },
      parseUrl: function (url, json) {
        let result = ''
        if (typeof url !== 'undefined' && url !== '' && json !== '' && json !== 'undefined') {
          result = url.replace(/\{[a-zA-Z0-9_]+\}/ig, function () {
            let name = arguments[0].substring(1, arguments[0].length - 1)
            if (json[name]) {
              return json[name]
            } else {
              return ''
            }
          })
        }
        return result
      },
      getExecTime: function () {
        let now = new Date()

        let year = now.getFullYear()
        let month = now.getMonth() + 1
        let day = now.getDate()

        let hh = now.getHours()
        let mm = now.getMinutes()
        let ss = now.getSeconds()

        let clock = year + '-'

        if (month < 10) {
          clock += '0'
        }
        clock += month + '-'

        if (day < 10) {
          clock += '0'
        }
        clock += day + ' '

        if (hh < 10) clock += '0'

        clock += hh + ':'
        if (mm < 10) clock += '0'
        clock += mm + ':'

        if (ss < 10) clock += '0'
        clock += ss
        return clock
      }
    },
    components: {
      ResultComponent
    }
  }
</script>
