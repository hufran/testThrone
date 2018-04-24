<template>
  <div class="paramList">
    <slot name="extraneous"></slot>
    <ul>
      <li v-for="list in data[this.paramsValue]">
        <label>
          <span><i v-if="list.required">*</i>{{list.describe}}:</span>
          <input :type="list.type" :placeholder="'请输入'+list.describe" :required="list.required" :name="list.name"
                 v-model="requestParam[list.name]" v-if="!list.range" :maxlength="list.maxlength" :max="list.maxlength">
          <select :name="list.name" v-model="requestParam[list.name]" v-else>
            <option v-for="(range,i) in list.range" :value="range.value">{{range.name}}</option>
          </select>
        </label>
      </li>
    </ul>
    <div class="btnCenter">
      <button @click="submitValue">立即提交</button>
    </div>
  </div>
</template>
<style>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
  }

  i {
    font-style: normal;
    color: #f00;
    font-size: 100%;
  }

  a {
    color: #42b983;
  }

  input {
    font-size: 14px;
    color: #0d3349;
    height: 30px;
    border: 1px solid rgba(58, 58, 67, 0.12);
    padding-left: 5px;
  }

  label {
    display: block;
  }

  select {
    height: 34px;
    border: 1px solid rgba(58, 58, 67, 0.12);
  }

  .paramList {
    border: 1px solid #b6b6b6;
    padding: 3%;
    font-family: "Microsoft Yahei", "宋体", Arial, Verdana;
    font-size: 100%;
    color: #000;
  }

  .paramList ul {
    width: 100%;
    overflow: hidden;
  }

  .paramList ul li {
    text-align: left;
    width: 50%;
    float: left;
    margin: 1% 0;
    line-height: 30px;
  }

  .btnCenter {
    text-align: center;
  }

  .btnCenter button {
    background: #2ab261;
    padding: 10px 20px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    color: #fff;
    border: 0;
    font-size: 18px;
  }
