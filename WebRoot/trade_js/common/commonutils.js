/**
 * 常用的工具方法
 * 
 * @author wangliang
 * @param {} str
 * @return {Boolean}
 */

function Trim(str) {
	return $.trim(str);
}

function isEmpty(str) {
	if (Trim(str) != null && Trim(str) != '' && Trim(str) != 'undefined' && Trim(str) != 'null') {
		return false;
	}
	return true;
}

function isNotEmpty(str) {
	return !isEmpty(str);
}

function TrimNull(text) {
	return (text == null || Trim(text) == '' || Trim(text) == 'undefined' || Trim(text) == 'null') ? '&nbsp;---' : Trim(text);
}

function nullToStr(text) {
	return (text == null || Trim(text) == '' || Trim(text) == 'undefined' || Trim(text) == 'null') ? '' : Trim(text);
}

function getSubString(str, start) {
	if (isEmpty(str))
	    return '';
	if (parseInt(start) < 0)
	    start = str.length + start;
	if (parseInt(start) < 0)
	    start = 0;
	if (parseInt(start) > str.length)
	    return '';
	return str.substr(start);
}

function getSubStringFull(str, start, end) {
	if (isEmpty(str))
	    return '';
	if (parseInt(end) < 0)
	    end = str.length + end;
	if (parseInt(start) < 0)
	    start = str.length + start;
	if (parseInt(end) > str.length)
	    end = str.length;
	if (parseInt(start) > end)
	    return '';
	if (parseInt(start) < 0)
	    start = 0;
	if (parseInt(end) < 0)
	    end = 0;
	return str.substring(start, end);
}

function removeSpecialCharsFull(str, chars, isFirst, isEnd) {
	if (isEmpty(str) || isEmpty(chars)) {
		return str;
	}

	if (isFirst) {
		while (str.indexOf(chars) == 0) {
			str = getSubString(str, chars.length);
		}
	}

	if (isEnd) {
		while (str.lastIndexOf(chars) == str.length - chars.length) {
			str = getSubStringFull(str, 0, str.length - chars.length);
		}
	}
	return str;
}

function removeSpecialChars(str, chars) {
	return removeSpecialCharsFull(str, chars, true, true);
}

function parseStringToShortDate(dateStr) {
	//birth.substring(0,4) + '--' + (parseInt(birth.substring(5,7))-1) + '--' + birth.substr(8)
	var month = parseInt(dateStr.substring(5,7))-1;
	if(month.length < 2) {
		month = '0' + month;
	}
	var date = new Date();
	date.setYear(dateStr.substring(0,4));
	date.setMonth(month);
	date.setDate(dateStr.substring(8, 10));
	date.setHours(8);
	
	return date;
}

function parseStringToLongDate(dateStr) {
	//birth.substring(0,4) + '--' + (parseInt(birth.substring(5,7))-1) + '--' + birth.substr(8)
	// 2012-06-19 11:39:02
	var month = parseInt(dateStr.substring(5,7))-1;
	if(month.length < 2) {
		month = '0' + month;
	}
	var date = new Date();
	//date.setYear(dateStr.substring(0,4));
	//date.setMonth(month);
	//date.setDate(dateStr.substring(8, 10));
	date.setFullYear(dateStr.substring(0,4), month, dateStr.substring(8, 10));
	date.setHours(dateStr.substring(11, 13));
	date.setMinutes(dateStr.substring(14, 16));
	date.setSeconds(dateStr.substr(17));
	
	return date;
}

/*将String类型解析为Date类型.   
parseDate('2006-1-1') return new Date(2006,0,1)   
parseDate(' 2006-1-1 ') return new Date(2006,0,1)   
parseDate('2006-1-1 15:14:16') return new Date(2006,0,1,15,14,16)   
parseDate(' 2006-1-1 15:14:16 ') return new Date(2006,0,1,15,14,16);   
parseDate('2006-1-1 15:14:16.254') return new Date(2006,0,1,15,14,16,254)   
parseDate(' 2006-1-1 15:14:16.254 ') return new Date(2006,0,1,15,14,16,254)   
parseDate('不正确的格式') retrun null   
*/    
function parseDate(str) {
	if (typeof str == 'string') {
		var results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) *$/);
		if (results && results.length > 3)
			return new Date(parseInt(results[1]), parseInt(results[2]) - 1, parseInt(results[3]));
		results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2}) *$/);
		if (results && results.length > 6)
			return new Date(parseInt(results[1]), parseInt(results[2]) - 1, parseInt(results[3]), parseInt(results[4]), parseInt(results[5]),
					parseInt(results[6]));
		results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2})\.(\d{1,9}) *$/);
		if (results && results.length > 7)
			return new Date(parseInt(results[1]), parseInt(results[2]) - 1, parseInt(results[3]), parseInt(results[4]), parseInt(results[5]),
					parseInt(results[6]), parseInt(results[7]));
	}
	return null;
}     
  
