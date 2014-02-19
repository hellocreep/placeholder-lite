;(function(factory) {
	if(typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else {
		factory(jQuery);
	}
})(function($) {
	var isInputSupported = 'placeholder' in document.createElement('input');

	var Placeholder = function(el, conf) {
		this.$el = el;

		this.init();
	}

	Placeholder.prototype.init = function() {
		var $el = this.$el,
		 	holderText = $el.attr('placeholder'),
			$placeholder = $('<input type="text">').val(holderText).addClass($el.attr('class')).removeClass('hide');

		$el.hide();

		$placeholder.on('focus', function() {
			$(this).hide().prev().show().focus();
		});

		$el.on('blur', function() {
			var $this = $(this);
			if(!$this.val().length) {
				$this.hide().next().show();
			}
		});

		this.$el.after($placeholder);	
	}

	$.fn.placeholder = function(opts) {
		if(isInputSupported) return;

		this.each(function() {
			var $this = $(this),
				conf = $.extend({}, Placeholder.DEFAULTS, typeof opts === 'object' && opts),
				data = $this.data('placeholder');	

			if(!data) $this.data('placeholder', (data = new Placeholder($this, conf)));
		});
		return this;
	}
});