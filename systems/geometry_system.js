var Vectory = (function(module) {
	'use strict';

	function GeometrySystem(entitySystem, quadBatch, cylinderBatch) {
		Jabaku.SystemBase.call(this, entitySystem, function(entity) {
			return (!entity.contains(Vectory.Invisibility)) &&
				( entity.contains(Vectory.Material) && 
					(entity.contains(Vectory.Quads) || 
					entity.contains(Vectory.Cylinders)) ) ||
				( entity.contains(Vectory.DecorationMaterial) && 
					(entity.contains(Vectory.DecorationQuads) || 
					entity.contains(Vectory.DecorationCylinders)) );
		});
		this._quadBatch = quadBatch;
		this._cylinderBatch = cylinderBatch;
	}
	GeometrySystem.extends(Jabaku.SystemBase, {
		onComponentAdded: function(entity, component) {
			Jabaku.SystemBase.prototype.onComponentAdded.call(this, entity, component);
		},
		onComponentRemoved: function(entity, component) {
			if ((component instanceof Vectory.Quads) || (component instanceof Vectory.DecorationQuads)) {
				for (var i = 0; i < component.ids.length; ++i) {
					var id = component.ids[i];
					this._quadBatch.remove(id);
				}
				component.ids.clear();
			}

			Jabaku.SystemBase.prototype.onComponentRemoved.call(this, entity, component);
		},
		_updateOne: function(batch, geometries, trans, material) {
			var globalTrans = new Vecmath.Matrix4();
			if (trans !== undefined) {
				globalTrans.copy(trans.global);
			}

			var l = Math.max(geometries.transforms.length, geometries.ids.length);
			for (var quadIdx = 0; quadIdx < l; ++quadIdx) {
				var id = geometries.ids[quadIdx];
				var transform = geometries.transforms[quadIdx];

				if (transform) {
					transform.calcTransform(globalTrans);

					if (id !== undefined) {
						batch.set(id, 
							transform.global, 
							material.color, 
							material.luminosity,
							material.diffuse,
							material.specular);
					} else {
						geometries.ids[quadIdx] = 
							batch.add(transform.global,
								material.color,
								material.luminosity,
								material.diffuse,
								material.specular);
					}
				} else {
					delete geometries[ids];
					batch.remove(id);
				}
			}
		},
		update: function() {
			for (var i = 0; i < this._entities.length; ++i) {
				var entity = this._entities[i];
				var quads = entity.get(Vectory.Quads);
				var decorQuads = entity.get(Vectory.DecorationQuads);
				var cylinders = entity.get(Vectory.Cylinders);
				var decorCylinders = entity.get(Vectory.DecorationCylinders);
				var trans = entity.get(Vectory.Transform);
				var material = entity.get(Vectory.Material);
				var decorMaterial = entity.get(Vectory.DecorationMaterial);

				if (quads !== undefined) {
					this._updateOne(this._quadBatch, quads, trans, material);
				}
				if (cylinders !== undefined) {
					this._updateOne(this._cylinderBatch, cylinders, trans, material);
				}
				if (decorQuads !== undefined) {
					this._updateOne(this._quadBatch, decorQuads, trans, decorMaterial);
				}
				if (decorCylinders !== undefined) {
					this._updateOne(this._cylinderBatch, decorCylinders, trans, decorMaterial);
				}
			}
		}
	});

	module.GeometrySystem = GeometrySystem;
	return module;
})(Vectory || {});
