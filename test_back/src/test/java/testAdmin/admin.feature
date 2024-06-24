Feature: Testando Admin


Background:
    * def url_origin = "http://localhost:8080"
    * def adminRead = 
        """
        {name: "admin1", email: "admin1@inatel.br", password: "admin",
        registration: 1, role: "ADMIN", "photoUrl":null}   
        """
    * def adminUpdate = 
        """
        {name: "admin2", email: "admin2@inatel.br", password: "admin",
        registration: 2, role: "ADMIN", "photoUrl":null}   
        """
    * def adminDelete = 
        """
        {name: "admin3", email: "admin3@inatel.br", password: "admin",
        registration: 3, role: "ADMIN", "photoUrl":null}   
        """

@create
Scenario: Testando Criar um admin valido
    Given url url_origin + '/user'
    And request adminRead
    When method post
    Then status 200
    And match response == { id: '#notnull', name: "admin1", email: "admin1@inatel.br", password: "admin",registration: 1, role: "ADMIN", "photoUrl":null }
    
@create
Scenario: Criando outros admin para Testes
    Given url url_origin + '/user'
    And request adminUpdate
    When method post
    Then status 200
    And match response == { id: '#notnull', name: "admin2", email: "admin2@inatel.br", password: "admin",registration: 2, role: "ADMIN", "photoUrl":null }
    Given url url_origin + '/user'
    And request adminDelete
    When method post
    Then status 200
    And match response == { id: '#notnull', name: "admin3", email: "admin3@inatel.br", password: "admin",registration: 3, role: "ADMIN", "photoUrl":null }

@read
Scenario: Testando Ler um admin
    Given url url_origin + '/user'
    And request adminRead
    When method get
    Then status 200
    And match response[0] == { id: '#notnull', name: "admin1", email: "admin1@inatel.br", password: "admin",registration: 1, role: "ADMIN", "photoUrl":null }

@update
Scenario: Atualizar um nome e senha
    Given url url_origin + '/user'
    And request adminUpdate
    When method get
    And match response[1] == { id: '#notnull', name: "admin2", email: "admin2@inatel.br", password: "admin",registration: 2, role: "ADMIN", "photoUrl":null }
    Given url url_origin + '/user/' + response[1].id
    And request {name: "novo_admin", email: "novo_admin@inatel.br", password: "admin", registration: 2, role: "ADMIN", "photoUrl":null}
    When method put
    Then status 200
    And match response == {id: '#notnull', name: "novo_admin", email: "novo_admin@inatel.br", password: "admin", registration: 2, role: "ADMIN", "photoUrl":null}

@delete
Scenario: Testando Deletar um admin
    Given url url_origin + '/user'
    And request adminDelete
    When method get
    And match response[1] == { id: '#notnull', name: "admin3", email: "admin3@inatel.br", password: "admin",registration: 3, role: "ADMIN", "photoUrl":null }
    Given url url_origin + '/user/' + response[1].id
    * def aux = response[1].id
    When method delete
    Then status 204
    Given url url_origin + '/user/' + aux
    When method get
    Then status 404
