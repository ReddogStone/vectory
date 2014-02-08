var Vectory = (function(module) {
	'use strict';

	function Quad(id, transform) {
		this.id = id;
		this.transform = transform;
	}

	function Quads(batch, material) {
		this.batch = batch;
		this.material = material;
		this.quads = [];
	}
	Quads.type = 'quads';
	Quads.extends(Object, {
		get type() {
			return Quads.type;
		},
		add: function(transform) {
			var id = this.batch.add(transform.global, Color.green, 0, 0);
			this.quads.push(new Quad(id, transform));
		},
		clear: function() {
			for (var i = 0; i < this.quads.length; ++i) {
				this.batch.remove(this.quads[i].id);
			}
			this.quads.clear();
		}
	});

	module.Quads = Quads;
	return module;
})(Vectory || {});