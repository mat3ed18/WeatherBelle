$("input[name=CEP]").mask("00000-000");

var key = "3ad51aa7";
var key2 = "bc07852d7ecb4d84b6b4a266d01cdef6";

function getAJAX(typed, link, callback) {
    $.ajax({
        type: typed,
        url: link,
        success: function (res) {
            callback(res);
        },
        error: function (res) {
            callback(res);
        }
    });
}

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
    var map = L.mapquest.map('map', { center: [lat, long], layers: L.mapquest.tileLayer('map'), zoom: 10 });
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

function iconWeather(size, condition) {
    switch (condition) {
        case "Tempestades severas":
        case "Tempestades":
        case "Tempestades isoladas":
        case "Tempestade forte":
            return "https://img.icons8.com/color/" + size + "/000000/storm.png";
            break;
        case "Tempestade tropical":
            return "https://img.icons8.com/color/" + size + "/000000/chance-of-storm.png";
            break;
        case "Furacão":
            return "https://img.icons8.com/color/" + size + "/000000/hurricane.png";
            break;
        case "Misto chuva e gelo":
        case " Congelamento chuva":
            return "https://img.icons8.com/color/" + size + "/000000/hail.png";
            break;
        case "Geada fina":
        case "Misto neve e gelo":
        case "Misto chuva e granizo":
        case "Misto de neve e chuva":
            return "https://img.icons8.com/color/" + size + "/000000/sleet.png";
            break;
        case "Chuviscos":
            return "https://img.icons8.com/color/" + size + "/000000/light-rain.png";
            break;
        case "Alguns chuviscos":
            return "https://img.icons8.com/color/" + size + "/000000/light-rain.png";
            break;
        case "Chuviscos com neve":
        case "Neve baixa":
            return "https://img.icons8.com/color/" + size + "/000000/light-snow.png";
            break;
        case "Pesados neve":
        case "Tempestade com neve":
            return "https://img.icons8.com/color/" + size + "/000000/snow-storm.png";
            break;
        case "Ventania com neve":
            return "https://img.icons8.com/color/" + size + "/000000/windy-weather.png";
            break;
        case "Queda de neve":
        case "Neve":
            return "https://img.icons8.com/color/" + size + "/000000/snow.png";
            break;
        case "Granizo":
        case "Gelo":
            return "https://img.icons8.com/color/" + size + "/000000/hail.png";
            break;
        case "Tempestade de areia":
        case "Poeira":
            return "https://img.icons8.com/color/" + size + "/000000/dust.png";
            break;
        case "Fumacento":
        case "Neblina":
            return "https://img.icons8.com/color/" + size + "/000000/fog-day.png";
            break;
        case "Vento acentuado":
            return "https://img.icons8.com/color/" + size + "/000000/windy-weather.png";
            break;
        case "Ventania":
            return "https://img.icons8.com/color/" + size + "/000000/wind.png";
            break;
        case "Tempo frio":
            return "https://img.icons8.com/color/" + size + "/000000/winter.png";
            break;
        case "Tempo nublado":
            return "https://img.icons8.com/color/" + size + "/000000/clouds.png";
            break;
        case "Tempo limpo":
        case "Parcialmente nublado":
        case "Ensolarado com muitas nuvens":
        case "Sol com poucas nuvens":
            return "https://img.icons8.com/color/" + size + "/000000/partly-cloudy-day.png";
            break;
        case "Ensolarado":
        case "Ar quente":
            return "https://img.icons8.com/color/" + size + "/000000/smiling-sun.png";
            break;
        case "Estrelado":
            return "https://img.icons8.com/color/" + size + "/000000/bright-moon.png";
            break;
        case "Trovoadas dispersas":
            return "https://img.icons8.com/color/" + size + "/000000/cloud-lighting.png";
            break;
        case "Chuvas esparsas":
        case "Chuva":
            return "https://img.icons8.com/color/" + size + "/000000/downpour.png";
            break;
        case "Serviço não disponível":
            return "https://img.icons8.com/color/" + size + "/000000/not-applicable.png";
            break;
    }
}

function formatDate(data) {
    var arr = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    var spl = data.split("/");
    return spl[0] + " de " + arr[parseInt(spl[1]) - 1] + " de " + spl[2];
}

