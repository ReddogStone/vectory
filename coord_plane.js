var Vectory = (function(module) {
	'use strict';

	function LineDesc(point1, point2, color, width, patternIndex) {
		this._point1 = point1 ? point1.clone() : new Vecmath.Vector3();
		this._point2 = point2 ? point2.clone() : new Vecmath.Vector3();
		this._color = Color.clone(color) || Color.white;
		this._width = width || 3.0;
		this._patternIndex = patternIndex || 0;
	}
	LineDesc.extends(Object, {
		add: function(lineBatch) {
			this._id = lineBatch.add(this._point1, this._point2, this._color, this._width, this._patternIndex);
		},
		remove: function(lineBatch) {
			lineBatch.remove(this._id);
		}
	});

	function CoordPlane(engine) {
		this._material = new SimpleMaterial(engine);
		this.transformable = new Transformable();
		this._body = {
			renderable: new Jabaku.QuadRenderable(engine, this._material),
			transformable: this.transformable
		};
		this._lines = [new LineDesc(new Vecmath.Vector3(-5, 0, 0), new Vecmath.Vector3(5, 0, 0), 
			new Color(1.0, 0.0, 1.0, 0.5), 10, 0)];
	}
	CoordPlane.extends(Object, {
		get material() {
			return this._material;
		},
		add: function(scene) {
			scene.addEntity(this._body);
			this._lines.forEach(function(line) {
				line.add(scene.lineBatch);
			});
		},
		remove: function(scene) {
			scene.removeEntity(this._body);
			this._lines.forEach(function(line) {
				line.remove(scene.lineBatch);
			});
		}
	});

	module.CoordPlane = CoordPlane;
	return module;
})(Vectory || {});