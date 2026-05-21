// Smooth scrolling para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Adicionar ao carrinho
document.querySelectorAll('.add-cart').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.wine-card');
        const wineName = card.querySelector('h3').textContent;
        const price = card.querySelector('.price').textContent;
        
        // Simular adição ao carrinho
        alert(`${wineName} (${price}) adicionado ao carrinho!`);
        
        // Adicionar efeito visual
        this.textContent = '✓ Adicionado';
        this.style.backgroundColor = '#4caf50';
        
        setTimeout(() => {
            this.textContent = 'Adicionar ao Carrinho';
            this.style.backgroundColor = '';
        }, 2000);
    });
});

// Submissão do formulário de contato
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Validação básica
    if (name && email && message) {
        alert(`Obrigado, ${name}! Recebemos sua mensagem e responderemos em breve.`);
        this.reset();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

// Efeito de entrada dos elementos ao scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

// Observar cards ao scroll
document.querySelectorAll('.wine-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

console.log('Landing page de vinhos carregada com sucesso!');
