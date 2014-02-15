var Vectory = (function(module) {
	'use strict';

	function LineBatch(engine, textureId) {
		var mesh = {
			"vertices": [-1.0, 1.0],
			"indices": [0, 1],
			"description": {
				"aPosition": { "components": 1, "type": "FLOAT", "normalized": false }
			}
		};

		var instanceDataDesc = {
			"aColor": { "components": 4, "type": "FLOAT", "normalized": false },
			"aEndPos1": { "components": 3, "type": "FLOAT", "normalized": false },
			"aEndPos2": { "components": 3, "type": "FLOAT", "normalized": false },
			"aPattern": { "components": 1, "type": "FLOAT", "normalized": false }
		};
		
		this._batch = new Jabaku.RenderBatch(engine, mesh, instanceDataDesc, Jabaku.RenderBatch.LINES);
		var texture;
		if (textureId !== undefined) {
			texture = engine.getTexture(textureId);
		}
		this.material = new LineInstMaterial(engine, texture);
	}
	LineBatch.extends(Object, {
		add: function(endPoint1, endPoint2, color, pattern) {
			var data = color.toArray4().
				concat(endPoint1.toArray()).
				concat(endPoint2.toArray()).
				concat([pattern]);
			return this._batch.addSingleInstance(data);
		},
		remove: function(id) {
			this._batch.removeSingleInstance(id);
		},
		get: function(id) {
			var data = this._batch.getSingleInstance(id);
			return {
				color: new Color(data[0], data[1], data[2], data[3]),
				endPoint1: new Vecmath.Vector3(data[4], data[5], data[6]),
				endPoint2: new Vecmath.Vector3(data[7], data[8], data[9]),
				pattern: data[10]
			};
		},
		set: function(id, transform, color, atlasIndex, luminosity) {
			var data = color.toArray4().
				concat(endPoint1.toArray()).
				concat(endPoint2.toArray()).
				concat([pattern]);
			this._batch.setSingleInstance(id, data);
		},
		setColor: function(id, value) {
			this._batch.setComponent(id, function(data) { 
				data[0] = value.red; data[1] = value.green; data[2] = value.blue; data[3] = value.alpha;
			});
		},
		setEndPoint1: function(id, value) {
			this._batch.setComponent(id, function(data) { 
				data[4] = value.x; data[5] = value.y; data[6] = value.z;
			});
		},
		setEndPoint2: function(id, value) {
			this._batch.setComponent(id, function(data) { 
				data[7] = value.x; data[8] = value.y; data[9] = value.z;
			});
		},
		setPattern: function(id, value) {
			this._batch.setComponent(id, function(data) { data[10] = value; });
		},

		// Renderable interface
		prepare: function(engine) {
			this._batch.prepare(engine);
		},
		setParams: function(globalParams) {
			this.material.setParams(globalParams);
		},
		render: function(engine) {
			this._batch.render(engine);
		}
	});

	module.LineBatch = LineBatch;
	return module;
})(Vectory || {});
