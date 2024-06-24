Feature: Testando Parallels


Background:
    * def url_origin = "http://localhost:8080"
    * def eventRead = {name: "Workshop Comunicação", description: "descrição1"}
    * def eventUpdate = {name: "Arenas Tecnologicas", description: "descrição2"} 
    * def eventDelete = {name: "Voce na Industria", description: "descrição3"}

@create
Scenario: Testando Criar um evento valido
    Given url url_origin + '/parallels'
    And request eventRead
    When method post
    Then status 201
    And match response == { id: '#notnull', name: "Workshop Comunicação", description: "descrição1" }

@create
Scenario: Criando outros eventos para Testes
    Given url url_origin + '/parallels'
    And request eventUpdate
    When method post
    Then status 201
    And match response == { id: '#notnull', name: "Arenas Tecnologicas", description: "descrição2" }
    Given url url_origin + '/parallels'
    And request eventDelete
    When method post
    Then status 201
    And match response == { id: '#notnull', name: "Voce na Industria", description: "descrição3" }

@read
Scenario: Testando Ler um evento
    Given url url_origin + '/parallels'
    And request eventRead
    When method get
    Then status 200
    And match response[0] == { id: '#notnull', name: "Workshop Comunicação", description: "descrição1" }

@read
Scenario: Testando Ler um evento inexistente
    Given url url_origin + '/parallels/10000'
    When method get
    Then status 404

@update
Scenario: Atualizando um evento
    Given url url_origin + '/parallels'
    And request eventUpdate
    When method get
    And match response[1] == { id: '#notnull', name: "Arenas Tecnologicas", description: "descrição2" }
    Given url url_origin + '/parallels/' + response[1].id
    And request {name: "novo_evento", description: "descrição_nova"}
    When method put
    Then status 200
    And match response == { id: '#notnull', name: "novo_evento", description: "descrição_nova" }

@delete
Scenario: Deletando um evento
    Given url url_origin + '/parallels'
    And request eventDelete
    When method get
    And match response[1] == {id: '#notnull', name: "Voce na Industria", description: "descrição3"}
    Given url url_origin + '/parallels/' + response[1].id
    * def aux = response[1].id
    When method delete
    Then status 200
    Given url url_origin + '/parallels/' + aux
    When method get
    Then status 404