function loadPage() {
    var sucesso = function (position) {
        getAJAX("get", "https://api.hgbrasil.com/weather?key=" + key + "&lat=" + position.coords.latitude + "&log=" + position.coords.longitude + "&user_ip=remote&locale=br", function (response) {
            $("#banner small").html("Você está em");
            var data = JSON.parse(JSON.stringify(response));
            if (data.results != null) {

                $("#ban_city").html(data.results.city);

                var conteudo = "<h1 class=\"col-12 col-12-mobile current_weather_title\">HOJE</h1>";

                conteudo += "<div class=\"col-12 col-12-mobile\"><img src=\"" + iconWeather(100, data.results.description) + "\" /></div>";
                conteudo += "<div class=\"col-12 col-12-mobile\"><label>" + data.results.description + "</label></div>";
                conteudo += "<div class=\"col-12 col-12-mobile\"><h5>" + formatDate(data.results.date) + "</h5></div>";

                conteudo += "<div class=\"col-6 col-6-mobile\"><i class=\"fa fa-thermometer-empty\" aria-hidden=\"true\"></i></div>";
                conteudo += "<div class=\"col-6 col-6-mobile\"><i class=\"fa fa-thermometer-full\" aria-hidden=\"true\"></i></div>";

                conteudo += "<h6 class=\"col-6 col-6-mobile\">Mínima</h6>";
                conteudo += "<h6 class=\"col-6 col-6-mobile\">Máxima</h6>";
                conteudo += "<h2 class=\"col-6 col-6-mobile\">" + data.results.forecast[0].min + "º C</h2>";
                conteudo += "<h2 class=\"col-6 col-6-mobile\">" + data.results.forecast[0].max + "º C</h2>";

                conteudo += "<h1 class=\"col-12 col-12-mobile current_weather_title\"><hr>NA SEMANA</h1>";

                for (var i = 0; i < 6; i++) {
                    conteudo += "<div class=\"col-2 col-2-mobile\"><img src=\"" + iconWeather(35, data.results.forecast[i].description) + "\"></div>";
                }

                for (var i = 0; i < 6; i++) {
                    conteudo += "<div class=\"col-2 col-2-mobile\">" + data.results.forecast[i].weekday + "<p><b>" + data.results.forecast[i].max + "º</b><p>" + data.results.forecast[i].min + "º</div>";
                }

                conteudo += "<h5 class=\"info_text col-12 col-12-mobile\"><hr><b>OUTRAS INFORMAÇÕES</b></h5>";
                conteudo += "<h5 class=\"info_text col-12 col-12-mobile\"><b>Horário da atualização:</b> " + data.results.time + " (" + data.results.currently + " - Horário Local)</h5>";
                conteudo += "<h5 class=\"info_text col-12 col-12-mobile\"><b>Velocidade do vento:</b> " + data.results.wind_speedy + "</h5>";
                conteudo += "<h5 class=\"info_text col-12 col-12-mobile\"><b>Umidade:</b> " + data.results.humidity + "%</h5>";

                $(".banner_main").html(conteudo);
            } else {
                var error = JSON.parse(JSON.stringify(response.responseJSON));
                navigator.notification.alert(error.message, null, "ERRO!", "OK");
            }
        });

    };

    navigator.geolocation.getCurrentPosition(sucesso);

    var city = [["Peruibe", "SP"], ["Itanhaém", "SP"], ["Mongaguá", "SP"], ["Praia Grande", "SP"], ["São Vicente", "SP"], ["Santos", "SP"], ["Bertioga", "SP"], ["Guarujá", "SP"]];

    for (var i = 0; i < city.length; i++) {
        getAJAX("get", "https://api.hgbrasil.com/weather?key=" + key + "&city_name=" + city[i][0] + "," + city[i][1], function (response) {
            var data = JSON.parse(JSON.stringify(response));
            if (data != null) {
                if (data.results != null) {
                    var conteudo = "<tr>";
                    conteudo += "<td>" + data.results.city + "</td>";
                    conteudo += "<td>" + data.results.forecast[0].min + "º</td>";
                    conteudo += "<td><b>" + data.results.forecast[0].max + "º</b></td>";
                    conteudo += "<td>" + data.results.description + "</td>";
                    var style = "background-size: 100%; background-repeat: no-repeat; background-position: center;";
                    conteudo += "<td class=\"lbl_image\" style=\"background: url('" + iconWeather(50, data.results.description) + "'); " + style + "\"></td>";
                    conteudo += "<td></td>";
                    conteudo += "</tr>";
                    $("#tb_cities_weather").append(conteudo);
                } else {
                    var error = JSON.parse(JSON.stringify(response.responseJSON));
                    navigator.notification.alert(error.message, null, "ERRO!", "OK");
                }
            }
        });
    }  
}

