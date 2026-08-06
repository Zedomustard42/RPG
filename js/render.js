
const Render = {

    tela: null,

    iniciar() {

        this.tela = document.getElementById("game");

    },

    limpar() {

        this.tela.innerHTML = "";

    },

    mostrar(html) {

        this.tela.innerHTML = html;

    }

};