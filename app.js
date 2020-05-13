window.addEventListener('load', () => {
    let long;
    let lat;
    let tempDescription = document.querySelector('.temperature-description');
    let tempDegree = document.querySelector('.temperature-degree');
    let locationCity = document.querySelector('.location-city');
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const apiKey = '68038ea0890a4308ac2070cba884d1fb';
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.weatherbit.io/v2.0/current?&lat=${lat}&lon=${long}&units=I&key=${apiKey}`;

            fetch(api)
                .then(res => {
                    return res.json();
                })
                .then(data2 => {
                    const temp = data2.data[0].temp;
                    const description = data2.data[0].weather.description;
                    const city = data2.data[0].city_name;
                
                    tempDegree.textContent = temp;
                    tempDescription.textContent = description;
                    locationCity.textContent = city;

                    let celsius = (temp - 32) * (5 / 9);

                    setIcons(description, document.querySelector('.icon'));

                    temperatureSection.addEventListener("click", () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            tempDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = "F";
                            tempDegree.textContent = temp;
                        }
                        });
                    });
                });
        
    }

    setIcons = (icon, iconID) => {
        const skycons = new Skycons({color: 'white'});
        const currentIcon = icon.replace(/\ /g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});