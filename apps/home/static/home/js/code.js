$(document).ready(function(){
	$(".about").on("click", function() {
		$(this).parent().siblings(".detail").toggle("slow");
		$(this).parent().toggle("slow");
	})
	$(".close-about").click(function() {
		$(this).parent().slideUp();
		$(this).parent().siblings(".links").toggle("slow");
	})
});