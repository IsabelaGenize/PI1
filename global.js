// Configurações e Funções Globais do Sistema SGD

// Inicialização do sistema
document.addEventListener('DOMContentLoaded', function() {
    // Verifica autenticação
    checkAuthentication();

    // Configura menu lateral responsivo
    configureSidebar();

    // Manipula itens de menu desabilitados
    setupDisabledMenuItems();

    // Configura usuário logado
    setupUserInfo();
    
    // Configuração do botão de logout
    setupLogoutButton();
    
    // Inicialização específica para cada página
    initPage();
});

// Verifica autenticação do usuário
function checkAuthentication() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const currentPath = window.location.pathname;
    const loginPage = 'SDGTelaLogin.html';
    const indexPage = 'index.html';
    
    // Páginas que não requerem autenticação
    const publicPages = [loginPage, indexPage];
    const isPublicPage = publicPages.some(page => currentPath.includes(page));
    
    // Se o usuário não está logado e não está em uma página pública, redireciona para o login
    if (!isLoggedIn && !isPublicPage) {
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
                
                // Esconde texto dos itens do menu
                document.querySelectorAll('.menu-text').forEach(item => {
                    item.style.display = 'none';
                });
                
                // Centraliza ícones
                document.querySelectorAll('.menu-item').forEach(item => {
                    if (item.querySelector('i')) {
                        item.style.justifyContent = 'center';
                        item.querySelector('i').style.marginRight = '0';
                    }
                });
                
                // Esconde labels do menu
                document.querySelectorAll('.menu-label').forEach(label => {
                    label.style.display = 'none';
                });
            } else {
                sidebar.style.width = '250px';
                mainContent.style.marginLeft = '250px';
                
                // Mostra texto dos itens do menu
                document.querySelectorAll('.menu-text').forEach(item => {
                    item.style.display = 'block';
                });
                
                // Restaura alinhamento dos ícones
                document.querySelectorAll('.menu-item').forEach(item => {
                    if (item.querySelector('i')) {
                        item.style.justifyContent = 'flex-start';
                        item.querySelector('i').style.marginRight = '10px';
                    }
                });
                
                // Mostra labels do menu
                document.querySelectorAll('.menu-label').forEach(label => {
                    label.style.display = 'block';
                });
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
    const userEmail = localStorage.getItem('userEmail') || 'usuario@sgd.com.br';
    const userNameElements = document.querySelectorAll('.user-name');
    const userAvatarElements = document.querySelectorAll('.user-avatar');

    if (userEmail) {
        const userName = userEmail.split('@')[0];
        const userInitials = userName.substring(0, 2).toUpperCase();

        userNameElements.forEach(el => {
            if (el) el.textContent = userName;
        });

        userAvatarElements.forEach(el => {
            if (el) el.textContent = userInitials;
        });
    }
}

// Configuração do botão de logout
function setupLogoutButton() {
    const logoutLinks = document.querySelectorAll('.menu-item[href="SDGTelaLogin.html"]');
    logoutLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    });
}

// Logout do sistema
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    window.location.href = 'SDGTelaLogin.html';
}

