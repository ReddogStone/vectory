var Vectory = (function(module) {
	'use strict';

	function DecorationMaterial(color, luminosity, diffuse, specular) {
		Vectory.Material.call(this, color, luminosity, diffuse, specular);
	}
	DecorationMaterial.type = 'decorationMaterial';
	DecorationMaterial.extends(Vectory.Material, {
		get type() {
			return DecorationMaterial.type;
		}
	});

	module.DecorationMaterial = DecorationMaterial;
	return module;
})(Vectory || {});
