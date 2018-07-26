$(document).ready(function(){
	$(".about").on("click", function() {
		var id = $(this).parent().attr("id");
		$("." + id + "_detail").toggle("slow");
		event.preventDefault();
	})
	$(".close").click(function() {
		$(this).parent().slideUp();
	})
});