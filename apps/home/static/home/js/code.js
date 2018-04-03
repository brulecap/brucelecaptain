$(document).ready(function(){
	$(".about").on("click", function() {
		console.log("click about");
		$(this).parent().siblings(".detail").toggle("slow");
		$(this).parent().toggle("slow");
	})
	$(".close-about").click(function() {
		console.log("click close-about with click");
		$(this).parent().slideUp();
		$(this).parent().siblings(".links").toggle("slow");
	})
});