import { baseURL } from "@/constants/baseUrl";
import axios from "axios";

const Client = axios.create({ baseURL });
export default Client;
