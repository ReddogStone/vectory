var Vectory = (function(module) {
	'use strict';

	function Quad(transform) {
		this.transform = transform;
	}

	function Quads(material) {
		this.material = material;
		this.ids = [];
		this.transforms = [];
	}
	Quads.type = 'quads';
	Quads.extends(Object, {
		get type() {
			return Quads.type;
		},
		add: function(transform) {
			this.transforms.push(transform ? transform.clone() : new Vectory.Transform());
		},
		clear: function() {
			this.transforms.clear();
		}
	});

	module.Quads = Quads;
	return module;
})(Vectory || {});