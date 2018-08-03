$(document).ready(function(){
	$(".about").on("click", function() {
		var id = $(this).parent().attr("id");
		$("." + id + "_detail").toggle("slow");
		event.preventDefault();
	})
	$(".close").click(function() {
		$(this).parent().slideUp();
	})
	if ((typeof quotes !== 'undefined') && (typeof quote_index !== 'undefined')) {
		$("#quote").text(quotes[quote_index].quote);
		$("#source").text(quotes[quote_index].source);
	}
	$("#previous").on("click", function() {
		if ((typeof quotes !== 'undefined') && (typeof quote_index !== 'undefined')) {
			quote_index -= 1;
			if (quote_index === -1) { 
				quote_index = quotes.length - 1;
			}
			$("#quote").text(quotes[quote_index].quote);
			$("#source").text(quotes[quote_index].source);
			event.preventDefault();
		}
	})
	$("#next").on("click", function() {
		if ((typeof quotes !== 'undefined') && (typeof quote_index !== 'undefined')) {
			quote_index += 1;
			if (quote_index === quotes.length) { 
				quote_index = 0;
			}
			$("#quote").text(quotes[quote_index].quote);
			$("#source").text(quotes[quote_index].source);
			event.preventDefault();
		}
	})
});