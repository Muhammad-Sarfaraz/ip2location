const inputEl = document.getElementById("inp-ip");
const myLocationButton = document.getElementById("btn-my-location");
const findButton = document.getElementById("btn-find");
const clearButton = document.getElementById("btn-clear");
const errorMsg = document.getElementById("error-msg");
const endpointForLocation = "http://ip-api.com/json";
const endpointForIp = "https://api64.ipify.org?format=json";
let loading = false;

function find(ip) {
  fetch(`${endpointForLocation}/${ip}`)
    .then((response) => response.json())
    .then((data) => {
      render(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(() => {
      setLoading(false,findButton,"Find");
    });
}

function render(data) {
  const ul = document.getElementById("ip-info");
  ul.innerHTML = `
        <li>IP: ${data.query}</li>
        <li>City: ${data.city}</li>
        <li>Region: ${data.regionName}</li>
        <li>Country: ${data.country}</li>
        <li>ISP: ${data.isp}</li>
    `;
}

function isValidIP(ip) {
  const ipPattern =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipPattern.test(ip);
}

function setLoading(status,element=null,name= null) {
  if (status) {
    element.innerHTML = '<span class="loader"></span>'
    findButton.disabled = true;
    clearButton.disabled = true;
    myLocationButton.disabled = true;
  } else {
    element.innerHTML = name;
    findButton.disabled = false;
    clearButton.disabled = false;
    myLocationButton.disabled = false;
  }
}

inputEl.addEventListener("change", function () {
  errorMsg.innerHTML = "";
});

inputEl.addEventListener("input", function () {
  errorMsg.innerHTML = "";
});

myLocationButton.addEventListener("click", function () {
  setLoading(true,myLocationButton,"My Location");
  fetch(endpointForIp)
    .then((response) => response.json())
    .then((data) => {
      const ip = data.ip;
      find(ip);
    })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(() => {
      setLoading(false,myLocationButton,"My Location");
    });
});

findButton.addEventListener("click", function () {
  const ip = inputEl.value;
  if (ip) {
    if (isValidIP(ip)) {
      setLoading(true,findButton,"Find");
      find(ip);
    } else {
      errorMsg.innerHTML = "Invalid Ip address!";
    }
  } else {
    errorMsg.innerHTML = "Ip address is required!";
  }
});

clearButton.addEventListener("click", function () {
  setLoading(true,clearButton,"Clear");
  errorMsg.innerHTML = "";
  inputEl.value = "";
  const ul = document.getElementById("ip-info");
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
  setLoading(false,clearButton,"Clear");
});
