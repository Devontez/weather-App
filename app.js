window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDiscription = document.querySelector('.temperature-discription');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = `http://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/5680b82ee7ba1f37b990925605203c02/${lat},${long}`;
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {

                    const {
                        temperature,
                        summary,
                        icon
                    } = data.currently
                    //Set Dom Elements from the API

                    temperatureDegree.textContent = temperature;
                    temperatureDiscription.textContent = summary;
                    locationTimezone.textContent = data.timezone.replace("America/", "");

                    //formular for C
                    let celsius = (temperature - 32 ) * (5 / 9);
                    //set Icons
                    setIcons(icon, document.querySelector(".icon"));

                    //Set  f to c
                    temperatureSection.addEventListener('click', () =>{
                        if (temperatureSpan.textContent === "F"){
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        }else{
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature
  
                        }
                    })

                });
        });

    }

    function setIcons(icon, iconId) {
        const skycons = new Skycons({
            color: "white"
        });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon]);

    }
});