$(document).ready(function(){
debugger;
var obj = {
		title:"obj的title",
		fns:function(){
			$("#btn_1").html(this.title);
		}
	}

$("#btn_1").click($.proxy(obj,"fns"));

debugger;
alert([("2","3","4")].map(parseInt));

});
