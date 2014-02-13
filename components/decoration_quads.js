var Vectory = (function(module) {
	'use strict';

	function DecorationQuads() {
		Vectory.Quads.call(this);
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