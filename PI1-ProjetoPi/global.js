// Configurações e Funções Globais do Sistema SGD

// Inicialização do sistema
document.addEventListener('DOMContentLoaded', function() {
    checkAuthentication();
    configureSidebar();
    setupDisabledMenuItems();
    setupUserInfo();
    setupLogoutButton();
    initPage();
});

// Verifica autenticação do usuário
function checkAuthentication() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const currentPath = window.location.pathname;
    const loginPage = 'SDGTelaLogin.html';
    const indexPage = 'index.html';
    const welcomePage = 'SDGBoasVindas.html';
    
    const publicPages = [loginPage, indexPage, welcomePage];
    const isPublicPage = publicPages.some(page => currentPath.includes(page));
    
    if (!isLoggedIn && !isPublicPage) {
        window.location.href = loginPage;
    }
}

// Configuração do menu lateral
function configureSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (sidebar && mainContent) {
        function handleResize() {
            if (window.innerWidth <= 768) {
                sidebar.style.width = '70px';
                mainContent.style.marginLeft = '70px';
                
                document.querySelectorAll('.menu-text').forEach(item => {
                    item.style.display = 'none';
                });
                
                document.querySelectorAll('.menu-item').forEach(item => {
                    if (item.querySelector('i')) {
                        item.style.justifyContent = 'center';
                        item.querySelector('i').style.marginRight = '0';
                    }
                });
                
                document.querySelectorAll('.menu-label').forEach(label => {
                    label.style.display = 'none';
                });
            } else {
                sidebar.style.width = '250px';
                mainContent.style.marginLeft = '250px';
                
                document.querySelectorAll('.menu-text').forEach(item => {
                    item.style.display = 'block';
                });
                
                document.querySelectorAll('.menu-item').forEach(item => {
                    if (item.querySelector('i')) {
                        item.style.justifyContent = 'flex-start';
                        item.querySelector('i').style.marginRight = '10px';
                    }
                });
                
                document.querySelectorAll('.menu-label').forEach(label => {
                    label.style.display = 'block';
                });
            }
        }

        window.addEventListener('resize', handleResize);
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
    
    if (pagePath.includes('SDGTelaLogin.html')) initLoginPage();
    if (pagePath.includes('SDGDashboard.html')) initDashboardPage();
    if (pagePath.includes('SDGMeusTickets.html')) initMyTicketsPage();
    if (pagePath.includes('SDGContatos.html')) initContactPage();
    if (pagePath.includes('SDGPerfilUsuario.html')) initProfilePage();
    if (pagePath.includes('SDGKanbanBoard.html')) initKanbanPage();
    if (pagePath.includes('SDGRelatorios.html')) initReportsPage();
    if (pagePath.includes('SDGAdminUsuarios.html')) initAdminUsersPage();
    if (pagePath.includes('SDGPaginaInicial.html') || pagePath.includes('index.html')) initHomePage();
    
    checkAdminStatus();
    setTimeout(initThemeSelector, 500);
}

// Função para inicializar a página inicial
function initHomePage() {
    // Verifica se é a primeira visita
    const isFirstVisit = !localStorage.getItem('hasVisitedBefore');
    if (isFirstVisit) {
        localStorage.setItem('hasVisitedBefore', 'true');
    }
    
    // Configura animações para os cards
    setupHomePageCards();
}

// Configura os cards da página inicial
function setupHomePageCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        // Adiciona efeitos de hover
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
        });
    });
}

// Verifica se o usuário atual é um administrador
function checkAdminStatus() {
    // Em um sistema real, isso seria verificado pelo perfil do usuário
    const isAdmin = true;
    
    if (isAdmin) {
        document.body.classList.add('is-admin');
    } else {
        document.body.classList.remove('is-admin');
    }
}

