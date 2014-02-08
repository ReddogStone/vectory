var Vectory = (function(module) {
	'use strict';

	function Transform(pos, rot, scale) {
		Jabaku.Transform.call(this, pos, rot, scale);
	}
	Transform.type = 'transform';
	Transform.extends(Jabaku.Transform, {
		get type() {
			return Transform.type;
		}
	});

	module.Transform = Transform;
	return module;
})(Vectory || {});