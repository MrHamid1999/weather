// seting clock
let clockSet = () => {
    // getting current time
    let time = new Date();
    // getting element
    let placeholder = document.querySelector(".clock p");
    // adding time to element
    placeholder.innerHTML = `${time.getHours()} : ${time.getMinutes()} : ${time.getSeconds()}`
}
clockSet()
setInterval(clockSet, 1000);
// setting a counter for screen changes
let counter = 1;
// changing the cities
let screenShow = (counter) => {
    let containers = document.querySelectorAll(".city");
    containers.forEach(container => container.classList.remove("active"));
    containers[counter].classList.add("active")
    containers[counter - 1].classList.add("active")
}
// adding counter 
let goNext = () => {
    counter = counter == 5 ? 1 : counter + 2;
    screenShow(counter)
}
let goPrev = () => {
    counter = counter == 1 ? 5 : counter - 2;
    screenShow(counter)
}
setInterval(goNext, 5000)
// getting next and previous buttons
let nextBtn = document.querySelector(".next-btn")
let prevBtn = document.querySelector(".prev-btn")
nextBtn.addEventListener("click", goNext);
prevBtn.addEventListener("click", goPrev);




// adding async requests
let search = async (city) => {
    let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}%20&appid=70b05532c12052c9af5ea65e3270b494`)
    let data = await response.json()
    return data
}
// creating new city card throw this function
function cityGenerator(ele, city, value) {
    let icon = `<img src="https://openweathermap.org/img/w/${value.weather[0].icon}.png" width="40px" height="40px">`
    ele.innerHTML = `
    <div class="main-info">
                    <p class="name">${icon} ${city}</p>
                    <p class="temp">${Math.round(value.main.temp - 272.15)} &#8451;</p>
                    <p class="description">${value.weather[0].description}</p>
                </div>
                <div class="other-info">
                    <p>humidity: ${value.main.humidity} %</p>
                    <p>${Math.round(value.main.temp_min - 272.15)}/${Math.round(value.main.temp_max - 272.15)} &#8451;</p>
                    <p class="wind">wind speed :${value.wind.speed} m/h</p>
                </div>
    `
}
// adding available cities info
let cities = document.querySelectorAll(".city");
cities.forEach(async city => {
    // getting the name of city throw its class
    let cityName = city.classList[1];
    // new york needs to be two part
    cityName = cityName == "newyork" ? "new york" : cityName;
    let data = await search(cityName);
    cityGenerator(city, cityName, data);
})


// getting form inputs for api 
let form = document.querySelector("form");
form.addEventListener("submit", async e => {
    e.preventDefault()
    let cityName = form.city.value;
    cityName = cityName ? cityName : null;
    let data = await search(cityName);

    let ele = document.querySelector(".searching-city");
    //  making element visable
    ele.classList.add("clicked")
    ele = Array.from(ele.children)[1];

    cityGenerator(ele, cityName, data);

})

//  adding removal for searched city
const btn = document.querySelector(".searching-city span");
btn.addEventListener("click", e => {
    // removing calssList from element
    btn.parentElement.classList.remove("clicked")
})