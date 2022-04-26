window.onload = function() {
    darkMode = sessionStorage.getItem('theme');
    // document.cookie = 'darkMode=dark; darkMode=light'
    // sessionStorage.setItem(key, value);
    if (darkMode === 'dark') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }

    const toggleButton = document.getElementById('toggleButton')

    toggleButton.addEventListener('click', function() {
        darkMode = sessionStorage.getItem('theme');
        // document.cookie = 'darkMode=dark; darkMode=light'
        // sessionStorage.setItem(key, value);
        if (darkMode === 'dark') {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    function enableDarkMode() {
        document.body.classList.toggle("darktype")

        document.getElementById('moon').src = "../images/common/sun.svg";
        document.getElementById('head_logo').src = "../images/home/head_logo_dark.png";
        document.getElementById('lake').src = "../images/common/title/lake_letter_dark.png";
        document.getElementById("ocean").src = "../images/common/title/sea_letter_dark.png";
        document.getElementById("river").src = "../images/common/title/river_letter_dark.png";
        document.getElementById("mountain").src = "../images/common/title/mountain_letter_dark.png";

        sessionStorage.setItem('theme', 'dark');
    }

    function disableDarkMode() {
        document.body.classList.remove("darktype")
        document.getElementById('moon').src = "../images/common/moon.svg";
        document.getElementById('head_logo').src = "../images/home/head_logo.png";
        document.getElementById('lake').src = "../images/common/title/lake_letter.png";
        document.getElementById("ocean").src = "../images/common/title/sea_letter.png";
        document.getElementById("river").src = "../images/common/title/river_letter.png";
        document.getElementById("mountain").src = "../images/common/title/mountain_letter.png";
        sessionStorage.setItem('theme', 'light');
    }
}