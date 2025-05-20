const impressoras = {
    estoque: [
        {
            nome: "HP M1132",
            tipo: "Laser",
            contador: 8735,
            conexao: "USB",
            funcionalidades: "impressão, cópia e digitalização",
            imagem: "https://s2-techtudo.glbimg.com/Lyh3e7QrG0XMfvMzvPFo5SIwQBU=/0x0:695x391/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2018/t/O/I5vAbOTpaPULPEZ0Qh9g/0.png",
            disponivel: false
        },
        {
            nome: "HP M127",
            tipo: "Laser",
            contador: 24296,
            conexao: "",
            funcionalidades: "impressão, cópia, digitalização e ADF",
            imagem: "https://www.smimpressoras.com.br/wp-content/uploads/2019/11/HP-M127.jpg",
            disponivel: false
        },
        {
            nome: "Samsung M4080",
            tipo: "Laser",
            contador: 42984,
            conexao: "USB e rede",
            funcionalidades: "impressão, duplex, cópia, digitalização e ADF",
            imagem: "https://www.creativecopias.com.br/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/4/4/4481_ampliada2.jpg"
        },
        {
            nome: "Samsung M4070",
            tipo: "Laser",
            contador: 42984,
            conexao: "USB e rede",
            funcionalidades: "impressão, duplex, cópia, digitalização e ADF",
            imagem: "https://www.smimpressoras.com.br/wp-content/uploads/2019/11/SAMSUNG-4070-NOVA-600x600.jpg"
        },
        {
            nome: "HP P1102",
            tipo: "Laser",
            contador: 19116,
            conexao: "USB",
            funcionalidades: "impressão",
            imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpX4bOEv9GTQwj6HB2TUaHLr1aPz7TV3IlEg&s",
        },
        {
            nome: "Epson L3250",
            tipo: "Jato de Tinta",
            contador: 0,
            conexao: "USB e wi-fi",
            funcionalidades: "impressão",
            imagem: "https://martinelloeletrodomesticos.fbitsstatic.net/img/p/impressora-epson-l3250-ecotank-wireless-77008/263599-1.jpg?w=482&h=482&v=no-change&qs=ignore"
        }
    ],
    venda: [
        {
            nome: "HP NEVERSTOP 1000W",
            tipo: "Laser",
            contador: 18438,
            conexao: "USB e wi-fi",
            funcionalidades: "impressão",
            obs: "cilindro causando pequenas falhas na impressão",
            imagem: "https://fujiokadistribuidor.vteximg.com.br/arquivos/ids/228390"
        },
        {
            nome: "Samsung M4580",
            tipo: "Laser",
            contador: "",
            conexao: "USB e rede",
            funcionalidades: "impressão, duplex, cópia, digitalização e ADF",
            obs: "pequeno rasgo na película do fusor",
            imagem: "https://www.smimpressoras.com.br/wp-content/uploads/2019/11/SAMSUNG-M4580.jpg"
        },
        {
            nome: "Ricoh sp c430",
            tipo: "Laser",
            contador: "",
            conexao: "",
            funcionalidades: "",
            obs: "erro no cilindro",
            imagem: "https://support.ricoh.com/bb/images/model/spc430.jpg",
        }
    ]
};

let paginaAtual = "estoque";

function loadPage(pagina) {
    paginaAtual = pagina;
    filtrarImpressoras();
}

function filtrarImpressoras() {
    const tipo = document.getElementById("tipoFiltro").value.toLowerCase();
    const funcionalidade = document.getElementById("funcionalidadeFiltro").value.toLowerCase();
    const contadorMaximo = parseInt(document.getElementById("contadorFiltro").value) || Infinity;
    const lista = document.getElementById("listaImpressoras");
    lista.innerHTML = "";

    // Ordena as impressoras: disponíveis primeiro, depois as indisponíveis, e então alfabeticamente
    const impressorasFiltradas = impressoras[paginaAtual]
        .filter(imp =>
            (tipo === "" || imp.tipo?.toLowerCase().includes(tipo)) &&
            (funcionalidade === "" || imp.funcionalidades?.toLowerCase().includes(funcionalidade)) &&
            (imp.contador <= contadorMaximo)
        )
        .sort((a, b) => {
            if (a.disponivel === false && b.disponivel !== false) {
                return 1; // 'a' vem depois (indisponível)
            }
            if (a.disponivel !== false && b.disponivel === false) {
                return -1; // 'a' vem antes (disponível)
            }
            // Se ambos têm a mesma disponibilidade, ordena alfabeticamente por nome
            return a.nome.localeCompare(b.nome);
        });

    impressorasFiltradas.forEach(imp => {
        const card = document.createElement("div");
        card.className = "card";

        let imagemExibicao = `<img src="${imp.imagem}" alt="${imp.nome}">`;
        let indisponivelOverlay = '';

        if (imp.disponivel === false) {
            card.classList.add('indisponivel');
            indisponivelOverlay = '<span class="indisponivel-texto">Indisponível</span>';
        }

        card.innerHTML = `
            ${imagemExibicao}
            ${indisponivelOverlay}
            <span>${imp.nome}</span>
        `;
        card.onclick = () => mostrarDetalhes(imp);
        lista.appendChild(card);
    });
}

function mostrarDetalhes(imp) {
    const modal = document.getElementById("modal");
    const detalhes = document.getElementById("modalDetalhes");
    detalhes.innerHTML = `
        <h2>${imp.nome}</h2>
        <p><strong>Tipo:</strong> ${imp.tipo || "—"}</p>
        <p><strong>Contador:</strong> ${imp.contador || "—"}</p>
        <p><strong>Conexão:</strong> ${imp.conexao || "—"}</p>
        <p><strong>Funcionalidades:</strong> ${imp.funcionalidades || "—"}</p>
        ${imp.obs ? `<p><strong>Observações:</strong> ${imp.obs}</p>` : ""}
    `;
    modal.classList.remove("hidden");
}

function fecharModal() {
    document.getElementById("modal").classList.add("hidden");
}

// Inicializa
document.addEventListener("DOMContentLoaded", () => {
    filtrarImpressoras();
});
