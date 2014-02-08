var Vectory = (function(module) {
	'use strict';

	function TextSystem(entitySystem) {
		Jabaku.SystemBase.call(this, entitySystem, function(entity) {
			return (entity.contains(Vectory.Transform) && 
				(entity.contains(Vectory.ScreenText) || entity.contains(Vectory.Text)));
		});
	}
	TextSystem.extends(Jabaku.SystemBase, {
		_renderOne: function(engine, globalParams, text, trans) {
			text.prepare(engine);

			globalParams.uWorld = trans.global.val;

			text.setParams(globalParams);
			engine.setBlendMode(BlendMode.PREMUL_ALPHA);
			engine.setProgram(text.material.program, globalParams);

			text.render(engine);
		},
		render: function(engine, globalParams) {
			for (var i = 0; i < this._entities.length; ++i) {
				var entity = this._entities[i];

				var trans = entity.get(Vectory.Transform);

				var text = entity.get(Vectory.ScreenText);
				if (text !== undefined) {
					this._renderOne(engine, globalParams, text, trans);
				}

				text = entity.get(Vectory.Text);
				if (text !== undefined) {
					this._renderOne(engine, globalParams, text, trans);
				}
			}
		}
	});

	module.TextSystem = TextSystem;
	return module;
})(Vectory || {});
