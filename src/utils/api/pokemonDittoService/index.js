import axios from "axios";
import apiUrl from '../baseUrl'

const serviceUrl = '/pokemon'

export const servicePokemonContentParam = () => 
    axios.get(`${apiUrl}${serviceUrl}`);