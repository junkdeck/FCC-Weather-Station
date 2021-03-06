function error(err) {
    if(err==='https'){
        errMsg = 'HTTPS not supported!';
    }else{
        errMsg = 'Something went wrong! Try again later.';
    }
    printError(errMsg);
}

function printError(err){
    $(".location").append(err);
}

function weatherHandler(data){

    var celsius = Math.round(data.main.temp);
    var fahrenheit = Math.round(convertToF(celsius));

    var curUnit = "celsius";

    $('.location').html(data.name+', '+data.sys.country);
    $('.temp').html(celsius);
    $('.unit').html("C&deg;");
    $('.weatherDesc').html(data.weather[0].description);
    $('.iconSrc').attr("src","http://openweathermap.org/img/w/"+data.weather[0].icon+".png")

    $('.temperature').on('click',function(){
        if(curUnit === "celsius"){
            $('.temp').html(fahrenheit);
            $('.unit').html("F&deg;");
            curUnit = "fahrenheit";
        }else{
            $('.temp').html(celsius);
            $('.unit').html("C&deg;");
            curUnit = "celsius";
        }
    });
}

function getLocation(data){
    // $.getJSON("http://ipinfo.io/geo").done(function(data){
        var loc = data.loc.split(',');
        var coords = {
            lat:loc[0],
            lon:loc[1]
        };
        console.log(coords);
        getWeather(coords.lat,coords.lon);
    // }).fail(error);
}

function convertToF(celsius){
    var fahrenheit = ((celsius*(9/5)) + 32);
    return fahrenheit;
}

function getWeather(lat,lon){
    var apikey = "efed01ab19d45901ba44dc05a91b1eef";
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=metric&APPID="+apikey).done(weatherHandler).fail(error);
}

$(document).ready(function(){
    if(window.location.protocol === 'https'){
        error("https");
    }else{
        // getLocation();
            $.ajax({
                url:"http://ipinfo.io/geo",
                dataType:"jsonp",
                success:getLocation,
                error:error
            });
    }
});
