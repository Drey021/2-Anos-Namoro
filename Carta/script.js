document.addEventListener('DOMContentLoaded', () => {
    createHearts();
    setTimeout(revealEvent, 1000);
    initMap();
    loadMarkers();
});

let map;  // Variável global para o mapa

const events = document.querySelectorAll('.event');
let index = 0;

function revealEvent() {
    if (index < events.length) {
        events[index].style.visibility = 'visible';
        index++;
        setTimeout(revealEvent, 1500); 
    }
}

function checkAnswers() {
    const options = document.querySelectorAll('.options input[type="radio"]');
    let correctCount = 0;

    options.forEach(opt => {
        if(opt.checked && opt.getAttribute('data-answer') === 'true') {
            opt.nextElementSibling.style.backgroundColor = '#00FF00';  // Verde para correto
            correctCount++;
        } else if (opt.checked) {
            opt.nextElementSibling.style.backgroundColor = '#FF0000';  // Vermelho para incorreto
        }
    });

    alert(`Você acertou ${correctCount} de 5 perguntas!`);
}

function createHearts() {
    const heartCount = 270;

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * (document.documentElement.scrollHeight + 35);
        
        heart.style.left = posX + 'px';
        heart.style.top = posY + 'px';
        
        document.body.appendChild(heart);
    }
}

function playMusic() {
    const music = document.getElementById("backgroundMusic");
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}

function initMap() {
    map = L.map('map').setView([20, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
    }).addTo(map);
    
    map.on('click', addMarker);
}

function addMarker(event) {
    const marker = L.marker([event.latlng.lat, event.latlng.lng], {
        title: "Clique para remover"
    }).addTo(map).on('click', removeMarker);
    
    updateLocalStorage(event.latlng.lat, event.latlng.lng);
}

function loadMarkers() {
    const savedMarkers = JSON.parse(localStorage.getItem('markers'));
    
    if(savedMarkers) {
        savedMarkers.forEach(coord => {
            if(coord[0] && coord[1]) {
                L.marker([coord[0], coord[1]], {title: "Clique para remover"}).addTo(map).on('click', removeMarker);
            }
        });
    }
}

function removeMarker(event) {
    const markerToRemove = event.target;
    map.removeLayer(markerToRemove);

    const savedMarkers = JSON.parse(localStorage.getItem('markers'));
    const index = savedMarkers.findIndex(m => 
        m[0] === markerToRemove.getLatLng().lat && m[1] === markerToRemove.getLatLng().lng
    );
    
    if(index !== -1) {
        savedMarkers.splice(index, 1);
        localStorage.setItem('markers', JSON.stringify(savedMarkers));
    }
}

function updateLocalStorage(lat, lng) {
    let savedMarkers = JSON.parse(localStorage.getItem('markers'));
    if(!savedMarkers) {
        savedMarkers = [];
    }
    savedMarkers.push([lat, lng]);
    localStorage.setItem('markers', JSON.stringify(savedMarkers));
}