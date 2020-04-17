/**
浏览器兼容性事件处理
*/
var EventUtil = {
	//绑定监听事件
	addHandler:function(element,type,handler){
		if(element.addEventListener){
			element.addEventListener(type,handler,false);
		}else if(element.attachEvent){
			element.attachEvent("on"+type,handler);
		}else{
			element["on"+type] = handler;
		}
	},
	//移除监听事件
	removeHandler:function(element,type,handler){
		if(element.removeEventListener){
			element.removeEventListener(type,handler,false);
		}else if(element.detachEvent){
			element.detachEvent("on"+type,handler);
		}else{
			element["on"+type]=null;
		}
	},
	//获取事件对象
	getEvent : function(event){
		return event?event:window.event;
	},
	//获取事件目标
	getTarget:function(event){
		return event?event.target:window.event.srcElement;
	},
	//阻止事件的默认行为，如阻止a标签点击后的跳转
	preventDefault:function(event){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			return event.returnValue = false;
		}
	},
	//组织事件传播，如阻止事件的冒泡和捕获
	stopPropagation:function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble = true;
		}
	},
	//获取关联的节点，如上一个节点或下一个节点
	getRelatedTarget : function(event){
		if(event.relatedTarget){
			return event.relateTarget;
		}else if(event.toElement){
			return event.toElement;
		}else if(event.fromElement){
			return event.fromElement;
		}else{
			return null;
		}
	},
	//mouserdown和mouserup事件时获取鼠标按下的是哪个键
	getButton:function(event){
		if(document.implementation.hasFeature("MouseEvents","2.0")){
			return event.button;
		}else{
			switch(event.button){
				case 0:
				case 1:
				case 3:
				case 5:
				case 7:return 0;
				case 2:
				case 6:return 2;
				case 4:return 1;
			}
		}
	},
	//mousewheel事件时获取滚动的数值
	getWheelDelta : function(event){
		if(event.wheelDelta){
			return (client.engine.opera && client.engine.opera < 9.5 ?
				-event.wheelDelta : event.wheelDelta);
		}else{
			return -event.detail * 40;
		}
	},
	//keypress事件时获取输入的字符编码
	getCharCode : function(){
		if(typeof event.charCode  == "number"){
			return event.charCode;
		}else{
			return event.keyCode;
		}
	},
	//获取剪切板内容
	getClipboardText:function(event){
		var clipboardData = (event.clipboardData || window.clipboardData);
		return clipboardData.getData("text");
	},
	//设置剪切板内容
	setClipboardText:function(event,value){
		if(event.clipboardData){
			return event.clipboardData.setData("text/plain",value);
		}else if(window.clipboardData){
			return window.clipboardData.setData("text",value);
		}
	}
}