document.addEventListener("DOMContentLoaded", function() {
    // Função para animar a mensagem de amor
    function animateLoveMessage() {
        const loveMessage = document.querySelector(".mensagem h1");
        loveMessage.style.opacity = "0";
        loveMessage.style.transform = "translateY(-20px)";
        setTimeout(function() {
            loveMessage.style.opacity = "1";
            loveMessage.style.transform = "translateY(0)";
        }, 500);
    }

    // Função para destacar os idiomas ao passar o mouse
    function highlightLanguages() {
        const languages = document.querySelectorAll(".mensagem li");
        languages.forEach(function(language) {
            language.addEventListener("mouseenter", function() {
                this.style.color = "#e74c3c";
                this.style.fontWeight = "bold";
            });
            language.addEventListener("mouseleave", function() {
                this.style.color = "#555";
                this.style.fontWeight = "normal";
            });
        });
    }

    // Função para exibir a mensagem de amor a cada 5 segundos
    function displayLoveMessage() {
        animateLoveMessage();
        setInterval(animateLoveMessage, 5000);
    }

    // Iniciar as funções quando a página for carregada
    highlightLanguages();
    displayLoveMessage();
});
