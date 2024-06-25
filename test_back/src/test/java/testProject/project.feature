Feature: Testando Projetos


    Background:
        * def url_origin = "http://localhost:8080"
        * def projectRead = {"name": "Projeto1", "description": "descrição1"}
        * def projectUpdate = {"name": "Projeto2", "description": "descrição2"} 

    @create
    Scenario: Criando outro projeto para Testes
        Given url url_origin + '/login'
        And request { "email": "aqqdmin@inatel.br","password": "127450" } 
        When method post
        Then status 200
        * def token = response.token
        Given url url_origin + '/project'
        * header Authorization = 'Bearer ' + token
        And request projectRead
        When method post
        Then status 201
        And match response == { "id": '#notnull', "name": "Projeto1", "description": "descrição1" }

    @create
    Scenario: Criando outro projeto para Testes
        Given url url_origin + '/login'
        And request { "email": "aqqdmin@inatel.br","password": "127450" } 
        When method post
        Then status 200
        * def token = response.token
        Given url url_origin + '/project'
        * header Authorization = 'Bearer ' + token
        And request projectUpdate
        When method post
        Then status 201
        And match response == { "id": '#notnull', "name": "Projeto2", "description": "descrição2" }

    @read
    Scenario: Testando Ler um projeto
        Given url url_origin + '/login'
            And request { "email": "aqqdmin@inatel.br","password": "127450" } 
            When method post
            Then status 200
            * def token = response.token
            Given url url_origin + '/project'
            * header Authorization = 'Bearer ' + token
            And request projectRead
            When method get
            Then status 200
            And def project = karate.filter(response.content, function(x){ return x.name == 'Projeto1'})[0]
            And match project == { "id": '#notnull', "name": "Projeto1", "description": "descrição1" }
            Given url url_origin + '/project/' + project.id 
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
        Given url url_origin + '/project/10000'
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
        Given url url_origin + '/project'
        * header Authorization = 'Bearer ' + token
        And request projectUpdate
        When method get
        Then status 200
        And def project = karate.filter(response.content, function(x){ return x.name == 'Projeto2'})[0]
        And match project == { "id": '#notnull', "name": "Projeto2", "description": "descrição2" }
        Given url url_origin + '/project/' + project.id 
        * header Authorization = 'Bearer ' + token
        And request {name: "novo_projeto", description: "descrição_nova"}
        When method put
        Then status 200
        And match response == { id: '#notnull', name: "novo_projeto", description: "descrição_nova" }
    @delete
    Scenario: Deletando um projeto
        Given url url_origin + '/login'
        And request { "email": "aqqdmin@inatel.br","password": "127450" } 
        When method post
        Then status 200
        * def token = response.token
        Given url url_origin + '/project'
        * header Authorization = 'Bearer ' + token
        And request projectRead
        When method get
        Then status 200
        And def project = karate.filter(response.content, function(x){ return x.name == 'Projeto1'})[0]
        And match project == { "id": '#notnull', "name": "Projeto1", "description": "descrição1" }
        Given url url_origin + '/project/' + project.id 
        * header Authorization = 'Bearer ' + token
        When method delete
        Then status 204
        Given url url_origin + '/project/' + project.id
        * header Authorization = 'Bearer ' + token
        When method get
        Then status 404