var Vectory = (function(module) {
	'use strict';

	function TransformSystem(entitySystem) {
		Jabaku.SystemBase.call(this, entitySystem, function(entity) {
			return entity.contains(Vectory.Transform);
		});
	}
	TransformSystem.extends(Jabaku.SystemBase, {
		update: function() {
			for (var i = 0; i < this._entities.length; ++i) {
				var entity = this._entities[i];
				var trans = entity.get(Vectory.Transform);
				trans.calcTransform();
			}
		}
	});

	module.TransformSystem = TransformSystem;
	return module;
})(Vectory || {});