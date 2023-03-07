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

    setIds = (idArray) => {
        if (typeof idArray !== this.bodyPost.ids.type) {
            throw new TypeError("O argumento fornecido deve ser um Objeto.");
        };
        this.bodyPost.ids.value = idArray;
    };

    setBuyer = (name) => {
        if (typeof name !== this.bodyPost.name.type) {
            throw new TypeError("O argumento fornecido deve ser uma String.");
        };
        this.bodyPost.name = name;
    };

    setCPF = (cpf) => {
        if (typeof cpf !== this.bodyPost.cpf.type) {
            throw new TypeError("O argumento fornecido deve ser uma String.");
        };
        this.bodyPost.cpf.value = cpf;
    };

    getBodyPost = () => {
        return { ...this.bodyPost };
    };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new BodyPost();