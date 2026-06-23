const apiKey = 'SALIN_API_KEY_KAMU_DISINI'; // Dapatkan gratis di openweathermap.org

document.getElementById('searchBtn').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    if (city) {
        getWeatherData(city);
    }
});

// Menambahkan fungsi tekan Enter untuk mencari
document.getElementById('cityInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = document.getElementById('cityInput').value;
        if (city) getWeatherData(city);
    }
});

async function getWeatherData(cityName) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=id`;
    
    try {
        const response = await fetch(url);
        
        // Jika respons HTTP tidak OK (misal error 404 kota tidak ketemu)
        if (!response.ok) {
            throw new Error('Kota tidak ditemukan');
        }
        
        const data = await response.json();
        displayWeather(data);
        
    } catch (error) {
        showError(error.message);
    }
}

function displayWeather(data) {
    // Sembunyikan pesan error jika sebelumnya ada
    document.getElementById('errorMsg').style.display = 'none';
    
    // Tampilkan container informasi cuaca
    document.getElementById('weatherInfo').style.display = 'block';
    
    // Isi data ke elemen HTML (DOM Manipulation)
    document.getElementById('cityName').innerText = data.name;
    document.getElementById('temp').innerText = `${Math.round(data.main.temp)}°C`;
    document.getElementById('description').innerText = data.weather[0].description;
    document.getElementById('humidity').innerText = data.main.humidity;
    
    // Mengambil icon cuaca resmi dari OpenWeatherMap
    const iconCode = data.weather[0].icon;
    document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

function showError(message) {
    // Sembunyikan info cuaca dan tampilkan pesan error
    document.getElementById('weatherInfo').style.display = 'none';
    const errorEl = document.getElementById('errorMsg');
    errorEl.innerText = message;
    errorEl.style.display = 'block';
}