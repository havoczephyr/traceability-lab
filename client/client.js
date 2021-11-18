const { default: axios } = require("axios");

const serverURL = "api/"

document.getElementById("complimentButton").onclick = () => {
    axios.get(`${serverURL}compliment/`)
        .then((res) => {
          const data = res.data;
          alert(data);
        })
    }