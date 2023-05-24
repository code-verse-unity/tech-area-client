import { apiV1 } from "@/constants/baseUrl";
import axios from "axios";

const Client = axios.create({ baseURL: apiV1 });
export default Client;
