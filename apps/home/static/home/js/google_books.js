$(document).ready(function(){
	const MAX_RESULTS = 20;
	const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes?q="
	const THEAD = "<thead><tr><th>Book Cover</th><th>Author(s)</th><th>Title</th><th>Date Published</th><th>Language</th><th>ISBN 13</th><th>ISBN 10</th><th>Other identifier</th></tr></thead>";
	let descriptions = {};
	let start_index = 0;
	let q = ""

	$("#submit_search").on("click", function() {
		start_index = 0;
		q = get_query_string($("#google_books_form").serializeArray());
		if (q !== "") {
			query_google(`${q}&maxResults=${MAX_RESULTS}&startIndex=${start_index}`);
		} else {
			$("#books").html('<p class="text-warning">Searching for nothing would be a waste of time. Please fill in one of the fields above and try again.</p>');
		}
		event.preventDefault();
	});
	$("#books").on("mouseenter", ".img_cell", function(e) {
		$('#description').html(descriptions[this.id]);
		$('#description').slideDown();
	});

	/*
	 * close click event in modal.js does not work on this page because
	 * the close button is generated after the dom is loaded.
	*/
	$("#description").on("click", ".close", function(e) {
		$('#description').slideUp();
		$('#description').empty();

	});

	// Get next page
	$("#books").on("click", ".next", function(e) {
		start_index += MAX_RESULTS;
		paginate();
		e.preventDefault();
	});

	// Get previous page
	$("#books").on("click", ".prev", function(e) {
		start_index -= MAX_RESULTS;
		paginate();
		e.preventDefault();
	});

	// TODO: Load all will cause all vaolumes to be displayed.
	$("#books").on("click", "#load_all", function(e) {
		console.log("load all", q);
		e.preventDefault();
	});

	// Clears search results.
	$("#books").on("click", "#clear", function(e) {
		q = "";
		descriptions = {};
		start_index = 0;
		$("#inauthor").val("");
		$("#intitle").val("");
		$("#books").html('');
		e.preventDefault();
	});

	// Function to create Google Books API query string
	function get_query_string(form_data) {
		let query_string = "";
		/*
		 * I am depending on the "name" in the input element to match what google is expecting in the query string.
		 * Example: To search by author "Stephen King", I need to include "inauthor:Stephen%20King" in the query. As
		 *			a result I need to format the input tag <input name="inauthor" ...>
		 */
		$.each(form_data, function() {
			if (this.value !== "") {
				query_string += `${this.name}:${this.value}+`;
			}
		});
		/* 
		 * Replace spaces with urlencoded space, %20.
		 * I tried encodeURIComponent but the api did not work with 
		 * :, +, & encoded.
		 */
		query_string = query_string.split(' ').join('%20'); 
	
		// Remove last "+"" from iteration above. Could add a check in iteration, but this seems more straight forward. Could be wrong...
		if (query_string !== "") {
			query_string = query_string.slice(0, -1);
		}
		return query_string;
	}

	function paginate() {
		if (q !== "") {
			query_google(`${q}&maxResults=${MAX_RESULTS}&startIndex=${start_index}`);
		}
	}

	function paginate_html(total_items) {
		// TODO: Commented code would be used to display all books. 
//		return `<div class="paginate">${(start_index > 0 ? '<a class="prev" href="#"><i id="previous" class="fas fa-angle-left"></i></a>' : '')}${(start_index+MAX_RESULTS < total_items ? '<a class="next" href="#"><i id="next" class="fas fa-angle-right"></i></a>' : '')}${((start_index+MAX_RESULTS < total_items) || (start_index > 0)? '<button id="load_all" type="button">Load all books</button><button id="clear" type="button">Clear search</button>' : '')}</div>`;
		return `<div class="paginate">${(start_index > 0 ? '<a class="prev" href="#"><i id="previous" class="fas fa-angle-left"></i></a>' : '')}${(start_index+MAX_RESULTS < total_items ? '<a class="next" href="#"><i id="next" class="fas fa-angle-right"></i></a>' : '')}${((start_index+MAX_RESULTS < total_items) || (start_index > 0)? '<button id="clear" type="button">Clear search</button>' : '')}</div>`;
	}

	/*
	 * Populates table rows and also populates global descriptions dictionary
	 * Paramaters:
	 *		rows - array of items as documented here (https://developers.google.com/books/docs/v1/reference/volumes/list)
	 *
	 * returns:
	 		rows: A string of table rows (tr), each populated with data from each item. If there is no items data and empty string is returned.
	 */ 
	function populate_table_rows(items) {
		let rows = ""
		for (let i=0;i<items.length;i++) {
			let description = "No description provided";
			if (items[i].volumeInfo.description != null) {
				description = items[i].volumeInfo.description;
			}
			// Populate descriptions dictionary used when book cover is moused over. See $("#books").on("mouseenter",... event
			descriptions[items[i].id] = `<span class="close">&times;</span><h2>${items[i].volumeInfo.title}</h2><div class="description_text">${description}</div>`;
			// cook cover table cell
			let image = "No image";
			if (items[i].volumeInfo.imageLinks) {
				image = `<img src="${items[i].volumeInfo.imageLinks.smallThumbnail}" alt="${items[i].volumeInfo.title}">`;
			}
			rows += `<tr><td id="${items[i].id}" class="img_cell">${image}</td>`;
			// author name(s) table cell
			let authors_list = ""
			for (let j=0;j<items[i].volumeInfo.authors.length;j++) {
				authors_list += `<li>${items[i].volumeInfo.authors[j]}</li>`;
			}
			if (authors_list) {
				authors_list = `<ul>${authors_list}</ul>`;
			}
			rows += `<td>${authors_list}</td>`;
			// title table cell
			rows += `<td>${items[i].volumeInfo.title}</td>`;
			// publishedDate
			rows += `<td>${items[i].volumeInfo.publishedDate}</td>`;
			// language table cell
			rows += `<td>${items[i].volumeInfo.language}</td>`;
			// populate isbn 13, isbn10 and other identifier cell. Note: At times industryIdentifiers was not included in the json response from google.
			let isbn13 = "";
			let isbn10 = "";
			let other = "";
			if (items[i].volumeInfo.industryIdentifiers) {
				for (let j=0;j<items[i].volumeInfo.industryIdentifiers.length;j++) {
					if (items[i].volumeInfo.industryIdentifiers[j].type === "ISBN_13") {
						isbn13 = items[i].volumeInfo.industryIdentifiers[j].identifier;
					} else if (items[i].volumeInfo.industryIdentifiers[j].type === "ISBN_10") {
						isbn10 = items[i].volumeInfo.industryIdentifiers[j].identifier;
					} else if (items[i].volumeInfo.industryIdentifiers[j].type === "OTHER") {
						other = items[i].volumeInfo.industryIdentifiers[j].identifier;
					}
				}
			}
			rows += `<td>${isbn13}</td><td>${isbn10}</td><td>${other}</td></tr>`;
		}
		return rows;
	}

	//Create html and populate DOM
	function query_google(query_string) {
		$.getJSON(GOOGLE_BOOKS_API + query_string)
		.done(function( data ) {
			/*
			 * totalItems returned from the api is a guess from google. As you paginate through the results
			 * the totalItems becomes "more" accurate. So totalItems is only useful in the sense that your
			 * start index can't be greater than totalItems. i.e. Nothing will be returned if you paginate
			 * past totalItems.
			 */
			let books_html = "";
			if ((data.totalItems > 0) && (data.totalItems > start_index)) {
				descriptions = {};
				// Popuplate paginate controls.
				books_html += paginate_html(data.totalItems);
				books_html += `<table class="responsive-table table">${THEAD}<tbody>`;
				books_html += populate_table_rows(data.items);
				// And we have populated our table. Close it out.
				books_html += "</tbody></table>";
				books_html += paginate_html(data.totalItems);
			} else {
				// No items in json response from google.
				books_html = '<p class="text-warning">Nothing found! Please try something else!</p>';
			}
			$("#books").html(books_html);
		});
	}
});