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
                name: {
                    type: "string",
                    value: "Jane Doe"
                },
                cpf: {
                    type: "string",
                    value: "1234567891"
                }
            }
        });
    }

    setSeats = (idArray) => {
        if (typeof idArray !== this.bodyPost.ids.type || idArray.length === 0) {
            throw new TypeError("Você deve escolher ao menos 1 assento");
        };
        this.bodyPost.ids.value = idArray;
    };

    setBuyer = (name) => {
        if (typeof name !== this.bodyPost.name.type || name === "") {
            throw new TypeError("O Nome é obrigatório e o tipo precisa ser String");
        };
        this.bodyPost.name.value = name;
    };

    setCPF = (cpf) => {
        if (typeof cpf !== this.bodyPost.cpf.type || cpf === "") {
            throw new TypeError("O CPF é obrigatório e o tipo precisa ser número");
        };
        this.bodyPost.cpf.value = cpf;
    };

    getBodyPost = () => {
        const data = {}
        for(let key in this.bodyPost){
            data[key] = this.bodyPost[key].value
        }
        return data;
    };

    persistData = () => {
        localStorage.setItem("bodyPost", JSON.stringify(this.bodyPost))
    }
} 

// eslint-disable-next-line import/no-anonymous-default-export
export default new BodyPost();