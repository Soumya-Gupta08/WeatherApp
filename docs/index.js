const date=document.querySelector(".date");
const temp=document.querySelector('.temp');
const humidity=document.querySelector('.humidity');
const wind=document.querySelector('.wind');
const loc=document.querySelector('.city');
const input=document.querySelector('#input');
const weather=document.querySelector('.weather');



const getWeather=async (city) => {
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=942068cc112525b80bfbceba28957681&units=metric`;

    try {
    let res=await fetch(url);
    let data=await res.json();

        if(data.cod==200) {
        loc.innerHTML=capitaliseEachWord(city);
        temp.innerHTML=`${parseInt(data.main.temp)}°c`;
        wind.innerHTML=`${data.wind.speed} km/h`;
        humidity.innerHTML=`${data.main.humidity}%`;

        weather.querySelector('img').src=`Images/${data.weather[0].main}.png`;

        console.log(data);
         

        } else {
            alert("City not found");
        }
        

    } catch {
        alert("Something not went wrong!!")
    }
}

document.querySelector('button').addEventListener('click', (e) => {
    e.preventDefault();
    let city=input.value.trim();
    getWeather(city);
})

input.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        e.preventDefault();
        let city=input.value.trim();
        getWeather(city);
    }
})

getWeather("Noida");



// Current date and time
setInterval(() => {
    let d=new Date();

    const day=d.getDate();
    const month=d.toLocaleDateString('default', {month: 'long'});
    const weekday=d.toLocaleDateString('default', {weekday: 'long'});

    const hours=d.getHours().toString().padStart(2, '0');
    const minutes=d.getMinutes().toString().padStart(2, '0');

    date.innerHTML=`${weekday}, ${day} ${month} ${hours}:${minutes}`;
}, 1000);


const capitaliseFirstLetter=(word) => {
    return word.charAt(0).toUpperCase()+word.slice(1);
}

const capitaliseEachWord=(str) => {
    return str.split(' ').map((word) => capitaliseFirstLetter(word)).join(' ');
} 

