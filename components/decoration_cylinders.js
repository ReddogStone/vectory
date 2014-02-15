var Vectory = (function(module) {
	'use strict';

	function DecorationCylinders() {
		Vectory.Cylinders.call(this);
	}
	DecorationCylinders.type = 'decorationCylinders';
	DecorationCylinders.extends(Vectory.Cylinders, {
		get type() {
			return DecorationCylinders.type;
		}
	});

	module.DecorationCylinders = DecorationCylinders;
	return module;
})(Vectory || {});