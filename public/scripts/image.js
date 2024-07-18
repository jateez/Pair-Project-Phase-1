document.getElementById("image").onclick = function() {
    document.getElementById("popup").style.display = "flex";
};

document.getElementById("closeBtn").onclick = function() {
    document.getElementById("popup").style.display = "none";
};

window.onclick = function(event) {
    if (event.target == document.getElementById("popup")) {
        document.getElementById("popup").style.display = "none";
    }
};
