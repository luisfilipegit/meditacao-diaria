const slider = document.querySelectorAll('.slider');
const btnNext = document.getElementById('next-button');
const btnPrev = document.getElementById('prev-button');

let = currentSlide = 0;

function hideSlider(){
    slider.forEach(item => item.classList.remove('on'))
};
function showSlider(){
    slider[currentSlide].classList.add('on');
};
// funções dos botões
function nextSlider(){
    hideSlider()
    if(currentSlide === slider.length -1){
        currentSlide = 0;
    } else{
        currentSlide++
    }
    showSlider()
}

function prevSlider(){
    hideSlider()
    if(currentSlide === 0){
        currentSlide = slider.length -1;
    } else{
        currentSlide--
    }
    showSlider()
}
btnNext.addEventListener('click', nextSlider);
btnPrev.addEventListener('click', prevSlider);

// botões de musica
const music = document.querySelector("audio#music")
function musica() {
    music.play();
    
};
function pausar(){
    music.pause();
}