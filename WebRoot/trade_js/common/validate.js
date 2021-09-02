
// Email 验证
function isValidEmail(sText) {
	var reEmail = /^(?:\w+\.?)*\w+@(?:\w+\.?)*\w+$/;
	return reEmail.test(sText);
}

// 手机验证
function isValidHand(sText) {
	return /^1\d{10}$|^0\d{10,11}$/.test(sText);
}

// 手机及小灵通验证
function isValidMobileXLT(sText) {
	alert("bbb");
	return /^1\d{10}$|^0\d{10,11}$/.test(sText);
}

// 身份证
function isIDCrid(tText) {
	var isIDCard1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
	var isIDCard2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[A-Z])$/;
	if (isIDCard1.test(tText) || isIDCard2.test(tText)) {
		return true;
	} else {
		return false;
	}

}

// 国内电话
function isPhone(sText) {
	var phone = /^((\d){3})(-(\d){8})/;
	var phone1 = /^((\d){4})(-(\d){7})/;
	if (phone.test(sText) || phone1.test(sText)) {
		return true;
	} else {
		return false;
	}

}

function money(type) {
	var types = type.toString();
	var vars = [];
	var varlen = types.length;
	var len = types.indexOf('.');
	var newValues = '';
	if (len > 0) {
		vars = types.split('.');
		decimal = vars[1];
		var newDecimal;
		if (decimal.length >= 2) {
			newDecimal = decimal.substr(0, 2);
		} else if (decimal.length < 2) {
			newDecimal = decimal.substr(0, 1) + '0';
		}
		newValues = vars[0] + '.' + newDecimal;
	} else {
		if (varlen > 3) {
			var tt = Math.floor(varlen / 3);
			var sst = varlen % 3;
			var strS = types.substr(0, sst); // 前面的
			var str = types.substring(sst, varlen);
			var integers = [];
			for (var i = 1; i <= tt; i++) {
				strS = strS + "," + str.substr((i - 1) * 3, 3);
			}
			newValues = strS + ".00";
			if (sst == 0) {
				newValues = newValues.substring(1, newValues.length);
			}
		}
	}
	return newValues;
}

function f_check_mobile(obj) {
	var regu = /(^[1][3][0-9]{9}$)|(^0[1][3][0-9]{9}$)/;
	var re = new RegExp(regu);
	if (re.test(obj.value)) {
		return true;
	}
	// f_alert(obj,"请输入正确的手机号码");
	return false;
}
/**
 * 验证radio是否选中
 * @param {} array
 */

Ext.apply(Ext.form.VTypes, {
	card : function(val, field) {
		if (field.cardField) {
			var data = Ext.getCmp(field.cardField);
			return isIDCrid(data.getValue());
		}
		return true;
	},
	cardText : '身份证填写有误,请输入匹配形式如:15位或者18位身份证号码 !',

	"phone" : function(sText) {

		var reg =  /^0*(13|15)\d{9}$/;
		if (reg.test(sText))
			return true;
		else
			return false;
	},
	phoneText : "请输入正确的电话或手机号码格式！",

	lawlessChar : function(val) {
		var lawlessChar = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
		if (lawlessChar.test(val)) {
			return true;
		} else {
			return false;
		}
	},
	lawlessCharText : '格式应由汉字、数字、字母或下划线组成.',

	handPhone : function(val, field) {
		if (field.handField) {
			var data = Ext.getCmp(field.handField);
			return isValidHand(data.getValue());
		}
		return true;
	},
	handPhoneText : '手机填写有误!'
});

// Ext.form.Field.prototype.onBlur() = function(){
// //过滤空格
// if(this.value!=""&&this.value!=undefined){
// this.value=Ext.util.Format.trim(this.value);
// }
// }

// form添加星号
Ext.form.Field.prototype.initComponent = function() {
	if (this.allowBlank == false) {
		this.fieldLabel = "<font color='red'>" + this.fieldLabel + "</font>";
	}
	Ext.form.Field.superclass.initComponent.call(this);
	this.addEvents(

	'focus',

	'blur',

	'specialkey',

	'change',

	'invalid',

	'valid');
}

Ext.override(Ext.form.TextField, {
	validator : function(text) {
		if (this.allowBlank == false && Ext.util.Format.trim(text).length == 0)
			return false;
		else
			return true;
	}
});
