var Vectory = (function(module) {
	'use strict';

	function Text(engine, text, font, color, screenOffset) {
		Jabaku.Text.call(this, engine, text, font, color, screenOffset);
	}
	Text.type = 'text';
	Text.extends(Jabaku.Text, {
		get type() {
			return Text.type;
		}
	});

	function ScreenText(engine, text, font, color) {
		Jabaku.ScreenText.call(this, engine, text, font, color);
	}
	ScreenText.type = 'screenText';
	ScreenText.extends(Jabaku.ScreenText, {
		get type() {
			return ScreenText.type;
		}
	});

	module.Text = Text;
	module.ScreenText = ScreenText;
	return module;
})(Vectory || {});