Render.iniciar();

Engine.iniciar();

BatalhaMobile.iniciar();

if ("serviceWorker" in navigator) {

    navigator.serviceWorker.register("sw.js")

        .then(() => {

            console.log("PWA carregado!");

        })

        .catch(erro => {

            console.log("Erro no PWA:", erro);

        });

}