// Inicialização da página de Login
function initLoginPage() {
    const loginForm = document.getElementById('login-form');
    const loginAlert = document.getElementById('login-alert');
    
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        window.location.href = 'SDGPaginaInicial.html';
    }
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;
            
            if (email && password) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                
                if (remember) {
                    localStorage.setItem('rememberUser', 'true');
                } else {
                    localStorage.removeItem('rememberUser');
                }
                
                const isFirstVisit = !localStorage.getItem('hasVisitedBefore');
                if (isFirstVisit) {
                    window.location.href = 'SDGBoasVindas.html';
                } else {
                    window.location.href = 'SDGPaginaInicial.html';
                }
            } else {
                if (loginAlert) {
                    loginAlert.style.display = 'block';
                    
                    setTimeout(() => {
                        loginAlert.style.display = 'none';
                    }, 3000);
                }
            }
        });
    }
    
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
        updateDashboardStats();
        
        tickets.forEach(ticket => {
            let statusClass;
            switch(ticket.status) {
                case 'Novo': statusClass = 'status-new'; break;
                case 'Aberto': statusClass = 'status-open'; break;
                case 'Em Progresso': statusClass = 'status-in-progress'; break;
                case 'Resolvido': statusClass = 'status-resolved'; break;
                case 'Fechado': statusClass = 'status-closed'; break;
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
        const lateTickets = tickets.filter(t => t.priority === 'Alta' || t.priority === 'Crítica').length;
        
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
        const formattedDate = formatDate(today);
        
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
        showAlert(ticketId ? 'Ticket atualizado com sucesso!' : 'Ticket criado com sucesso!', 'success');
    }
    
    // Exclui um ticket
    function deleteTicket(ticketId) {
        tickets = tickets.filter(t => t.id !== ticketId);
        renderTickets();
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
                case 'Novo': statusClass = 'status-new'; break;
                case 'Aberto': statusClass = 'status-open'; break;
                case 'Em Progresso': statusClass = 'status-in-progress'; break;
                case 'Resolvido': statusClass = 'status-resolved'; break;
                case 'Fechado': statusClass = 'status-closed'; break;
            }
            
            // Define a classe de prioridade
            let priorityClass;
            switch(ticket.priority) {
                case 'Alta':
                case 'Crítica': priorityClass = 'priority-high'; break;
                case 'Média': priorityClass = 'priority-medium'; break;
                case 'Baixa': priorityClass = 'priority-low'; break;
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
                case 'Crítica': priorityClass = 'priority-high'; break;
                case 'Média': priorityClass = 'priority-medium'; break;
                case 'Baixa': priorityClass = 'priority-low'; break;
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
        document.getElementById('ticket-status').value = 'Novo';
        ticketModal.style.display = 'block';
    }

    // Abre o modal para editar um ticket existente
    function openEditModal(ticketId, type) {
        const ticketArray = type === 'my' ? myTickets : unassignedTickets;
        const ticket = ticketArray.find(t => t.id === ticketId);
        if (!ticket) return;
        
        modalTitle.textContent = 'Editar Ticket';
        
        document.getElementById('ticket-id').value = ticket.id;
        document.getElementById('ticket-subject').value = ticket.subject;
        document.getElementById('ticket-description').value = ticket.description;
        document.getElementById('ticket-requester').value = ticket.requester;
        document.getElementById('ticket-priority').value = ticket.priority;
        document.getElementById('ticket-status').value = ticket.status;
        document.getElementById('ticket-assignee').value = ticket.assignee || '';
        
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
        
        if (!subject || !description || !requester || !priority || !status) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        const formattedDate = formatDate(new Date());
        
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
                
                ticketArray[index].subject = subject;
                ticketArray[index].description = description;
                ticketArray[index].requester = requester;
                ticketArray[index].priority = priority;
                ticketArray[index].status = status;
                
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
            
            showAlert('Ticket atribuído com sucesso!', 'success');
        }
    }
    
    // Event listeners
    if (newTicketBtn) newTicketBtn.addEventListener('click', openNewTicketModal);
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalCancel) modalCancel.addEventListener('click', closeModal);
    if (modalSave) modalSave.addEventListener('click', saveTicket);
    
    // Fecha o modal ao clicar fora dele
    window.addEventListener('click', function(event) {
        if (event.target === ticketModal) {
            closeModal();
        }
    });
    
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

// Inicialização da página de Perfil do Usuário
function initProfilePage() {
    // Tabs do perfil
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const tabId = this.getAttribute('data-tab');
            tabPanes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Força do password
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const strengthSegments = document.querySelectorAll('.strength-segment');
    const strengthText = document.querySelector('.strength-text');
    
    if (newPasswordInput) {
        newPasswordInput.addEventListener('input', function() {
            updatePasswordStrength(this.value);
            
            if (confirmPasswordInput.value) {
                checkPasswordsMatch(this.value, confirmPasswordInput.value);
            }
        });
    }
    
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            if (newPasswordInput.value) {
                checkPasswordsMatch(newPasswordInput.value, this.value);
            }
        });
    }
    
    // Formulários de perfil
    const personalForm = document.getElementById('personal-form');
    const securityForm = document.getElementById('security-form');
    const preferencesForm = document.getElementById('preferences-form');
    
    if (personalForm) {
        personalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showAlert('Informações pessoais atualizadas com sucesso!', 'success');
            updateUserInfoDisplay();
        });
    }
    
    if (securityForm) {
        securityForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (!currentPassword) {
                showAlert('Digite sua senha atual.', 'danger');
                return;
            }
            
            if (!newPassword) {
                showAlert('Digite a nova senha.', 'danger');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                showAlert('As senhas não coincidem.', 'danger');
                return;
            }
            
            showAlert('Senha atualizada com sucesso!', 'success');
            this.reset();
            
            strengthSegments.forEach(segment => {
                segment.classList.remove('active', 'medium', 'strong');
            });
            
            strengthText.textContent = 'Senha fraca';
        });
    }
    
    if (preferencesForm) {
        preferencesForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showAlert('Preferências salvas com sucesso!', 'success');
        });
    }
    
    // Botão de trocar foto
    const changePhotoBtn = document.getElementById('change-photo-btn');
    
    if (changePhotoBtn) {
        changePhotoBtn.addEventListener('click', function() {
            showAlert('Essa funcionalidade será implementada em breve.', 'info');
        });
    }
}

