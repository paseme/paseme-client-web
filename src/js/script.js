function GetParamsPage() {

    const queryString = window.location.search;

    const paramsURL = new URLSearchParams(queryString);

    const paramsObject = Object.fromEntries(paramsURL.entries());

    return Object.keys(paramsObject).length > 0 ? paramsObject : {};

}

function RequestServer(params) {

    return axios({

        method: "GET",

        url: "https://api.paseme.app/api/service",

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

            const { service, access } = result.data

            const serviceTime = new Date(service.time);

            const serviceCode = service.code;

            ModifyDatas(

                serviceTime.toLocaleTimeString("pt-BR", { 
                    
                    hour: "2-digit", 
                    
                    minute: "2-digit", 
                    
                    hour12: true 
                
                }),

                serviceTime.toLocaleDateString("pt-BR", { 
                    
                    weekday: "long", 
                    
                    day: "numeric", 
                    
                    month: "long", 
                    
                    year: "numeric" 
                
                }),

                serviceCode

            );

        })

        .catch(function(error) {

            console.error(error);

        });

}

main();