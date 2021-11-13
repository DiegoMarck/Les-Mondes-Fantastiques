(function($){
	$.fn.tooltype = function(limit){
		return this.each(function(){
			var self = $(this);
			var popup = $('<p/>');
			popup.addClass('tooltype-popup');
			self.append(popup);
			self.on({
				mouseenter:function(){
					var str = self.text().slice(0,limit);
					popup.text(str+'...');
					popup.css({top:self.position().top-popup.height()-30,left:self.position().left});
					popup.fadeIn(300);
				},
				mouseleave:function(){
					popup.fadeOut(300);
				}
			})
		})
	}
})(jQuery);