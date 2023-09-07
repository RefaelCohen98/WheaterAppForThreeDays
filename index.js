
let picture = {
    0: "Images/sunny.svg",
    1: "Images/cloudy.svg",
    2: "Images/cloudy.svg",
    3: "Images/cloudy.svg",
    45: "Images/snowy.svg",
    48: "Images/snowy.svg",
    51: "Images/rainy.svg",
    53: "Images/rainy.svg",
    55: "Images/rainy.svg",
    56: "Images/rainy-2.svg",
    57: "Images/rainy-2.svg",
    61: "Images/rainy-2.svg",
    63: "Images/rainy-2.svg",
    65: "Images/rainy-2.svg",
    66: "Images/rainy-2.svg",
    67: "Images/rainy-2.svg",
    71: "Images/snowy.svg",
    73: "Images/snowy.svg",
    75: "Images/snowy.svg",  
    77: "Images/snowy.svg",  
    80: "Images/rainy-2.svg",
    81: "Images/rainy-2.svg",
    82: "Images/rainy-2.svg",
    85: "Images/snowy.svg",  
    86: "Images/snowy.svg",
    95: "Images/stormy.svg",
    96: "Images/stormy.svg",
    99: "Images/stormy.svg",
  };


async function place() {
    try {
        let response = await fetch("https://ipapi.co/json/");
    let data = await response.json();
    let latitude = data.latitude;
    let longitude = data.longitude;
    placeArr = [latitude, longitude]
    if(data.error == true){
        throw 404
    }
    } catch (error) {
        let latitude = 33.0247;
        let longitude = 35.4506;
        placeArr = [latitude, longitude]
    }
    return placeArr
}


async function temprature() {
    // console.log('a')
    let locationPrecise = await place()
    console.log(locationPrecise[0])
    let response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + locationPrecise[0] + '&longitude=' + locationPrecise[1] + '&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Africa%2FCairo&forecast_days=3')
    let data = await response.json();
    let daily = data.daily;

    let weathercode = daily.weathercode
    let temperatureMax = daily.temperature_2m_max;
    // let temperatureMin = daily.temperature_2m_min; 


    let pictures = document.querySelectorAll('img')
    let temps = document.querySelectorAll('p')
    let secondImg = document.querySelectorAll('.img2')
    for (let i = 0; i < weathercode.length; i++) {
        pictures[i].setAttribute('src', picture[weathercode[i]])
        // secondImg[i].setAttribute('src', picture[weathercode[i]])
        temps[i].innerHTML = temperatureMax[i]
    }

}
temprature()