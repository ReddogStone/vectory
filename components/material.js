var Vectory = (function(module) {
	'use strict';

	function Material(color, luminosity) {
		this.color = color;
		this.luminosity = luminosity;
	}
	Material.type = 'material';
	Material.extends(Object, {
		get type() {
			return Material.type;
		}
	});

	module.Material = Material;
	return module;
})(Vectory || {});
