
if (rims == null){
    var rims = {};
    rims.window = {};
    rims.grid = {};
    rims.tree = {};
    rims.array = {};

}

rims.window = {"shieldDiv" : null,"waitingDiv" : null,"hiddenSelects" : new Array()};
rims.window.handlers = new Array();

/**
 * 弹出窗口
 * params:控制参数{"reload":当窗体关闭之后是否重新刷新界面,"callback":回调函数}
 */
rims.window.showWindow = function( url, width, height, params ){
	/*var _left = (screen.width - width) / 2;
    var _top = (screen.height - height) / 2;
    var _fetures = "height=" + height + ",width=" + width + ",top=" + _top + ",left=" + _left;
    _fetures += "toolbar=no, menubar=no, scrollbars=yes, resizable=yes,location=no, status=no";
    var _ret = window.open(url, "_blank", _fetures );
    if ( params != null ){
    	if ( params.reload ){
	    	rims.window.monitor(_ret,null);
	    }
	    if ( params.callback != null ){
	    	rims.window.monitor(_ret,params.callback);
	    }
    }
    
    return _ret;*/
	var _url = path + "/modules/comm/dlgwindow.jsp?pageLinker=" + url.replace(/\&/g, "%26");
	var _left = (screen.width - width) / 2;
    var _top = (screen.height - height) / 2;
    var _fetures = "dialogWidth:" + width + "px; dialogHeight:" + height
            + "px; dialogLeft:" + _left + "px; dialogTop:" + _top
            + "px; status:no; directories:no; scrollbars:yes; resizable=yes;help:no;";
	var _ret = window.showModalDialog( _url, null, _fetures);
	if ( params != null ){
		var _reload = params.reload == null ? true : params.reload;
		if ( params.callback != null ){
			params.callback();
		}
		else{
			if ( _reload ){
				document.location.reload();
		    }
		}
    }
    return _ret;
}

rims.window.openWindow = function( url, width, height, params ){
    var _left = (screen.width - width) / 2;
    var _top = (screen.height - height) / 2;
    var _fetures = "height=" + height + ",width=" + width + ",top=" + _top + ",left=" + _left;
    _fetures += "toolbar=yes, menubar=no, scrollbars=yes, resizable=yes,location=no, status=no";
    var _ret = window.open(url, "_blank", _fetures );
    if ( params != null ){
    	if ( params.reload ){
	    	rims.window.monitor(_ret,null);
	    }
	    if ( params.callback != null ){
	    	rims.window.monitor(_ret,params.callback);
	    }
    }
    
    return _ret;
}

/**
 * 显示模式对话框
 * @param {} url       地址
 * @param {} width     宽度
 * @param {} height    高度
 * @param {} args      参数
 * @return {}
 */
rims.window.showDlgWindow = function(url, width, height, args){
	var _url = path + "/modules/comm/dlgwindow.jsp?pageLinker=" + url.replace(/\&/g, "%26");
	var _left = (screen.width - width) / 2;
    var _top = (screen.height - height) / 2;
    var _fetures = "dialogWidth:" + width + "px; dialogHeight:" + height
            + "px; dialogLeft:" + _left + "px; dialogTop:" + _top
            + "px; status:no; directories:no; scrollbars:yes; resizable=yes;help:no;";
	return window.showModalDialog( _url, args, _fetures);
}

/**
 * 监控窗体句柄。如果窗口关闭，则刷新当前页面
 */
rims.window.monitor = function( handler,callback ){
    rims.window.handlers[rims.window.handlers.length] = [handler,callback];
}

rims.window.deamon = function(){
    var _callback = null;
    var _refresh = false;
    for( var i = rims.window.handlers.length - 1; i >= 0; i-- ){
        if ( rims.window.handlers[i][0] != null && rims.window.handlers[i][0].closed ){
            rims.window.handlers[i][0] = null;
            _callback = rims.window.handlers[i][1];
            _refresh = true;
        }
    }
    if ( _refresh ){
        if ( _callback != null ){
            _callback();
        }
        else{
            document.location.reload();
        }
    }
}

rims.window.clear = function(){
    rims.window.handlers = new Array();
}

setInterval( rims.window.deamon, 500 );
attachEvent("onunload", function(){
    rims.window.clear();
});

/**
 * 处理grid控件中单元格为null的数据（不显示undefined）
 * @param def 默认值，可以为空
 */
