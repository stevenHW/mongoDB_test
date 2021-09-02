/**
 * 定义项目工具类
 */
Ext.ns('leap.common');
var common = leap.common;
Ext.BLANK_IMAGE_URL = path+'/leap/sys/image/s.gif';
Ext.QuickTips.init();
Ext.form.Field.prototype.msgTarget = 'side';

/**
 * 定义主显示模版
 */
common.Page = Ext.extend(Ext.Viewport, {
	layout : 'border',
	initComponent : function() {

		this.content = new Ext.Panel({
			title:'aaa',
			id : 'contentCenter',
			region : 'center',
			layout : 'fit',
			bodyBorder : true
			// border : true,
			//tbar : this.mainMenu
		});
		Ext.apply(this, {
			items : [this.content]
		});
		common.Page.superclass.initComponent.call(this);
	}
});

/**
 * 定义
 * @class common.BaseWindow
 * @extends Ext.Window
 */
common.BaseWindow = Ext.extend(Ext.Window, {
	initComponent : function(config) {
		config = config || {};
		Ext.apply(this, {
			buttonAlign : 'right',
			modal : true,
			resizable : false,
			closeAction : 'close',
			buttons : [{
				text : '确定',
				handler : this.onSubmit,
				scope : this
			}, {
				text : '取消',
				handler : this.onCancle,
				scope : this
			}]
		});
		common.BaseWindow.superclass.initComponent.call(this, config);
	},
	onSubmit : function() {

	},
	onCancle : function() {
		this.close();
	}
});

/**
 * LEAP框架基础“表单”面板
 * @class common.BaseFormPanel
 * @extends Ext.FormPanel
 */
common.BaseFormPanel = Ext.extend(Ext.FormPanel, {
	constructor : function(readonly, allowblank) {
		Ext.apply(this, {
			defaults : {
				//allowBlank : allowblank,
				anchor : '96%'
				//readOnly : readonly 
			}
		});
		common.BaseFormPanel.superclass.constructor.call(this);
	},
	initComponent : function(config) {
		Ext.apply(this, {
			baseCls : 'x-plain',
			bodyStyle : 'padding:10px 10px 5px 10px',
			border : false
		});
		common.BaseFormPanel.superclass.initComponent.call(this);
	}
});

  
