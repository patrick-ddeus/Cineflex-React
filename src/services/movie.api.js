import axios from "axios";

class MovieApi {
    constructor() {
        this.baseurl = (endpoint = "") => `https://mock-api.driven.com.br/api/v8${endpoint}`
    }

    getMovies = async () => {
        try {
            const response = await axios.get(this.baseurl(`/cineflex/movies`));
            const data = response.data
            return data;
        } catch (e) {
            throw new Error(`Erro ao obter as informações dos filmes, ${e}`);
        }
    };

    getSessionByMovieId = async (id) => {
        try {
            const response = await axios.get(this.baseurl(`/cineflex/movies/${id}/showtimes`));
            const data = response.data
            return data;
        } catch (e) {
            throw new Error('Erro ao obter horários de exibição. Por favor, tente novamente mais tarde.', e);
        }
    };

    getSeats = async (sessionId) => {
        try {
            const response = await axios.get(this.baseurl(`/cineflex/showtimes/${sessionId}/seats`));
            const data = response.data
            return data;
        } catch (e) {
            throw new Error(`Erro ao obter informações de assentos. Por favor, tente novamente mais tarde, ${e}`);
        }
    };

    postSeat = async (body) => {
        try {
            const response = await axios.post(this.baseurl(`/cineflex/seats/book-many`), body);
            const data = response.data
            return data;
        } catch (e) {
            throw new Error(`Erro ao reservar um assento. Por favor, tente novamente mais tarde, ${e}`);
        }
    }
}


export default MovieApi;