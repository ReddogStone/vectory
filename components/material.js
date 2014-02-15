var Vectory = (function(module) {
	'use strict';

	function Material(color, luminosity, diffuse, specular) {
		this.color = color;
		this.luminosity = luminosity;
		this.diffuse = diffuse || 0.0;
		this.specular = specular || 0.0;
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
