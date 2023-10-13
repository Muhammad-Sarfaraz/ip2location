const inputEl = document.getElementById("inp-ip");
const findButton = document.getElementById("btn-find");
const clearButton = document.getElementById("btn-clear");
const errorMsg = document.getElementById("error-msg");
const endpoint = "http://ip-api.com/json";

function find(ip) {
  fetch(`${endpoint}/${ip}`)
    .then((response) => response.json())
    .then((data) => {
      render(data);
    })
    .catch((error) => {
      console.error("Error:", error);
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

inputEl.addEventListener("change", function () {
  errorMsg.innerHTML = "";
});
inputEl.addEventListener("input", function () {
  errorMsg.innerHTML = "";
});

findButton.addEventListener("click", function () {
  const ip = inputEl.value;
  if (ip) {
    if (isValidIP(ip)) {
      find(ip);
    } else {
      errorMsg.innerHTML = "Invalid Ip address!";
    }
  } else {
    errorMsg.innerHTML = "Ip address is required!";
  }
});

clearButton.addEventListener("click", function () {
  errorMsg.innerHTML = "";
  inputEl.value = "";
});
