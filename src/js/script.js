function GetParamsPage() {

    const queryString = window.location.search;

    const paramsURL = new URLSearchParams(queryString);

    const paramsObject = Object.fromEntries(paramsURL.entries());

    return Object.keys(paramsObject).length > 0 ? paramsObject : {};

}

function RequestServer(params) {

    return axios({

        method: "GET",

        url: "https://api.paseme.app/api/atendimento",

        params

    });

}

function ModifyDatas(hour, day, code) {

    document.querySelector(".window-time-hour").innerHTML = hour;

    document.querySelector(".window-time-day").innerHTML = day;
    
    document.querySelector(".window-center-code").innerHTML = code;

}

function main() {

    const params = GetParamsPage();

    RequestServer(params)

        .then(function(result) {

            const tempo = new Date(result.data.tempo);

            const codigo = result.data.codigo.toUpperCase();

            ModifyDatas(

                tempo.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", hour12: true }),

                tempo.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" }),

                codigo

            );

        })

        .catch(function(error) {

            console.error(error);

        });

}

main();