/*
 * 将Date/String类型,解析为String类型. 
 * 传入String类型,则先解析为Date类型 
 * 不正确的Date,返回 '' 
 * 如果时间部分为0,则忽略,只返回日期部分.
 * t: 类型，空或者'l',带时间；'s'，不带时间
 */    
function formatDate(v,t) {
	if (typeof v == 'string')
		v = parseDate(v);
	if (v instanceof Date) {
		var y = v.getFullYear();
		var m = (v.getMonth() + 1) < 10 ? ('0' + (v.getMonth() + 1)) : (v.getMonth() + 1);
		var d = v.getDate() < 10 ? ('0' + v.getDate()) : v.getDate();
		var h = v.getHours() < 10 ? ('0' + v.getHours()) : v.getHours();
		var i = v.getMinutes() < 10 ? ('0' + v.getMinutes()) : v.getMinutes();
		var s = v.getSeconds() < 10 ? ('0' + v.getSeconds()) : v.getSeconds();
		var ms = v.getMilliseconds();
		if (ms > 0) {
			if(t == 's') {
				return y + '-' + m + '-' + d;
			} else {
				return y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s + '.' + ms;
			}
		}
		if (h > 0 || i > 0 || s > 0) {
			if(t == 's') {
				return y + '-' + m + '-' + d;
			} else {
				return y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s;
			}
		}
		return y + '-' + m + '-' + d;
	}
	return '';
}     

/**
 * 获取当前日期字符串
 * 
 * @author wangliang
 */
function getCurrentTimeStr() {
	var currenttime = new Date();
	var year = currenttime.getYear();
	var month = parseInt(currenttime.getMonth()+1) < 10 ? ('0' + (currenttime.getMonth()+1)) : (currenttime.getMonth()+1);
	var date = parseInt(currenttime.getDate()) < 10 ? ('0' + currenttime.getDate()) : currenttime.getDate();
	var hour = parseInt(currenttime.getHours()) < 10 ? ('0' + currenttime.getHours()) : currenttime.getHours();
	var minute = parseInt(currenttime.getMinutes()) < 10 ? ('0' + currenttime.getMinutes()) : currenttime.getMinutes();
	var second = parseInt(currenttime.getSeconds()) < 10 ? ('0' + currenttime.getSeconds()) : currenttime.getSeconds();
	
	return year + month + date + hour + minute + second;
}

/**
 * 将liger中的超链接转换为蓝色加下划线
 * 
 * @param str
 * @returns {String}
 */
function toHyperlink(str, color) {
	return '<font color=' + (isEmpty(color) ? 'blue' : color) + '><u>' + str + '</u></font>';
}

/**
 * 判断是否IE浏览器
 * 
 * @return {Boolean}
 */
function isIE() {
	if(document.all)
		return true;
	return false;
}

/**
 * 获取当前获得焦点的元素
 * 
 * @param e
 * @returns
 */
function getFocus(e) // e = event
{
	var target; // initialisation
	if ("activeElement" in document) {
		target = document.activeElement; // Si IE
	} else {
		target = e ? e.explicitOriginalTarget : null; // Si Firefox
	}
	return target;
}

/**
 * 弹出某元素的全部属性
 * 
 * @param obj
 */
function allPrpos(obj) { 
    // 用来保存所有的属性名称和值
    var props = "";
    // 开始遍历
    for(var p in obj){ 
        // 方法
        if(typeof(obj[p])=="function"){ 
            obj[p]();
        }else{ 
            // p 为属性名称，obj[p]为对应属性的值
            props+= p + "=" + obj[p] + "\t";
        } 
    } 
    // 最后显示所有的属性
    alert(props);
}

/** 
 * 合并两个json对象属性为一个对象 
 * 
 * @param jsonbject1 
 * @param jsonbject2 
 * @returns resultJsonObject 
 */
$.mergeJsonObject = function(jsonbject1, jsonbject2) {
	var resultJsonObject = {};
	for ( var attr in jsonbject1) {
		resultJsonObject[attr] = jsonbject1[attr];
	}
	for ( var attr in jsonbject2) {
		resultJsonObject[attr] = jsonbject2[attr];
	}

	return resultJsonObject;
};

/**
 * 将对象转换为URL参数
 * @param obj
 * @returns
 */
