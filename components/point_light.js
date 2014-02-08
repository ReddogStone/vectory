var Vectory = (function(module) {
	'use strict';

	function PointLight(pos, color) {
		Jabaku.PointLight.call(this, pos, color);
	}
	PointLight.type = 'pointLight';
	PointLight.extends(Jabaku.PointLight, {
		get type() {
			return PointLight.type;
		}
	});

	module.PointLight = PointLight;
	return module;
})(Vectory || {});