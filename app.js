window.addEventListener('load', ()=> {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(".temperature-description");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector('.temperature');
  const temperatureSpan = document.querySelector('.temperature span');
  const d = new Date();
  const h = d.getHours();
  console.log(h);

  var orientation = "to top"
  var colorOne;
  var colorTwo;
  if (h <= 5 || h >= 20) {
    colorOne = "#a18cd1 0%";
    colorTwo = "#fbc2eb 100%";
  } else if (h >= 6 && h <= 15) {
    colorOne = "#f6d365 0%";
    colorTwo = "#fda085 100%";
  } else {
    colorOne = "#fad0c4 0%";
    colorTwo = "#ffd1ff 100%";
  }

  document.body.style.backgroundImage = 'linear-gradient('
        + orientation + ', ' + colorOne + ', ' + colorTwo + ')';



  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;


      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/4ad495a6f21a8e949ce484eae500c995/${lat},${long}`;
      fetch(api)
          .then(response => {
            return response.json();
          })
          .then(data => {
            console.log(data);
            const {temperature, summary, icon} = data.currently;
            //set DOM elements from API
            temperatureDegree.textContent = temperature;
            temperatureDescription.textContent = summary;
            locationTimezone.textContent = data.timezone;


            //formula for celcius
            let celcius = (temperature - 32) * (5 / 9);

            setIcons(icon, document.querySelector(".icon"));
            temperatureSpan.textContent = "F";

            //celcius toggle
            temperatureSection.addEventListener('click', () => {
              if (temperatureSpan.textContent === "F") {
                  temperatureSpan.textContent = "C";
                  temperatureDegree.textContent = Math.floor(celcius);
              } else {
                temperatureSpan.textContent = "F";
                temperatureDegree.textContent = temperature;
              }
            }); 
          });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g,"_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }

  function changeBackground(temperature) {
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g,"_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }

  function getCssValuePrefix()
{
    var rtrnVal = '';//default to standard syntax
    var prefixes = ['-o-', '-ms-', '-moz-', '-webkit-'];

    // Create a temporary DOM object for testing
    var dom = document.createElement('div');

    for (var i = 0; i < prefixes.length; i++)
    {
        // Attempt to set the style
        dom.style.background = prefixes[i] + 'linear-gradient(#000000, #ffffff)';

        // Detect if the style was successfully set
        if (dom.style.background)
        {
            rtrnVal = prefixes[i];
        }
    }

    dom = null;
    delete dom;

    return rtrnVal;
}
});
