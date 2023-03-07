import axios from "axios";

class MovieApi {
    constructor() {
        Object.defineProperty(this, "baseurl", {
            writable:false,
            configurable:false,
            get(endpoint = "/"){
                return `https://mock-api.driven.com.br/api/v8${endpoint}`
            }
        })
    }

    getMovies = async (path) => {
        try {
            const data = await axios.get(this.baseurl(`/cineflex/${path}`));
            return data;
        } catch (e) {
            throw new Error(`Erro ao obter as informações dos filmes, ${e}`);
        }
    };

    getMovieById = async (id) => {
        try {
            const data = await axios.get(this.baseurl(`/cineflex/movies/${id}/showtimes`));
            return data;
        } catch (e) {
            throw new Error('Erro ao obter horários de exibição. Por favor, tente novamente mais tarde.', e);
        }
    };

    getSeats = async (sessionId) => {
        try {
            const data = await axios.get(this.baseurl(`/cineflex/showtimes/${sessionId}/seats`));
            return data;
        } catch (e) {
            throw new Error(`Erro ao obter informações de assentos. Por favor, tente novamente mais tarde, ${e}`);
        }
    };

    postSeat = async (body) => {
        try {
            const data = await axios.post(this.baseurl(`/cineflex/seats/book-many`), body);
            return data;
        } catch (e) {
            throw new Error(`Erro ao reservar um assento. Por favor, tente novamente mais tarde, ${e}`);
        }
    }
}


export default MovieApi;