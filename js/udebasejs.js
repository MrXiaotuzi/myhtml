/**
������������¼�����
*/
var EventUtil = {
	//�󶨼����¼�
	addHandler:function(element,type,handler){
		if(element.addEventListener){
			element.addEventListener(type,handler,false);
		}else if(element.attachEvent){
			element.attachEvent("on"+type,handler);
		}else{
			element["on"+type] = handler;
		}
	},
	//�Ƴ������¼�
	removeHandler:function(element,type,handler){
		if(element.removeEventListener){
			element.removeEventListener(type,handler,false);
		}else if(element.detachEvent){
			element.detachEvent("on"+type,handler);
		}else{
			element["on"+type]=null;
		}
	},
	//��ȡ�¼�����
	getEvent : function(event){
		return event?event:window.event;
	},
	//��ȡ�¼�Ŀ��
	getTarget:function(event){
		return event?event.target:window.event.srcElement;
	},
	//��ֹ�¼���Ĭ����Ϊ������ֹa��ǩ��������ת
	preventDefault:function(event){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			return event.returnValue = false;
		}
	},
	//��֯�¼�����������ֹ�¼���ð�ݺͲ���
	stopPropagation:function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble = true;
		}
	},
	//��ȡ�����Ľڵ㣬����һ���ڵ����һ���ڵ�
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
	//mouserdown��mouserup�¼�ʱ��ȡ��갴�µ����ĸ���
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
	//mousewheel�¼�ʱ��ȡ��������ֵ
	getWheelDelta : function(event){
		if(event.wheelDelta){
			return (client.engine.opera && client.engine.opera < 9.5 ?
				-event.wheelDelta : event.wheelDelta);
		}else{
			return -event.detail * 40;
		}
	},
	//keypress�¼�ʱ��ȡ������ַ�����
	getCharCode : function(){
		if(typeof event.charCode  == "number"){
			return event.charCode;
		}else{
			return event.keyCode;
		}
	},
	//��ȡ���а�����
	getClipboardText:function(event){
		var clipboardData = (event.clipboardData || window.clipboardData);
		return clipboardData.getData("text");
	},
	//���ü��а�����
	setClipboardText:function(event,value){
		if(event.clipboardData){
			return event.clipboardData.setData("text/plain",value);
		}else if(window.clipboardData){
			return window.clipboardData.setData("text",value);
		}
	}
}