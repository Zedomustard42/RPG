// =====================================================
// INICIAR RENDER
// =====================================================

Render.iniciar();


// =====================================================
// INICIAR ENGINE
// =====================================================

Engine.iniciar();


// =====================================================
// SERVICE WORKER / PWA
// =====================================================

if (
    "serviceWorker" in navigator
) {

    navigator.serviceWorker
        .register("./sw.js")

        .then(
            () => {

                console.log(
                    "PWA carregado!"
                );

            }
        )

        .catch(
            erro => {

                console.log(
                    "Erro no PWA:",
                    erro
                );

            }
        );

}

// =====================================================
// MENSAGENS ESCONDIDAS / EASTER EGGS
// Cada mensagem aparece separadamente, em um canto aleatório,
// fica visível por 10 segundos e depois desaparece.
// =====================================================

(function iniciarMensagensEscondidas() {

    const mensagens = [
        "Tem um boneco me observando. Há um Chocolate entre as letras.",
        " B R U N O"
    ];

    const cantos = [
        { top: "8px", left: "8px" },
        { top: "8px", right: "8px" },
        { bottom: "8px", left: "8px" },
        { bottom: "8px", right: "8px" }
    ];

    function mostrarMensagem(texto, atraso) {

        setTimeout(() => {

            const elemento = document.createElement("div");

            elemento.className = "mensagem-escondida";
            elemento.textContent = texto;

            const canto = cantos[
                Math.floor(Math.random() * cantos.length)
            ];

            Object.assign(elemento.style, canto);

            document.body.appendChild(elemento);

            // Pequeno atraso para permitir a transição de entrada.
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    elemento.classList.add("visivel");
                });
            });

            // Cada mensagem permanece exatamente 10 segundos.
            setTimeout(() => {

                elemento.classList.remove("visivel");
                elemento.classList.add("sumindo");

                setTimeout(() => {
                    elemento.remove();
                }, 1400);

            }, 10000);

        }, atraso);
    }

    // São mensagens independentes, em momentos diferentes.
    mostrarMensagem(mensagens[0], 18000);
    mostrarMensagem(mensagens[1], 42000);

})();
