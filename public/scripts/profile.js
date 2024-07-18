let profilePopup = document.getElementById("profile-popup");
        let profileButton = document.getElementById("profile-button");
        let closeBtn = document.getElementById("profile-close");
        profileButton.onclick = function() {
            profilePopup.style.display = "block";
        }

        closeBtn.onclick = function() {
            profilePopup.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == profilePopup) {
                profilePopup.style.display = "none";
            }
        }