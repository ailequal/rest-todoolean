$(document).ready(function () {

	// ajax call for the to-do
	$.ajax({
		url: "http://157.230.17.132:3027/todos",
		method: "GET",
		success: function (data, state) {
			console.log(data);
			for (var i = 0; i < data.length; i++) {
				var toDo = data[i].text;
				// handlebars
				var source = $('#template').html();
				var template = Handlebars.compile(source);
				var context = {
					toDo: toDo
				};
				var html = template(context);
				$('.to-do-list').append(html);
			}
		},
		error: function (request, state, error) {
			console.log(error);
		}
	});

	// add
	$(document).on('keydown', '#item', function () {
		if (event.which === 13) {
			// add($('#item').val());
		}
	});

});