// Atualiza a exibição das informações do usuário na interface
function updateUserInfoDisplay() {
    const userName = document.getElementById('user-name').value;
    const userRole = document.getElementById('user-position').value;
    const userEmail = document.getElementById('user-email').value;
    
    const profileName = document.getElementById('profile-name');
    const profileRole = document.getElementById('profile-role');
    const profileEmail = document.getElementById('profile-email');
    
    if (profileName) profileName.textContent = userName;
    if (profileRole) profileRole.textContent = userRole;
    if (profileEmail) profileEmail.textContent = userEmail;
    
    const userNameElements = document.querySelectorAll('.user-name');
    userNameElements.forEach(el => {
        if (el) el.textContent = userName;
    });
    
    // Atualiza o avatar com as iniciais
    const nameParts = userName.split(' ');
    let initials = '';
    
    if (nameParts.length >= 2) {
        initials = nameParts[0].charAt(0) + nameParts[1].charAt(0);
    } else if (nameParts.length === 1) {
        initials = nameParts[0].substring(0, 2);
    }
    
    initials = initials.toUpperCase();
    
    const userAvatarElements = document.querySelectorAll('.user-avatar');
    userAvatarElements.forEach(el => {
        if (el) el.textContent = initials;
    });
}

// Avalia a força da senha
function updatePasswordStrength(password) {
    const strengthSegments = document.querySelectorAll('.strength-segment');
    const strengthText = document.querySelector('.strength-text');
    
    // Limpa classes anteriores
    strengthSegments.forEach(segment => {
        segment.classList.remove('active', 'medium', 'strong');
    });
    
    if (!password) {
        strengthText.textContent = 'Senha fraca';
        return;
    }
    
    let strength = 0;
    
    // Comprimento mínimo
    if (password.length >= 8) strength++;
    // Letras maiúsculas e minúsculas
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    // Números
    if (/\d/.test(password)) strength++;
    // Caracteres especiais
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    // Atualiza a visualização da força
    for (let i = 0; i < strength; i++) {
        strengthSegments[i].classList.add('active');
        
        if (strength >= 3) {
            strengthSegments[i].classList.add('medium');
        }
        
        if (strength === 4) {
            strengthSegments[i].classList.add('strong');
        }
    }
    
    // Atualiza o texto da força
    if (strength <= 1) {
        strengthText.textContent = 'Senha fraca';
        strengthText.style.color = '#dc3545';
    } else if (strength === 2) {
        strengthText.textContent = 'Senha razoável';
        strengthText.style.color = '#dc3545';
    } else if (strength === 3) {
        strengthText.textContent = 'Senha média';
        strengthText.style.color = '#ffc107';
    } else {
        strengthText.textContent = 'Senha forte';
        strengthText.style.color = '#28a745';
    }
}

// Verifica se as senhas coincidem
function checkPasswordsMatch(password1, password2) {
    const confirmPasswordInput = document.getElementById('confirm-password');
    
    if (password1 === password2) {
        confirmPasswordInput.style.borderColor = '#28a745';
    } else {
        confirmPasswordInput.style.borderColor = '#dc3545';
    }
}

