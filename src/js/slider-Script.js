const slider = document.querySelectorAll('.slider');
const btnNext = document.getElementById('next-button');
const btnPrev = document.getElementById('prev-button');

// Elementos do indicador de progresso
const progressText = document.getElementById('progress-text');
const progressFill = document.getElementById('progress-fill');

let currentSlide = 0; 

function updateProgress() {
    const total = slider.length;
    const current = currentSlide + 1; // +1 porque a array começa em 0
    
    // Atualiza o texto (Ex: "Slide 3 de 10")
    if(progressText) {
        progressText.innerText = `Progresso ${current} de ${total}`;
    }
    
    // Atualiza o tamanho da barra
    if(progressFill) {
        const percentage = (current / total) * 100;
        progressFill.style.width = `${percentage}%`;
    }
}

function hideSlider(){
    slider.forEach(item => item.classList.remove('on'));
}

function showSlider(){
    slider.forEach(item => item.classList.remove('on'));
    slider[currentSlide].classList.add('on');
    updateProgress(); 
    
    // Mostra o botão de concluir apenas no último slide
    const finishBtn = document.getElementById('finish-container');
    if(finishBtn) {
        if (currentSlide === slider.length - 1) {
            finishBtn.style.display = 'block';
        } else {
            finishBtn.style.display = 'none';
        }
    }
}

function nextSlider(){
    hideSlider();
    if(currentSlide === slider.length - 1){
        currentSlide = 0;
    } else {
        currentSlide++;
    }
    showSlider();
}

function prevSlider(){
    hideSlider();
    if(currentSlide === 0){
        currentSlide = slider.length - 1;
    } else {
        currentSlide--;
    }
    showSlider();
}

btnNext.addEventListener('click', nextSlider);
btnPrev.addEventListener('click', prevSlider);

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        nextSlider();
    } else if (event.key === 'ArrowLeft') {
        prevSlider();
    }
});

const music = document.querySelector("audio#music");

function musica() {
    if (music) music.play();
}

function pausar(){
    if (music) music.pause();
}

// Inicializa o progresso no primeiro carregamento da página
updateProgress();
