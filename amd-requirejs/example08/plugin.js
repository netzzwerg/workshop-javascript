define({
	normalize: function (name, normalize) {
		return name;
	},
	load: function (name, req, load, config) {
		req([name], function (value) {
			load(value);
		});
	}
});