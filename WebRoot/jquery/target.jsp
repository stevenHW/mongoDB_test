<%@ page language="java" pageEncoding="UTF-8"%>
<html>
<head>

<script type="text/javascript" src="/testmongodb/jquery/jquery-1.4.2.js"></script>
<%--json 地址--%>
<script type="text/javascript" src="/testmongodb/jquery/json/json2.js"></script>
<script type="text/javascript" src="/testmongodb/jquery/json/cycle.js"></script>
<script type="text/javascript"src="/testmongodb/jquery/json/json_parse_state.js"></script>
<script type="text/javascript"src="/testmongodb/jquery/json/json_parse.js"></script>
<script src="/testmongodb/jquery/json/json.js" type="text/javascript"></script>


<script src="/testmongodb/jquery/ligerUI/js/ligerui.all.js" type="text/javascript"></script>
<link href="/testmongodb/jquery/ligerUI/skins/Aqua/css/ligerui-all.css" rel="stylesheet" type="text/css" />
<link href="/testmongodb/jquery/ligerUI/skins/ligerui-icons.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" defer>
	//每10秒定时释放内存
	/* if (document.all) {
		CollectGarbage();
		setInterval('CollectGarbage()', 10000);
	} */
	
	$.ajaxSetup ({
	    cache: false //关闭AJAX相应的缓存
	});
	
	/*
	// 屏蔽系统退格键
	if (typeof window.event != 'undefined') {
		document.onkeydown = function() {
			var type = event.srcElement.type;
			var code = event.keyCode;
			return ((code != 8 && code != 13) || (type == 'text' && code != 13) || (type == 'textarea') || (type == 'submit' && code == 13))
		}
	} else { // FireFox/Others  
		document.onkeypress = function(e) {
			var type = e.target.localName.toLowerCase();
			var code = e.keyCode;
			if ((code != 8 && code != 13) || (type == 'input' && code != 13) || (type == 'textarea') || (type == 'submit' && code == 13)) {
				return true;
			} else {
				return false;
			}
		}
	}
	*/
	//处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外
	function banBackSpace(e){
	    var ev = e || window.event;//获取event对象
	    var obj = ev.target || ev.srcElement;//获取事件源
	    var t = obj.type || obj.getAttribute('type');//获取事件源类型
	    //获取作为判断条件的事件类型
	    var vReadOnly = obj.readOnly;
	    var vDisabled = obj.disabled;
	    //处理undefined值情况
	    vReadOnly = (vReadOnly == undefined) ? false : vReadOnly;
	    vDisabled = (vDisabled == undefined) ? true : vDisabled;
	    //当敲Backspace键时，事件源类型为密码或单行、多行文本的，
	    //并且readOnly属性为true或disabled属性为true的，则退格键失效
	    var flag1= ev.keyCode == 8 && (t=="password" || t=="text" || t=="textarea")&& (vReadOnly==true || vDisabled==true);
	    //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
	    var flag2= ev.keyCode == 8 && t != "password" && t != "text" && t !="textarea" ;
	    //判断
	    if(flag2 || flag1)return false;
	}
	//禁止退格键 作用于Firefox、Opera
	document.onkeypress=banBackSpace;
	//禁止退格键 作用于IE、Chrome
	document.onkeydown=banBackSpace;

	//jQuery.noConflict();
	var basePath = '${basePath}';
	
	//子页面的点击Enter事件
	function initClickEnter() {
		//主页页面搜索排除
		if($("#clickEnter").length==0)
		{
				$(document).keyup(function(event){ 
					//查找显示的查询按钮
					var searchButton=$("a[class=searchbox-button]:visible");
					if(event.keyCode == 13){ 
						if(searchButton.length==1)
						{
							searchButton.click();
						}
						else if(searchButton.length==2)
						{
							searchButton.eq(1).click();
						}
					}
				}); 
		}
	}
	
	function showloaddiv() {
		document.getElementById('loaddiv2').style.display = 'block';
	}
	function hiddenloaddiv() {
		document.getElementById('loaddiv2').style.display = 'none';
	}
	
	$('#div_shade').width(document.documentElement.clientWidth);
	$('#div_shade').height(document.documentElement.clientHeight);
	
// 	filter:alpha(opacity=100); /* IE */ 
// 	-moz-opacity:1.0; /* Moz + FF */ 
	
// 	showloaddiv();
// 	setTimeout(hiddenloaddiv, 10000);

	var initSystemParam = {
			pageSize : 30,
			pageSizeOptions : [10, 20, 30, 40, 50],
			layoutLeftWidth : 130
	};
	
	/**
	 * 通用页面验证方法
	 */
	function formValidate(msgArr, errorLabelContainer) {
		if(isEmpty(errorLabelContainer)) {
			errorLabelContainer = 'errorLabelContainer';
		}
		$('#' + errorLabelContainer).html(getValidateMsg(msgArr));
		if(isEmpty($('#' + errorLabelContainer).text())) {
			$('#' + errorLabelContainer).hide();
			return true;
		} else {
			$('#' + errorLabelContainer).show();
			return false;
		}
	}
	
	/**
	 * 根据验证信息数组生成验证信息
	 */
	function getValidateMsg(msgArr) {
		var val = '<ul><li>';
		$.each(msgArr, function(n, v) {
			if(n == msgArr.length - 1) {
				val += v + '</li></ul>';
			} else {
				val += v + '</li><li>';
			}
		});
		return val;
	}

</script>
</head>
</html>
