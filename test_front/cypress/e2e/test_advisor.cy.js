describe('Teste Login', () => {
    beforeEach(() => {
        // Adiciona o listener para ignorar exceções não tratadas
        Cypress.on('uncaught:exception', (err, runnable) => {
            // Retorne false para impedir que o Cypress falhe o teste
            return false
        })
    })
    it('Vendo se logou como Orientador', () => {
        login()
        cy.get('.grid > :nth-child(1) > .flex > .text-2xl').should('contains.text', 'Informações da FETIN')
    })
    it('Checando a informação da Fase Atual', () => {
        login()
        cy.get(':nth-child(1) > p').should('contains.text', 'Entrega 80% do projeto')
    })
    it('Checando os prazos', () => {
        login()
        cy.get('.pt-0 > :nth-child(2) > div > :nth-child(1)').should('contains.text', 'Fase 1: June 30, 2024')
    })
    it('Checando os prazos', () => {
        login()
        cy.get('.pt-0 > :nth-child(2) > div > :nth-child(2)').should('contains.text', 'Fase 2: July 30, 2024')
    })
    it('Checando as entregas', () => {
        login()
        cy.get('ul > :nth-child(1)').should('contains.text', 'Documentação do projeto')
    })
    it('Checando as entregas', () => {
        login()
        cy.get('ul > :nth-child(2)').should('contains.text', 'Apresentação para o orientador')
    })

    
  })
  
function login(){
    cy.viewport(1280,720)
    cy.visit('http://localhost:5173/')
    cy.get('#radix-\\:r8\\: button').click()
    cy.contains('Tema').should('be.visible').click()
    cy.contains('Dark').click()
    cy.reload()
    cy.get('#radix-\\:rb\\:-trigger-advisor').should('be.visible').click()
    cy.get('.font-semibold').should('contains.text', 'Orientador')
    cy.get('#admin-username').type('advivi@inatel.br')
    cy.get('#admin-password').type('127450')
    cy.get('.flex.items-center > .inline-flex').click()
}