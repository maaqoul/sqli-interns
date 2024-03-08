let day = true
let svg, sun, mountain1, mountain2, mountain3, sky, sky2, stars
window.addEventListener('load', () => {
    svg = document.getElementById("svg").contentDocument
    sun = svg.getElementById("sun")
    mountain1 = svg.getElementById("mountain1")
    mountain2 = svg.getElementById("mountain2")
    mountain3 = svg.getElementById("mountain3")
    sky = svg.getElementById("sky")
    sky2 = svg.getElementById("sky2")
    stars = svg.querySelectorAll('#star')
})

const change = () => {
    if (day) {
        sun.setAttribute("fill", "white")
        mountain1.setAttribute("fill", "url(#mountainNightGradient)")
        mountain2.setAttribute("fill", "url(#mountainNightGradient)")
        mountain3.setAttribute("fill", "url(#mountainNightGradient)")
        sky.setAttribute("fill", "url(#skyNight)")
        sky2.setAttribute("fill", "url(#sky2Night)")
        stars.forEach((star) => {
            star.setAttribute('fill', '#d2dbed');
        });
    }
    else {
        sun.setAttribute("fill", "yellow")
        mountain1.setAttribute("fill", "url(#mountainDayGradient)")
        mountain2.setAttribute("fill", "url(#mountainDayGradient)")
        mountain3.setAttribute("fill", "url(#mountainDayGradient)")
        sky.setAttribute("fill", "url(#skyDay)")
        sky2.setAttribute("fill", "url(#sky2Day)")
        stars.forEach((star) => {
            star.setAttribute('fill', 'transparent');
        });
    }
    day = !day;
}