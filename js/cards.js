const cards = document.querySelector('.cards-projetos')
let myDiv = ''

arrayCards.forEach(card => {
    myDiv += `
            <div>
                <img src=${card.src}>
                <h5>${card.titulo}</h5>
                <p>${card.resumo}</p>
                <a href="${card.link}" target="_blank">Ver Projeto</a>
            </div>
            `
})

cards.innerHTML = myDiv