$(document).ready(function(){
	// Set quote and source text from header html template after document is loaded.
	if ((typeof quotes !== 'undefined') && (typeof quote_index !== 'undefined')) {
		$("#quote").text(quotes[quote_index].quote);
		$("#source").text(quotes[quote_index].source);
		$(".container-fluid").css("padding", $(".quote_div").height() + "px 0 0 0" );
	}
	// Class about and close on click events from the code html template.
	$(".about").on("click", function() {
		var id = $(this).parent().attr("id");
		$("." + id + "_detail").toggle("slow");
		event.preventDefault();
	})
	$(".close").click(function() {
		$(this).parent().slideUp();
	})
	// Id previous and next on click events from header html template
	$("#previous").on("click", function() {
		if ((typeof quotes !== 'undefined') && (typeof quote_index !== 'undefined')) {
			quote_index -= 1;
			if (quote_index === -1) { 
				quote_index = quotes.length - 1;
			}
			$("#quote").text(quotes[quote_index].quote);
			$("#source").text(quotes[quote_index].source);
		}
		$(".container-fluid").css("padding", $(".quote_div").height() + "px 0 0 0" );
	})
	$("#next").on("click", function() {
		if ((typeof quotes !== 'undefined') && (typeof quote_index !== 'undefined')) {
			quote_index += 1;
			if (quote_index === quotes.length) { 
				quote_index = 0;
			}
			$("#quote").text(quotes[quote_index].quote);
			$("#source").text(quotes[quote_index].source);
		}
		$(".container-fluid").css("padding", $(".quote_div").height() + "px 0 0 0" );
	})
});