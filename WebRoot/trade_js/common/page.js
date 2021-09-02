if (typeof (initPageParams) == "undefined") {
	var initPageParams = {
		pageNumber : 1,// 默认首页
		pageSize : 10,// 默认每页显示大小数量
		pageList : [ 10, 50, 100 ],// 分页栏中每个下拉选项中的值
		searchNumber : 10,// 查询页面默认查询的最大记录数
		searchNumberBox : [ 10, 20, 50, 100, 200, 300, 0 ]
	// 设置页面查询的下拉选择项
	};

	/**
	 * 获取分页默认参数
	 */
	initPageParams.getPageParams = function() {
		return initPageParams;
	}
	/**
	 * 获取分页默认首页
	 */
	initPageParams.getPageNumber = function() {
		return initPageParams.pageNumber;
	}

	/**
	 * 获取分页默认每页显示大小数
	 */
	initPageParams.getPageSize = function() {
		return initPageParams.pageSize;
	}

	/**
	 * 获取分页查询的总记录数
	 */
	initPageParams.getSearchNumber = function() {
		return initPageParams.searchNumber;
	}

	/**
	 * 获取默认选中查询数据量的下拉框
	 */
	initPageParams.getSearchNumberBox = function() {
		return initPageParams.searchNumberBox;
	}

}

/**
 * 
 */
function getPageNumberByDg(dg) {
	return dg.datagrid("options").pageNumber;
}
