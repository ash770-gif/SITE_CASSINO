const SIMBOLOS = ['💎', '7️⃣', '🔔', '🍒', '⭐', '💰'];

function gerarHashHex() {
    const bytes = Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    return `0x${bytes.toUpperCase()}`;
}

function atualizarReelsAleatorios(reels) {
    reels.forEach((reel) => {
        const simboloAleatorio = SIMBOLOS[Math.floor(Math.random() * SIMBOLOS.length)];
        reel.textContent = simboloAleatorio;
    });
}

function girarSlot() {
    const reels = [
        document.getElementById('r1'),
        document.getElementById('r2'),
        document.getElementById('r3')
    ];

    const hashElement = document.getElementById('rng-hash');
    const statusElement = document.getElementById('rng-resultado');

    if (!reels.every(Boolean) || !hashElement || !statusElement) {
        return;
    }

    const resultadoFinal = reels.map(() => SIMBOLOS[Math.floor(Math.random() * SIMBOLOS.length)]);
    let rodada = 0;
    const totalRodadas = 14;

    hashElement.textContent = 'Processando...';
    statusElement.textContent = 'Gerando nova sequência RNG...';

    const intervalo = setInterval(() => {
        atualizarReelsAleatorios(reels);
        rodada += 1;

        if (rodada >= totalRodadas) {
            clearInterval(intervalo);

            reels.forEach((reel, index) => {
                reel.textContent = resultadoFinal[index];
            });

            const randomHash = gerarHashHex();
            hashElement.textContent = randomHash;

            const totalIguais = resultadoFinal.filter((valor, index, array) => array[0] === valor).length;

            if (totalIguais === 3) {
                statusElement.textContent = 'JACKPOT CONFIRMADO — todos os rolos bateram.';
            } else if (totalIguais === 2) {
                statusElement.textContent = 'Combinação dupla — prêmio parcial ativado.';
            } else {
                statusElement.textContent = 'Sem combinação vencedora — próxima rodada liberada.';
            }
        }
    }, 80);
}

window.girarSlot = girarSlot;

document.addEventListener('DOMContentLoaded', () => {
    const reels = [
        document.getElementById('r1'),
        document.getElementById('r2'),
        document.getElementById('r3')
    ];

    const hashElement = document.getElementById('rng-hash');
    const statusElement = document.getElementById('rng-resultado');

    if (reels.every(Boolean)) {
        atualizarReelsAleatorios(reels);
    }

    if (hashElement) {
        hashElement.textContent = gerarHashHex();
    }

    if (statusElement) {
        statusElement.textContent = 'Sistema preparado e pronto para o próximo giro.';
    }
});
