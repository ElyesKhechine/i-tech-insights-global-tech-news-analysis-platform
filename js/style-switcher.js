﻿
 //THE CALLING OF PANEL ON CLICKING THE BUTTON 

            jQuery('#switch-panel').click(function () {
                if (jQuery(this).hasClass('show-panel')) {
                    jQuery('.switcher').css({ 'left': '-50px' });
                    jQuery('#switch-panel').removeClass('show-panel');
                    jQuery('#switch-panel').addClass('hide-panel');
                } else if (jQuery(this).hasClass('hide-panel')) {
                    jQuery('.switcher').css({ 'left': 0 });
                    jQuery('#switch-panel').removeClass('hide-panel');
                    jQuery('#switch-panel').addClass('show-panel');
                }
            });

/*
 * jQuery styleSwitcher Plugin
 * Examples and documentation at: 
 * http://www.immortalwolf.com/demo/jquery-style-switcher/
 * Copyright (c) 2011 immortal wolf
 * Version: 1.4 (27-JAN-2011)
 * Dual licensed under the MIT and GPL licenses.
 * http://en.wikipedia.org/wiki/Gpl
 * http://en.wikipedia.org/wiki/MIT_License
 * Requires: jQuery v1.2.6 or later
 * 
 * @version 1.4 changelog:
 * 		- added cookie support
 * 		- allow usage of either JavaScript or PHP for
 * 			cookie management via jQuery config options 
 */
 
(function($) {
	$.fn.styleSwitcher = function(options){		
		var defaults = {	
			slidein: true, preview: false, container: this.selector, directory: "css/", useCookie: true, cookieExpires: 30, manageCookieLoad:true	
		};
		var opts = $.extend(defaults, options);
		// if using cookies and using JavaScript to load css
		if (opts.useCookie && opts.manageCookieLoad) {
			// check if css is set in cookie
			var isCookie = readCookie("style_selected")
			if(isCookie){
				var newStyle = opts.directory + isCookie + ".css";
				$("link[id=style]").attr("href",newStyle);
				baseStyle = newStyle;
			}
			else{
				
			}
		}		
		// if using slidein
		if(opts.slidein){
			$(opts.container).slideDown("slow");
		}
		else{
			$(opts.container).show();
		}
		var baseStyle = $("link[id=style]").attr("href");
		if(opts.preview){
			$(opts.container + " a").hover(
				function () {
					var newStyle = opts.directory + this.id + ".css";
					$("link[id=style]").attr("href",newStyle);
				}, 
				function () {
					$("link[id=style]").attr("href",baseStyle);
				}
			);
		}
		
		$(opts.container + " a").click(
			function () {
				var newStyle = opts.directory + this.id + ".css";
				$("link[id=style]").attr("href",newStyle);
				baseStyle = newStyle;
				if(opts.useCookie){
					createCookie("style_selected",this.id,opts.cookieExpires)
				}
			}
		);
		
	};
	function createCookie(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	}	
	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}	
	function eraseCookie(name) {
		createCookie(name,"",-1);
	}
})(jQuery);