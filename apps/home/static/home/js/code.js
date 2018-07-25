$(document).ready(function(){
	$(".about").on("click", function() {
		var id = $(this).parent().attr("id");
		$("." + id + "_detail").toggle("slow");
	})
	$(".close").click(function() {
		$(this).parent().slideUp();
	})
});