$(function() {
		$('#zzcnljList').datagrid({
			idField : 'id',
			title : '十二总队民警拟离京情况一览',
			url : 'userController.do?zzcnljdatagrid&field=id,zzcdepart,name,zw,bzgzl,ljdate,fjdate,spdate,cxtype,qwaddress,spld',
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
			columns : [ [ {
				field : 'id',
				title : '编号',
				width : 30,
				hidden : true,
				sortable : true
			}, {
				field : 'zzcdepart',
				title : '单位',
				width : 20
			}, {
				field : 'name',
				title : '姓名',
				width : 20
			}, {
				field : 'bzgzl',
				title : '不在岗种类',
				width : 75,
				sortable : true
			}, {
				field : 'ljdate',
				title : '离京日期',
				width : 60,
				sortable : true
			}, {
				field : 'fjdate',
				title : '返京日期',
				width : 60,
				sortable : true
			}, {
				field : 'spdate',
				title : '审批日期',
				width : 60,
				sortable : true
			}, {
				field : 'cxtype',
				title : '出行方式',
				width : 60,
				sortable : true
			}, {
				field : 'qwaddress',
				title : '前往地点',
				width : 60,
				sortable : true
			} ,{
				field : 'spld',
				title : '审批领导',
				width : 60,
				sortable : true
			} ] ],
			onClickRow : function(rowIndex, rowData) {
				rowid = rowData.id;
				gridname = 'zzcnljList';
			}
		});$('#zzcnljList').datagrid('getPager').pagination({
			beforePageText : '',
			afterPageText : '/{pages}',
			displayMsg : '{from}-{to}共{total}条',
			showPageList : true,
			pageList : [ 10, 20, 30 ],
			showRefresh : true
		});$('#zzcnljList').datagrid('getPager').pagination({
			onBeforeRefresh : function(pageNumber, pageSize) {
				$(this).pagination('loading');$(this).pagination('loaded');
			}
		});
	});
var zzcnljList = {
		listSearch:function () {
			var queryParams = $('#zzcnljList').datagrid('options').queryParams;
			$('#zzcnljListtb').find('*').each(function() {
				queryParams[$(this).attr('name')] = $(this).val();
			});
			$('#zzcnljList').datagrid({
				url : "userController.do?zzcnljdatagrid&field=id,zzcdepart,name,zw,bzgzl,ljdate,fjdate,spdate,cxtype,qwaddress,spld"
			});
		},
		expFiles:function(){
			var queryParams = $('#zzcnljList').datagrid('options').queryParams;
			var zzcnljqdate = $("[name=zzcnljqdate]").val();
			$.ajax({
				async : false,
				cache : false,
				type : 'POST',
				url : 'jeecgJdbcController.do?zzcnljexpFiles&zzcnljqdate='+zzcnljqdate,// 请求的action路径
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
						$('#zzcnljList').datagrid('reload');
					}
				}
			})
		},
		expExcelFiles:function(){
			var queryParams = $('#zzcnljList').datagrid('options').queryParams;
			var zzcnljqdate = $("[name=zzcnljqdate]").val();
			window.location.href="jeecgJdbcController.do?zzcnljexpExcelFiles&zzcnljqdate="+zzcnljqdate;// 请求的action路径;
		}
	};
function searchReset(name) {
	$("#" + name + "tb").find(":input").val("");
}