rims.grid.renderNull = function(val, row, def){
	var _result = val;
	if ( val == null ){
		_result = "";
		if( def != null ){_result = def;}
	}
	
	return _result;
}

/**
 * 显示日期
 * @param {} val  date类型
 * @param {} row  一行数据对象
 * @param {} def
 * @return {}
 */
rims.grid.renderDate = function(val, row){
	var _result = val;
	if ( val == null ){
		_result = "";
	}
	else{
		var re = /-/g;
		var _str = val.replace(re, "/");
        var _date = new Date(Date.parse(_str));
        
        var m = _date.getMonth()+1;
        var d = _date.getDate();
		_result = _date.getYear() + "-" + (m>=10 ? m : "0" + m) + "-" + (d>=10 ? d : "0" + d); 
	}
	
	return _result;
}

/**
 * 处理选中的行，如果没有选中则需要提示选中
 * @param {} gridid   grid控件的id
 * @param {} callback 格式:function(row)
 */
rims.grid.doWithSelectedRow = function(gridid, callback){
	var _row = gridid.getSelectedRow();
	if ( _row == null ){
		alert("请选择记录!");
	}
	else{
		if (callback != null) callback(_row);
	}
}

/**
 * 双击grid控件中的行
 * @param {} gridid    表格控件
 * @param {} callback  回调函数(function(){row})
 */
rims.grid.rowDblclick = function(gridid,callback){
	gridid.config.rowDblclick = function(){
		callback(gridid.getSelectedRow());
	}
}

/**
 * 获取选中的节点。
 * 返回信息格式：{arguments:%对应action中的参数%,text:%节点显示名称%}
 */
rims.tree.getSelectedNode = function(){
	var _result = null;
	var _node = getTreeRoot().getSelected();
	if (_node != null){
		var _arguments = [];
		var _action = _node.action;
		var i = _action.indexOf("'");
		while( i > 0 ){
			var j = _action.indexOf("'", i+1);
			_arguments.push(_action.substring(i+1,j));
			i = _action.indexOf("'",j+1);
		}
		_result = {};
		_result.arguments = _arguments;
		_result.text = _node.text
	}
	return _result;
}

/**
 * 设置指定元素的class.
 * @param name 元素的名字或者元素的id
 * @param classname class名称
 */
rims.setElementClassByName = function(name,classname){
	var elements = document.getElementsByName(name);
	if ( elements.length > 0 ){
	  for( var i = 0; i < elements.length; i++ ){
	    elements(i).className=classname;
	  }
	}
	else{
	  var e = document.getElementById(name);
	  if (e != null) e.className=classname;
	}
}

/**
 * 准备股票精灵（寻找class=stockspirit的控件）
 * @param callback 回调函数(function(row){...})
 */
rims.readystockspirit = function(callback){
	var _url = path + "/modules/basedata/stockspirit.jsp";
	$.each($(".stockspirit"),function(k,ctrl){
		var h = $(ctrl).autocomplete(_url,{
			formatItem: function(row, i, max) {
				var _row = $.evalJSON(row);
				return _row.stkCode + "(" + _row.stkName + ")";
			},
			formatResult: function(row) {
				var _row = $.evalJSON(row);
				return _row.stkCode;
			},
			width:150
			});
		if ( callback != null ){
			h.result(function(event, data, formatted){
				callback($.evalJSON(data));
			});
		}
	});
}

rims.readygridstyle = function( id ){
	var m = -1;
	var trs = $("#" + id + " tbody tr");
	trs.each(function(k,v){
		$(v).mousedown(function(){
			if ( m != -1 ){
				trs[m].style.backgroundColor="";
			}
			m = k;
			v.style.backgroundColor="#BFD8F8";
		});
		$(v).mouseover(function(){
			if ( m != k ){
				v.style.backgroundColor="#FBEED3";
			}
		});
		$(v).mouseout(function(){
			if ( m != k ){
				v.style.backgroundColor="";
			}			
		});
	});
}

/**
 * 默认寻找id为calendar的div作为展示容器
 */
rims.readyschedule = function(){
	var _cldr = $('#calendar');
	var _agenda = _cldr.fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'agendaDay,agendaWeek,month'
		},
		defaultView: 'agendaWeek',
		editable: true,
		events: "${path}/modules/oa/agendadata.jsp"
	});
	return _agenda;
}

