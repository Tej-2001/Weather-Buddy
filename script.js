document.getElementById('getWeatherBtn').addEventListener('click', fetchWeather);
document.getElementById('geoWeatherBtn').addEventListener('click', fetchGeoWeather);

function fetchWeather() {
    const city = document.getElementById('cityInput').value;
    if (city) {
        getWeatherData(city);
        addSearchHistory(city);
    }
}

function fetchGeoWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            const apiKey = '0cdfb19f67a9d5d9f80c4411d6be94f6';
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
            fetchWeatherData(url);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function getWeatherData(city) {
    const apiKey = '0cdfb19f67a9d5d9f80c4411d6be94f6';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetchWeatherData(url);
}

function fetchWeatherData(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const weatherResult = `
                    <h2>${data.name}</h2>
                    <p>Temperature: ${data.main.temp} °C</p>
                    <p>Weather: ${data.weather[0].description}</p>
                    <p>Humidity: ${data.main.humidity} %</p>
                    <p>Wind Speed: ${data.wind.speed} m/s</p>
                    <p>Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
                    <p>Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
                `;
                document.getElementById('weatherResult').innerHTML = weatherResult;
                document.body.style.backgroundImage = `url('images/${data.weather[0].main.toLowerCase()}.jpg')`;
            } else {
                document.getElementById('weatherResult').innerHTML = `<p>${data.message}</p>`;
            }
        })
        .catch(error => {
            document.getElementById('weatherResult').innerHTML = `<p>Error fetching data. Please try again later.</p>`;
        });
}

function addSearchHistory(city) {
    const history = document.getElementById('history');
    const historyItem = document.createElement('p');
    historyItem.textContent = city;
    historyItem.addEventListener('click', () => getWeatherData(city));
    history.appendChild(historyItem);
}
