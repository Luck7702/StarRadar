const apiKey = "b33649d0e72446adb6d184516252407";

const weather_image = document.getElementById("weather-image");
const main_image = document.getElementById("img1");
const description = document.getElementById("description");
const city_name = document.getElementById("City Name");
const answer = document.getElementById("answer");
const edit_button = document.getElementsByClassName("edit_button");

const main_screen = document.getElementById("main");
main_screen.hidden = true;
const loading_screen = document.getElementById("loadingscreen");

function CanSeeTheStars() {
  if (condition == "Clear" && is_day == 0 && cloud <= 50 && vis_km >= 10) {
    main_image.src = "stars.webp";
    return "Stars Visible! Go Outside!";
  } else {
    main_image.src = "nope.jpg";
    return "Stars not likely visible";
  }
}

function getdesc() {
  let stringtext;
  if (is_day || condition != "Clear" || cloud > 50 || vis_km < 10) {
    stringtext = "Reason : ";
  } else {
    return (stringtext = "Weather is Perfect");
  }
  if (is_day) {
    stringtext += "It's Daytime -_-  | ";
  }
  if (condition != "Clear") {
    stringtext += condition + " | ";
  }
  if (cloud > 50) {
    stringtext += "Obstructed By Cloud | ";
  }
  if (vis_km < 10) {
    stringtext += "Air Pollution";
  }

  console.log(stringtext);
  return stringtext;
}

function main(q) {
  fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${q}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        return;
      }

      edit_button[0].hidden = true;
      loading_screen.style.display = "flex";
      main_screen.style.display = "none";

      answer.textContent = CanSeeTheStars(
        (condition = data.current.condition.text),
        (is_day = data.current.is_day),
        (cloud = data.current.cloud),
        (vis_km = data.current.vis_km)
      );

      weather_image.src = data.current.condition.icon;

      description.textContent = getdesc(
        (condition = data.current.condition.text),
        (is_day = data.current.is_day),
        (cloud = data.current.cloud),
        (vis_km = data.current.vis_km)
      );

      city_name.textContent = data.location.name + ", " + data.location.country;

      loading_screen.style.display = "none";
      main_screen.style.display = "flex";
    })
    .catch((error) => {
      console.error("Error fetching weather:", error);
    });
}

navigator.geolocation.getCurrentPosition(
  function (position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    main(`${lat},${lon}`);
  },

  function (error) {
    // Error callback
    console.error("Geolocation error:", error);
    if (error.code === error.PERMISSION_DENIED) {
      alert("Location access denied. Please allow location access and refresh");
    } else {
      alert("Unable to retrieve location. Error: " + error.message);
    }
    edit_button[0].hidden = false;
  }
);

edit_button[0].addEventListener("click", function () {
  main(window.prompt("Plaese Enter Your Location"));
});

edit_button[1].addEventListener("click", function () {
  main(window.prompt("Plaese Enter Your Location"));
});
