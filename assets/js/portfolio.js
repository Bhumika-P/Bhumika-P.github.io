function sendmail() {
  window.open('mailto:test@example.com?subject=subject&body=body');
}
function myButtonFunction() {
  document.getElementById("drop").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

var lang = {
  "html": "90%",
  "css": "80%",
  "javascript": "70%",
  "java": "80%",
  "sql": "90%",
  "as": "90%"
};

var multiply = 4;

$.each(lang, function (language, pourcent) {

  var delay = 500;

  setTimeout(function () {
    $('#' + language + '-pourcent').html(pourcent);
  }, delay * multiply);

  multiply++;

});

//preloader animation

const preloader = document.querySelector('.preloader');
window.onload = setInterval(() => {
           // if we don't set opacity 1 in CSS, then   //it will be equaled to "", that's why we   // check it
  if (!preloader.style.opacity) {
    preloader.style.opacity = 1;
  }
  if (preloader.style.opacity > 0) {
    preloader.style.opacity -= 0.1;
  } else {
    clearInterval();
  }
  }, 200);
            // Add active class to the current button (highlight it)
  $(".navbar-nav .nav-link").on("click", function(){
    $(".navbar-nav").find(".active").removeClass("active");
      $(this).addClass("active");
    });
