var Vectory = (function(module) {
	'use strict';

	function Geometries() {
		this.ids = [];
		this.transforms = [];
	}
	Geometries.extends(Object, {
		add: function(transform) {
			this.transforms.push(transform ? transform.clone() : new Vectory.Transform());
		},
		clear: function() {
			this.transforms.clear();
		}
	});

	function Quads() {
		Geometries.call(this);
	}
	Quads.type = 'quads';
	Quads.extends(Geometries, {
		get type() {
			return Quads.type;
		}
	});

	function DecorationQuads() {
		Geometries.call(this);
	}
	DecorationQuads.type = 'decorationQuads';
	DecorationQuads.extends(Geometries, {
		get type() {
			return DecorationQuads.type;
		}
	});	

	function Cylinders() {
		Geometries.call(this);
	}
	Cylinders.type = 'cylinders';
	Cylinders.extends(Geometries, {
		get type() {
			return Cylinders.type;
		}
	});

	function DecorationCylinders() {
		Geometries.call(this);
	}
	DecorationCylinders.type = 'decorationCylinders';
	DecorationCylinders.extends(Geometries, {
		get type() {
			return DecorationCylinders.type;
		}
	});

	function Spheres() {
		Geometries.call(this);
	}
	Spheres.type = 'spheres';
	Spheres.extends(Geometries, {
		get type() {
			return Spheres.type;
		}
	});

	function DecorationSpheres() {
		Geometries.call(this);
	}
	DecorationSpheres.type = 'decorationSpheres';
	DecorationSpheres.extends(Geometries, {
		get type() {
			return DecorationSpheres.type;
		}
	});

	module.Quads = Quads;
	module.DecorationQuads = DecorationQuads;
	module.Cylinders = Cylinders;
	module.DecorationCylinders = DecorationCylinders;
	module.Spheres = Spheres;
	module.DecorationSpheres = DecorationSpheres;
	return module;
})(Vectory || {});