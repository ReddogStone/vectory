var Vectory = (function(module) {
	'use strict';

	function DecorationQuads(batch, material) {
		Vectory.Quads.call(this, batch, material);
	}
	DecorationQuads.type = 'decorationQuads';
	DecorationQuads.extends(Vectory.Quads, {
		get type() {
			return DecorationQuads.type;
		}
	});

	module.DecorationQuads = DecorationQuads;
	return module;
})(Vectory || {});