// Inicialização da página Kanban Board
function initKanbanPage() {
    // Drag and Drop para cards Kanban
    const cards = document.querySelectorAll('.kanban-card');
    const columns = document.querySelectorAll('.column-content');
    
    // Configura drag para os cards
    cards.forEach(card => {
        card.setAttribute('draggable', true);
        
        card.addEventListener('dragstart', function(e) {
            this.classList.add('dragging');
            e.dataTransfer.setData('text/plain', this.getAttribute('data-id'));
        });
        
        card.addEventListener('dragend', function() {
            this.classList.remove('dragging');
        });
    });
    
    // Configura drop para as colunas
    columns.forEach(column => {
        column.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('dragover');
        });
        
        column.addEventListener('dragleave', function() {
            this.classList.remove('dragover');
        });
        
        column.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
            
            const cardId = e.dataTransfer.getData('text/plain');
            const card = document.querySelector(`[data-id="${cardId}"]`);
            
            if (card && this !== card.parentNode) {
                // Obtém a coluna de destino
                const targetColumn = this.closest('.kanban-column');
                const sourceColumn = card.closest('.kanban-column');
                
                // Move o card
                this.appendChild(card);
                
                // Atualiza o status do card com base na coluna
                const newStatus = getStatusFromColumn(targetColumn.id);
                
                // Atualiza as contagens
                updateColumnCounts(sourceColumn);
                updateColumnCounts(targetColumn);
                
                showAlert(`Ticket ${cardId} movido para ${newStatus}`, 'success');
            }
        });
    });
    
    // Botão de adicionar ticket
    const addTicketBtn = document.getElementById('add-ticket-btn');
    const ticketModal = document.getElementById('ticket-modal');
    const modalClose = document.getElementById('modal-close');
    const modalCancel = document.getElementById('modal-cancel');
    const modalSave = document.getElementById('modal-save');
    
    if (addTicketBtn) {
        addTicketBtn.addEventListener('click', function() {
            document.getElementById('ticket-form').reset();
            document.getElementById('ticket-id').value = '';
            document.getElementById('ticket-status').value = 'Novo';
            ticketModal.style.display = 'block';
        });
    }
    
    if (modalClose) modalClose.addEventListener('click', () => ticketModal.style.display = 'none');
    if (modalCancel) modalCancel.addEventListener('click', () => ticketModal.style.display = 'none');
    
    if (modalSave) {
        modalSave.addEventListener('click', function() {
            const id = document.getElementById('ticket-id').value || `TK-${1000 + Math.floor(Math.random() * 1000)}`;
            const subject = document.getElementById('ticket-subject').value;
            const description = document.getElementById('ticket-description').value;
            const requester = document.getElementById('ticket-requester').value;
            const priority = document.getElementById('ticket-priority').value;
            const status = document.getElementById('ticket-status').value;
            
            if (!subject || !description || !requester || !priority || !status) {
                showAlert('Por favor, preencha todos os campos obrigatórios.', 'danger');
                return;
            }
            
            ticketModal.style.display = 'none';
            showAlert('Ticket salvo com sucesso!', 'success');
        });
    }
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', function(e) {
        if (e.target === ticketModal) {
            ticketModal.style.display = 'none';
        }
    });
}

// Obtém o status com base no ID da coluna
function getStatusFromColumn(columnId) {
    switch (columnId) {
        case 'column-new': return 'Novo';
        case 'column-in-progress': return 'Em Progresso';
        case 'column-testing': return 'Em Teste';
        case 'column-done': return 'Concluído';
        default: return 'Desconhecido';
    }
}

// Atualiza a contagem de cards em uma coluna
function updateColumnCounts(column) {
    const cards = column.querySelector('.column-content').children;
    const countElement = column.querySelector('.ticket-count');
    
    if (countElement) {
        countElement.textContent = cards.length;
    }
}

// Inicialização da página de Relatórios
function initReportsPage() {
    const generateReportBtn = document.getElementById('generate-report');
    const dateRangeSelect = document.getElementById('date-range');
    const dateRangeCustom = document.querySelector('.date-range-custom');
    const reportLoading = document.getElementById('report-loading');
    const reportResult = document.getElementById('report-result');
    
    // Botões de exportação
    const exportPdfBtn = document.getElementById('export-pdf');
    const exportExcelBtn = document.getElementById('export-excel');
    const printReportBtn = document.getElementById('print-report');
    const exportTableBtn = document.getElementById('export-table');
    
    // Exibição da seção de datas personalizadas
    if (dateRangeSelect) {
        dateRangeSelect.addEventListener('change', function() {
            dateRangeCustom.style.display = this.value === 'custom' ? 'block' : 'none';
        });
    }
    
    // Geração de relatório
    if (generateReportBtn) {
        generateReportBtn.addEventListener('click', function() {
            reportLoading.style.display = 'flex';
            
            setTimeout(() => {
                reportLoading.style.display = 'none';
                updateReportHeader();
                
                reportResult.style.opacity = '0.8';
                setTimeout(() => {
                    reportResult.style.opacity = '1';
                }, 300);
            }, 1500);
        });
    }
    
    // Botões e ações de exportação/visualização
    if (exportPdfBtn) {
        exportPdfBtn.addEventListener('click', function() {
            showAlert('Exportando relatório para PDF...', 'info');
            setTimeout(() => {
                showAlert('Relatório exportado para PDF com sucesso!', 'success');
            }, 1500);
        });
    }
    
    if (exportExcelBtn) {
        exportExcelBtn.addEventListener('click', function() {
            showAlert('Exportando relatório para Excel...', 'info');
            setTimeout(() => {
                showAlert('Relatório exportado para Excel com sucesso!', 'success');
            }, 1500);
        });
    }
    
    if (printReportBtn) {
        printReportBtn.addEventListener('click', function() {
            showAlert('Preparando relatório para impressão...', 'info');
            setTimeout(() => window.print(), 1000);
        });
    }
    
    // Botões de visualização e interação com gráficos
    setupChartButtons();
    setupPeriodButtons();
    setupTableInteractions();
}

