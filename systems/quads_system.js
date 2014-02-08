var Vectory = (function(module) {
	'use strict';

	function QuadsSystem(entitySystem) {
		Jabaku.SystemBase.call(this, entitySystem, function(entity) {
			return entity.contains(Vectory.Quads) || entity.contains(Vectory.DecorationQuads);
		});
	}
	QuadsSystem.extends(Jabaku.SystemBase, {
		_updateOne: function(quads, trans) {
			var material = quads.material;

			var globalTrans = new Vecmath.Matrix4();
			if (trans !== undefined) {
				globalTrans.copy(trans.global);
			}

			for (var quadIdx = 0; quadIdx < quads.quads.length; ++quadIdx) {
				var quad = quads.quads[quadIdx];
				quad.transform.calcTransform(globalTrans);

				quads.batch.set(quad.id, quad.transform.global, material.color, 0, material.luminosity);
			}
		},
		update: function() {
			for (var i = 0; i < this._entities.length; ++i) {
				var entity = this._entities[i];
				var quads = entity.get(Vectory.Quads);
				var decorQuads = entity.get(Vectory.DecorationQuads);
				var trans = entity.get(Vectory.Transform);

				if (quads !== undefined) {
					this._updateOne(quads, trans);
				}
				if (decorQuads !== undefined) {
					this._updateOne(decorQuads, trans);
				}
			}
		}
	});

	module.QuadsSystem = QuadsSystem;
	return module;
})(Vectory || {});
