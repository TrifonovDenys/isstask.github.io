let loc = document.getElementById('out');
//Initialize google map and update every 10 seconds with new location
function initMap() {

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    mapTypeId: "satellite"
  });

  var marker = new google.maps.Marker({
    map: map,
    title: "ISS",
    icon: {
      url: "http://www.i2clipart.com/cliparts/9/1/8/b/clipart-international-space-station-918b.png",
      scaledSize: {
        width: 100,
        height: 100
      },
      anchor: {
        x: 64 / 4,
        y: 64 / 4
      }
    }
  });

  updateMap(map, marker)
  setInterval(() => {
    updateMap(map, marker)
  }, 5000)

  // Get current location. Returns a promise
  function updateMap(map, marker) {
    getISSLocation()
      .then((location) => {
        map.setCenter(location)
        marker.setPosition(location)
      })
  }
}

// For fetch implementation of Google Maps. Not used.
function fetchAPI() {
  const adress = "https://maps.googleapis.com/maps/api/js?key="
  const apiKey = "AIzaSyBRamfMG3mZVAQ_dnzqj6adZxg5zn4Tfy4"
  const callbackToGoogle = "&callback=initMap"
  return adress + apiKey + callbackToGoogle
}


// Get location of International space station
function getISSLocation() {

  return new Promise((resolve, reject) => {
    let XHR = new XMLHttpRequest()

    XHR.open('GET', 'https://api.wheretheiss.at/v1/satellites/25544')
    XHR.onload = function () {
      let location = {}

      if (XHR.readyState === 4 && XHR.status === 200) {

        let latitude = JSON.parse(XHR.responseText).latitude.toFixed(3)
        let longitude = JSON.parse(XHR.responseText).longitude.toFixed(3)
        
        loc.innerHTML = "ISS is now located at: latitude: " + latitude + ", " + "longitude: " + longitude;

        location = {
          lat: Number(latitude),
          lng: Number(longitude)
        }
        resolve(location)
      } else {
        reject(XHR.statusText)
      }
    }
    XHR.send()
  })
}

$.getJSON('http://api.open-notify.org/astros.json', function(data) {
  // console.log(data['number'])
  console.log(data['people'])
  $(".people").text("Total amount: " + data['number'] + " people!" );
  // $(".name").text(data['people']);

});