</style>
/*发送请求,并返回结果*/
<script>
  import * as $ from 'jquery'
  export default{
    name: 'param',
    data  () {
      return {
        data: {
          applyCreate: [
            {name: 'id', type: 'number', describe: '系统编码', required: true, maxlength: 10},
            {name: 'customerId', type: 'number', describe: '客户编码', required: true, maxlength: 10},
            {name: 'majorProductId', type: 'number', describe: '产品大类', required: true, maxlength: 10},
            {
              name: 'applyType',
              describe: '申请类型',
              required: true,
              range: [{name: '线上', value: 3002001}, {name: '线下', value: 3002002}, {name: 'App', value: 3002003}, {name: '个人', value: 3002004}, {name: '企业', value: 3002005}]
            },
            {name: 'dealDate', type: 'date', describe: '申请日期', required: true},
            {name: 'amount', type: 'number', describe: '申请金额', required: true, maxlength: 14},
            {name: 'period', type: 'number', describe: '周期（月）', required: true, maxlength: 10},
            {name: 'name', type: 'text', describe: '客户姓名', required: true, maxlength: 32},
            {name: 'birthday', type: 'date', describe: '客户生日', required: false, changeType: true},
            {name: 'gender', describe: '客户性别', required: false, range: [{name: '男', value: 2001001}, {name: '女', value: 2001002}]},
            {name: 'marriage', describe: '婚姻状况', required: false, range: [{name: '未知', value: 2002000}, {name: '未婚', value: 2002001}, {name: '已婚', value: 2002002}, {name: '离异', value: 2002003}, {name: '再婚', value: 2002004}, {name: '丧偶', value: 2002005}]},
            {name: 'idType', type: 'number', describe: '身份证类型', required: true, maxlength: 1},
            {name: 'idNumber', type: 'number', describe: '身份证号', required: true, maxlength: 18},
            {name: 'contactName', type: 'text', describe: '联系人姓名', required: true},
            {name: 'contactType', type: 'number', describe: '联系人类型', required: true, maxlength: 10},
            {
              name: 'contactStatus',
              describe: '联系人状态',
              required: true,
              range: [{name: '未知', value: 2005000}, {name: '无效', value: 2005001}, {name: '错误', value: 2005002}, {name: '有效', value: 2005003}]
            },
            {name: 'forbidden', type: 'number', describe: '被禁用状态（是否被禁用）', required: true, maxlength: 1},
            {name: 'callForbidden', type: 'number', describe: '联系人是否被禁用', required: true, maxlength: 1},
            {name: 'messageForbidden', type: 'number', describe: '联系人短信是否被禁用', required: true, maxlength: 1},
            {name: 'telNo', type: 'number', describe: '客户电话号码', required: true, maxlength: 30},
            {name: 'useFor', type: 'text', describe: '用途描述', required: false},
            {name: 'notes', type: 'text', describe: '注意事项', required: false},
            {name: 'sourceSystem', type: 'number', describe: '来源系统', required: true, maxlength: 1},
            {name: 'sourceId', type: 'text', describe: '来源编码', required: true, maxlength: 14}
          ],
          applyFail: [
            {name: 'applyId', type: 'number', describe: '进件编码', required: true, maxlength: 10},
            {name: 'majorReasonKey', type: 'number', describe: '主原因', required: true},
            {name: 'minorResonKey', type: 'number', describe: '子原因', required: true}
          ],
          creditCreate: [
            {name: 'id', type: 'number', describe: '系统编码', required: true, maxlength: 10},
            {name: 'customerId', type: 'number', describe: '客户编码', required: true, maxlength: 10},
            {name: 'majorProductId', type: 'number', describe: '产品大类', required: true, maxlength: 10},
            {name: 'applyId', type: 'number', describe: '进件编码', required: false, maxlength: 10},
            {name: 'dealDate', type: 'date', describe: '交易日期', required: false},
            {name: 'valueDate', type: 'date', describe: '生效日期', required: true},
            {name: 'expireDate', type: 'date', describe: '过期日期', required: true},
            {name: 'grantor', type: 'number', describe: '授信主体', required: true, maxlength: 10},
            {
              name: 'sharing',
              describe: '共享方式',
              required: true,
              range: [{name: '独有', value: 3018001}, {name: '向下共享', value: 3018002}, {name: '全局共享', value: 3018003}]
            },
            {name: 'amount', type: 'number', describe: '授信总额', required: true, maxlength: 14},
            {name: 'balance', type: 'number', describe: '授信余额', required: false, maxlength: 14},
            {name: 'lockBalance', type: 'number', describe: '授信冻结金额', required: false, maxlength: 14},
            {name: 'riskPrice', type: 'number', describe: '风险定价', required: false, maxlength: 10},
            {
              name: 'recycling',
              describe: '是否可循环',
              required: false,
              range: [{name: '不可循环', value: 3020001}, {name: '可循环', value: 3020002}]
            },
            {
              name: 'adjustable',
              describe: '是否可降额使用',
              required: true,
              range: [{name: '不允许', value: 3021001}, {name: '允许', value: 3021002}]
            },
            {
              name: 'multitime',
              describe: '是否可拆分',
              required: false,
              range: [{name: '不允许', value: 3022001}, {name: '允许', value: 3022002}]
            },
            {
              name: 'exclusive',
              describe: '是否允许存续再贷',
              required: false,
              range: [{name: '不允许', value: 3023001}, {name: '允许', value: 3023002}]
            },
            {
              name: 'netting',
              describe: '循序再贷是否需要做轧差处理',
              required: false,
              range: [{name: '不允许', value: 3024001}, {name: '允许', value: 3024002}]
            },
            {name: 'sourceSystem', type: 'number', describe: '外部系统号', required: true, maxlength: 10},
            {name: 'sourceId', type: 'number', describe: '来源系统编码', required: true}
          ],
          creditUsed: [
            {name: 'id', type: 'number', describe: '系统编码', required: false, maxlength: 10},
            {name: 'customerId', type: 'number', describe: '客户编码', required: true, maxlength: 10},
            {name: 'creditId', type: 'number', describe: '授信编码', required: false, maxlength: 10},
            {name: 'grantorId', type: 'number', describe: '授信主体编码', required: false, maxlength: 10},
            {name: 'loanId', type: 'number', describe: '贷款编码', required: true, maxlength: 10},
            {name: 'withdrawId', type: 'number', describe: '贷款申请编码', required: true, maxlength: 10},
            {name: 'amount', type: 'number', describe: '金额', required: false, maxlength: 14}
          ],
          creditLock: [
            {name: 'id', type: 'number', describe: '系统编码', required: false, maxlength: 10},
            {name: 'customerId', type: 'number', describe: '客户编码', required: false, maxlength: 10},
            {name: 'creditId', type: 'number', describe: '授信编码', required: false, maxlength: 10},
            {name: 'grantorId', type: 'number', describe: '授信主体编码', required: false, maxlength: 10},
            {
              name: 'lockDirection',
              describe: '冻结方向',
              required: false,
              range: [{name: '冻结', value: 0}, {name: '解冻', value: 1}]
            },
            {name: 'amount', type: 'number', describe: '金额', required: false, maxlength: 14}
          ],
          creditUnlock: [
            {name: 'id', type: 'number', describe: '系统编码', required: false},
            {name: 'customerId', type: 'number', describe: '客户编码', required: false},
            {name: 'creditId', type: 'number', describe: '授信编码', required: false},
            {name: 'grantorId', type: 'number', describe: '授信主体编码', required: false},
            {
              name: 'lockDirection',
              type: 'number',
              describe: '冻结方向',
              required: false,
              range: [{name: '冻结', value: 0}, {name: '解冻', value: 1}]
            },
            {name: 'amount', type: 'number', describe: '解冻金额', required: false}
          ],
          creditRecycle: [
            {name: 'id', type: 'number', describe: '系统编码', required: false},
            {name: 'customerId', type: 'number', describe: '客户编码', required: false},
            {name: 'creditId', type: 'number', describe: '授信编码', required: false},
            {name: 'grantorId', type: 'number', describe: '授信主体编码', required: false},
            {name: 'loanId', type: 'number', describe: '贷款编码', required: true},
            {name: 'withdrawId', type: 'number', describe: '贷款申请编码', required: true},
            {name: 'amount', type: 'number', describe: '金额', required: false}
          ],
          creditCancle: [
            {name: 'id', type: 'number', describe: '系统编码', required: false},
            {name: 'customerId', type: 'number', describe: '客户编码', required: false},
            {name: 'creditId', type: 'number', describe: '授信编码', required: true},
            {name: 'grantorId', type: 'number', describe: '授信主体编码', required: false},
            {name: 'amount', type: 'number', describe: '金额', required: false}
          ],
          creditExpired: [
            {name: 'id', type: 'number', describe: '系统编码', required: false},
            {name: 'customerId', type: 'number', describe: '客户编码', required: false},
            {name: 'creditId', type: 'number', describe: '授信编码', required: true},
            {name: 'grantorId', type: 'number', describe: '授信主体编码', required: false},
            {name: 'amount', type: 'number', describe: '金额', required: false}
          ],
          internalRejection: [
            {name: 'id', type: 'number', describe: '系统编码', required: false},
            {name: 'creditId', type: 'number', describe: '授信编码', required: true},
            {name: 'majorReasonId', type: 'number', describe: '主原因', required: true},
            {name: 'minorReasonId', type: 'number', describe: '子原因', required: true}
          ],
          customerRejection: [
            {name: 'id', type: 'number', describe: '系统编码', required: false},
            {name: 'creditId', type: 'number', describe: '授信编码', required: true},
            {name: 'majorReasonId', type: 'number', describe: '主原因', required: true},
            {name: 'minorReasonId', type: 'number', describe: '子原因', required: true}
          ],
          loanMajorProductCreate: [
            {name: 'id', type: 'number', describe: '大类产品ID', required: false},
            {name: 'uuid', type: 'number', describe: '大类产品UUID', required: false},
            {name: 'code', type: 'number', describe: '产品大类CODE', required: false},
            {name: 'description', type: 'number', describe: '产品大类描述', required: true}
          ],
          loanMinorProductCreate: [
            {name: 'id', type: 'number', describe: '小类产品ID', required: false},
            {name: 'majorProductId', type: 'number', describe: '产品大类', required: false},
            {name: 'repayMode', type: 'number', describe: '还款方式', required: true},
            {name: 'phaseCode', type: 'number', describe: '期限标识码', required: false}
          ],
          depoMajorProductCreate: [
            {name: 'id', type: 'number', describe: '系统编码', required: false},
            {name: 'uuid', type: 'number', describe: '全局唯一号', required: false},
            {name: 'code', type: 'number', describe: '产品代码', required: false},
            {name: 'description', type: 'number', describe: '产品大类描述', required: false}
          ],
          depoMinorProductCreate: [
            {name: 'id', type: 'number', describe: '系统编码', required: false},
            {name: 'majorProductId', type: 'number', describe: '理财产品大类号', required: false},
            {
              name: 'initialResidualBalanceTreatment',
              type: 'number',
              describe: '初始投资资金处置方式',
              required: false,
              range: [{name: '归还', value: 3007001}, {name: '尝试出清', value: 3007002}, {name: '留存继续使用', value: 3007003}]
            },
            {
              name: 'initialInvestmentPollType',
              type: 'number',
              describe: '初始投资意向归集方式',
              required: false,
              range: [{name: '专有', value: 3009001}, {name: '共享', value: 3009002}]
            },
            {name: 'reinvestmentResidualBalanceTreatment', type: 'number', describe: '再投资资金处置方式', required: false},
            {name: 'reinvestmentPollType', type: 'number', describe: '再投资意向归集方式', required: false},
            {
              name: 'dealGeneration',
              type: 'number',
              describe: '存款交易生成方式',
              required: false,
              range: [{name: '按时间阶段生成Deposit', value: 3010001}, {name: '总体实现', value: 3010002}, {name: '按额度实现', value: 3010003}]
            },
            {name: 'repaidInterestUsage', type: 'number', describe: '回收利息使用规则', required: false},
            {name: 'repaidPrincipalUsage', type: 'number', describe: '回收本金使用规则', required: false}
          ],
          loanMinorProductDisable: [
            {name: 'id', type: 'number', describe: '贷款小类编码', required: false},
            {
              name: 'disable',
              type: 'number',
              describe: '是否禁用',
              required: false,
              range: [{name: '否', value: 0}, {name: '是', value: 1}]
            }
          ],
          depoMinorProductDisable: [
            {name: 'id', type: 'number', describe: '投资小类编码', required: false},
            {
              name: 'disable',
              type: 'number',
              describe: '是否禁用',
              required: false,
              range: [{name: '否', value: 0}, {name: '是', value: 1}]
            },
            {
              name: 'initialInvestmentPollType',
              describe: '初始投资意向归集方式（专有、共享）',
              required: true,
              range: [{name: '专有', value: 3009001}, {name: '共享', value: 3009002}]
            },
            {
              name: 'initialInvestmentPollAccount',
              describe: '初始投资意向归集科目',
              required: true,
              type: 'number',
              maxLength: 10
            },
            {
              name: 'initialInvestmentPollAccount',
              describe: '初始投资意向归集科目',
              type: 'number',
              required: true,
              maxLength: 10
            },
            {
              name: 'dealGeneration',
              describe: '存款交易生成方式（按时间阶段生成Deposit，总体实现，按额度实现）',
              type: 'number',
              required: true,
              range: [{name: '按时间阶段生成Deposit', value: 3010001}, {name: '总体实现', value: 3010002}, {name: '按额度实现', value: 3010003}]
            },
            {
              name: 'repaidInterestUsage',
              describe: '回收利息使用规则',
              required: true,
              range: [{name: '返现', value: 3011001}, {name: '存续在投', value: 3011002}]
            },
            {
              name: 'repaidPrincipalUsage',
              describe: '回收本金使用规则',
              required: true,
              range: [{name: '返现', value: 3012001}, {name: '存续在投', value: 3012002}]
            },
            {
              name: 'reinvestmentResidualBalanceTreatment',
              describe: '再投资剩余资金处置方式',
              required: true,
              range: [{name: '归还', value: 3008001}, {name: '尝试出清', value: 3008002}, {name: '留存继续使用', value: 3008003}]
            },
            {
              name: 'reinvestmentPollAccount',
              describe: '再投资意向归集科目',
              required: true,
              type: 'number',
              maxLength: 10
            },
            {
              name: 'reinvestmentPollType',
              describe: '再投资意向归集方式',
              required: true,
              type: 'number',
              maxLength: 10
            }
          ],
          fundingSourceSettingCreate: [
            {name: 'id', type: 'number', describe: '系统编码', required: false},
            {name: 'loanMajorProductId', type: 'number', describe: '贷款大类号', required: false},
            {name: 'phaseCode', type: 'number', describe: '期限编号', required: false},
            {name: 'externalGroupId', type: 'number', describe: '外部机构编号', required: true},
            {name: 'sequenceCode', type: 'number', describe: '顺序号', required: true},
            {name: 'depoMajorProductId', type: 'number', describe: '投资产品大类编码', required: false},
            {name: 'loanMinorProductId', type: 'number', describe: '贷款小类编号', required: false},
            {name: 'fundingCost', type: 'number', describe: '资金成本', required: false},
            {name: 'riskPrice', type: 'text', describe: '风险定价', required: false},
            {name: 'prepayMethod', type: 'number', describe: '提前还款策略', required: false},
            {name: 'feePenaltyMethod', type: 'number', describe: '违约金策略号', required: false},
            {name: 'feeInterestMethod', type: 'number', describe: '罚息策略号', required: false}
          ],
          fundingSourceSettingDisable: [
            {name: 'id', type: 'number', describe: '资金源设置编码', required: false},
            {
              name: 'disable',
              type: 'number',
              describe: '是否禁用',
              required: false,
              range: [{name: '否', value: 0}, {name: '是', value: 1}]
            }
          ],
          fundingSourceSettingSetSequence: [
            {name: 'id', type: 'number', describe: '资金源设置编码', required: false},
            {name: 'sequenceCode', type: 'number', describe: '顺序号', required: true}
          ],
          withdrawCreate: [
            {name: 'id', type: 'number', describe: '系统编码', required: false},
            {name: 'customerId', type: 'number', describe: '客户编码', required: false},
            {name: 'creditId', type: 'number', describe: '授信编码', required: true},
            {name: 'dealDate', type: 'date', describe: '交易发生日期', required: true},
            {name: 'amount', type: 'number', describe: '贷款金额', required: true},
            {name: 'phaseCode', type: 'number', describe: '贷款期限编码', required: true},
            {name: 'contractEntityId', type: 'number', describe: '签约机构编码', required: true},
            {name: 'externalGroupId', type: 'number', describe: '外部机构编码', required: true},
            {name: 'commodityId', type: 'number', describe: '外部机构商品编号', required: true},
            {name: 'sourceSystem', type: 'number', describe: '来源系统', required: true},
            {name: 'sourceId', type: 'number', describe: '来源系统编码', required: true}
          ],
          withdrawCancel: [
            {name: 'id', type: 'number', describe: '系统编码', required: false},
            {name: 'withdrawId', type: 'number', describe: '贷款申请编码', required: true}
          ],
          depoInvestCreate: [
            {name: 'id', type: 'number', describe: '系统编码', required: false},
            {name: 'minorProductId', type: 'number', describe: '投资小类编号', required: false},
            {
              name: 'investType',
              type: 'number',
              describe: '投资意向类型',
              required: false,
              range: [{name: '初始投资', value: 0}, {name: '回款再投', value: 1}]
            },
            {name: 'dealDate', type: 'date', describe: '交易日期', required: true},
            {name: 'customerId', type: 'number', describe: '客户编号', required: false},
            {name: 'amount', type: 'number', describe: '投资金额', required: true},
            {name: 'contractEntityId', type: 'number', describe: '签约机构编码', required: true},
            {name: 'balance', type: 'number', describe: '投资余额', required: true},
            {name: 'sourceSystem', type: 'number', describe: '发起系统业务号', required: true},
            {name: 'sourceId', type: 'number', describe: '发起系统号', required: true}
          ],
          fundingQueueEnter: [
            {name: 'id', type: 'number', describe: '系统编码', required: false},
            {name: 'customerId', type: 'number', describe: '客户编码', required: false},
            {name: 'investId', type: 'number', describe: '投资意向编码', required: false},
            {name: 'queueId', type: 'number', describe: '资金队列编码', required: false},
            {name: 'amount', type: 'number', describe: '投资意向金额', required: false}
          ],
          fundingQueueInvestLock: [
            {name: 'id', type: 'number', describe: '系统编码', required: false},
            {name: 'customerId', type: 'number', describe: '客户编码', required: false},
            {name: 'investId', type: 'number', describe: '投资意向编码', required: false},
            {name: 'queueId', type: 'number', describe: '资金队列编码', required: false},
            {name: 'amount', type: 'number', describe: '资金队列余额', required: false}
          ],
          fundingQueueInvestUnlock: [
            {name: 'id', type: 'number', describe: '系统编码', required: false},
            {name: 'customerId', type: 'number', describe: '客户编码', required: false},
            {name: 'investId', type: 'number', describe: '投资意向编码', required: false},
            {name: 'queueId', type: 'number', describe: '资金队列编码', required: false},
            {name: 'amount', type: 'number', describe: '资金队列余额', required: false}
          ],
          investCancel: [
            {name: 'id', type: 'number', describe: '系统编码', required: false},
            {name: 'customerId', type: 'number', describe: '客户编码', required: false},
            {name: 'queueId', type: 'number', describe: '资金队列编码', required: false},
            {name: 'investId', type: 'number', describe: '投资意向编码', required: false},
            {name: 'amount', type: 'number', describe: '投资意向金额', required: false}
          ],
          findFundingSource: [
            {name: 'id', type: 'number', describe: '系统编码', required: false},
            {
              name: 'offerType',
              type: 'number',
              describe: '挂牌类型',
              required: false,
              range: [{name: '一级市场发行', value: 1}, {name: '二级市场交易', value: 2}]
            },
            {name: 'offerReason', type: 'number', describe: '挂牌原因', required: true, range: [{name: '贷款申请', value: 0}]},
            {name: 'customerIId', type: 'number', describe: '客户号', required: true},
            {name: 'loanIId', type: 'number', describe: '贷款唯一编号', required: true}
          ],
          findingQueueCheck: [
            {name: 'id', type: 'number', describe: '系统编码', required: false},
            {
              name: 'offerType',
              type: 'number',
              describe: '挂牌类型',
              required: false,
              range: [{name: '一级市场发行', value: 1}, {name: '二级市场交易', value: 2}]
            },
            {name: 'offerReason', type: 'number', describe: '挂牌原因', required: true, range: [{name: '贷款申请', value: 0}]},
            {name: 'customerIId', type: 'number', describe: '客户号', required: true},
            {name: 'loanIId', type: 'number', describe: '贷款唯一编号', required: true},
            {
              name: 'queueType',
              type: 'number',
              describe: '资金队列类型',
              required: false,
              range: [{name: '专用', value: 3009001}, {name: '共享', value: 3009002}]
            },
            {name: 'useness', type: 'number', describe: '用途描述', required: true},
            {name: 'balance', type: 'number', describe: '可用金额', required: false}
          ],
          takeOffer: [
            {name: 'id', type: 'number', describe: '系统编码', required: false},
            {name: 'queueIId', type: 'number', describe: '资金队列编号', required: false},
            {name: 'offerIId', type: 'number', describe: '挂牌编号', required: false},
            {name: 'amount', type: 'number', describe: '发生金额', required: false},
            {
              name: 'offerType',
              type: 'number',
              describe: '挂牌类型',
              required: false,
              range: [{name: '一级市场发行', value: 1}, {name: '二级市场交易', value: 2}]
            },
            {name: 'offerReason', type: 'number', describe: '挂牌原因', required: true, range: [{name: '贷款申请', value: 0}]},
            {name: 'customerIId', type: 'number', describe: '客户号', required: true},
            {name: 'loanIId', type: 'number', describe: '贷款唯一编号', required: true},
            {
              name: 'queueType',
              type: 'number',
              describe: '资金队列类型',
              required: false,
              range: [{name: '专用', value: 3009001}, {name: '共享', value: 3009002}]
            },
            {name: 'useness', type: 'number', describe: '用途描述', required: true},
            {name: 'balance', type: 'number', describe: '可用金额', required: false},
            {name: 'riskPrice', type: 'number', describe: '风险价格', required: true}
          ],
          withDrawSigned: [
            {name: 'id', type: 'number', describe: '系统编码', required: false},
            {name: 'customerIId', type: 'number', describe: '客户编码', required: false},
            {name: 'creditIId', type: 'number', describe: '授信编码', required: true},
            {name: 'withdrawIId', type: 'number', describe: '贷款申请编码', required: true},
            {name: 'grantorIId', type: 'number', describe: '授信主体编码', required: true},
            {name: 'amount', type: 'number', describe: '金额', required: false},
            {name: 'share', type: 'number', describe: '贷款申请份额', required: false}
          ],
          match: [
            {name: 'id', type: 'number', describe: '系统编码', required: false},
            {
              name: 'offerType',
              type: 'number',
              describe: '挂牌类型',
              required: false,
              range: [{name: '一级市场发行', value: 1}, {name: '二级市场交易', value: 2}]
            },
            {name: 'offerReason', type: 'number', describe: '挂牌原因', required: true, range: [{name: '贷款申请', value: 0}]},
            {name: 'customerIId', type: 'number', describe: '客户号', required: true},
            {name: 'loanIId', type: 'number', describe: '贷款唯一编号', required: true}
          ],
          loanCreate: [
            {name: 'id', type: 'number', describe: '系统编码', required: false},
            {name: 'customerIId', type: 'number', describe: '客户编码', required: false},
            {name: 'creditIId', type: 'number', describe: '授信编号', required: true},
            {name: 'dealDate', type: 'date', describe: '交易发生日期', required: true},
            {name: 'amount', type: 'number', describe: '贷款金额', required: true},
            {name: 'phaseCode', type: 'number', describe: '贷款期限编码', required: true},
            {name: 'contractEntityIId', type: 'number', describe: '签约机构编码', required: true},
            {name: 'externalGroupIId', type: 'number', describe: '外部机构编码', required: true},
            {name: 'commodityIId', type: 'number', describe: '外部机构商品编号', required: true},
            {name: 'sourceSystem', type: 'number', describe: '来源系统', required: true},
            {name: 'sourceIId', type: 'number', describe: '来源系统编码', required: true}
          ],
          loanBillCreate: [
            {name: 'id', type: 'number', describe: '系统编码', required: false},
            {name: 'loanIId', type: 'number', describe: '贷款编码', required: false},
            {name: 'repayDate', type: 'date', describe: '还款日', required: true},
            {name: 'phase', type: 'number', describe: '账期', required: true},
            {name: 'openPrincipal', type: 'number', describe: '期初本金', required: true},
            {name: 'repayIInterest', type: 'number', describe: '当期利息', required: true},
            {name: 'repayPrincipal', type: 'number', describe: '当期本金', required: true},
            {name: 'closePrincipal', type: 'number', describe: '期末本金', required: true},
            {name: 'managementFee', type: 'number', describe: '应收管理费', required: true},
            {
              name: 'status',
              type: 'number',
              describe: '状态',
              required: true,
              range: [{name: '待还款', value: 3001001}, {name: '正常还款', value: 3001002}, {
                name: '逾期未还',
                value: 3001003
              }, {name: '逾期已还', value: 3001004}, {name: '提前还款', value: 3001005}]
            }
          ],
          loanBillRepay: [
            {name: 'id', type: 'number', describe: '系统编码', required: false},
            {name: 'loanIId', type: 'number', describe: '贷款编码', required: false},
            {name: 'planIId', type: 'number', describe: '还款计划号', required: false},
            {
              name: 'status',
              type: 'number',
              describe: '状态',
              required: true,
              range: [{name: '待还款', value: 3001001}, {name: '正常还款', value: 3001002}, {
                name: '逾期未还',
                value: 3001003
              }, {name: '逾期已还', value: 3001004}, {name: '提前还款', value: 3001005}]
            },
            {name: 'dueDate', type: 'date', describe: '还款日', required: true},
            {name: 'phase', type: 'number', describe: '还款期号', required: true},
            {name: 'duePrincipal', type: 'number', describe: '应还本金', required: false},
            {name: 'dueIInterest', type: 'number', describe: '应还利息', required: false},
            {name: 'dueManagementFee', type: 'number', describe: '应还管理费', required: false},
            {name: 'dueTotal', type: 'number', describe: '应还款总额', required: false},
            {name: 'billAmount', type: 'number', describe: '账单金额', required: false},
            {name: 'repaidPrincipal', type: 'number', describe: '实还本金', required: true},
            {name: 'repaidIInterest', type: 'number', describe: '实还利息', required: true},
            {name: 'repaidManagementFee', type: 'number', describe: '实还管理费', required: true},
            {name: 'repaidTotal', type: 'number', describe: '实还总额', required: true},
            {name: 'exemptPrincipal', type: 'number', describe: '本金减免', required: true},
            {name: 'exemptIInterest', type: 'number', describe: '利息减免', required: true},
            {name: 'exemptManagementFee', type: 'number', describe: '管理费减免', required: true},
            {name: 'repaidDate', type: 'date', describe: '实际还款日期', required: true}
          ],
          loanBillDefault: [
            {name: 'id', type: 'number', describe: '系统编码', required: false},
            {name: 'loanIId', type: 'number', describe: '贷款编码', required: false},
            {name: 'planIId', type: 'number', describe: '还款计划号', required: false},
            {
              name: 'status',
              type: 'number',
              describe: '状态',
              required: true,
              range: [{name: '待还款', value: 3001001}, {name: '正常还款', value: 3001002}, {
                name: '逾期未还',
                value: 3001003
              }, {name: '逾期已还', value: 3001004}, {name: '提前还款', value: 3001005}]
            },
            {name: 'dueDate', type: 'date', describe: '还款日', required: true},
            {name: 'overDueDays', type: 'number', describe: '逾期天数', required: true},
            {name: 'phase', type: 'number', describe: '还款期号', required: true},
            {name: 'duePrincipal', type: 'number', describe: '应还本金', required: false},
            {name: 'dueIInterest', type: 'number', describe: '应还利息', required: false},
            {name: 'dueManagementFee', type: 'number', describe: '应还管理费', required: false},
            {name: 'dueTotal', type: 'number', describe: '应还款总额', required: false},
            {name: 'billAmount', type: 'number', describe: '账单金额', required: false},
            {name: 'exemptPrincipal', type: 'number', describe: '本金减免', required: true},
            {name: 'exemptIInterest', type: 'number', describe: '利息减免', required: true},
            {name: 'exemptManagementFee', type: 'number', describe: '管理费减免', required: true},
            {name: 'dueFeePenalty', type: 'number', describe: '应收违约金', required: true},
            {name: 'dueFeeIInterest', type: 'number', describe: '应收罚息', required: true},
            {name: 'dueFeeManagement', type: 'number', describe: '应收逾期管理费', required: true}
          ],
          loanBillDefaultRepay: [
            {name: 'id', type: 'number', describe: '系统编码', required: false},
            {name: 'loanIId', type: 'number', describe: '贷款编码', required: false},
            {name: 'planIId', type: 'number', describe: '还款计划号', required: false},
            {
              name: 'status',
              type: 'number',
              describe: '状态',
              required: true,
              range: [{name: '待还款', value: 3001001}, {name: '正常还款', value: 3001002}, {
                name: '逾期未还',
                value: 3001003
              }, {name: '逾期已还', value: 3001004}, {name: '提前还款', value: 3001005}]
            },
            {name: 'dueDate', type: 'date', describe: '还款日', required: true},
            {name: 'overDueDays', type: 'number', describe: '逾期天数', required: true},
            {name: 'phase', type: 'number', describe: '还款期号', required: true},
            {name: 'duePrincipal', type: 'number', describe: '应还本金', required: false},
            {name: 'dueTotal', type: 'number', describe: '应还款总额', required: false},
            {name: 'billAmount', type: 'number', describe: '账单金额', required: false},
            {name: 'repaidPrincipal', type: 'number', describe: '实还本金', required: true},
            {name: 'repaidTotal', type: 'number', describe: '实还总额', required: true},
            {name: 'dueFeePenalty', type: 'number', describe: '应收违约金', required: true},
            {name: 'dueFeeInterest', type: 'number', describe: '应收罚息', required: true},
            {name: 'dueFeeManagement', type: 'number', describe: '应收逾期管理费', required: true},
            {name: 'repaidFeePenalty', type: 'number', describe: '实还违约金', required: true},
            {name: 'repaidFeeInterest', type: 'number', describe: '实还罚息', required: true},
            {name: 'repaidFeeManagement', type: 'number', describe: '实还逾期管理费', required: true},
            {name: 'exemptFeePenalty', type: 'number', describe: '违约金减免', required: true},
            {name: 'exemptFeeInterest', type: 'number', describe: '罚息减免', required: true},
            {name: 'exemptFeeManagement', type: 'number', describe: '逾期管理费减免', required: true},
            {name: 'repaidDate', type: 'date', describe: '实际还款日期', required: true}
          ],
          deliver: [
            {name: 'id', type: 'number', describe: '系统编码', required: true},
            {name: 'customerId', type: 'number', describe: '客户号', required: true},
            {name: 'withdrawId', type: 'number', describe: '提款申请惟一号(注，这里二级市场交易时也用withdrawid代表loan)', required: true},
            {name: 'loanId', type: 'number', describe: '贷款惟一号', required: true},
            {name: 'fundingQueueId', type: 'number', describe: '资金队列唯一号', required: true},
            {
              name: 'offerType',
              type: 'number',
              describe: '挂牌类型:1一级市场发行;2二级市场交易',
              range: [
                {name: '一级市场发行', value: 1},
                {name: '二级市场交易', value: 2}
              ],
              required: false
            },
            {name: 'positionOfferId', type: 'number', describe: '头寸号', required: false},
            {name: 'dealDate', type: 'date', describe: '交易日期', required: false},
            {name: 'baseShare', type: 'number', describe: '总份数', required: false},
            {name: 'baseFullValue', type: 'number', describe: '总全价', required: false},
            {name: 'baseNetValue', type: 'number', describe: '总净价', required: false},
            {name: 'baseAccrualInterest', type: 'number', describe: '总应计得息', required: false},
            {name: 'dealShare', type: 'number', describe: '转让份额', required: false},
            {name: 'dealNetValue', type: 'number', describe: '转让净价', required: false},
            {name: 'dealFullValue', type: 'number', describe: '转让全价', required: false},
            {name: 'dealAccrualInterest', type: 'number', describe: '转让应计利息', required: false},
            {name: 'majorDepoProductId', type: 'number', describe: '适配资金渠道', required: false},
            {name: 'minorLoanProductId', type: 'number', describe: '适配贷款产品', required: false},
            {
              name: 'offerStatus',
              describe: '交易状态(3027001挂牌，3027002配资，3027003签约，3027004确认，3027005取消，3027006过期)',
              range: [
                {name: '挂牌', value: 3027001},
                {name: '配资', value: 3027002},
                {name: '签约', value: 3027003},
                {name: '确认', value: 3027004},
                {name: '取消', value: 3027005},
                {name: '过期', value: 3027006}
              ],
              required: false
            },
            {
              name: 'deliver',
              describe: '资金交割状态（3028001未交割,3028002已交割）',
              range: [
                {name: '未交割', value: 3028001},
                {name: '已交割', value: 3028002}
              ],
              required: false
            }
          ],
          loanBillExempt: [
            {name: 'id', type: 'number', describe: '系统编码', required: true},
            {name: 'loanId', type: 'number', describe: '贷款编码', required: true},
            {name: 'planId', type: 'number', describe: '还款计划号', required: true},
            {
              name: 'status',
              type: 'number',
              describe: '状态',
              required: true,
              range: [{name: '待还款', value: 3001001}, {name: '正常还款', value: 3001002}, {
                name: '逾期未还',
                value: 3001003
              }, {name: '逾期已还', value: 3001004}, {name: '提前还款', value: 3001005}]
            },
            {name: 'dueDate', type: 'date', describe: '还款日', required: true},
            {name: 'overDueDays', type: 'number', describe: '逾期天数', required: true},
            {name: 'phase', type: 'number', describe: '还款期号', required: true},
            {name: 'duePrincipal', type: 'number', describe: '应还本金', required: false},
            {name: 'dueInterest', type: 'number', describe: '应还利息', required: false},
            {name: 'dueManagementFee', type: 'number', describe: '应还管理费', required: false},
            {name: 'dueTotal', type: 'number', describe: '应还款总额', required: false},
            {name: 'billAmount', type: 'number', describe: '账单金额', required: false},
            {name: 'exemptPrincipal', type: 'number', describe: '本金减免', required: true},
            {name: 'exemptInterest', type: 'number', describe: '利息减免', required: true},
            {name: 'exemptManagementFee', type: 'number', describe: '管理费减免', required: true},
            {name: 'dueFeePenalty', type: 'number', describe: '应收违约金', required: true},
            {name: 'dueFeeInterest', type: 'number', describe: '应收罚息', required: true},
            {name: 'dueFeeManagement', type: 'number', describe: '应收逾期管理费', required: true},
            {name: 'exemptFeePenalty', type: 'number', describe: '违约金减免', required: true},
            {name: 'exemptFeeInterest', type: 'number', describe: '罚息减免', required: true},
            {name: 'exemptFeeManagement', type: 'number', describe: '逾期管理费减免', required: true}
          ],
          DepositCreate: [
            {name: 'id', type: 'number', describe: '系统编码', required: true},
            {name: 'customerId', type: 'number', describe: '客户编码', required: true},
            {name: 'dealDate', type: 'date', describe: '交易日', required: false},
            {name: 'valueDate', type: 'date', describe: '起息日', required: false},
            {name: 'maturity', type: 'date', describe: '到期日', required: false},
            {name: 'amount', type: 'number', describe: '金额', required: false},
            {name: 'investId', type: 'number', describe: '投资操作交易号', required: true},
            {name: 'contractEntityId', type: 'number', describe: '签约机构', required: false},
            {name: 'minorProductId', type: 'number', describe: '购买产品号', required: false},
            {name: 'serviceAgreementId', type: 'number', describe: '服务协议合同号', required: true},
            {name: 'dealAgreementId', type: 'number', describe: '交易协议合同号', required: true}
          ],
          recharge: [
            {name: 'id', type: 'number', describe: '系统编码', required: true},
            {name: 'customerId', type: 'number', describe: '客户编码', required: true},
            {name: 'amount', type: 'number', describe: '充值金额', required: true}
          ],
          enchashment: [
            {name: 'id', type: 'number', describe: '系统编码', required: true},
            {name: 'customerId', type: 'number', describe: '客户编码', required: true},
            {name: 'amount', type: 'number', describe: '充值金额', required: true}
          ],
          repayment: [
            {name: 'customerId', type: 'number', describe: '客户编码', required: true},
            {name: 'amount', type: 'number', describe: '还款总额', required: true}
          ]
        },
        requestParam: {}
      }
    },
    props: ['paramsValue', 'requestUrl'],
    methods: {
      submitValue: function () {
        let result = true
        var requireArr = []
        let checkedInterface = this.data[this.paramsValue]
        for (let i = 0, length = checkedInterface.length; i < length; i++) {
          if (checkedInterface[i].required) {
            requireArr.push(checkedInterface[i])
          }
          if (checkedInterface[i].changeType && typeof this.requestParam[checkedInterface[i].name] !== 'undefined') {
            console.log(checkedInterface[i].name + ' value:' + this.requestParam[checkedInterface[i].name])
            this.requestParam[checkedInterface[i].name] = this.requestParam[checkedInterface[i].name].replace(/-/ig, '/')
          }
        }
        for (let i = 0, len = requireArr.length; i < len; i++) {
          if (!(typeof this.requestParam[requireArr[i].name] !== 'undefined' && this.requestParam[requireArr[i].name] !== '')) {
            alert(requireArr[i].describe + '参数是必须的')
            result = false
            return false
          }
        }
        if (!result) {
          alert('参数不全！')
          return false
        }
        if (!this.requestUrl || !this.paramsValue) {
          alert('请选择测试方法后在继续操作！')
          return false
        }
        let self = this
        let cookies = this.getCookie()
        for (var i = 0, len = cookies.length; i < len; i++) {
          this.requestParam[cookies[i].name] = cookies[i].value
        }
        $.ajax({
          url: 'http://10.4.34.220:9000' + self.parseUrl(self.requestUrl, self.requestParam),
          data: this.requestParam,
          timeout: 8000,
          method: 'post',
          success: (data) => {
            if (data.status === 1100 || data.status === 1000) {
              window.Event.$emit('requestData', {
                blockName: self.paramsValue,
                singned: false,
                execTime: self.getExecTime(),
                result: data
              })
            } else {
              window.Event.$emit('requestData', {
                blockName: self.paramsValue,
                singned: true,
                execTime: self.getExecTime(),
                result: data
              })
            }
          },
          error: (err) => {
            window.Event.$emit('requestErr', {
              blockName: self.paramsValue,
              singned: true,
              execTime: self.getExecTime(),
              result: err
            })
          }
        })
      },
      getCookie: function () {
        let cookie = document.cookie
        let cookieArray = cookie.split('; ')
        let result = []
        for (var i = 0, len = cookieArray.length; i < len; i++) {
          result.push({name: cookieArray[i].split('=')[0], value: cookieArray[i].split('=')[1]})
        }
        return result
      },
      parseUrl: function (url, json) {
        let result = ''
        if (typeof url !== 'undefined' && url !== '' && json !== '' && json !== 'undefined') {
          result = url.replace(/\{[a-zA-Z0-9_]+\}/ig, function () {
            let name = arguments[0].substring(1, arguments[0].length - 1)
            console.log('arguments[0]:' + arguments[0] + ' name:' + name + ' json:' + json[name])
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
    }
  }
</script>