$(document).ready(function () {
    if (verficaConexao() == "OFFLINE") {
        navigator.notification.alert("Você está sem REDE", sair, "Não podemos continuar", "OK");
    }
    loadMap();
    loadPage();
    setTimeout(function () {
        if ($("#map").html() == "") {
            $("#map").html("Ative sua localização e reinicie o aplicativo novamente!");
            $("#map").css({ backgroundColor: "rgba(0,0,0,0.8)", color: "white", textAlign: "center", paddingTop: "3%" });
        }
    }, 10000);

    getAJAX("get", "https://servicodados.ibge.gov.br/api/v1/localidades/estados", function (response) {
        var dados = JSON.parse(JSON.stringify(response));
        for (var i = 0; i < dados.length; i++) {
            $("select[name=UF]").append("<option value=\"" + dados[i].sigla + "\">" + dados[i].nome + "</option>");
        }
    });
});

$(document).on("click", "#myBtn", function () {
    $("#myModal").fadeIn(500);
});

$(document).on("click", ".close", function () {
    $("#myModal").fadeOut(500);
});

$(document).on("click", ".form_cep", function () {
    getAJAX("get", "https://viacep.com.br/ws/" + $("input[name=CEP]").val().replace("-", "") + "/json/", function (response) {
        var dados = JSON.parse(JSON.stringify(response));
        $("input[name=CEP]").val(null);
        getAJAX("get", "https://api.hgbrasil.com/weather?key=" + key + "&city_name=" + dados.localidade + "," + dados.uf + "", function (response) {
            var data = JSON.parse(JSON.stringify(response));
            if (data.results != null) {
                $("#ban_city").html(data.results.city);

                getAJAX("get", "https://api.geoapify.com/v1/geocode/search?text=" + data.results.city + "&lang=pt&apiKey=" + key2, function (response) {
                    var data = JSON.parse(JSON.stringify(response));
                    $("#map").fadeOut(3000);
                    // mostraMapa(data.features[0].properties.lat, data.features[0].properties.lon);
                });

                var conteudo = "<h1 class=\"col-12 col-12-mobile current_weather_title\">HOJE</h1>";

                conteudo += "<div class=\"col-12 col-12-mobile\"><img src=\"" + iconWeather(100, data.results.description) + "\" /></div>";
                conteudo += "<div class=\"col-12 col-12-mobile\"><label>" + data.results.description + "</label></div>";
                conteudo += "<div class=\"col-12 col-12-mobile\"><h5>" + formatDate(data.results.date) + "</h5></div>";

                conteudo += "<div class=\"col-6 col-6-mobile\"><i class=\"fa fa-thermometer-empty\" aria-hidden=\"true\"></i></div>";
                conteudo += "<div class=\"col-6 col-6-mobile\"><i class=\"fa fa-thermometer-full\" aria-hidden=\"true\"></i></div>";

                conteudo += "<h6 class=\"col-6 col-6-mobile\">Mínima</h6>";
                conteudo += "<h6 class=\"col-6 col-6-mobile\">Máxima</h6>";
                conteudo += "<h2 class=\"col-6 col-6-mobile\">" + data.results.forecast[0].min + "º C</h2>";
                conteudo += "<h2 class=\"col-6 col-6-mobile\">" + data.results.forecast[0].max + "º C</h2>";

                conteudo += "<h1 class=\"col-12 col-12-mobile current_weather_title\"><hr>NA SEMANA</h1>";

                for (var i = 0; i < 6; i++) {
                    conteudo += "<div class=\"col-2 col-2-mobile\"><img src=\"" + iconWeather(35, data.results.forecast[i].description) + "\"></div>";
                }

                for (var i = 0; i < 6; i++) {
                    conteudo += "<div class=\"col-2 col-2-mobile\">" + data.results.forecast[i].weekday + "<p><b>" + data.results.forecast[i].max + "º</b><p>" + data.results.forecast[i].min + "º</div>";
                }

                conteudo += "<h5 class=\"info_text col-12 col-12-mobile\"><hr><b>OUTRAS INFORMAÇÕES</b></h5>";
                conteudo += "<h5 class=\"info_text col-12 col-12-mobile\"><b>Horário da atualização:</b> " + data.results.time + " (" + data.results.currently + " - Horário Local)</h5>";
                conteudo += "<h5 class=\"info_text col-12 col-12-mobile\"><b>Velocidade do vento:</b> " + data.results.wind_speedy + "</h5>";
                conteudo += "<h5 class=\"info_text col-12 col-12-mobile\"><b>Umidade:</b> " + data.results.humidity + "%</h5>";

                $(".banner_main").html(conteudo);
            } else {
                var error = JSON.parse(JSON.stringify(response.responseJSON));
                navigator.notification.alert(error.message, null, "ERRO!", "OK");
            }
        });
    });
});

