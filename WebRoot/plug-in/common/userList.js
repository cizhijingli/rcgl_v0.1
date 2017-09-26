$(function() {
		$('#userList').datagrid({
			idField : 'id',
			title : '用户管理',
			url : 'userController.do?datagrid&field=id,browser,username,realname,mobilephone,officephone',
			fit : true,
			loadMsg : '数据加载中...',
			pageSize : 10,
			pagination : true,
			sortOrder : 'asc',
			rownumbers : true,
			singleSelect : true,
			fitColumns : true,
			showFooter : true,
			frozenColumns : [ [] ],
			columns : [ [ {field : 'id',title : '编号',hidden : true,}, 
			{field : 'browser',title : '单位',width : 50,sortable : true},
			{field : 'username',title : '登录名',width : 40},
			{field : 'realname',title : '姓名',width : 40},
			{field : 'mobilephone',title : '移动电话',width : 55,sortable : true},
			{field : 'officephone',title : '固定电话',width : 55,sortable : true},
			{field : 'null',title : '操作',width : 50,
				formatter : function(value, rec, index) {
					if (!rec.id) {
						return '';
					}
					var href = '';
					href += "[<a href='#' onclick=userList.del('"+rec.id+"')>删除</a>]";
					return href;
			}}] ],
			onClickRow : function(rowIndex, rowData) {
				rowid = rowData.id;
				gridname = 'userList';
			}
		});$('#userList').datagrid('getPager').pagination({
			beforePageText : '',
			afterPageText : '/{pages}',
			displayMsg : '{from}-{to}共{total}条',
			showPageList : true,
			pageList : [ 10, 20, 30 ],
			showRefresh : true
		});$('#userList').datagrid('getPager').pagination({
			onBeforeRefresh : function(pageNumber, pageSize) {
				$(this).pagination('loading');$(this).pagination('loaded');
			}
		});
	});
var userList = {
		listSearch:function () {
			var queryParams = $('#userList').datagrid('options').queryParams;
			$('#userListtb').find('*').each(function() {
				queryParams[$(this).attr('name')] = $(this).val();
			});
			$('#userList').datagrid({
				url : "userController.do?datagrid&field=id,browser,username,realname,mobilephone,officephone"
			});
		},
		del:function (id) {
			$.messager.confirm('提示','是否删除', function(r){
				if (r){
					$.ajax({
						async:false,
						type:"POST",
						url:"userController.do?delzzc&zzcid="+id,//要访问的后台地址
						dataType : 'json',
						error:function(d){
							$.messager.alert('提示',d.msg,'info');
						},
						success: function(d){
							$.messager.alert('提示',d.msg,'info');
							$('#userList').datagrid('reload');
						}
					});
				}
			});
		},
		getBack:function () {
			var currtab_title = $('#mainTabs').tabs('getSelected').panel('options').title;
			$('#mainTabs').tabs('close', currtab_title);
			// 释放内存
			$.fn.panel.defaults = $.extend({}, $.fn.panel.defaults, {
				onBeforeDestroy : function() {
					var frame = $('iframe', this);
					if (frame.length > 0) {
						frame[0].contentWindow.document.write('');
						frame[0].contentWindow.close();
						frame.remove();
					}
					if ($.browser.msie) {
						CollectGarbage();
					}
				}
			});
			$('#mainTabs').tabs({ onSelect : function(title) {rowid = "";}});
		},
		searchReset:function (name) {
			$("#" + name + "Form01").find(":input").val("");
			moveCompany.listSearch();
		},
		expFiles:function(){
			$.ajax({
				async : false,
				cache : false,
				type : 'POST',
				url : 'jeecgJdbcController.do?zzcexpFiles',// 请求的action路径
				error : function() {// 请求失败处理函数
				},
				success : function(data) {
					var d = $.parseJSON(data);
					if (d.success) {
						$.messager.show({
							title : '提示消息',
							msg : '导出成功',
							timeout : 2000,
							showType : 'slide'
						});
						$('#userList').datagrid('reload');
					}
				}
			})
		}
	};
	function reloadTable() {
		$('#' + gridname).datagrid('reload');
	}
	function reloaduserList() {
		$('#userList').datagrid('reload');
	}
	function getuserListSelected(field) {
		return getSelected(field);
	}
	function getSelected(field) {
		var row = $('#' + gridname).datagrid('getSelected');
		if (row != null) {
			value = row[field];
		}
		else {
			value = '';
		}
		return value;
	}
	function getuserListSelections(field) {
		var ids = [];
		var rows = $('#userList').datagrid('getSelections');
		for (var i = 0; i < rows.length; i++) {
			ids.push(rows[i][field]);
		}
		ids.join(',');return ids
	};
	function userListsearchbox(value, name) {
		var queryParams = $('#userList').datagrid('options').queryParams;
		queryParams[name] = value;
		queryParams.searchfield = name;$('#userList').datagrid('reload');
	}
	$('#userListsearchbox').searchbox({
		searcher : function(value, name) {
			userListsearchbox(value, name);
		},
		menu : '#userListmm',
		prompt : '请输入查询关键字'
	});
	function searchReset(name) {
		$("#" + name + "tb").find(":input").val("");userListsearch();
	}