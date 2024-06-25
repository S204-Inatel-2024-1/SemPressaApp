describe('Teste Login', () => {
    beforeEach(() => {
        // Adiciona o listener para ignorar exceções não tratadas
        Cypress.on('uncaught:exception', (err, runnable) => {
            // Retorne false para impedir que o Cypress falhe o teste
            return false
        })
    })

    it('Baixando template', () => {
        login()
        cy.get('.space-x-2 > .bg-background.hover\\:text-app-light-title').click()
    })
    it('Adicionar equipe', () => {
        login()
        cy.get('.text-white').click()
        cy.get('[data-index="0"] > [data-content=""] > div').should('contains.text', 'Carregando Estudantes')
    })
    it('Adicionar equipe, vendo se tem o campo de Nome', () => {
        login()
        cy.get('.text-white').click()
        cy.get(':nth-child(1) > .font-medium').should('contains.text', 'Nome')
    })
    it('Adicionar equipe, vendo se tem o campo de Nome e que consigo digitar embaixo dele', () => {
        login()
        cy.get('.text-white').click()
        cy.get(':nth-child(1) > .font-medium').should('contains.text', 'Nome')
        cy.get(':nth-child(1) > .font-medium')
        .parent()
        .find('input')
        .type('Projeto 123')
    })
    it('Adicionar equipe, vendo se tem o campo de Membros', () => {
        login()
        cy.get('.text-white').click()
        cy.get(':nth-child(3) > .font-medium').should('contains.text', 'Membros')
    })
    it('Adicionar equipe, vendo se tem o campo de Membros e que consigo digitar embaixo dele', () => {
        login()
        cy.get('.text-white').click()
        cy.get(':nth-child(3) > .font-medium').should('contains.text', 'Membros')
        cy.get(':nth-child(3) > .font-medium')
        .parent()
        .find('input')
        .type('Integrante 1')
    })
    it('Adicionar equipe, vendo se consigo escolher algum projeto', () => {
        login()
        cy.get('.text-white').click()
        cy.get('.gap-x-2 > .flex').click()
    })
    it('Adicionar equipe, criando uma sem nenhum dado', () => {
        login()
        cy.get('.text-white').click()
        cy.get('.col-span-2 > :nth-child(2)').click()
        cy.get('#\\:rd\\:-form-item-message').should('contains.text', 'É necessário colocar um nome válido para a equipe')
        cy.get('#\\:rp\\:-form-item-message').should('contains.text', 'É necessário indicar os membros da equipe')
        cy.get('#\\:rf\\:-form-item-message').should('contains.text', 'Selecione o projeto da equipe')
    })

    it('Vendo se tem o campo N°', () => {
        login()
        cy.get('.\\[\\&_tr\\]\\:border-b > .border-b > :nth-child(1)').should('contain', 'N°')
    })
    it('Vendo se tem o campo Nome', () => {
        login()
        cy.get('.border-b > :nth-child(2)').should('contain', 'Nome')
    })
    it('Vendo se tem o campo Integrante 1', () => {
        login()
        cy.get('.border-b > :nth-child(3)').should('contain', 'Integrante 1')
    })
    it('Vendo se tem o campo Integrante 2', () => {
        login()
        cy.get('.border-b > :nth-child(4)').should('contain', 'Integrante 2')
    })
    it('Vendo se tem o campo Integrante 3', () => {
        login()
        cy.get('.border-b > :nth-child(5)').should('contain', 'Integrante 3')
    })
    it('Vendo se tem o campo Integrante 4', () => {
        login()
        cy.get('.border-b > :nth-child(6)').should('contain', 'Integrante 4')
    })
})

function login(){
    cy.viewport(1280, 720)
    cy.visit('http://localhost:5173/')
    cy.get('#radix-\\:r8\\: button').click()
    cy.contains('Tema').should('be.visible').click()
    cy.contains('Dark').click()
    cy.reload()
    cy.get('#radix-\\:rb\\:-trigger-admin').should('be.visible').click()
    cy.get('.font-semibold').should('contains.text', 'Administrador')
    cy.get('#admin-username').type('admin12356789@inatel.br')
    cy.get('#admin-password').type('123456789')
    cy.get('.flex.items-center > .inline-flex').click()
}
