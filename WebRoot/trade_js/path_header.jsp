<%  
	request.setAttribute("path", (request.getContextPath()));
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	String host = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort() ;
	request.setAttribute("host",host);
	
	
	
	response.setHeader("Pragma","No-cache"); 
	response.setHeader("Cache-Control","no-cache"); 
	response.setDateHeader("Expires", 0); 
	
%>

<script type="text/javascript">
	var path = '${path}' ;
	
//扩展startsWith
String.prototype.startsWith=function(str){
	if(str==null||str==""||this.length==0||str.length>this.length)
		return false;
	if(this.substr(0,str.length)==str)
		return true;
	else
		return false;
}
	
</script>
