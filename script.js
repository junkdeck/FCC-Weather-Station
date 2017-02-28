function error(err) {
    if(err==='noHTTPS'){
        errMsg = 'HTTPS not supported!';
    }
    errMsg = 'Something went wrong! Try again later.';
    printError(errMsg);
}

function printError(err){
    $("body").append(err);
}

function weatherHandler(data){
    console.log(data);
}

function getLocation(){
    $.getJSON("http://ipinfo.io/geo").done(function(data){
        var loc = data.loc.split(',');
        var coords = {
            lat:loc[0],
            lon:loc[1]
        };
        console.log(coords);
        getWeather(coords.lat,coords.lon);
    });
}

function getWeather(lat,lon){
    if(window.location.protocol === 'https'){
        error("noHTTPS");
        return;
    }
    var apikey = "efed01ab19d45901ba44dc05a91b1eef";
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&APPID=efed01ab19d45901ba44dc05a91b1eef", 'jsonp').done(weatherHandler).fail(error);
}

$(document).ready(function(){
    getLocation();
});
