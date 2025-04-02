// Configurações e Funções Globais do Sistema SGD

document.addEventListener('DOMContentLoaded', function() {
    // Verifica autenticação
    checkAuthentication();

    // Configura menu lateral responsivo
    configureSidebar();

    // Manipula itens de menu desabilitados
    setupDisabledMenuItems();

    // Configura usuário logado
    setupUserInfo();
});

// Verifica autenticação do usuário
function checkAuthentication() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const currentPath = window.location.pathname;
    const loginPage = '/SDGTelaLogin.html';

    if (!isLoggedIn && !currentPath.includes(loginPage)) {
        window.location.href = loginPage;
    }
}

// Configuração do menu lateral
function configureSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (sidebar && mainContent) {
        // Lógica de redimensionamento
        function handleResize() {
            if (window.innerWidth <= 768) {
                sidebar.style.width = '70px';
                mainContent.style.marginLeft = '70px';
            } else {
                sidebar.style.width = '250px';
                mainContent.style.marginLeft = '250px';
            }
        }

        // Evento de redimensionamento
        window.addEventListener('resize', handleResize);
        
        // Inicializa o layout
        handleResize();
    }
}

// Configuração de itens de menu desabilitados
function setupDisabledMenuItems() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                showAlert('Esta funcionalidade será implementada em breve!', 'info');
            }
        });
    });
}

// Configuração de informações do usuário
function setupUserInfo() {
    const userEmail = localStorage.getItem('userEmail');
    const userNameElements = document.querySelectorAll('.user-name');
    const userAvatarElements = document.querySelectorAll('.user-avatar');

    if (userEmail) {
        const userName = userEmail.split('@')[0];
        const userInitials = userName.substring(0, 2).toUpperCase();

        userNameElements.forEach(el => {
            el.textContent = userName;
        });

        userAvatarElements.forEach(el => {
            el.textContent = userInitials;
        });
    }
}

// Logout do sistema
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    window.location.href = '/SDGTelaLogin.html';
}

// Exibir alertas personalizados
function showAlert(message, type = 'info', duration = 3000) {
    // Remove alertas existentes
    const existingAlerts = document.querySelectorAll('.alert-custom');
    existingAlerts.forEach(alert => alert.remove());

    // Cria novo alerta
    const alertElement = document.createElement('div');
    alertElement.classList.add('alert-custom', `alert-${type}`);
    alertElement.textContent = message;

    // Adiciona ao corpo do documento
    document.body.appendChild(alertElement);

    // Remove após tempo especificado
    setTimeout(() => {
        alertElement.remove();
    }, duration);
}

// Gerador de IDs únicos para tickets
function generateUniqueTicketId() {
    return `TK-${Date.now().toString().slice(-6)}`;
}

// Formatação de data
function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// Evento de logout
document.addEventListener('click', function(e) {
    if (e.target.closest('.logout-link')) {
        e.preventDefault();
        logout();
    }
});