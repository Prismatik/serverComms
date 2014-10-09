var url = require('url');
var $;

var ServerComms = function(BASEURL, jq) {
	this.BASEURL = BASEURL || 'http://localhost:3000/api/v1';
	$ = jq || window.$;
	return this;
};

ServerComms.prototype.api = function(route, data, cb) {
	if (arguments.length === 2){
		cb = data;
		data = {};
		var type = 'GET';
	}

	var targetUrl = [this.BASEURL, route].join('/');

	$.ajax({
		type: type || 'POST',
		url: targetUrl,
		data: data || {},
		dataType: 'json',
		success: function(data) {
			return cb(null, data);
		},
		error: function(_, textStatus, err) {
			return cb(new Error(textStatus + ' ' + err));
		}
	});
};

module.exports = function(BASEURL) {
  return new ServerComms(BASEURL)
};
