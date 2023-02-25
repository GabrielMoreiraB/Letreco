const aleatorio = Math.floor(Math.random() * 330)

let palavra = '';
let mapaPalavra = new Map;
async function listaP(){
    const p = await fetch("http://localhost:3000/palavras");
    const pconvert = await p.json()  
    //palavra = pconvert[aleatorio].toUpperCase();
    //console.log(palavra)
    palavra = 'AMORA'
    criaMapa();
}
listaP()

function criaMapa(){
    mapaPalavra = palavra.split('')
    console.log(mapaPalavra)
}
const tentativas = document.querySelector('.tentativa-container');

const teclado = document.querySelector('.teclado-container');

const teclApaga = document.getElementById('teclado-apaga');
const tecl1 = document.getElementById('teclado-linha1');
const tecl2 = document.getElementById('teclado-linha2');
const tecl3 = document.getElementById('teclado-linha3');

const rows = 6;
let linhaAtual = 0;
const columns = 5;
let colunaAtual = 0;
console.log(palavra)
let palpite = [];


const conteudo1 = ['Q' , 'W' , 'E' , 'R' , 'T' , 'Y' , 'U' , 'I' , 'O' , 'P'];
const conteudo2 = ['A' , 'S' , 'D' , 'F' , 'G' , 'H' , 'J' , 'K' , 'L'];
const conteudo3 = ['Z' , 'X' , 'C' , 'V' , 'B' , 'N' , 'M'];


for(let i=0; i<rows; i++ ){
    const tetativaLinha = document.createElement('div');
    tetativaLinha.setAttribute('id', i);
    tetativaLinha.setAttribute('class', 'chute-linha');
    for(let x = 0; x < columns ; x++){
        const tetativaColuna = document.createElement('div');
        tetativaColuna.setAttribute('id','linha'+ i + 'coluna' + x);
        tetativaColuna.setAttribute('class', i === 0 ?  'chute-coluna focus' : 'chute-coluna');
        tetativaLinha.appendChild(tetativaColuna);
    }
    tentativas.appendChild(tetativaLinha)
}


function preencheTeclado (array, pai){
array.forEach(function(key){
    const btn = document.createElement('button');
    btn.textContent = key;
    btn.setAttribute('id', key);
    btn.setAttribute('class', 'tecla alfa');
    btn.addEventListener('click', function(){
        addLetraItem(key)
    })
    pai.appendChild(btn)
})
}

function addLetraItem(key){
    if(colunaAtual == columns) return
    const chuteatual = document.querySelector('#linha'+linhaAtual+'coluna'+colunaAtual);
    chuteatual.textContent = key;
    colunaAtual++;
    palpite.push(key);
    
}


function checkPalpite (){
    if(palpite.length !== columns) return
    let colunasDePalpites = document.querySelectorAll('.focus');
    let gabarito = mapaPalavra.join("")
    let chutepalpite = palpite.join("")

    for(let i = 0; i < gabarito.length; i++){
        for(let j = 0; j < chutepalpite.length; j++){
            if(chutepalpite[j] !== gabarito[i]){
                colunasDePalpites[j].classList.add('errado');
                document.querySelector('#'+palpite[j]).classList.add('errado');

            }else if(j == i){
                colunasDePalpites[j].classList.add('certo');
                document.querySelector('#'+palpite[j]).classList.add('certo');

            } else{
                    colunasDePalpites[j].classList.add('talvez');
                    document.querySelector('#'+palpite[j]).classList.add('talvez');
            }
        }
    }

    if(gabarito == chutepalpite){
        window.alert('Acertou!')
    }
    if(linhaAtual === rows-1){
        window.alert('Errou!')
    }else{
        moveProxLinha();
        
    }
}

function moveProxLinha(){
    let colunasDePalpites = document.querySelectorAll('.focus');
    colunasDePalpites.forEach(function(item){
        item.classList.remove('focus')
    })
    colunaAtual = 0;
    linhaAtual++;
    palpite = [];

    let linhaAlvo = document.getElementById(linhaAtual);
    let colunasAlvo = linhaAlvo.querySelectorAll('.chute-coluna');
    colunasAlvo.forEach(function(item){
        item.classList.add('focus');
    })

}
preencheTeclado (conteudo1, tecl1);
preencheTeclado (conteudo2, tecl2);
preencheTeclado (conteudo3, tecl3);

const deleta = document.createElement('button')
deleta.textContent = '<--'
deleta.setAttribute('id', 'deleta');
deleta.setAttribute('class', 'tecla utt');
deleta.addEventListener('click', tecladeleta)
teclApaga.appendChild(deleta)

const enter = document.createElement('button')
enter.textContent = 'ENTER'
enter.setAttribute('id', 'enter');
enter.setAttribute('class', 'tecla utt');
enter.addEventListener('click', checkPalpite)
teclApaga.appendChild(enter)


function tecladeleta(){
    if(palpite.length < 1) return
    palpite.pop();
    colunaAtual--;
    const chuteatual = document.querySelector('#linha'+linhaAtual+'coluna'+colunaAtual);
    chuteatual.textContent = " ";
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkPalpite ();
    } else if (event.key === 'Backspace') {
        tecladeleta();
    } else {
        addLetraItem(event.key.toUpperCase())
    }
})

const info = document.querySelector('.bx-info-circle');
const modal = document.querySelector('.modal');
const fechamodal = document.querySelector('.bx-x');

info.addEventListener('click', () =>{
    modal.showModal();
});

fechamodal.addEventListener('click', ()=>{
    modal.close();
})