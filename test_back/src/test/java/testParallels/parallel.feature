Feature: Testando Projetos


Background:
    * def url_origin = "http://localhost:8080"
    * def eventRead = {"name": "Workshop de Comunicação", "description": "descrição1"}
    * def eventUpdate = {"name": "Voce na Industria", "description": "descrição2"} 

@create
Scenario: Criando outro projeto para Testes
    Given url url_origin + '/login'
    And request { "email": "aqqdmin@inatel.br","password": "127450" } 
    When method post
    Then status 200
    * def token = response.token
    Given url url_origin + '/parallel'
    * header Authorization = 'Bearer ' + token
    And request eventRead
    When method post
    Then status 200
    And match response == { "id": '#notnull', "name": "Workshop de Comunicação", "description": "descrição1" }

@create
Scenario: Criando outro projeto para Testes
    Given url url_origin + '/login'
    And request { "email": "aqqdmin@inatel.br","password": "127450" } 
    When method post
    Then status 200
    * def token = response.token
    Given url url_origin + '/parallel'
    * header Authorization = 'Bearer ' + token
    And request eventUpdate
    When method post
    Then status 200
    And match response == { "id": '#notnull', "name": "Voce na Industria", "description": "descrição2" }

@read
Scenario: Testando Ler um projeto
    Given url url_origin + '/login'
        And request { "email": "aqqdmin@inatel.br","password": "127450" } 
        When method post
        Then status 200
        * def token = response.token
        Given url url_origin + '/parallel'
        * header Authorization = 'Bearer ' + token
        And request eventRead
        When method get
        Then status 200
        And def event = karate.filter(response.content, function(x){ return x.name == 'Workshop de Comunicação'})[0]
        And match event == { "id": '#notnull', "name": "Workshop de Comunicação", "description": "descrição1" }
        Given url url_origin + '/parallel/' + event.id 
        * header Authorization = 'Bearer ' + token
        When method get
        Then status 200

@read
Scenario: Testando Ler um projeto inexistente
    Given url url_origin + '/login'
    And request { "email": "aqqdmin@inatel.br","password": "127450" } 
    When method post
    Then status 200
    * def token = response.token
    Given url url_origin + '/parallel/10000'
    * header Authorization = 'Bearer ' + token
    When method get
    Then status 404

@update
Scenario: Atualizando um projeto
    Given url url_origin + '/login'
    And request { "email": "aqqdmin@inatel.br","password": "127450" } 
    When method post
    Then status 200
    * def token = response.token
    Given url url_origin + '/parallel'
    * header Authorization = 'Bearer ' + token
    And request eventUpdate
    When method get
    Then status 200
    And def event = karate.filter(response.content, function(x){ return x.name == 'Voce na Industria'})[0]
    And match event == { "id": '#notnull', "name": "Voce na Industria", "description": "descrição2" }
    Given url url_origin + '/parallel/' + event.id 
    * header Authorization = 'Bearer ' + token
    And request {name: "Arenas Tecnologicas", description: "descrição_nova"}
    When method put
    Then status 200
    And match response == { id: '#notnull', name: "Arenas Tecnologicas", description: "descrição_nova" }
@delete
Scenario: Deletando um projeto
    Given url url_origin + '/login'
    And request { "email": "aqqdmin@inatel.br","password": "127450" } 
    When method post
    Then status 200
    * def token = response.token
    Given url url_origin + '/parallel'
    * header Authorization = 'Bearer ' + token
    And request eventRead
    When method get
    Then status 200
    And def event = karate.filter(response.content, function(x){ return x.name == 'Workshop de Comunicação'})[0]
    And match event == { "id": '#notnull', "name": "Workshop de Comunicação", "description": "descrição1" }
    Given url url_origin + '/parallel/' + event.id 
    * header Authorization = 'Bearer ' + token
    When method delete
    Then status 204
    Given url url_origin + '/parallel/' + event.id
    * header Authorization = 'Bearer ' + token
    When method get
    Then status 404