// Configuração dos botões de visualização de gráficos
function setupChartButtons() {
    const chartViewButtons = document.querySelectorAll('.chart-actions .btn-icon');
    
    if (chartViewButtons.length > 0) {
        chartViewButtons.forEach(button => {
            button.addEventListener('click', function() {
                chartViewButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const view = this.getAttribute('data-view');
                let viewText = '';
                
                switch (view) {
                    case 'tickets': viewText = 'Tickets Atribuídos'; break;
                    case 'time': viewText = 'Tempo de Resolução'; break;
                    case 'satisfaction': viewText = 'Satisfação do Cliente'; break;
                }
                
                showAlert(`Visualização alterada para: ${viewText}`, 'info');
            });
        });
    }
}

// Configuração dos botões de período
function setupPeriodButtons() {
    const periodButtons = document.querySelectorAll('.chart-period-selector .period-btn');
    
    if (periodButtons.length > 0) {
        periodButtons.forEach(button => {
            button.addEventListener('click', function() {
                periodButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const period = this.getAttribute('data-period');
                let periodText = '';
                
                switch (period) {
                    case 'day': periodText = 'Diário'; break;
                    case 'week': periodText = 'Semanal'; break;
                    case 'month': periodText = 'Mensal'; break;
                }
                
                showAlert(`Período alterado para: ${periodText}`, 'info');
            });
        });
    }
}

// Configuração das interações com tabela
function setupTableInteractions() {
    // Exportação da tabela
    const exportTableBtn = document.getElementById('export-table');
    if (exportTableBtn) {
        exportTableBtn.addEventListener('click', function() {
            showAlert('Exportando tabela de tickets...', 'info');
            setTimeout(() => {
                showAlert('Tabela exportada com sucesso!', 'success');
            }, 1500);
        });
    }
    
    // Paginação
    const paginationItems = document.querySelectorAll('.report-pagination .pagination-item');
    if (paginationItems.length > 0) {
        paginationItems.forEach(item => {
            if (!item.classList.contains('active')) {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    paginationItems.forEach(i => i.classList.remove('active'));
                    this.classList.add('active');
                    showAlert('Mudando para a página selecionada...', 'info');
                });
            }
        });
    }
    
    // Busca
    const searchBtn = document.querySelector('.table-actions .search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = document.querySelector('.table-actions .search-input').value;
            if (searchTerm) {
                showAlert(`Buscando por: ${searchTerm}`, 'info');
            }
        });
    }
}

// Atualiza o cabeçalho do relatório
function updateReportHeader() {
    const reportTitle = document.getElementById('report-title');
    const reportPeriod = document.getElementById('report-period');
    const reportType = document.getElementById('report-type');
    const dateRange = document.getElementById('date-range');
    const dateStart = document.getElementById('date-start');
    const dateEnd = document.getElementById('date-end');
    
    // Atualiza título e período com base nas seleções
    if (reportTitle && reportType) {
        const reportTypes = {
            'performance': 'Performance da Equipe',
            'tickets': 'Status dos Tickets',
            'response': 'Tempo de Resposta',
            'satisfaction': 'Satisfação do Cliente',
            'workload': 'Carga de Trabalho'
        };
        reportTitle.textContent = reportTypes[reportType.value] || 'Relatório';
    }
    
    // Atualiza valores de cards e gráficos com dados simulados
    updateReportData();
}

// Atualiza dados do relatório com valores simulados
function updateReportData() {
    // Atualiza valores dos cards de resumo aleatoriamente
    const summaryValues = document.querySelectorAll('.summary-value');
    if (summaryValues.length > 0) {
        const baseValues = [48, 32, 6.2, 95]; // valores base
        
        summaryValues.forEach((value, index) => {
            if (index === 0) {
                // Total de tickets
                const random = Math.floor(Math.random() * 10) - 5; // -5 a +5
                value.textContent = baseValues[0] + random;
            } else if (index === 1) {
                // Tickets resolvidos
                const total = parseInt(summaryValues[0].textContent);
                const resolved = Math.floor(total * (0.6 + Math.random() * 0.3)); // 60-90% resolvidos
                value.textContent = resolved;
            } else if (index === 2) {
                // Tempo médio
                const random = (Math.random() * 2 - 1).toFixed(1); // -1.0 a +1.0
                value.textContent = (baseValues[2] + parseFloat(random)).toFixed(1) + 'h';
            } else if (index === 3) {
                // Taxa de resolução
                const total = parseInt(summaryValues[0].textContent);
                const resolved = parseInt(summaryValues[1].textContent);
                const rate = Math.round((resolved / total) * 100);
                value.textContent = rate + '%';
            }
        });
    }
}

