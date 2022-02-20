const address = document.querySelector("span.adress");
const where = document.querySelector("span.location");
const time = document.querySelector("span.time");
const isp = document.querySelector("span.isp");
const form = document.querySelector("nav form");
const input = document.querySelector("nav form input");

let ips = "";
let geo = `https://geo.ipify.org/api/v2/country,city?apiKey=at_m5iNDxO6npXSwRIoABvtlLLL5RreF&ipAddress=${ips}`;

const localization = L.map("map");
let map = localization.setView([0, 0], 0);

const search = function () {
  fetch(geo)
    .then((res) => res.json())
    .then((data) => {
      let properties = data;
      let lat = properties.location.lat;
      let lng = properties.location.lng;

      address.textContent = properties.ip;
      where.textContent = `${properties.location.country} ${properties.location.city}`;
      time.textContent = properties.location.timezone;
      isp.textContent = properties.isp;

      L.marker([lat, lng]).addTo(map);
      map = localization.setView([lat, lng], 13);
    });
};

search();

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v8",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoiYWxhbjEyMzQxMTEiLCJhIjoiY2t6dTh5MW1xMDV1OTJucnVpdWk0dmFqciJ9.MWF4elP1r8D93WPnnIJK-A",
    // "pk.eyJ1IjoiYWxhbjEyMzQxMTEiLCJhIjoiY2t6dTh5MW1xMDV1OTJucnVpdWk0dmFqciJ9.MWF4elP1r8D93WPnnIJK-A",
  }
).addTo(map);

const findLocalization = (e) => {
  e.preventDefault();

  ips = input.value;
  input.value = "";
  geo = `https://geo.ipify.org/api/v2/country,city?apiKey=at_m5iNDxO6npXSwRIoABvtlLLL5RreF&ipAddress=${ips}`;

  search();
};

form.addEventListener("submit", findLocalization);
