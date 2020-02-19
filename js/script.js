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
			// refresh the to-do
			setTimeout(printToDo, 500);
		}
	});

	// delete the selected to-do
	$(document).on('click', '.cross', function () {
		var id = $(this).closest('li').attr('id-attribute');
		console.log(id);
		deleteToDo(id);
		// refresh the to-do
		setTimeout(printToDo, 500);
	});

	// toggle checked item
	$(document).on('click', '.check', function () {
		console.log($(this).closest('li'));
		$(this).closest('li').toggleClass('line-through');
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
					var id = data[i].id;
					var toDo = data[i].text;
					// handlebars
					var source = $('#template').html();
					var template = Handlebars.compile(source);
					var context = {
						idAttribute: id,
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

	// add a new to-do to the server
	function updateToDo(updatedToDo) {
		$.ajax({
			url: "http://157.230.17.132:3027/todos/" + x,
			method: "PATCH",
			data: {
				text: updatedToDo,
			},
			success: function (data, state) {
				console.log('updateToDo()', data);
			},
			error: function (request, state, error) {
				console.log(error);
			}
		});
	}

	// delete a to-do from the server
	function deleteToDo(id) {
		$.ajax({
			url: "http://157.230.17.132:3027/todos/" + id,
			method: "DELETE",
			success: function (data, state) {
				console.log('deleteToDo()', data);
			},
			error: function (request, state, error) {
				console.log(error);
			}
		});
	}

});