// Inicialização do seletor de temas
function initThemeSelector() {
    // Adiciona o seletor de temas na página
    const themeSelector = document.createElement('div');
    themeSelector.className = 'theme-selector';
    themeSelector.innerHTML = '<i class="fas fa-palette"></i>';
    document.body.appendChild(themeSelector);
    
    // Adiciona as opções de tema
    const themeOptions = document.createElement('div');
    themeOptions.className = 'theme-options';
    themeOptions.innerHTML = `
        <div class="theme-option theme-default" data-theme="default">
            <div class="theme-color"></div>
            <span class="theme-title">Azul (Padrão)</span>
        </div>
        <div class="theme-option theme-green" data-theme="green">
            <div class="theme-color"></div>
            <span class="theme-title">Verde</span>
        </div>
        <div class="theme-option theme-purple" data-theme="purple">
            <div class="theme-color"></div>
            <span class="theme-title">Roxo</span>
        </div>
        <div class="theme-option theme-orange" data-theme="orange">
            <div class="theme-color"></div>
            <span class="theme-title">Laranja</span>
        </div>
        <div class="theme-option theme-dark" data-theme="dark">
            <div class="theme-color"></div>
            <span class="theme-title">Escuro</span>
        </div>
    `;
    document.body.appendChild(themeOptions);
    
    // Carrega o tema atual
    const currentTheme = localStorage.getItem('theme') || 'default';
    setTheme(currentTheme);
    
    // Marca a opção atual como ativa
    const activeOption = themeOptions.querySelector(`[data-theme="${currentTheme}"]`);
    if (activeOption) {
        activeOption.classList.add('active');
    }
    
    // Abre/fecha o seletor ao clicar
    themeSelector.addEventListener('click', function() {
        themeOptions.classList.toggle('open');
    });
    
    // Fecha o seletor ao clicar fora dele
    document.addEventListener('click', function(e) {
        if (!themeSelector.contains(e.target) && !themeOptions.contains(e.target)) {
            themeOptions.classList.remove('open');
        }
    });
    
   // Muda o tema ao clicar em uma opção
   const options = themeOptions.querySelectorAll('.theme-option');
   options.forEach(option => {
       option.addEventListener('click', function() {
           const theme = this.getAttribute('data-theme');
           
           // Remove a classe active de todas as opções
           options.forEach(opt => opt.classList.remove('active'));
           
           // Adiciona a classe active à opção clicada
           this.classList.add('active');
           
           // Define o tema
           setTheme(theme);
           
           // Salva a preferência
           localStorage.setItem('theme', theme);
           
           // Fecha o seletor
           themeOptions.classList.remove('open');
           
           // Atualiza o select no perfil do usuário, se estiver na página de perfil
           const themePreferenceSelect = document.getElementById('theme-preference');
           if (themePreferenceSelect) {
               themePreferenceSelect.value = theme === 'default' ? 'light' : theme;
           }
           
           // Mostra uma notificação
           showAlert(`Tema alterado para ${this.querySelector('.theme-title').textContent}`, 'success');
       });
   });
   
   // Atualiza o tema quando mudado na página de perfil
   const themePreferenceSelect = document.getElementById('theme-preference');
   if (themePreferenceSelect) {
       themePreferenceSelect.addEventListener('change', function() {
           let theme = this.value;
           
           // Converte 'light' para 'default'
           if (theme === 'light') {
               theme = 'default';
           }
           
           // Se for 'system', verifica a preferência do sistema
           if (theme === 'system') {
               theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default';
           }
           
           // Define e salva o tema
           setTheme(theme);
           localStorage.setItem('theme', theme);
           
           // Atualiza a opção ativa no seletor
           options.forEach(opt => opt.classList.remove('active'));
           const activeOption = themeOptions.querySelector(`[data-theme="${theme}"]`);
           if (activeOption) {
               activeOption.classList.add('active');
           }
       });
   }
}

// Define o tema
function setTheme(theme) {
   // Remove todas as classes de tema
   document.body.classList.remove('theme-default', 'theme-green', 'theme-purple', 'theme-orange', 'theme-dark');
   
   // Adiciona a classe do tema selecionado
   if (theme !== 'default') {
       document.body.classList.add(`theme-${theme}`);
   }
   
   // Se o tema for escuro, adiciona a classe ao HTML para os estilos CSS
   if (theme === 'dark') {
       document.documentElement.classList.add('dark-mode');
   } else {
       document.documentElement.classList.remove('dark-mode');
   }
}

// Inicialização da página de Administração de Usuários
function initAdminUsersPage() {
   // Event listeners para campos e botões
   setupUserFormEvents();
   setupBulkActions();
   setupPasswordGenerator();
   setupUserFilters();
}

