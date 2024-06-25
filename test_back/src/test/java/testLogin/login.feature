Feature: Testando Login

    Background:
        * def url_origin = "http://localhost:8080"

    Scenario: Testando Fazer login com um usuario valido
    Given url url_origin + '/login'
    And request { "email": "aqqdmin@inatel.br","password": "127450" } 
    When method post
    Then status 200

    Scenario: Testando Fazer logout
    Given url url_origin + '/login'
    And request { "email": "aqqdmin@inatel.br","password": "127450" } 
    When method post
    Then status 200
    * def token = response.token
    Given url url_origin + '/logout'
    * header Authorization = 'Bearer ' + token
    When method post
    Then status 200
    * def sleep = function(millis){ java.lang.Thread.sleep(millis) }
    * sleep(6000)
    Given url url_origin + '/login'
    And request { "email": "aqqdmin@inatel.br","password": "127450" } 
    When method post
    And match response.token != token
    Then status 200
        
    Scenario: Testando Fazer login com senha errada
        Given url url_origin + '/login'
        And request { "email": "aqqdmin@inatel.br","password": "senha" } 
        When method post
        Then status 403

    Scenario: Testando acessar um Login com email Inválido
        Given url url_origin + '/login'
        And request { "email": "naoexiste@inatel.br","password": "127450" } 
        When method post
        Then status 403

    #Scenario: Testando erro ao mudar o tipo de Login

    

    
