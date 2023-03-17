class ValidaCPF {
  constructor(cpfEnviado) {
    Object.defineProperty(this, 'cpfLimpo', {
      writable: false,
      enumerable: true,
      configurable: false,
      value: cpfEnviado.replace(/\D+/g, '')
    });
  }

  ehSequencia () {
    return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
  }

  geraNovoCpf () {
    const cpfSemDigitos = this.cpfLimpo.slice(0, -2);
    const digito1 = ValidaCPF.geraDigito(cpfSemDigitos);
    const digito2 = ValidaCPF.geraDigito(cpfSemDigitos + digito1);
    this.novoCPF = cpfSemDigitos + digito1 + digito2;
  }

  static geraDigito (cpfSemDigitos) {
    let total = 0;
    let reverso = cpfSemDigitos.length + 1;

    for (let stringNumerica of cpfSemDigitos) {
      total += reverso * Number(stringNumerica);
      reverso--;
    }

    const digito = 11 - (total % 11);
    return digito <= 9 ? String(digito) : '0';
  }

  valida () {
    if (!this.cpfLimpo) {
      throw new Error("CPF Inexistente");
    };

    if (typeof this.cpfLimpo !== 'string') {
      throw new Error("CPF deve ser do tipo string");
    };

    if (this.cpfLimpo.length !== 11) {
      throw new Error("CPF precisa ter 11 caracteres");
    };

    if (this.ehSequencia()) {
      throw new Error("CPF não pode ser uma sequência!");
    };


    return this.novoCPF === this.cpfLimpo;
  }

}

export default ValidaCPF;