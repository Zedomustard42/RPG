const Fullscreen = {

    entrar() {

        const elemento = document.documentElement;

        if (elemento.requestFullscreen) {

            elemento.requestFullscreen();

        }

        else if (elemento.webkitRequestFullscreen) {

            elemento.webkitRequestFullscreen();

        }

        else if (elemento.msRequestFullscreen) {

            elemento.msRequestFullscreen();

        }

    }

};