class Order {
    constructor() {
        this.order = {
            movie: {},
            session: {},
            buyer: {},
            seats: []
        };
    }

    getOrder = () => {
        return { ...this.order };
    };

    setMovieData = (movieData) => {
        this.order.movie = movieData;
    };

    setSessionData = (movieInfo) => {
        this.order.session = movieInfo;
    };

    setBuyerData = (buyerInfo) => {
        this.order.buyer = buyerInfo;
    };

    setSeatsData = (seatsArray) => {
        this.order.seats = seatsArray;
    };

    saveOrder = () => {
        localStorage.setItem("order", JSON.stringify(this.order));
    };

    resetOrder = () => {
        this.order = {
            movie: {},
            session: {},
            buyer: {},
            seats: []
        };
    };

}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Order();