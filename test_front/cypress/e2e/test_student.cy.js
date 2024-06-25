describe('Teste Login', () => {
    beforeEach(() => {
        // Adiciona o listener para ignorar exceções não tratadas
        Cypress.on('uncaught:exception', (err, runnable) => {
            // Retorne false para impedir que o Cypress falhe o teste
            return false
        })
    })
    it('', () => {
        login()
        cy.get('.w-full > :nth-child(1) > .grid > :nth-child(1) > :nth-child(2)').should('contains.text', '123456')
    })
    it('', () => {
        login()
        cy.get('.w-full > :nth-child(1) > .grid > :nth-child(2) > :nth-child(2)').should('contains.text', 'Acme Project')
    })
    it('', () => {
        login()
        cy.get(':nth-child(1) > .grid > :nth-child(3) > :nth-child(2)').should('contains.text', 'John Doe, Jane Smith, Bob Johnson')
    })
    it('', () => {
        login()
        cy.get(':nth-child(1) > .grid > :nth-child(4) > :nth-child(2)').should('contains.text', 'Dr. Alice Williams')
    })
    it('', () => {
        login()
        cy.get(':nth-child(5) > .rounded-full').should('contains.text', 'Active')
    })
    it('', () => {
        login()
        cy.get(':nth-child(2) > .grid > :nth-child(1) > :nth-child(2)').should('contains.text', 'Design')
    })
    it('', () => {
        login()
        cy.get(':nth-child(2) > .grid > :nth-child(2) > :nth-child(2)').should('contains.text', 'June 30, 2023')
    })
    it('', () => {
        login()
        cy.get(':nth-child(2) > .grid > :nth-child(3) > :nth-child(2)').should('contains.text', 'Wireframes, Mockups, Prototypes')
    })
    it('', () => {
        login()
        cy.get('.ml-2').should('contains.text', '60%')
    })
    
  })
  
function login(){
    cy.viewport(1280,720)
    cy.visit('http://localhost:5173/')
    cy.get('#radix-\\:r8\\: button').click()
    cy.contains('Tema').should('be.visible').click()
    cy.contains('Dark').click()
    cy.reload()
    cy.get('#radix-\\:rb\\:-trigger-student').should('be.visible').click()
    cy.get('.font-semibold').should('contains.text', 'Estudante')
    cy.get('#admin-username').type('student@inatel.br')
    cy.get('#admin-password').type('127450')
    cy.get('.flex.items-center > .inline-flex').click()
}