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
			$placeholder = $('<input type="text" class="placeholder">').val(holderText).addClass($el.attr('class')).removeClass('hide');
		
		this.$placeholder = $placeholder;
		this.holderText = holderText;
		
		$placeholder.on('focus', function() {
			$(this).hide();
			$el.show().focus();
		});

		$el.on('blur', function() {
			var $this = $(this);
			if(!$this.val().length) {
				$el.hide();
				$placeholder.show();
			}
		});

		this.$el.after($placeholder);
		
		this.update();	
	}
	
	Placeholder.prototype.update = function() {
		var $el = this.$el,
			holderText = this.holderText,
			$placeholder = this.$placeholder;
		if($el.val()) {
			$el.show();
			$placeholder.hide();
		} else {
			$placeholder.val(holderText).show();
			$el.hide();
		}
	}
	
	$.fn.placeholder = function(opts) {
		if(isInputSupported) return;

		this.each(function() {
			var $this = $(this),
				conf = $.extend({}, Placeholder.DEFAULTS, typeof opts === 'object' && opts),
				data = $this.data('placeholder');	

			if(!data) {
				$this.data('placeholder', (data = new Placeholder($this, conf)));
			} else {
				data.update();
			}
		});
		return this;
	}
});
