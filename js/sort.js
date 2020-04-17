$(document).ready(function(){
	
	//return false;
	
    // 排序算法
    //var s0 = [23,53,6,564,234,88,123,878,88,456,45,25,9,88,234];
    var s0 = [];
    for (var i = 0; i < 30000; i++) {
        s0.push(Math.floor(Math.random()*10000 + 1));
    }

	
    console.log('【排序算法：冒泡】');
    var s1 = s0.concat([]);
    var st = new Date().getTime();
    for (var i = 0; i <  s1.length - 1; i++) {
        for (var j = 0; j < s1.length - 1 - i; j++) {
            if (s1[j] > s1[j+1]) {
                var t = s1[j];
                s1[j] = s1[j+1];
                s1[j+1] = t;
            }
        }
    }
    console.log('用时'+(new Date().getTime() - st)+'毫秒');
    console.log(s1);
	

    console.log('【排序算法：选择排序】');
    var s1 = s0.concat([]);
    var st = new Date().getTime();
    for (var i = 0; i <  s1.length; i++) {
        for (var j = i+1; j < s1.length; j++) {
            if (s1[i] > s1[j]) {
                var t = s1[j];
                s1[j] = s1[i];
                s1[i] = t;
            }
        }
    }
    console.log('用时'+(new Date().getTime() - st)+'毫秒');
    console.log(s1);
	

    console.log('【排序算法：插入】');
    var s1 = s0.concat([]);
    var st = new Date().getTime();
    for (var i = 1; i < s1.length; i++) {
        var get = s1[i];
        for (var j = i-1; j >= 0 && get < s1[j]; j--) {
            s1[j+1] = s1[j]; //依次右移，依次右移的方法比采用splice来删除和添加的方法效率高
        }
        s1[j+1] = get;
    }
    console.log('用时'+(new Date().getTime() - st)+'毫秒');
    console.log(s1);
	

    console.log('【排序算法：二分插入】');
    var s1 = s0.concat([]);
    var s2 = [s1[0]];
    var st = new Date().getTime();
    for (var i = 1; i <  s1.length; i++) {
        var m = 0;
        var n = s2.length-1;

        while(n - m > 1) {
            var j = Math.ceil((m+n)/2);
            if (s1[i] > s2[j]) {
                m = j;
            } else {
                n = j;
            }
        }

        if (s1[i] <= s2[m]) {
            s2.splice(m,0,s1[i]);
        } else if (s1[i] <= s2[n]) {
            s2.splice(n,0,s1[i]);
        } else {
            s2.splice(n+1,0,s1[i]);
        }
    }
    console.log('用时'+(new Date().getTime() - st)+'毫秒');
    console.log(s2);
	
	
	console.log('【排序算法：希尔排序】');
    var s1 = s0.concat([]);
    var st = new Date().getTime();
    for (var k = Math.floor(s1.length/2); k > 0; k = Math.floor(k/2)) {
		for (var i = k; i < s1.length; i++) {
			for (var j = i - k; j >= 0 && s1[j] > s1[k + j]; j=j-k) {
				var temp = s1[k + j];
				s1[k + j] = s1[j];
				s1[j] = temp;
			}
		}
    }
    console.log('用时'+(new Date().getTime() - st)+'毫秒');
    console.log(s1);
	
	
    console.log('【排序算法：array.sort()】');
    var s1 = s0.concat([]);
    var st = new Date().getTime();
    s1.sort(function(a,b){return a>b?1:-1;});
    console.log('用时'+(new Date().getTime() - st)+'毫秒');
    console.log(s1);


});