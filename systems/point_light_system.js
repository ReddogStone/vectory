var Vectory = (function(module) {
	'use strict';

	function PointLightSystem(entitySystem) {
		Jabaku.SystemBase.call(this, entitySystem, function(entity) {
			return entity.contains(Vectory.PointLight) && entity.contains(Vectory.Transform);
		});
	}
	PointLightSystem.extends(Jabaku.SystemBase, {
		update: function() {
			for (var i = 0; i < this._entities.length; ++i) {
				var entity = this._entities[i];
				var pointLight = entity.get(Vectory.PointLight);
				var trans = entity.get(Vectory.Transform);

				pointLight.pos = trans.pos.clone();
			}
		}
	});

	module.PointLightSystem = PointLightSystem;
	return module;
})(Vectory || {});