// Configuração dos eventos do formulário de usuário
function setupUserFormEvents() {
   const addUserBtn = document.getElementById('add-user-btn');
   const userModal = document.getElementById('user-modal');
   const userModalClose = document.getElementById('user-modal-close');
   const userModalCancel = document.getElementById('user-modal-cancel');
   const userModalSave = document.getElementById('user-modal-save');
   
   // Botões de edição de usuário
   document.querySelectorAll('.edit-user').forEach(button => {
       button.addEventListener('click', function() {
           const userId = this.getAttribute('data-id');
           openUserEditModal(userId);
       });
   });
   
   // Botões de exclusão de usuário
   document.querySelectorAll('.delete-user').forEach(button => {
       button.addEventListener('click', function() {
           const userId = this.getAttribute('data-id');
           openDeleteConfirmModal(userId);
       });
   });
   
   // Abrir modal para novo usuário
   if (addUserBtn) {
       addUserBtn.addEventListener('click', function() {
           openNewUserModal();
       });
   }
   
   // Fechamento de modais
   if (userModalClose) userModalClose.addEventListener('click', () => userModal.style.display = 'none');
   if (userModalCancel) userModalCancel.addEventListener('click', () => userModal.style.display = 'none');
   
   // Salvar usuário
   if (userModalSave) {
       userModalSave.addEventListener('click', function() {
           saveUser();
       });
   }
   
   // Fechar modais ao clicar fora
   window.addEventListener('click', function(e) {
       if (e.target === userModal) {
           userModal.style.display = 'none';
       }
       
       const deleteConfirmModal = document.getElementById('delete-confirm-modal');
       if (e.target === deleteConfirmModal) {
           deleteConfirmModal.style.display = 'none';
       }
   });
}

// Configuração de ações em massa
function setupBulkActions() {
   const selectAllCheckbox = document.getElementById('select-all-users');
   const userCheckboxes = document.querySelectorAll('input[id^="user-"]');
   const bulkActionSelect = document.getElementById('bulk-action');
   const applyBulkBtn = document.getElementById('apply-bulk');
   
   // Seleção de todos os usuários
   if (selectAllCheckbox) {
       selectAllCheckbox.addEventListener('change', function() {
           userCheckboxes.forEach(checkbox => {
               checkbox.checked = this.checked;
           });
       });
   }
   
   // Aplicar ação em massa
   if (applyBulkBtn) {
       applyBulkBtn.addEventListener('click', function() {
           const action = bulkActionSelect.value;
           
           if (!action) {
               showAlert('Por favor, selecione uma ação.', 'danger');
               return;
           }
           
           const selectedUsers = Array.from(userCheckboxes).filter(checkbox => checkbox.checked);
           
           if (selectedUsers.length === 0) {
               showAlert('Por favor, selecione pelo menos um usuário.', 'danger');
               return;
           }
           
           if (action === 'delete') {
               const deleteConfirmModal = document.getElementById('delete-confirm-modal');
               deleteConfirmModal.style.display = 'block';
           } else {
               const actionText = action === 'activate' ? 'ativados' : 'desativados';
               showAlert(`${selectedUsers.length} usuários foram ${actionText} com sucesso!`, 'success');
           }
       });
   }
}

// Configuração do gerador de senha
function setupPasswordGenerator() {
   const generatePasswordCheckbox = document.getElementById('generate-password');
   const manualPasswordSection = document.getElementById('manual-password');
   const autoPasswordSection = document.getElementById('auto-password');
   const regeneratePasswordBtn = document.getElementById('regenerate-password');
   const generatedPasswordInput = document.getElementById('generated-password');
   
   if (generatePasswordCheckbox) {
       generatePasswordCheckbox.addEventListener('change', function() {
           manualPasswordSection.style.display = this.checked ? 'none' : 'block';
           autoPasswordSection.style.display = this.checked ? 'block' : 'none';
           
           if (this.checked) {
               generatedPasswordInput.value = generateRandomPassword();
           }
       });
   }
   
   if (regeneratePasswordBtn) {
       regeneratePasswordBtn.addEventListener('click', function() {
           generatedPasswordInput.value = generateRandomPassword();
       });
   }
}

// Configuração dos filtros de usuários
function setupUserFilters() {
   const roleFilter = document.getElementById('role-filter');
   const departmentFilter = document.getElementById('department-filter');
   const statusFilter = document.getElementById('status-filter');
   const searchBtn = document.getElementById('user-search-btn');
   
   if (roleFilter) {
       roleFilter.addEventListener('change', function() {
           filterUsers();
       });
   }
   
   if (departmentFilter) {
       departmentFilter.addEventListener('change', function() {
           filterUsers();
       });
   }
   
   if (statusFilter) {
       statusFilter.addEventListener('change', function() {
           filterUsers();
       });
   }
   
   if (searchBtn) {
       searchBtn.addEventListener('click', function() {
           const searchTerm = document.getElementById('user-search').value;
           if (searchTerm) {
               showAlert(`Buscando por: ${searchTerm}`, 'info');
               filterUsers(searchTerm);
           }
       });
   }
}

// Função para filtrar usuários (simulada)
function filterUsers(searchTerm) {
   showAlert('Aplicando filtros...', 'info');
   // Em um sistema real, aqui seria feita a filtragem dos usuários
}