function toParameter(obj){
    if(obj === null || obj === undefined){
        return '';
    }
    if(obj instanceof Number || obj instanceof Boolean || obj instanceof String){
        return obj.valueOf();
    }
    var url = [];
    var value;
    for(var name in obj){
        switch(typeof obj[name]){
            case 'string' :
            case 'number' :
            case 'boolean' :
                value = obj[name].toString();
                break;
            case 'object' :
                value = arguments.callee(obj[name]);
                break;
            case 'function' :
            case 'undefined' :
                value = '';
        }
        //url.push(name + '=' + encodeURIComponent(encodeURIComponent(value)));
        url.push(name + '=' + value);
    }
    return url.join('&');
}

/**
 * 将URL参数转换为对象
 * @param para
 * @returns
 */
function parseParameter(para){
    if(para.indexOf('=') == -1){
        return para;
    }
    var obj = {}, len, i, onePara, name, value;
    paraArr = para.split('&');
    len = paraArr.length;
    for(i = 0; i < len; i++){
        onePara = paraArr[i];
        onePara = onePara.split('=');
        name = onePara[0];
        value = arguments.callee(decodeURIComponent(onePara[1]));
        obj[name] = value;
    }
    return obj;
}

/**
 * 获取url参数集合
 * @returns {Array}
 */
function getUrlVars() {
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for (var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
		if(hash.length > 1) {
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
	}
	return vars;
}

/**
 * 根据当前语言设置解析字典表
 * 
 * @param key
 * @param value
 * @returns
 */
function getDict(key, value, language) {
	if(isEmpty(value)) {
		return "";
	}
	language = isEmpty(language) ? '0' : language;
	if(language == '0') {
		return systemparam[key.toUpperCase()][value];
	} else {
		return systemparamE[key.toUpperCase()][value];
	}
}

/**
 * 解析是否启用标识
 * 
 * @param value
 */
function getStrtUseInd(value) {
	if(parseInt(value) == 1) {
		return '<font color=green>是</font>';
	}
	return '<font color=red>否</font>';
}

/**
 * 刷新grid
 */
reloadGrid = function(gridId) {
	var manager = $("#" + gridId).ligerGetGridManager();
	manager.loadData(true);
};

// email验证的正则
var emailReg = /^(?:[a-z\d]+[_\-\+\.]?)*[a-z\d]+@(?:([a-z\d]+\-?)*[a-z\d]+\.)+([a-z]{2,})+$/i;
//ip地址
var ip4 = /^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$/;	

/**
 * 正则表达式验证
 * 
 * @param {} regular	正则表达式
 * @param {} value		要验证的值
 * @return {Boolean}
 */
function checkByRegExp(regular, value) {   
     if (isIE()) {        
		if (value.match(regular) == null) {
			return false;
		}
		return true;
    }
    else {         
        var re = new RegExp(regular); 
        if (!re.exec(value)) {
            return false;
        }
        return true;
    }
}

/**
 * 居中弹出窗口
 * 
 * @param url
 *            弹出窗口URL
 * @param name
 *            弹出窗口名称
 * @param width
 *            宽度
 * @param height
 *            高度
 * @param isScroll
 *            是否开启自动滚动条
 * @param isDialog
 *            是否为对框模式
 */
function newWindow(url, name, iWidth, iHeight, isScroll, isDialog) {
	if (isScroll)
		isScroll = 'yes';
	else
		isScroll = 'no';
	var iTop = (window.screen.availHeight - 30 - iHeight) / 2;// 获取窗口的垂直位置
	var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;// 获取窗口的水平位置
	var settings = 'height=' + iHeight + ',innerHeight=' + iHeight + ',width='
			+ iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left='
			+ iLeft + ',tollbar=no,menubar=no,scrollbars=' + isScroll
			+ ',resizeable=1,location=no,status=no,fullscreen=no';
	if (isDialog)
		window.showModalDialog(url, name, settings);
	else
		window.open(url, name, settings);
}

Date.prototype.Format = function(fmt) {
	//author: meizz 
	var o = {
		"M+" : this.getMonth() + 1, //月份 
		"d+" : this.getDate(), //日 
		"h+" : this.getHours(), //小时 
		"m+" : this.getMinutes(), //分 
		"s+" : this.getSeconds(), //秒 
		"q+" : Math.floor((this.getMonth() + 3) / 3), //季度 
		"S" : this.getMilliseconds()
		//毫秒 
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4
						- RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1)
							? (o[k])
							: (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
};

Date.prototype.addDays = function(d) {
	this.setDate(this.getDate() + d);
};

Date.prototype.addWeeks = function(w) {
	this.addDays(w * 7);
};

Date.prototype.addMonths = function(m) {
	var d = this.getDate();
	this.setMonth(this.getMonth() + m);

	if (this.getDate() < d) 
		this.setDate(0);
};

Date.prototype.addYears = function(y) {
	var m = this.getMonth();
	this.setFullYear(this.getFullYear() + y);

	if (m < this.getMonth()) {
		this.setDate(0);
	}
};
