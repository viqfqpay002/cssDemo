//2014.12.11
//1. add load progress event.  percent = e.loaded /  e.total  
//2. change onReady() to addEvt();

//2014.8.7 - 1.3
//img 的事件function 前置到 添加事件前，在FF里面添加事件时，function无法找到，所以得前置！

//2014.7.26  - 1.2
//add：加载前判断,是否已经加载过


(function(){
	var loadAry={};
	var loadComp, loadProgress, imgLeng, imgLoaded = 0;

	function load(_ary)
	{
		imgLeng = _ary.length;
		for (var i = 0; i < imgLeng; i++) {
			loadOne(_ary[i]);
		}
		function loadOne (_url) {
			if(loadAry.hasOwnProperty(_url) && !loadAry[_url])
			{
				trace("reload:"+ _url);
				checkLoadedAll();
			}else
			{
				loadAry[_url] = false;

				var img = new Image();

				function imgLoadError () {
		        	loadAry[_url] = "error";
		        	img.onerror = null;
		        	img.onload = null;
		        	trace("Loader.error."+_url);
		        	
					checkLoadedAll();
		        }
		        function imgLoaded () {
					loadAry[_url] = img;
					img.onerror = null;
		        	img.onload = null;

					checkLoadedAll();
				}

		        img.onerror = imgLoadError;
		        img.onload = imgLoaded;
		        img.src = _url;
			}
		}
		
		function checkLoadedAll () {
		    if(loadProgress != undefined){
		    	imgLoaded++;
		    	loadProgress({loaded:imgLoaded, total:imgLeng});
		    } 

			for (var i in loadAry) {
				if(loadAry[i] == false) return false;
			}
			loadComp();
		}
	}
	
	function get (_url) {
		return loadAry[_url];
	}
	function addEvt (_obj) {
		loadComp = _obj.onComplete;
		loadProgress = _obj.onProgress;
	}
	
	window.APLoader = {
		load:load,
		get:get,
		addEvt:addEvt
	}

	function trace (argument) {
		console.log(argument);
	}
})();

 