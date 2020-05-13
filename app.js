window.addEventListener('load', () => {
    let long;
    let lat;
    let tempDescription = document.querySelector('.temoerature-description');
    let tempDegree = document.querySelector('.temoerature-degree');
    let locationTimezone = document.querySelector('.location-timezone');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const apiKey = '970f2cb858bf46eadcaf13f9d6b65996';
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;

            fetch(api)
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    console.log(data);
                    const temp = data.main.temp;
                    const {description} = data.weather[0];
                    tempDegree.textContent = (parseFloat(temp)-273.15)*9/5+32;
                });
        });
    }
});