// Funções para manipulação de modais de usuário
function openUserEditModal(userId) {
   // Simulação de dados de usuário
   const mockUsers = {
       '1': {
           name: 'Romulo Andrade',
           email: 'romulo.andrade@sgd.com.br',
           phone: '(11) 98765-4321',
           department: 'ti',
           role: 'admin',
           status: 'active'
       },
       '2': {
           name: 'Isabela Genize',
           email: 'isabela.genize@sgd.com.br',
           phone: '(11) 98765-4322',
           department: 'marketing',
           role: 'manager',
           status: 'active'
       },
       '3': {
           name: 'Gustavo Batista',
           email: 'gustavo.batista@sgd.com.br',
           phone: '(11) 98765-4323',
           department: 'ti',
           role: 'agent',
           status: 'active'
       },
       '4': {
           name: 'Helbert Lima',
           email: 'helbert.lima@sgd.com.br',
           phone: '(11) 98765-4324',
           department: 'rh',
           role: 'user',
           status: 'inactive'
       },
       '5': {
           name: 'Maria Silva',
           email: 'maria.silva@sgd.com.br',
           phone: '(11) 98765-4325',
           department: 'financeiro',
           role: 'user',
           status: 'pending'
       }
   };
   
   const user = mockUsers[userId];
   
   if (user) {
       // Preenche o formulário com os dados do usuário
       document.getElementById('user-modal-title').textContent = 'Editar Usuário';
       document.getElementById('user-id').value = userId;
       document.getElementById('user-name').value = user.name;
       document.getElementById('user-email').value = user.email;
       document.getElementById('user-phone').value = user.phone;
       document.getElementById('user-department').value = user.department;
       document.getElementById('user-role').value = user.role;
       document.getElementById('user-status').value = user.status;
       
       // Esconde a seção de senha para edição
       document.querySelector('.password-section').style.display = 'none';
       
       // Exibe o modal
       document.getElementById('user-modal').style.display = 'block';
   }
}

function openNewUserModal() {
   // Reset do formulário
   document.getElementById('user-form').reset();
   document.getElementById('user-id').value = '';
   
   // Configura o título do modal
   document.getElementById('user-modal-title').textContent = 'Novo Usuário';
   
   // Exibe a seção de senha
   document.querySelector('.password-section').style.display = 'block';
   
   // Exibe o modal
   document.getElementById('user-modal').style.display = 'block';
}

function openDeleteConfirmModal(userId) {
   const deleteModalConfirm = document.getElementById('delete-modal-confirm');
   
   // Armazena o ID do usuário para exclusão
   deleteModalConfirm.setAttribute('data-id', userId);
   
   // Exibe o modal de confirmação
   document.getElementById('delete-confirm-modal').style.display = 'block';
   
   // Adiciona event listener para o botão de confirmar exclusão
   deleteModalConfirm.addEventListener('click', function() {
       deleteUser(this.getAttribute('data-id'));
       document.getElementById('delete-confirm-modal').style.display = 'none';
   });
}

// Função para salvar usuário
function saveUser() {
   // Validação básica
   const userName = document.getElementById('user-name').value;
   const userEmail = document.getElementById('user-email').value;
   const userDepartment = document.getElementById('user-department').value;
   const userRole = document.getElementById('user-role').value;
   
   if (!userName || !userEmail || !userDepartment || !userRole) {
       showAlert('Por favor, preencha todos os campos obrigatórios.', 'danger');
       return;
   }
   
   // Em um sistema real, os dados seriam enviados para o servidor
   document.getElementById('user-modal').style.display = 'none';
   
   const userId = document.getElementById('user-id').value;
   const isNewUser = !userId;
   
   showAlert(isNewUser ? 'Usuário criado com sucesso!' : 'Usuário atualizado com sucesso!', 'success');
}

// Função para excluir usuário
function deleteUser(userId) {
   // Em um sistema real, o usuário seria excluído no servidor
   showAlert('Usuário excluído com sucesso!', 'success');
}

// Função para gerar senha aleatória
function generateRandomPassword(length = 12) {
   const lowercase = 'abcdefghijklmnopqrstuvwxyz';
   const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   const numbers = '0123456789';
   const special = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
   
   const allChars = lowercase + uppercase + numbers + special;
   
   // Garante que pelo menos um caractere de cada tipo esteja presente
   let password = '';
   password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
   password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
   password += numbers.charAt(Math.floor(Math.random() * numbers.length));
   password += special.charAt(Math.floor(Math.random() * special.length));
   
   // Completa o restante da senha
   for (let i = 4; i < length; i++) {
       password += allChars.charAt(Math.floor(Math.random() * allChars.length));
   }
   
   // Embaralha a senha
   password = password.split('').sort(() => 0.5 - Math.random()).join('');
   
   return password;
}