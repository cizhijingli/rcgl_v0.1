$(function() {
		$('#zzcyljList').datagrid({
			idField : 'id',
			title : '十二总队民警不在岗已离京情况一览',
			url : 'userController.do?zzcyljdatagrid&field=id,zzcdepart,name,zw,bzgzl,ljdate,fjdate,spdate,cxtype,qwaddress,spld',
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
				gridname = 'zzcyljList';
			}
		});$('#zzcyljList').datagrid('getPager').pagination({
			beforePageText : '',
			afterPageText : '/{pages}',
			displayMsg : '{from}-{to}共{total}条',
			showPageList : true,
			pageList : [ 10, 20, 30 ],
			showRefresh : true
		});$('#zzcyljList').datagrid('getPager').pagination({
			onBeforeRefresh : function(pageNumber, pageSize) {
				$(this).pagination('loading');$(this).pagination('loaded');
			}
		});
	});
var zzcyljList = {
		listSearch:function () {
			var queryParams = $('#zzcyljList').datagrid('options').queryParams;
			$('#zzcyljListtb').find('*').each(function() {
				queryParams[$(this).attr('name')] = $(this).val();
			});
			$('#zzcyljList').datagrid({
				url : "userController.do?zzcyljdatagrid&field=id,zzcdepart,name,zw,bzgzl,ljdate,fjdate,spdate,cxtype,qwaddress,spld"
			});
		},
		expFiles:function(){
			var queryParams = $('#zzcyljList').datagrid('options').queryParams;
			var zzcyljqdate = $("[name=zzcyljqdate]").val();
			$.ajax({
				async : false,
				cache : false,
				type : 'POST',
				url : 'jeecgJdbcController.do?zzcyljexpFiles&zzcyljqdate='+zzcyljqdate,// 请求的action路径
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
						$('#zzcyljList').datagrid('reload');
					}
				}
			})
		},
		expExcelFiles:function(){
			var queryParams = $('#zzcyljList').datagrid('options').queryParams;
			var zzcyljqdate = $("[name=zzcyljqdate]").val();
			window.location.href="jeecgJdbcController.do?zzcyljexpExcelFiles&zzcyljqdate="+zzcyljqdate;// 请求的action路径;
		}
	};
function searchReset(name) {
	$("#" + name + "tb").find(":input").val("");
}