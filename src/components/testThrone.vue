<template>
  <div>
    <div class="container">
      <div class="throneLogin">
        <login-component></login-component>
      </div>
      <div v-if="loginStatus">
        <div class="throneTitle">
          <p>
            <label>
              <b>请选择需要被测试的接口：</b>
              <select name="selectInterface" v-model="checkedValue">
                <option v-for="(list,index) in data" :value="index">{{list.name}}</option>
              </select>
            </label>
          </p>
          <p class="describe">
            接口描述：{{data[checkedValue]['describe']}}
          </p>
        </div>
        <param-component :paramsValue="data[checkedValue]['name']" :requestUrl="data[checkedValue]['value']">
          <p slot="extraneous"><b>接口测试需要填写字段值（必填项将会有红色的*提示）：</b></p>
        </param-component>
      </div>
      <div v-else class="throneTitle">
        请点击上方登录按钮后在操作
      </div>
      <result-component>
        <p slot="result"><b>接口返回结果：</b></p>
      </result-component>
    </div>
  </div>
</template>
<style>
  p,label{
    display: block;
    text-align: left;
    margin-top:0;
  }
  .container {
    margin:3% auto;
  }

  .throneTitle,.throneLogin {
    border: 1px solid #b6b6b6;
    padding: 3%;
  }
  .throneTitle{
    margin:3% 3%;
  }
  .throneLogin{
    text-align: center;
    margin:3% 8%;
  }
  .describe{
    text-indent: 2em;
    font-size:14px;
  }
</style>
<script>
import ParamComponent from './param.vue'
import LoginComponent from './Login.vue'
import ResultComponent from './result.vue'
export default{
  name: 'throne',
  data () {
    return {
      data: [
        {name: 'applyCreate', value: '/rest/apply/applyCreate', describe: '创建进件 (创建进件时候 ,保存进件信息、客户信息、客户身份信息、联系人信息、地址信息、电话信息)'},
        {name: 'applyFail', value: '/rest/apply/applyFail/{applyId}', describe: '进件审批失败 (将进件申请审批为失败接口)'},
        {name: 'match', value: '/rest/bondDeal/match', describe: '撮合 (进行资金撮合接口)'},
        {name: 'creditCreate', value: '/rest/credit/creditCreate', describe: '创建授信 (创建新的授信)'},
        {name: 'recharge', value: '/rest/customerAccount/recharge', describe: '客户账户余额变动情况 (用户充值接口)'},
        {name: 'enchashment', value: '/rest/customerAccount/enchashment', describe: '客户账户余额变动情况 (用户提现接口)'},
        {name: 'repayment', value: '/rest/customerAccount/repayment', describe: '客户账户余额变动情况 (用户还款接口)'},
        {name: 'depoInvestCreate', value: '/rest/invest/investCreate', describe: '创建投资意向 (用户创建新的投资意向)'},
        {name: 'loanCreate', value: '/rest/loan/loanCreate', describe: '创建贷款申请 (用户使用授信后将会生成新的借款订单)'},
        {name: 'loanBillCreate', value: '/rest/cLoanBill/create', describe: '创建账单 (为用户创建还款订单)'},
        {name: 'loanBillRepay', value: '/rest/cLoanBill/normalRepay', describe: '账单正常还款 (用户正常还款的账单)'},
        {name: 'loanbillDefaultRepay', value: '/rest/cLoanBill/unNormalRepay', describe: '账单逾期还款 (用户逾期还款的账单)'},
        {name: 'loanBillExempt', value: '/rest/cLoanBill/loanBillExempt', describe: '账单减免 (对用户还款的账单进行减免)'},
        {name: 'loanBillDefault', value: '/rest/cLoanBill/loanBillDefault', describe: '账单逾期 (用户账单逾期未还款的状态操作)'},
        {name: 'withdrawCreate', value: '/rest/cLoanWithdraw/save', describe: '创建贷款申请 (用户用信时将会创建贷款申请)'},
        {name: 'withdrawCancel', value: '/rest/cLoanWithdraw/cancel', describe: '贷款申请取消 (用户取消了贷款申请的操作)'},
        {name: 'findFundingSource', value: '/rest/findFundingSource/search', describe: '获取可用的资金队列'},
        {name: 'findingQueueCheck', value: '/rest/fundingQueueCheck/check', describe: '检查Bondoffer是否满足FundingQueue配资要求（当前只检查额度）'},
        {name: 'loanMajorProductCreate', value: '/rest/metaLoanMajor/create', describe: '创建贷款大类'},
        {name: 'loanMinorProductCreate', value: '/rest/metaLoanMinor/create', describe: '创建贷款小类'},
        {name: 'loanMinorProductDisable', value: '/rest/metaDepoMinor/disable', describe: '贷款小类禁用设置'},
        {name: 'fundingSourceSettingCreate', value: '/rest/metaFundingSourceSetting/save', describe: '创建资金源配置'},
        {name: 'fundingSourceSettingDisable', value: '/rest/metaFundingSourceSetting/updateDisable', describe: '资金源配置禁用设置'},
        {name: 'fundingSourceSettingSetSequence', value: '/rest/metaFundingSourceSetting/updateSequence', describe: '资金源配置顺序调整'},
        {name: 'depoMajorProductCreate', value: '/rest/metaDepoMajor/create', describe: '创建理财大类'},
        {name: 'depoMinorProductCreate', value: '/rest/metaDepoMinor/create', describe: '创建理财小类'},
        {name: 'depoMinorProductDisable', value: '/rest/metaLoanMinor/disable', describe: '投资小类禁用设置'},
        {name: 'deliver', value: '/rest/bondDealDeliver/deliver', describe: '交割'},
        {name: 'creditCancle', value: '/rest/opCreditCancel/saveCancel', describe: '授信取消'},
        {name: 'customerRejection', value: '/rest/opCreditCustomerRejection/saveCustomerRejection', describe: '外部原因拒件'},
        {name: 'creditExpired', value: '/rest/opCreditExpired/saveExpired', describe: '授信过期'},
        {name: 'internalRejection', value: '/rest/opCreditInternalRejection/saveInternalRejection', describe: '内部原因拒件'},
        {name: 'creditLock', value: '/rest/opCreditLock/saveLock', describe: '授信冻结金额 -添加记录'},
        {name: 'creditUnlock', value: '/rest/opCreditLock/saveUnlock', describe: '授信解冻金额'},
        {name: 'creditRecycle', value: '/rest/opCreditRecycle/saveRecycle', describe: '可循环授信回收'},
        {name: 'creditUsed', value: '/rest/opCreditUsed/save', describe: '用信'},
        {name: 'investCancel', value: '/rest/queueInvestCancel/investCancel', describe: '投资意向取消'},
        {name: 'fundingQueueEnter', value: '/rest/queueEnter/fundingQueueEnter', describe: '排入资金队列'},
        {name: 'fundingQueueInvestLock', value: '/rest/queueInvestLock/fundingQueueInvestLock', describe: '资金队列锁定'},
        {name: 'fundingQueueInvestUnlock', value: '/rest/queueInvestLock/fundingQueueInvestUnlock', describe: '资金队列解锁'},
        {name: 'takeOffer', value: '/rest/takeOffer/save', describe: '执行配资'},
        {name: 'withDrawSigned', value: '/rest/withDrawSigned/save', describe: '签约'}
      ],
      checkedValue: 0,
      loginStatus: false
    }
  },
  created () {
    window.Event.$on('loginStatus', (data) => {
      this.loginStatus = data
    })
  },
  methods: {},
  components: {
    ParamComponent, LoginComponent, ResultComponent
  }
}
</script>
