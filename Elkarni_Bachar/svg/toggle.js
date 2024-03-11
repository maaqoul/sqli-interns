const changeTheme = () => {
    var svgObject = document.getElementById("svgObject").contentDocument;
    const dayNight = svgObject.getElementById("dayNight")
    dayNight.setAttribute("href", dayNight.getAttribute("href") == "#skyDay" ? "#skyNight" : "#skyDay")

}