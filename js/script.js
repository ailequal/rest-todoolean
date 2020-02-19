$(document).ready(function () {

	// print all to-do
	printToDo();

	// add to-do with enter key and refresh the to-do list
	$(document).on('keydown', '#item', function () {
		if (event.which === 13) {
			var newToDo = $(this).val();
			console.log('newTodo', newToDo);
			$(this).val('');
			addToDo(newToDo);
			setTimeout(printToDo, 500);
		}
	});


	// functions
	// print all the to-do available on the server
	function printToDo() {
		$.ajax({
			url: "http://157.230.17.132:3027/todos",
			method: "GET",
			success: function (data, state) {
				// clear to-do list
				$('.to-do-list').text('');
				console.log('printTodo()', data);
				// scan every to-do and append it to the html
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
	}

	// add a new to-do to the server
	function addToDo(newToDo) {
		$.ajax({
			url: "http://157.230.17.132:3027/todos",
			method: "POST",
			data: {
				text: newToDo,
			},
			success: function (data, state) {
				console.log('addToDo()', data);
			},
			error: function (request, state, error) {
				console.log(error);
			}
		});
	}

});