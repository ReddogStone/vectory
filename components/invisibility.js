var Vectory = (function(module) {
	'use strict';

	function Invisibility() {}
	Invisibility.type = 'invisibility';
	Invisibility.extends(Object, {
		get type() {
			return Invisibility.type;
		}
	});

	module.Invisibility = Invisibility;
	return module;
})(Vectory || {});