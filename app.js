//variáveis
const citySearchInput = document.querySelector('#city-search-input');
const citySearchButton = document.querySelector('#city-search-button');

const currentDate = document.querySelector('#current-date');
const currentName = document.querySelector('#city-name');
const weatherIcon = document.querySelector('#weather-icon');
const weatherDescription = document.querySelector('#weather-description');
const currentTemperature = document.querySelector('#current-temperature');
const windSpeed = document.querySelector('#wind-speed');
const feelsLikeTemperature = document.querySelector('#feels-like-temperature');
const currentHumidity = document.querySelector('#current-humidity');
const sunriseTime = document.querySelector('#sunrise-time');
const sunsetTime = document.querySelector('#sunset-time');

const api_key = "5441a76833c304a059fb6cd4f9f73638";

//condição de click no botão
citySearchButton.addEventListener('click', () => {
    let cityName = citySearchInput.value;
    getCityWeather(cityName);
})

//https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${api_key}`

// localização usuário
navigator.geolocation.getCurrentPosition(
    (position) => {
        //recebe a lozalização automatica
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        getCurrentLocationWeather(lat, lon)
    },
    //erro ao carregar localização
    (error) => {
        if (error.code === 1) {
            alert("Geolocalização negada pelo usuário, permita a localização!");
        } else {
            alert(`error! ` + " Erro não identificado");
        }
    }
)
//carrrega a temperatura localização automatica
function getCurrentLocationWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${api_key}`)
        .then((response) => response.json())
        .then((data) => displayWeather(data))
}

//dados API
function getCityWeather(cityName) {

    weatherIcon.src = `./assets/loading-icon.svg`

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&appid=${api_key}`)
        .then((response) => response.json())
        .then((data) => displayWeather(data))
}
// dados patra impressão
function displayWeather(data) {
    let { dt,
        name,
        weather: [{ icon, description }],
        main: { temp, feels_like, humidity },
        wind: { speed },
        sys: { sunrise, sunset } } = data

    //informações para aparecer
    currentDate.textContent = formatDate(dt);
    currentName.textContent = name;
    weatherIcon.src = `./_img/assets/${icon}.svg`;
    weatherDescription.textContent = description;
    currentTemperature.textContent = `${Math.round(temp)}°C`;
    windSpeed.textContent = `${Math.round(speed * 3.6)}km/h`;
    feelsLikeTemperature.textContent = `${Math.round(feels_like)}°C`;
    currentHumidity.textContent = `${humidity}%`;
    sunriseTime.textContent = formatTime(sunrise);
    sunsetTime.textContent = formatTime(sunset);
}
//formatação data
function formatDate(epochTime) {
    let date = new Date(epochTime * 1000)
    let formattedDate = date.toLocaleDateString('pt-BR', { month: "long", day: 'numeric' })
    return `Hoje, ${formattedDate}`
}
//formatação por/ nascer do sol
function formatTime(epochTime) {
    let date = new Date(epochTime * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    return `${hours}:${minutes}`;
}