// Exibir alertas personalizados
function showAlert(message, type = 'info', duration = 3000) {
    const existingAlerts = document.querySelectorAll('.alert-custom');
    existingAlerts.forEach(alert => alert.remove());

    const alertElement = document.createElement('div');
    alertElement.classList.add('alert-custom', `alert-${type}`);
    alertElement.textContent = message;

    document.body.appendChild(alertElement);

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
    if (!date) {
        date = new Date();
    } else if (!(date instanceof Date)) {
        date = new Date(date);
    }
    
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// Inicialização específica para cada página
function initPage() {
    const pagePath = window.location.pathname;
    
    // Login
    if (pagePath.includes('SDGTelaLogin.html')) {
        initLoginPage();
    }
    
    // Dashboard
    if (pagePath.includes('SDGDashboard.html')) {
        initDashboardPage();
    }
    
    // Meus Tickets
    if (pagePath.includes('SDGMeusTickets.html')) {
        initMyTicketsPage();
    }
    
    // Contatos
    if (pagePath.includes('SDGContatos.html')) {
        initContactPage();
    }
}

// Inicialização da página de login
function initLoginPage() {
    const loginForm = document.getElementById('login-form');
    const loginAlert = document.getElementById('login-alert');
    
    // Verifica se o usuário já está logado
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        // Redireciona para a página inicial se já estiver logado
        window.location.href = 'SDGPaginaInicial.html';
    }
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;
            
            // Validação simples
            if (email && password) {
                // Em um sistema real, isso seria uma chamada de API para autenticar
                // Para fins de demonstração, qualquer combinação válida é aceita
                
                // Armazena informações de login
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                
                if (remember) {
                    localStorage.setItem('rememberUser', 'true');
                } else {
                    localStorage.removeItem('rememberUser');
                }
                
                // Redireciona para a página inicial
                window.location.href = 'SDGPaginaInicial.html';
            } else {
                // Exibe alerta de erro
                if (loginAlert) {
                    loginAlert.style.display = 'block';
                    
                    // Esconde o alerta após 3 segundos
                    setTimeout(() => {
                        loginAlert.style.display = 'none';
                    }, 3000);
                }
            }
        });
    }
    
    // Link de recuperação de senha
    const recoveryLink = document.querySelector('.login-footer a');
    if (recoveryLink) {
        recoveryLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('A funcionalidade de recuperação de senha será implementada em breve.');
        });
    }
}

