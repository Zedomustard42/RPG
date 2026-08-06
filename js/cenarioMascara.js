const MOBILE =
/Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

const CenarioMascara = {

// =====================================
// TAMANHO DA ARENA
// =====================================

largura: MOBILE ? 1350 : 1900,

altura: MOBILE ? 540 : 930,

// =====================================
// TAMANHO DA MÁSCARA
// =====================================

mascara: {


largura: MOBILE ? 60 : 90,

altura: MOBILE ? 60 : 90

},

// =====================================
// TAMANHO DO JOGADOR
// =====================================

jogador: {


largura: MOBILE ? 50 : 70,

altura: MOBILE ? 50 : 70


},

// =====================================
// PILARES
// =====================================

pilares: MOBILE ? [


// =========================
// MOBILE
// =========================

{
    x: 250,
    y: 120,
    largura: 80,
    altura: 80
},

{
    x: 675,
    y: 80,
    largura: 80,
    altura: 80
},

{
    x: 1100,
    y: 120,
    largura: 80,
    altura: 80
},

{
    x: 250,
    y: 380,
    largura: 80,
    altura: 80
},

{
    x: 675,
    y: 420,
    largura: 80,
    altura: 80
},

{
    x: 1100,
    y: 380,
    largura: 80,
    altura: 80
}


] : [


// =========================
// PC
// =========================

{
    x: 200,
    y: 100,
    largura: 120,
    altura: 120
},

{
    x: 890,
    y: 70,
    largura: 120,
    altura: 120
},

{
    x: 1580,
    y: 100,
    largura: 120,
    altura: 120
},

{
    x: 200,
    y: 650,
    largura: 120,
    altura: 120
},

{
    x: 890,
    y: 700,
    largura: 120,
    altura: 120
},

{
    x: 1580,
    y: 650,
    largura: 120,
    altura: 120
}


],

// =====================================
// COLISÃO COM PILARES
// =====================================

colidiuComPilar(x, y, tamanho) {


const margem = 10;


for (const p of this.pilares) {

    if (

        x + margem <
            p.x + p.largura &&

        x + tamanho - margem >
            p.x &&

        y + margem <
            p.y + p.altura &&

        y + tamanho - margem >
            p.y

    ) {

        return true;

    }

}


return false;


}

};
