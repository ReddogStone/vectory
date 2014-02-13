var Vectory = (function(module) {
	'use strict';

	function QuadsSystem(entitySystem, quadBatch) {
		Jabaku.SystemBase.call(this, entitySystem, function(entity) {
			return entity.contains(Vectory.Quads) || entity.contains(Vectory.DecorationQuads);
		});
		this._batch = quadBatch;
	}
	QuadsSystem.extends(Jabaku.SystemBase, {
		onComponentAdded: function(entity, component) {
			Jabaku.SystemBase.prototype.onComponentAdded.call(this, entity, component);
		},
		onComponentRemoved: function(entity, component) {
			if ((component instanceof Vectory.Quads) || (component instanceof Vectory.DecorationQuads)) {
				for (var i = 0; i < component.ids.length; ++i) {
					var id = component.ids[i];
					this._batch.remove(id);
				}
				component.ids.clear();
			}

			Jabaku.SystemBase.prototype.onComponentRemoved.call(this, entity, component);
		},
		_updateOne: function(quads, trans) {
			var material = quads.material;

			var globalTrans = new Vecmath.Matrix4();
			if (trans !== undefined) {
				globalTrans.copy(trans.global);
			}

			var l = Math.max(quads.transforms.length, quads.ids.length);
			for (var quadIdx = 0; quadIdx < l; ++quadIdx) {
				var id = quads.ids[quadIdx];
				var transform = quads.transforms[quadIdx];

				if (transform) {
					transform.calcTransform(globalTrans);

					if (id !== undefined) {
						this._batch.set(id, transform.global, material.color, 0, material.luminosity);
					} else {
						quads.ids[quadIdx] = 
							this._batch.add(transform.global, material.color, 0, material.luminosity);
					}
				} else {
					delete quads[ids];
					this._batch.remove(id);
				}
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
