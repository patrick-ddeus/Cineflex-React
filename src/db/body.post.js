class BodyPost {
    constructor() {
        Object.defineProperty(this, "bodyPost", {
            writable: false,
            configurable: false,
            value: {
                ids: {
                    type: "object",
                    value: []
                },
                compradores: {
                    type: "object",
                    value: []
                }
            }
        });
    }

    setSeats = (idArray) => {
        if (typeof idArray !== this.bodyPost.ids.type || idArray.length === 0) {
            throw new Error("Você deve escolher ao menos 1 assento");
        };
        this.bodyPost.ids.value = idArray;
    };

    setBuyer = (Buyers) => {
        if (Buyers.length < 1 || Buyers.includes(undefined)) {
            throw new Error("Os campos precisam ser preenchidos obrigatoriamente");
        };

        for (let Buyer of Buyers) {
            if (!Buyer.cpf || !Buyer.name) {
                throw new Error("Campos NOME ou CPF não foram preenchidos corretamente");
            }
        }

        this.bodyPost.compradores.value = Buyers;
    };

    // setCPF = (cpf) => {
    //     if (typeof cpf !== this.bodyPost.cpf.type || cpf === "") {
    //         throw new TypeError("O CPF é obrigatório e o tipo precisa ser número");
    //     };
    //     this.bodyPost.cpf.value = cpf;
    // };

    getBodyPost = () => {
        const data = {};
        for (let key in this.bodyPost) {
            data[key] = this.bodyPost[key].value;
        }
        return data;
    };

    persistData = () => {
        localStorage.setItem("bodyPost", JSON.stringify(this.bodyPost));
    };

}

// eslint-disable-next-line import/no-anonymous-default-export
export default new BodyPost();