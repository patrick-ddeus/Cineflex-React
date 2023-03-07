class BodyPost{
    constructor(){
        Object.defineProperty(this, "bodyPost", {
            writable:false,
            configurable:false,
            value:{
                ids:[],
                name: "Jane Doe",
                cpf: "123456789"
            }
        })
    }
}

export default BodyPost