$(document).on("click", ".form_city", function () {
    getAJAX("get", "https://api.hgbrasil.com/weather?key=" + key + "&city_name=" + $("select[name=CIDADE]").val() + "," + $("select[name=UF]").val(), function (response) {
        var data = JSON.parse(JSON.stringify(response));
        if (data != null) {
            if (data.results != null) {
                $("#banner small").html("Você escolheu");
                $("#ban_city").html(data.results.city);

                getAJAX("get", "https://api.geoapify.com/v1/geocode/search?text=" + data.results.city + "&lang=pt&apiKey=" + key2, function (response) {
                    var data = JSON.parse(JSON.stringify(response));
                    $("#map").fadeOut(3000);
                    // mostraMapa(data.features[0].properties.lat, data.features[0].properties.lon);
                });

                var conteudo = "<h1 class=\"col-12 col-12-mobile current_weather_title\">HOJE</h1>";

                conteudo += "<div class=\"col-12 col-12-mobile\"><img src=\"" + iconWeather(100, data.results.description) + "\" /></div>";
                conteudo += "<div class=\"col-12 col-12-mobile\"><label>" + data.results.description + "</label></div>";
                conteudo += "<div class=\"col-12 col-12-mobile\"><h5>" + formatDate(data.results.date) + "</h5></div>";

                conteudo += "<div class=\"col-6 col-6-mobile\"><i class=\"fa fa-thermometer-empty\" aria-hidden=\"true\"></i></div>";
                conteudo += "<div class=\"col-6 col-6-mobile\"><i class=\"fa fa-thermometer-full\" aria-hidden=\"true\"></i></div>";

                conteudo += "<h6 class=\"col-6 col-6-mobile\">Mínima</h6>";
                conteudo += "<h6 class=\"col-6 col-6-mobile\">Máxima</h6>";
                conteudo += "<h2 class=\"col-6 col-6-mobile\">" + data.results.forecast[0].min + "º C</h2>";
                conteudo += "<h2 class=\"col-6 col-6-mobile\">" + data.results.forecast[0].max + "º C</h2>";

                conteudo += "<h1 class=\"col-12 col-12-mobile current_weather_title\"><hr>NA SEMANA</h1>";

                for (var i = 0; i < 6; i++) {
                    conteudo += "<div class=\"col-2 col-2-mobile\"><img src=\"" + iconWeather(35, data.results.forecast[i].description) + "\"></div>";
                }

                for (var i = 0; i < 6; i++) {
                    conteudo += "<div class=\"col-2 col-2-mobile\">" + data.results.forecast[i].weekday + "<p><b>" + data.results.forecast[i].max + "º</b><p>" + data.results.forecast[i].min + "º</div>";
                }

                conteudo += "<h5 class=\"info_text col-12 col-12-mobile\"><hr><b>OUTRAS INFORMAÇÕES</b></h5>";
                conteudo += "<h5 class=\"info_text col-12 col-12-mobile\"><b>Horário da atualização:</b> " + data.results.time + " (" + data.results.currently + " - Horário Local)</h5>";
                conteudo += "<h5 class=\"info_text col-12 col-12-mobile\"><b>Velocidade do vento:</b> " + data.results.wind_speedy + "</h5>";
                conteudo += "<h5 class=\"info_text col-12 col-12-mobile\"><b>Umidade:</b> " + data.results.humidity + "%</h5>";

                $(".banner_main").html(conteudo);
            } else {
                var error = JSON.parse(JSON.stringify(response.responseJSON));
                navigator.notification.alert(error.message, null, "ERRO!", "OK");
            }
        } else {
            $("#banner small").html("VERIFIQUE AS INFORMAÇÕES E TENTE NOVAMENTE MAIS TARDE");
            $("#ban_city").html("OOPS!");
            $(".banner_main").html("<h2>ERRO! O LOCAL SELECIONADO NÃO POSSUI DADOS METEOROLOGICOS</h2>");
        }
    });
});

$("select[name=UF]").change(function () {
    $("select[name=CIDADE]").html("<option value=\"\">-</option>");
    getAJAX("get", "https://servicodados.ibge.gov.br/api/v1/localidades/estados/" + $("select[name=UF]").val() + "/municipios", function (response) {
        var dados = JSON.parse(JSON.stringify(response));
        for (var i = 0; i < dados.length; i++) {
            $("select[name=CIDADE]").append("<option value=\"" + dados[i].nome + "\">" + dados[i].nome + "</option>");
        }
    });
});

window.onclick = function (event) {
    if (event.target == document.getElementById("myModal")) {
        $("#myModal").fadeOut(500);
    }
}

