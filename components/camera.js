var Vectory = (function(module) {
	'use strict';

	function Camera(projection, target) {
		Jabaku.Camera.call(this, projection, null, target);
	}
	Camera.type = 'camera';
	Camera.extends(Jabaku.Camera, {
		get type() {
			return Camera.type;
		}
	});

	module.Camera = Camera;
	return module;
})(Vectory || {});