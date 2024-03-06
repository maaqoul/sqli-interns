const toggleMenu = () => {
	if ($(".navbar").css("display") == "none")
		$(".navbar").css("display", "inline");
	else
		$(".navbar").css("display", "none");
}

const update = () => {
	if ($(window).width() > 800 && this.scrollY < 100) {
		$("nav").css("background-color", "rgba(0, 0, 0, .2)");
		$("nav").css("box-shadow", "rgba(0, 0, 0, 0) 0px 5px 50px");
		$("h1").css("letter-spacing", "2.5px");
		$("h1").css("color", "white");
		$("a").css("color", "white");
		$(".navbar").css("display", "inline");
	}
	else {
		$("nav").css("background-color", "rgba(255, 255, 255, 1)");
		$("nav").css("box-shadow", "rgba(0, 0, 0, 0.35) 0px 5px 50px");
		$("h1").css("letter-spacing", "normal");
		$("h1").css("color", "black");
		$("a").css("color", "black");
		$(".navbar").css("display", "none");
	}
	if ($(window).width() > 800)
		$(".navbar").css("display", "inline");
}

window.addEventListener("scroll", update);
window.addEventListener("resize", update);

const seeFeatures = () => {
	$('html').animate({
		scrollTop: $("#scrollFeatures").offset().top
	}, 1000);
}
