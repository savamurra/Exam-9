import axios from "axios";

const axiosApi = axios.create({
    baseURL:
        "https://sanjar-exam-server-default-rtdb.europe-west1.firebasedatabase.app/",
});

export default axiosApi;
