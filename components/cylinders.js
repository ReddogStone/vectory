var Vectory = (function(module) {
	'use strict';

	function Cylinders() {
		this.ids = [];
		this.transforms = [];
	}
	Cylinders.type = 'cylinders';
	Cylinders.extends(Object, {
		get type() {
			return Cylinders.type;
		},
		add: function(transform) {
			this.transforms.push(transform ? transform.clone() : new Vectory.Transform());
		},
		clear: function() {
			this.transforms.clear();
		}
	});

	module.Cylinders = Cylinders;
	return module;
})(Vectory || {});