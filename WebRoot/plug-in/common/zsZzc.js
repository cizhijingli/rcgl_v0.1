$(function() {
		
	});
var zsZzc = {
		check:function () {
			var formData = new Object();
			var data=$(":input").each(function() {
				 formData[this.name] =$("#"+this.name ).val();
			});
			$.ajax({
				async : false,
				cache : false,
				type : 'POST',
				url : 'userController.do?checkzzc',// 请求的action路径
				data : formData,
				error : function() {// 请求失败处理函数
				},
				success : function(data) {
					var d = $.parseJSON(data);
					if (d.success) {
						$.ajax({
							async : false,
							cache : false,
							type : 'POST',
							url : 'userController.do?zzcsaveUser',// 请求的action路径
							data : formData,
							error : function() {// 请求失败处理函数
							},
							success : function(data) {
								frameElement.api.close();
								win.tip(d.msg);
								win.reloadTable();
							}
						});
					} else {
						$.messager.alert('提示',d.msg,'error');
					}
				}
			});
		}
	};