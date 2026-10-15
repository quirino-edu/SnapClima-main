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

const loadingState = () => {
    weatherIcon.src = './_img/assets/loading-icon.svg';
    currentDate.textContent = 'Carregando...';
    currentName.textContent = 'Aguarde';
    weatherDescription.textContent = 'Buscando clima';
    currentTemperature.textContent = '...';
    windSpeed.textContent = '...';
    feelsLikeTemperature.textContent = '...';
    currentHumidity.textContent = '...';
    sunriseTime.textContent = '...';
    sunsetTime.textContent = '...';
};

//condição de click no botão
citySearchButton.addEventListener('click', () => {
    const cityName = citySearchInput.value;
    getCityWeather(cityName);
});

citySearchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        getCityWeather(citySearchInput.value);
    }
});

// localização usuário
if (!('geolocation' in navigator)) {
    console.warn('Geolocalização não suportada neste navegador.');
    loadingState();
} else {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getCurrentLocationWeather(lat, lon);
        },
        (error) => {
            if (error.code === 1) {
                console.info('Geolocalização negada. Você pode buscar por uma cidade manualmente.');
            } else {
                console.error('Erro ao obter localização:', error.message);
            }

            currentName.textContent = 'Busque por uma cidade';
            weatherDescription.textContent = 'Geolocalização indisponível';
        }
    );
}

//carrrega a temperatura localização automatica
function getCurrentLocationWeather(lat, lon) {
    loadingState();

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt&appid=${api_key}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Não foi possível carregar a localização atual.');
            }
            return response.json();
        })
        .then((data) => {
            if (data.cod && Number(data.cod) !== 200) {
                throw new Error(data.message || 'Erro ao obter localização');
            }
            displayWeather(data);
        })
        .catch((err) => {
            console.error(err);
            alert('Não foi possível carregar o clima da sua localização. Tente buscar por uma cidade.');
        });
}

//dados API
function getCityWeather(cityName) {
    const city = (cityName || '').trim();
    if (!city) {
        alert('Por favor, digite o nome de uma cidade.');
        return;
    }

    loadingState();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&lang=pt&appid=${api_key}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Cidade não encontrada');
            }
            return response.json();
        })
        .then((data) => {
            if (data.cod && Number(data.cod) !== 200) {
                throw new Error(data.message || 'Cidade não encontrada');
            }
            displayWeather(data);
        })
        .catch((err) => {
            alert(`Erro: ${err.message}`);
        });
}

// dados para impressão
function displayWeather(data) {
    const {
        dt,
        name,
        weather: [{ icon, description }],
        main: { temp, feels_like, humidity },
        wind: { speed },
        sys: { sunrise, sunset }
    } = data;

    //informações para aparecer
    currentDate.textContent = formatDate(dt);
    currentName.textContent = name;
    weatherIcon.src = `./_img/assets/${icon}.svg`;
    weatherDescription.textContent = description || 'Tempo atual';
    currentTemperature.textContent = `${Math.round(temp)}°C`;
    windSpeed.textContent = `${Math.round(speed * 3.6)}km/h`;
    feelsLikeTemperature.textContent = `${Math.round(feels_like)}°C`;
    currentHumidity.textContent = `${humidity}%`;
    sunriseTime.textContent = formatTime(sunrise);
    sunsetTime.textContent = formatTime(sunset);
}

//formatação data
function formatDate(epochTime) {
    const date = new Date(epochTime * 1000);
    const formattedDate = date.toLocaleDateString('pt-BR', { month: 'long', day: 'numeric' });
    return `Hoje, ${formattedDate}`;
}

//formatação por/ nascer do sol
function formatTime(epochTime) {
    const date = new Date(epochTime * 1000);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}