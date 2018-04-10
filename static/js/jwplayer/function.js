jQuery.fn.anchorGoWhere = function(options){
	var obj = jQuery(this);
	var defaults = {target:1, timer:1000};
	var o = jQuery.extend(defaults,options);
	/*
	var scrollPos;
	if(typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') { 
		scrollPos = document.documentElement; 
	}else if (typeof document.body != 'undefined') { 
		scrollPos = document.body; 
	}*/

	obj.each(function(i){
		jQuery(obj[i]).click(function(){
			var _rel = jQuery(this).attr("href").substr(1);
			switch(o.target){
				case 1: 
					var targetTop = jQuery("#"+_rel).offset().top-300;
					jQuery("html,body").animate({scrollTop:targetTop}, o.timer);
					break;
				case 2:
					var targetLeft = jQuery("#"+_rel).offset().left;
					jQuery("html,body").animate({scrollLeft:targetLeft}, o.timer);
					break;
			}
			return false;
		});
	});
};