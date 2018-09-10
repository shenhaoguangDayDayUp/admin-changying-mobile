import Vue from 'vue';
// 日期
export function formatDate(date, fmt) {
  // console.log(typeof(fmt))
  fmt = fmt.replace(/\"/g, "");
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	};
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + '';
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
		}
	}
	return fmt;
};
function padLeftZero(str) {
	return ('00' + str).substr(str.length);
}
// 日期时间戳
export function timestamp(date) { 
  return Date.parse(new Date(date));
};

const digitsRE = /(\d{3})(?=\d)/g
//金额
export function currency (value, currency, decimals) {
  value = parseFloat(value) / 100
  if (!isFinite(value) || (!value && value !== 0)) return ''
  currency = currency != null ? currency : '￥'
  decimals = decimals != null ? decimals : 2
  var stringified = Math.abs(value).toFixed(decimals)
  var _int = decimals
    ? stringified.slice(0, -1 - decimals)
    : stringified
  var i = _int.length % 3
  var head = i > 0
    ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
    : ''
  var _float = decimals
    ? stringified.slice(-1 - decimals)
    : ''
  var sign = value < 0 ? '-' : ''
  return sign + currency + head +
    _int.slice(i).replace(digitsRE, '$1,') +
    _float
}

// 状态
export function mbrStatus (value) {
  switch(value)
  {
    case "VALID":
      return "有效";
    case "SUSPEND":
      return "吊销";
    case "CLOSE":
      return "关闭";
    default:
      return "-";
  }
}
// 提交状态
export function submitStatus (value) {
  switch(value)
  {
    case "有效":
      return "VALID";
    case "吊销":
      return "SUSPEND";
    case "关闭":
      return "CLOSE";
    default:
      return "-";
  }
}
// 奖金池类型
export function prizeType (value) {
  switch(value)
  {
    case "PAYOUT":
      return "奖金";
    case "BET":
      return "下注";
    case "REDEEM":
      return "兑换";
    case "RECHARGE": 
      return "充值";
    case "BONUS": 
      return "贈送";
    default:
      return "-";
      
  }
}

// 支付方式
export function paymentMethod (value) {
  switch(value)
  {
    case "ALIPAY_PAGE":
      return "支付宝网页";
    case "ALIPAY_F2F":
      return "支付宝扫码";
    case "WEIXIN_NATIVE":
      return "支付宝扫码";
    default:
      return "-";
  }
}

Vue.filter('currency', (value, currency = '￥', decimals = 2) => {
    if(value){
      return value.toLocaleString()
    }else{
      return 0;
    }
})
Vue.filter('dateFilter', (val, fmt = 'yyyy-MM-dd hh:mm:ss') => {
  // Vue.filter('dateFilter', (val, fmt = 'yyyy-MM-dd') => {
    if (!val) return '-';
    let time = new Date(val);
    return formatDate(time, fmt)
});
Vue.filter('timeStampFilter', (val) => {
  return timestamp(val)
});
Vue.filter('statusFilter', (val) => {
  if (!val) return '-';
  return mbrStatus(val)
});
Vue.filter('submitStatusFilter', (val) => {
  return submitStatus(val)
});
Vue.filter('paymentMethodFilter', (val) => {
  if (!val) return '-';
  return paymentMethod(val)
});
Vue.filter('prizeTypeFilter', (val) => {
  return prizeType(val)
});
Vue.filter('orderStatus', val => {
  return {
      "REQUEST": "待支付",
      "PROCESS": "待收货",
      "SUCCESS": "成功",
      "CANCEL": "取消",
  }[val]
})
Vue.filter('productStatus',val=>{
  return {
    "CLOSE": "已下架",
    "VALID": "上架中",
}[val]
})
Vue.filter('date', (val,type) => {
  if(type =='start'){
    var start = new Date(val); // Wed Apr 18 2018 00:00:00 GMT+0800 (中国标准时间)
    start.setHours(0, 0, 0, 0); // 设置指定的时间的小时字段。
    start = start.getTime() //时间戳
    return start
  }else{
    var end = new Date(val);
    end.setHours(23, 59, 59, 59);
    end = end.getTime()
    return end 
  }
  // new Date(1526659199059)           // new Date()) 转化出来是标准时间
  // Fri May 18 2018 23:59:59 GMT+0800 (中国标准时间)
  // new Date(new Date(1526659199059)) // new Date(new Date()) 转化出来 还！是 ！标准时间！！
  // Fri May 18 2018 23:59:59 GMT+0800 (中国标准时间)
})
// 积分前面的正负号
Vue.filter('amount', (category,val,type) => { 
  if(category == "game"){ //游戏
      switch(type)
      {
        case "PAYOUT": // 奖金
          return "- "+val;
        case "BET": // 下注
          return "+ "+val;
        case "RECHARGE": // 充值
          return "+ "+val;
        case "BONUS": // 贈送
          return "-"+val;
        case "REDEEM": //兑换
          return "+ "+val;
        default:
          return "-";
      }
  } else if (category == "mbr") { //会员
    switch(type)
      {
        case "PAYOUT": // 奖金
          return "+ "+val;
        case "BET": // 下注
          return "- "+val;
        case "RECHARGE": // 充值
          return "+ "+val;
        case "BONUS": // 贈送
          return "+"+val;
        case "REDEEM": //兑换
          return "- "+val;
        default:
          return "-";
      }
  }else{
    switch(type)
    {
      case "PAYOUT":
        return "- ";
      case "BET":
        return "+ ";
      default:
        return "-";
    }
  }
})

Vue.prototype.$dateFilter = Vue.filter('dateFilter'); // 日期格式化
Vue.prototype.$timeStampFilter = Vue.filter('timeStampFilter'); // 时间戳
Vue.prototype.$currency = Vue.filter('currency'); // 金额
Vue.prototype.$statusFilter = Vue.filter('statusFilter'); // 状态
Vue.prototype.$submitStatusFilter = Vue.filter('submitStatusFilter'); // 提交状态
Vue.prototype.$paymentMethodFilter = Vue.filter('paymentMethodFilter'); // 支付方式
Vue.prototype.$prizeTypeFilter = Vue.filter('prizeTypeFilter'); // 奖金池类型
Vue.prototype.$amountTypeFilter = Vue.filter('amount'); // 积分正负号
Vue.prototype.$orderStatus = Vue.filter('orderStatus');
Vue.prototype.$date = Vue.filter('date')
Vue.prototype.$productStatus = Vue.filter('productStatus')