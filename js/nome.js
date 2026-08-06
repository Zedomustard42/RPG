const Nome = {

    verificar(nome) {

        nome = nome.toLowerCase().trim();

        return Pessoas[nome] || null;

    }

};