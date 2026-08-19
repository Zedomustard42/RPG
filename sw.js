const CACHE = "echo-engine-v2";

const ARQUIVOS = [

    "./",

    "./index.html",

    "./manifest.json",

    "./css/style.css",
    "./css/batalha.css",
    "./css/mobile.css",

    "./js/config.js",
    "./js/render.js",
    "./js/audio.js",
    "./js/ui.js",
    "./js/input.js",
    "./js/mobile.js",
    "./js/engine.js",
    "./js/script.js",
    "./js/database.js",
    "./js/nome.js",
    "./js/fullscreen.js",

    "./js/scene/introducao.js",

    "./js/mascara.js",
    "./js/movimento.js",
    "./js/batalha.js",
    "./js/batalhaRender.js"

];

self.addEventListener("install", event => {

    event.waitUntil(
        caches.open(CACHE)
            .then(cache => cache.addAll(ARQUIVOS))
    );

});

self.addEventListener("fetch", event => {

    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );

});