/**
 * 弹出文本编辑窗(寻找样式是poptexteditor的按钮并应用在click事件上，文本应用在样式是texteditor的文本框)
 */
rims.readyTextEditor = function(){
	var _buttons = $(".poptexteditor");
	var _texteditors = $(".texteditor");
	$.each(_buttons,function(k,v){
		$(v).click(function(){
			// 打开窗体
			var _editor = _texteditors[k];
			var _ret = rims.popTextEditor(_editor.value);
			if ( _ret != null ){
				_editor.value = _ret;
			}
		});
	});
}

rims.popTextEditor = function( text ){
	var width = 360;
	var height = 200;
	var _url = path + "/modules/comm/texteditor.jsp";
	var _left = (screen.width - width) / 2;
    var _top = (screen.height - height) / 2;
    var _fetures = "dialogWidth:" + width + "px; dialogHeight:" + height
            + "px; dialogLeft:" + _left + "px; dialogTop:" + _top
            + "px; status:no; directories:no; scrollbars:yes; resizable=no;help:no;";
	return window.showModalDialog( _url, text, _fetures);
}

/**
 * 对象为列表时，处理页面上的select绑定值
 * array select列表
 * name select name格式 对象名_属性_id
 */
rims.array.bindSelect = function ( name )
{
	 var array = $( "select[name*='"+ name+ "_']");
	 
	$.each( array , 
	function( k , v )
	{										
		var ss = v.name.split("_");	
		var ids = v.id.split("_");	
		//alert( " ss[2]= " + ss[2]+ "  ids[1]="+ ids[1]);
		// 绑定 link 类型															
		$( "#"+ ss[2] + "_" + ids[1] ).val( ids[1] );				
	});			
}

/**
 * 绑定button序列名称，
 * callback 
 */
rims.array.bindButtonEvent= function( buttonName , callback )
{
	
	 var array = $( "input[name*='"+ buttonName+ "_']");
	 
	 //alert( "select[name*='"+ buttonName+ "_'] length = "+ array.length );
	 $.each( array, 
				function( k , v )
				{								
					var ss = v.name.split("_");							
					// 绑定 link 类型			
					$( "#" + buttonName +"_" + ss[2]).click( function()
					{
						callback ( ss[2]);	
					});
										
				}
		);	
}
/**
 * 绑定radio的值
 */
rims.array.bindRadioValue = function( ctrlName , val )
{
		
	var radios = document.getElementsByName( ctrlName );
	
	for ( var index = 0; index < radios.length ; index ++ )
	{		
		if( radios[index ].value == val )
		{
		//	alert("hit");
			radios[ index].checked = true;
		}
	}
}

/**
 * 高亮显示表格行
 * @param 表格id
 */
rims.highlightabletrow = function(id){
	$.each($("#"+id + " tr"),function(k,v){
		$(v).hover(
		function(){
			$(this).addClass("highlight");
		}, 
		function(){
			$(this).removeClass("highlight");
		});
	});
}


rims.helpor_net_show = function helpor_net_show(current,e,text){
			if (document.all&&document.readyState=="complete"){
				document.all.tooltip2.innerHTML='<marquee style="border:1px solid #3399ff">'+text+'</marquee>'
				document.all.tooltip2.style.pixelLeft=event.clientX+document.body.scrollLeft+10
				document.all.tooltip2.style.pixelTop=event.clientY+document.body.scrollTop+10
				document.all.tooltip2.style.visibility="visible"
			}else if (document.layers){
				document.tooltip2.document.nstip.document.write('<b>'+text+'</b>')
				document.tooltip2.document.nstip.document.close()
				document.tooltip2.document.nstip.left=0
				currentscroll=setInterval("scrolltip()",100)
				document.tooltip2.left=e.pageX+10
				document.tooltip2.top=e.pageY+10
				document.tooltip2.visibility="show"
			}
		}
rims.helpor_net_hide = function helpor_net_hide(){
			if (document.all){
				document.all.tooltip2.style.visibility="hidden"
			}else if (document.layers){
				clearInterval(currentscroll)
				document.tooltip2.visibility="hidden"
			}
		}
rims.scrolltip = function scrolltip(){
			if (document.tooltip2.document.nstip.left>=-document.tooltip2.document.nstip.document.width){
				document.tooltip2.document.nstip.left-=5
			}else{
				document.tooltip2.document.nstip.left=150
			}
		}