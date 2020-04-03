  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      {
        path: '/about/',
        url: 'about.html',
      },
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    var url="https://ws.smn.gob.ar/map_items/forecast/1";
    app.request.json(url, function(esto) {

    for (i=0; i<esto.length; i++) {
      ciudad = esto[i].name;
      provincia = esto[i].province;

      $$("#hola").append("<option value='"+ ciudad +"'>"+ provincia + ", "+ciudad+"</option>");
  }
    
    });

    

});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="about"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log(e);
    alert('Hello');
    var url="https://ws.smn.gob.ar/map_items/forecast/1";
    app.request.json(url, function(esto) {

    for (i=0; i<esto.length; i++) {
      ciudad = esto[i].name;


        if ($$("#hola").val() == ciudad ) {
          ciudad = esto[i].name;
          $$('#localidad').html(ciudad);
          provincia = esto[i].province;
          $$('#provincia').html(provincia);

          temp_ma = esto[i].weather.morning_temp;
          $$('#temp_m').html(temp_ma);
          desc_ma = esto[i].weather.morning_desc;
          $$('#desc_m').html(desc_ma);

          temp_ta = esto[i].weather.afternoon_temp;
          $$('#temp_t').html(temp_ta);
          desc_ta = esto[i].weather.afternoon_desc;
          $$('#desc_t').html(desc_ta);

      }



  }
    
    });
})