// Inicialização da página de Dashboard
function initDashboardPage() {
    // Dados de exemplo
    let tickets = [
        {
            id: 'TK-1001',
            subject: 'Problema no acesso ao sistema',
            description: 'Não consigo acessar o módulo financeiro após a última atualização.',
            requester: 'João Silva',
            priority: 'Alta',
            status: 'Novo',
            date: '01/04/2025'
        },
        {
            id: 'TK-1002',
            subject: 'Solicitar novo equipamento',
            description: 'Preciso de um novo monitor para o departamento de design.',
            requester: 'Maria Oliveira',
            priority: 'Média',
            status: 'Em Progresso',
            date: '28/03/2025'
        },
        {
            id: 'TK-1003',
            subject: 'Erro na geração de relatórios',
            description: 'O relatório mensal de vendas está gerando valores incorretos.',
            requester: 'Pedro Santos',
            priority: 'Crítica',
            status: 'Aberto',
            date: '25/03/2025'
        },
        {
            id: 'TK-1004',
            subject: 'Atualização do software de CRM',
            description: 'Solicito a atualização do software de CRM para a versão mais recente.',
            requester: 'Ana Ferreira',
            priority: 'Baixa',
            status: 'Resolvido',
            date: '20/03/2025'
        },
        {
            id: 'TK-1005',
            subject: 'Problema na impressora do andar 2',
            description: 'A impressora do segundo andar está apresentando falhas constantes.',
            requester: 'Carlos Mendes',
            priority: 'Média',
            status: 'Fechado',
            date: '15/03/2025'
        },
        {
            id: 'TK-1006',
            subject: 'Integração com sistema ERP',
            description: 'Necessário estabelecer conexão com o novo sistema ERP.',
            requester: 'Eduardo Neves',
            priority: 'Alta',
            status: 'Em Progresso',
            date: '10/03/2025'
        },
        {
            id: 'TK-1007',
            subject: 'Permissão para acessar pastas na rede',
            description: 'Preciso de acesso às pastas compartilhadas do departamento financeiro.',
            requester: 'Juliana Costa',
            priority: 'Média',
            status: 'Aberto',
            date: '05/03/2025'
        }
    ];
    
    const ticketsTable = document.getElementById('tickets-table');
    const ticketModal = document.getElementById('ticket-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalClose = document.getElementById('modal-close');
    const modalCancel = document.getElementById('modal-cancel');
    const modalSave = document.getElementById('modal-save');
    const ticketForm = document.getElementById('ticket-form');
    const newTicketBtn = document.getElementById('new-ticket-btn');
    
    if (!ticketsTable) return;
    
    // Renderiza a tabela de tickets
    function renderTickets() {
        ticketsTable.innerHTML = '';
        
        // Atualiza os números do dashboard
        updateDashboardStats();
        
        tickets.forEach(ticket => {
            let statusClass;
            switch(ticket.status) {
                case 'Novo':
                    statusClass = 'status-new';
                    break;
                case 'Aberto':
                    statusClass = 'status-open';
                    break;
                case 'Em Progresso':
                    statusClass = 'status-in-progress';
                    break;
                case 'Resolvido':
                    statusClass = 'status-resolved';
                    break;
                case 'Fechado':
                    statusClass = 'status-closed';
                    break;
            }
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${ticket.id}</td>
                <td>${ticket.subject}</td>
                <td>${ticket.requester}</td>
                <td>${ticket.priority}</td>
                <td><span class="status-badge ${statusClass}">${ticket.status}</span></td>
                <td>${ticket.date}</td>
                <td class="actions">
                    <button class="btn-action edit-ticket" data-id="${ticket.id}" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-action delete-ticket" data-id="${ticket.id}" title="Excluir">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            
            ticketsTable.appendChild(row);
        });
        
        // Adiciona event listeners para os botões de editar e excluir
        addTicketActionListeners();
    }
    
    // Adiciona event listeners para os botões de ação dos tickets
    function addTicketActionListeners() {
        document.querySelectorAll('.edit-ticket').forEach(button => {
            button.addEventListener('click', function() {
                const ticketId = this.getAttribute('data-id');
                openEditModal(ticketId);
            });
        });
        
        document.querySelectorAll('.delete-ticket').forEach(button => {
            button.addEventListener('click', function() {
                const ticketId = this.getAttribute('data-id');
                if (confirm('Tem certeza que deseja excluir este ticket?')) {
                    deleteTicket(ticketId);
                }
            });
        });
    }
    
    // Atualiza as estatísticas do dashboard
    function updateDashboardStats() {
        const totalTickets = tickets.length;
        const openTickets = tickets.filter(t => t.status === 'Novo' || t.status === 'Aberto').length;
        const resolvedTickets = tickets.filter(t => t.status === 'Resolvido' || t.status === 'Fechado').length;
        const lateTickets = tickets.filter(t => {
            // Simulação de tickets atrasados - em um sistema real, isso seria baseado em datas limite
            return t.priority === 'Alta' || t.priority === 'Crítica';
        }).length;
        
        // Atualiza os números nos cards
        const statCards = document.querySelectorAll('.stat-info h3');
        if (statCards.length >= 4) {
            statCards[0].textContent = totalTickets;
            statCards[1].textContent = openTickets;
            statCards[2].textContent = resolvedTickets;
            statCards[3].textContent = lateTickets;
        }
    }
    
    // Abre o modal para criar um novo ticket
    function openNewTicketModal() {
        modalTitle.textContent = 'Novo Ticket';
        document.getElementById('ticket-id').value = '';
        ticketForm.reset();
        
        document.getElementById('ticket-status').value = 'Novo';
        
        ticketModal.style.display = 'block';
    }
    
    // Abre o modal para editar um ticket existente
    function openEditModal(ticketId) {
        const ticket = tickets.find(t => t.id === ticketId);
        if (!ticket) return;
        
        modalTitle.textContent = 'Editar Ticket';
        
        document.getElementById('ticket-id').value = ticket.id;
        document.getElementById('ticket-subject').value = ticket.subject;
        document.getElementById('ticket-description').value = ticket.description;
        document.getElementById('ticket-requester').value = ticket.requester;
        document.getElementById('ticket-priority').value = ticket.priority;
        document.getElementById('ticket-status').value = ticket.status;
        
        ticketModal.style.display = 'block';
    }
    
    // Fecha o modal
    function closeModal() {
        ticketModal.style.display = 'none';
    }
    
    // Salva um ticket (novo ou editado)
    function saveTicket() {
        const ticketId = document.getElementById('ticket-id').value;
        const subject = document.getElementById('ticket-subject').value;
        const description = document.getElementById('ticket-description').value;
        const requester = document.getElementById('ticket-requester').value;
        const priority = document.getElementById('ticket-priority').value;
        const status = document.getElementById('ticket-status').value;
        
        if (!subject || !description || !requester || !priority || !status) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        
        if (ticketId) {
            // Editar ticket existente
            const index = tickets.findIndex(t => t.id === ticketId);
            if (index !== -1) {
                tickets[index].subject = subject;
                tickets[index].description = description;
                tickets[index].requester = requester;
                tickets[index].priority = priority;
                tickets[index].status = status;
            }
        } else {
            // Criar novo ticket
            const newId = `TK-${1000 + tickets.length + 1}`;
            
            tickets.push({
                id: newId,
                subject,
                description,
                requester,
                priority,
                status,
                date: formattedDate
            });
        }
        
        renderTickets();
        closeModal();
        
        // Mostra alerta de sucesso
        showAlert(ticketId ? 'Ticket atualizado com sucesso!' : 'Ticket criado com sucesso!', 'success');
    }
    
    // Exclui um ticket
    function deleteTicket(ticketId) {
        tickets = tickets.filter(t => t.id !== ticketId);
        renderTickets();
        
        // Mostra alerta de sucesso
        showAlert('Ticket excluído com sucesso!', 'success');
    }
    
    // Event listeners
    if (newTicketBtn) {
        newTicketBtn.addEventListener('click', openNewTicketModal);
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modalCancel) {
        modalCancel.addEventListener('click', closeModal);
    }
    
    if (modalSave) {
        modalSave.addEventListener('click', saveTicket);
    }
    
    // Fecha o modal ao clicar fora dele
    window.addEventListener('click', function(event) {
        if (event.target === ticketModal) {
            closeModal();
        }
    });
    
    // Inicializa a página
    renderTickets();
}

// Inicialização da página de Meus Tickets
function initMyTicketsPage() {
    // Dados dos tickets atribuídos ao usuário
    let myTickets = [
        {
            id: 'TK-1001',
            subject: 'Problema no acesso ao sistema',
            description: 'Não consigo acessar o módulo financeiro após a última atualização.',
            requester: 'João Silva',
            priority: 'Alta',
            status: 'Novo',
            date: '01/04/2025',
            assignee: 'Romulo Andrade'
        },
        {
            id: 'TK-1002',
            subject: 'Solicitar novo equipamento',
            description: 'Preciso de um novo monitor para o departamento de design.',
            requester: 'Maria Oliveira',
            priority: 'Média',
            status: 'Em Progresso',
            date: '28/03/2025',
            assignee: 'Romulo Andrade'
        },
        {
            id: 'TK-1003',
            subject: 'Erro na geração de relatórios',
            description: 'O relatório mensal de vendas está gerando valores incorretos.',
            requester: 'Pedro Santos',
            priority: 'Crítica',
            status: 'Aberto',
            date: '25/03/2025',
            assignee: 'Romulo Andrade'
        }
    ];

    // Dados dos tickets não atribuídos
    let unassignedTickets = [
        {
            id: 'TK-1004',
            subject: 'Atualização do software de CRM',
            description: 'Solicito a atualização do software de CRM para a versão mais recente.',
            requester: 'Ana Ferreira',
            priority: 'Baixa',
            status: 'Novo',
            date: '20/03/2025',
            assignee: null
        },
        {
            id: 'TK-1005',
            subject: 'Problema na impressora do andar 2',
            description: 'A impressora do segundo andar está apresentando falhas constantes.',
            requester: 'Carlos Mendes',
            priority: 'Média',
            status: 'Novo',
            date: '15/03/2025',
            assignee: null
        }
    ];

    // Referências aos elementos DOM
    const myTicketsTable = document.getElementById('my-tickets-table');
    const unassignedTicketsTable = document.getElementById('unassigned-tickets-table');
    const ticketModal = document.getElementById('ticket-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalClose = document.getElementById('modal-close');
    const modalCancel = document.getElementById('modal-cancel');
    const modalSave = document.getElementById('modal-save');
    const ticketForm = document.getElementById('ticket-form');
    const newTicketBtn = document.getElementById('new-ticket-btn');
    
    if (!myTicketsTable) return;

    // Renderiza os tickets atribuídos ao usuário
    function renderMyTickets() {
        myTicketsTable.innerHTML = '';
        
        myTickets.forEach(ticket => {
            // Define a classe de status
            let statusClass;
            switch(ticket.status) {
                case 'Novo':
                    statusClass = 'status-new';
                    break;
                case 'Aberto':
                    statusClass = 'status-open';
                    break;
                case 'Em Progresso':
                    statusClass = 'status-in-progress';
                    break;
                case 'Resolvido':
                    statusClass = 'status-resolved';
                    break;
                case 'Fechado':
                    statusClass = 'status-closed';
                    break;
            }
            
            // Define a classe de prioridade
            let priorityClass;
            switch(ticket.priority) {
                case 'Alta':
                case 'Crítica':
                    priorityClass = 'priority-high';
                    break;
                case 'Média':
                    priorityClass = 'priority-medium';
                    break;
                case 'Baixa':
                    priorityClass = 'priority-low';
                    break;
            }
            
            // Cria a linha da tabela
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${ticket.id}</td>
                <td>${ticket.subject}</td>
                <td>${ticket.requester}</td>
                <td class="${priorityClass}">${ticket.priority}</td>
                <td><span class="status-badge ${statusClass}">${ticket.status}</span></td>
                <td>${ticket.date}</td>
                <td class="actions">
                    <button class="btn-action edit-ticket" data-id="${ticket.id}" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-action delete-ticket" data-id="${ticket.id}" title="Excluir">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            
            myTicketsTable.appendChild(row);
        });
        
        // Adiciona os event listeners para os botões
        addMyTicketsEventListeners();
    }

    // Renderiza os tickets não atribuídos
    function renderUnassignedTickets() {
        if (!unassignedTicketsTable) return;
        
        unassignedTicketsTable.innerHTML = '';
        
        unassignedTickets.forEach(ticket => {
            // Define a classe de prioridade
            let priorityClass;
            switch(ticket.priority) {
                case 'Alta':
                case 'Crítica':
                    priorityClass = 'priority-high';
                    break;
                case 'Média':
                    priorityClass = 'priority-medium';
                    break;
                case 'Baixa':
                    priorityClass = 'priority-low';
                    break;
            }
            
            // Cria a linha da tabela
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${ticket.id}</td>
                <td>${ticket.subject}</td>
                <td>${ticket.requester}</td>
                <td class="${priorityClass}">${ticket.priority}</td>
                <td>${ticket.date}</td>
                <td class="actions">
                    <button class="btn-action assign-ticket" data-id="${ticket.id}" title="Atribuir a mim">
                        <i class="fas fa-user-plus"></i>
                    </button>
                    <button class="btn-action edit-unassigned-ticket" data-id="${ticket.id}" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                </td>
            `;
            
            unassignedTicketsTable.appendChild(row);
        });
        
        // Adiciona os event listeners para os botões
        addUnassignedTicketsEventListeners();
    }

    // Adiciona os event listeners para os botões na tabela de tickets atribuídos
    function addMyTicketsEventListeners() {
        document.querySelectorAll('.edit-ticket').forEach(button => {
            button.addEventListener('click', function() {
                const ticketId = this.getAttribute('data-id');
                openEditModal(ticketId, 'my');
            });
        });
        
        document.querySelectorAll('.delete-ticket').forEach(button => {
            button.addEventListener('click', function() {
                const ticketId = this.getAttribute('data-id');
                if (confirm('Tem certeza que deseja excluir este ticket?')) {
                    deleteTicket(ticketId, 'my');
                }
            });
        });
    }

    // Adiciona os event listeners para os botões na tabela de tickets não atribuídos
    function addUnassignedTicketsEventListeners() {
        document.querySelectorAll('.assign-ticket').forEach(button => {
            button.addEventListener('click', function() {
                const ticketId = this.getAttribute('data-id');
                assignTicketToMe(ticketId);
            });
        });
        
        document.querySelectorAll('.edit-unassigned-ticket').forEach(button => {
            button.addEventListener('click', function() {
                const ticketId = this.getAttribute('data-id');
                openEditModal(ticketId, 'unassigned');
            });
        });
    }

    // Abre o modal para criar um novo ticket
    function openNewTicketModal() {
        modalTitle.textContent = 'Novo Ticket';
        document.getElementById('ticket-id').value = '';
        ticketForm.reset();
        
        // Define valores padrão
        document.getElementById('ticket-status').value = 'Novo';
        
        // Exibe o modal
        ticketModal.style.display = 'block';
    }

    // Abre o modal para editar um ticket existente
    function openEditModal(ticketId, type) {
        const ticketArray = type === 'my' ? myTickets : unassignedTickets;
        const ticket = ticketArray.find(t => t.id === ticketId);
        if (!ticket) return;
        
        modalTitle.textContent = 'Editar Ticket';
        
        // Preenche o formulário com os dados do ticket
        document.getElementById('ticket-id').value = ticket.id;
        document.getElementById('ticket-subject').value = ticket.subject;
        document.getElementById('ticket-description').value = ticket.description;
        document.getElementById('ticket-requester').value = ticket.requester;
        document.getElementById('ticket-priority').value = ticket.priority;
        document.getElementById('ticket-status').value = ticket.status;
        document.getElementById('ticket-assignee').value = ticket.assignee || '';
        
        // Exibe o modal
        ticketModal.style.display = 'block';
    }

    // Fecha o modal
    function closeModal() {
        ticketModal.style.display = 'none';
    }

    // Salva um ticket (novo ou editado)
    function saveTicket() {
        const ticketId = document.getElementById('ticket-id').value;
        const subject = document.getElementById('ticket-subject').value;
        const description = document.getElementById('ticket-description').value;
        const requester = document.getElementById('ticket-requester').value;
        const priority = document.getElementById('ticket-priority').value;
        const status = document.getElementById('ticket-status').value;
        const assignee = document.getElementById('ticket-assignee').value;
        
        // Valida os campos obrigatórios
        if (!subject || !description || !requester || !priority || !status) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }// Formata a data atual
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        
        if (ticketId) {
            // Editar ticket existente
            let isMyTicket = false;
            let index = myTickets.findIndex(t => t.id === ticketId);
            
            if (index !== -1) {
                isMyTicket = true;
            } else {
                index = unassignedTickets.findIndex(t => t.id === ticketId);
            }
            
            if (index !== -1) {
                const ticketArray = isMyTicket ? myTickets : unassignedTickets;
                
                // Atualiza os dados do ticket
                ticketArray[index].subject = subject;
                ticketArray[index].description = description;
                ticketArray[index].requester = requester;
                ticketArray[index].priority = priority;
                ticketArray[index].status = status;
                
                // Gerencia a atribuição do ticket
                if (assignee && !isMyTicket) {
                    // Move o ticket para a lista de tickets atribuídos
                    const ticket = unassignedTickets.splice(index, 1)[0];
                    ticket.assignee = assignee;
                    myTickets.push(ticket);
                } else if (!assignee && isMyTicket) {
                    // Move o ticket para a lista de tickets não atribuídos
                    const ticket = myTickets.splice(index, 1)[0];
                    ticket.assignee = null;
                    unassignedTickets.push(ticket);
                } else if (isMyTicket) {
                    // Atualiza o assignee do ticket atribuído
                    myTickets[index].assignee = assignee;
                }
            }
        } else {
            // Criar novo ticket
            const newId = 'TK-' + (1000 + myTickets.length + unassignedTickets.length + 1);
            
            const newTicket = {
                id: newId,
                subject,
                description,
                requester,
                priority,
                status,
                date: formattedDate,
                assignee: assignee || null
            };
            
            // Adiciona o ticket à lista apropriada
            if (assignee) {
                myTickets.push(newTicket);
            } else {
                unassignedTickets.push(newTicket);
            }
        }
        
        // Atualiza as tabelas e fecha o modal
        renderMyTickets();
        renderUnassignedTickets();
        closeModal();
        
        // Mostra um alerta de sucesso
        showAlert(ticketId ? 'Ticket atualizado com sucesso!' : 'Ticket criado com sucesso!', 'success');
    }

    // Exclui um ticket
    function deleteTicket(ticketId, type) {
        if (type === 'my') {
            myTickets = myTickets.filter(t => t.id !== ticketId);
            renderMyTickets();
        } else {
            unassignedTickets = unassignedTickets.filter(t => t.id !== ticketId);
            renderUnassignedTickets();
        }
        
        // Mostra um alerta de sucesso
        showAlert('Ticket excluído com sucesso!', 'success');
    }

    // Atribui um ticket ao usuário atual
    function assignTicketToMe(ticketId) {
        const index = unassignedTickets.findIndex(t => t.id === ticketId);
        if (index !== -1) {
            const ticket = unassignedTickets.splice(index, 1)[0];
            ticket.assignee = 'Romulo Andrade';
            ticket.status = 'Aberto';
            myTickets.push(ticket);
            
            renderMyTickets();
            renderUnassignedTickets();
            
            // Mostra um alerta de sucesso
            showAlert('Ticket atribuído com sucesso!', 'success');
        }
    }
    
    // Event listeners
    if (newTicketBtn) {
        newTicketBtn.addEventListener('click', openNewTicketModal);
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modalCancel) {
        modalCancel.addEventListener('click', closeModal);
    }
    
    if (modalSave) {
        modalSave.addEventListener('click', saveTicket);
    }
    
    // Fecha o modal ao clicar fora dele
    window.addEventListener('click', function(event) {
        if (event.target === ticketModal) {
            closeModal();
        }
    });
    
    // Event listeners para os filtros
    const statusFilter = document.getElementById('status-filter');
    const priorityFilter = document.getElementById('priority-filter');
    const dateFilter = document.getElementById('date-filter');
    
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            console.log('Filtro de status mudou para:', this.value);
            // Implementar filtragem aqui
        });
    }
    
    if (priorityFilter) {
        priorityFilter.addEventListener('change', function() {
            console.log('Filtro de prioridade mudou para:', this.value);
            // Implementar filtragem aqui
        });
    }
    
    if (dateFilter) {
        dateFilter.addEventListener('change', function() {
            console.log('Filtro de data mudou para:', this.value);
            // Implementar filtragem aqui
        });
    }
    
    // Event listener para a busca
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = document.querySelector('.search-input').value.toLowerCase();
            console.log('Buscando por:', searchTerm);
            // Implementar busca aqui
        });
    }
    
    // Inicializa a página
    renderMyTickets();
    renderUnassignedTickets();
}

// Inicialização da página de Contatos
function initContactPage() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (name && email && subject && message) {
                if (formSuccess) {
                    formSuccess.style.display = 'block';
                }
                
                this.reset();
                
                setTimeout(function() {
                    if (formSuccess) {
                        formSuccess.style.display = 'none';
                    }
                }, 5000);
            }
        });
    }
}

// Evento de logout global
document.addEventListener('click', function(e) {
    if (e.target.closest('.logout-link') || e.target.closest('.menu-item[href="SDGTelaLogin.html"]')) {
        e.preventDefault();
        logout();
    }
});