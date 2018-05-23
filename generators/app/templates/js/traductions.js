var lang = "en";
var arrLang = [];

//Attach events to menu
$(function(){

  function buttonActive(tab) {
    //Get item siblings
    var siblings = tab.siblings();
    //Remove active class on all buttons
    siblings.each(function(){
      $(this).removeClass('active-lang');
    })

    //Add the clicked button class
    tab.addClass('active-lang');
  }

  if (sessionStorage) {
    var ind = sessionStorage.tab;
    buttonActive($('.site-button-container .site-button').eq(ind));
  }
      
  $(".site-button-container .site-button").click(function () {
    if(sessionStorage){ 
      sessionStorage.tab = $(this).index();
    }
    buttonActive($(this));
  });
});

$.ajax({
  url: '../json/data.json',
  dataType: 'json',
  type: 'get',
  cache: false,
  success: function(data) {

    // The default language is English
    arrLang = data

    langChange();
  }
});

function langChange() {
  // Check for localStorage support
  if('sessionStorage' in window){
    var usrLang = sessionStorage.getItem('uiLang');
    if(usrLang) {
      lang = usrLang
    }
  }

  function langInfo(lang) {
    $(".lang").each(function(index, element) {
      var img = "Img"
      $(element).text(arrLang[lang][$(element).attr("data-info")]);
      $(element).attr("src", arrLang[lang][$(element).attr("data-info")]);
    });
  }

  langInfo(lang);

  // get/set the selected language
  $(".translate").click(function() {
    var lang = $(this).attr("id");
    // update sessionStorage key
    if('sessionStorage' in window){
      sessionStorage.setItem('uiLang', lang);
      var idioma = sessionStorage.getItem('uiLang');
    }

    langInfo(idioma);
  });
}
