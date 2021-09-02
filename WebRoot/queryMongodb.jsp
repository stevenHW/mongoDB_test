<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="/trade_js/path_header.jsp"%>
<%@ include file="/trade_js/target.jsp"%>

<html>
<head>

<title>My JSP 'queryMongodb.jsp' starting page</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">


<%--ligerui地址--%>

<script type="text/javascript">
var grid1=null;
	$(function() {
		 $("#test").ligerGrid({
			 columns:[ 
						{display:'id',name:'id',width:'200'},
						{display:'名称',name:'name',width:'200'},
						{display:'城市',name:'address.city',width:'250'},
						{display:'邮编',name:'address.code',width:'250'}
					],
			 rownumbers : true,
			 width:'80%',
			 height:'150',
			 url:'http://localhost:8080/testmongodb/mongodb/'
		 });
	});

	function testajax() {
		var _url = "http://localhost:8080/testmongodb/mongodb/";
		jQuery.ajax({
			url : _url,
			type : "get",
			dataType : "json",
			success : function(d) {
				alert(JSON.stringify(d));
				//数组形式，后台是list
				//alert(d[0].name);
				//alert(d[0].address.code);
				
				//数组形式，后台是对象，不是list
				//alert(d.name);
				//alert(d.address.code);
				
				//后台拼接list，主要用于ligerui的grid
				//alert(d.Rows[1].name);
				
				//动态生成table
			    var　mongotable='<table id="tablelist"></table>';
			    $(mongotable).appendTo("#testtable"); 
			    
				for(var o in d){
					//生成tr,添加到table中
					var tr1='<tr></tr>';
		
					//生成td
					var td_id='<td>'+d[o].id+'</td>';
					var td_name='<td>'+d[o].name+'</td>';
					var td_city='<td>'+d[o].address.city+'</td>';
					var td_code='<td>'+d[o].address.code+'</td>'
					
					//把td添加到tr中
					$(td_id).appendTo(tr1);
					$(td_name).appendTo(tr1);
					$(td_city).appendTo(tr1);
					$(td_code).appendTo(tr1);
					
					
					$(tr1).appendTo("#tablelist");

				}
				alert($("#tablelist").html());
				alert($("#testtable").html);
			}
		});
	}
</script>

<body>
	<input type="button" value="用ajax测试具体数据" onclick="testajax()" />
	<br>
	<br>
	<!-- 测试grid，多行数据 -->
	<div id="test"></div>
	<div id="testtable"></div>
	

</body>
</html>
