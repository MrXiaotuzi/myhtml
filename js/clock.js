$(document).ready(function(){
	function Clock(){
        this.TimeH = 0;
        this.TimeM = 0;
        this.TimeS = 0;
        this.secondTemp = 0;
        this.setInter;

        Clock.prototype.setTime = function(){
			if(arguments.length === 1 && (arguments[0] instanceof Date)){
                var date = arguments[0];
                clock1.setTime(date.getHours()%12,date.getMinutes(),date.getSeconds());
			}else if(arguments.length === 3){
				this.TimeH = arguments[0];
				this.TimeM = arguments[1];
				this.TimeS = arguments[2];
				this.setRealTime();
			}
		}
        Clock.prototype.setRealTime = function(){
			$(".clock_h").css("transform","rotate("+this.TimeH/12*360+"deg)");
			$(".clock_m").css("transform","rotate("+this.TimeM/60*360+"deg)");
			$(".clock_s").css("transform","rotate("+this.TimeS/60*360+"deg)");
		}
        Clock.prototype.runBysecond = function(){
			var date = new Date();
			var s = date.getSeconds();
			if(s!=this.secondTemp){
				this.secondTemp = s;
				this.TimeS++;
				if(this.TimeS === 60){
					this.TimeM++;
				}
				if(this.TimeM === 60){
					this.TimeH++;
				}
                this.TimeS=this.TimeS%60;
                this.TimeM = this.TimeM%60;
                this.TimeH = this.TimeH%12;
				this.setRealTime();
			}
		}
        Clock.prototype.run = function(){
			var date = new Date();
			this.secondTemp = date.getSeconds();
			this.setInter = setInterval($.proxy(this.runBysecond,this),200);
		}
        Clock.prototype.stop = function(){
        	clearInterval(this.setInter);
		}
	}
	
	var clock1 = new Clock();

	$("#stop").click(function(){
        clock1.stop();
	});
	$("#start").click(function(){
		clock1.run();
	});
	$("#setNow").click(function(){
		var date = new Date();
		clock1.setTime(date.getHours()%12,date.getMinutes(),date.getSeconds());
		clock1.run();
	});
	$("#setUdeNow").click(function(){
        var h = Math.abs($("input[name=time_h]").val() || 0) % 12;
        var m = Math.abs($("input[name=time_m]").val() || 0) % 60;
        var s = Math.abs($("input[name=time_s]").val() || 0) % 60;
        clock1.setTime(h, m, s);
        clock1.run();
    });


    clock1.setTime(16,0,1);
    clock1.run();
    //$("#setNow").click();
	
});