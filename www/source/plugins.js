$("input[name=CEP]").mask("00000-000");

var key = "3512a383";

$(document).ready(function () {
    if (verficaConexao() == "OFFLINE") {
        navigator.notification.alert("Você está sem REDE", sair, "Não podemos continuar", "OK");
    }
    loadMap();
    // setTimeout(function(){
    //     if ($("#map").html() == "") {
    //         navigator.notification.alert("Oops!\nAtive a localização do seu dispositivo e volte novamente.", sair, "Sua localização está desativada", "OK");
    //     }
    // }, 10000);
});

function sair() {
    navigator.app.exitApp();
}

function verficaConexao() {
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN] = 'Você está conectado numa conexão desconhecida';
    states[Connection.ETHERNET] = 'Você está conectado pelo cabo RJ-45 de internet';
    states[Connection.WIFI] = 'Você está conectado numa rede WI-FI';
    states[Connection.CELL_2G] = 'Você está conectado numa rede 2G';
    states[Connection.CELL_3G] = 'Você está conectado numa rede 3G';
    states[Connection.CELL_4G] = 'Você está conectado numa rede 4G';
    states[Connection.CELL] = 'Você está conectado na rede de serviço';
    states[Connection.NONE] = 'OFFLINE';
    return (states[networkState]);
}

function mostraMapa(lat, long) {
    L.mapquest.key = '5qo56SrFXYmFA77dZA3ImqvplHPgx1oS';
    var map = L.mapquest.map('map', { center: [lat, long], layers: L.mapquest.tileLayer('map'), zoom: 15 });

    window.location.href = "http://apiadvisor.climatempo.com.br/api/v1/climate/rain/locale/3477?latitude=" + lat + "&longitude=" + long + "&token=" + token;

    // $.ajax({
    //   type: "get",
    //   url: "http://apiadvisor.climatempo.com.br/api/v1/forecast/geo/hours/72?latitude=" + lat + "&longitude=" + long + "&token=" + token,
    //   success: function(data){
    //     document.body.innerHTML = JSON.stringify(data);
    //     L.marker([lat, long], {
    //         icon: L.mapquest.icons.marker(),
    //         draggable: false
    //     }).bindPopup(data.name + ", " + data.state).addTo(map);
    //   }
    // });

}

function loadMap() {
    $("#map").css("height", $(window).width() + "px");
    var sucesso = function (position) {
        mostraMapa(position.coords.latitude, position.coords.longitude);
    };

    function erro(error) {
        navigator.notification.alert('Código: ' + error.code + '\nMensagem: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(sucesso);

}

$(document).on("click", "#myBtn", function () {
    $("#myModal").fadeIn(500);
});

$(document).on("click", ".close", function () {
    $("#myModal").fadeOut(500);
});

window.onclick = function (event) {
    if (event.target == document.getElementById("myModal")) {
        $("#myModal").fadeOut(500);
    }
}