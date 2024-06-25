Feature: Testando Admin

    Background:
        * def url_origin = "http://localhost:8080"
        * def admin = 
        """
        {"name": "admin", "email": "admin309@inatel.br", "password": "admin123",
        "registration": 1234567, "role": "ADMIN", "photoUrl":null, "course": null, "teamIds": null}  
        """
        * def csrfToken = null

        
     @read
    Scenario: Testando fazer login como ADMIN e ler todos os usuários
        Given url url_origin + '/login'
        And request { "email": "aqqdmin@inatel.br","password": "127450" } 
        When method post
        Then status 200
        * def token = response.token
        * print token
        Given url url_origin + '/user/admin'
        * header Authorization = 'Bearer ' + token
        When method get
        Then status 200
        
    @create
    Scenario: Testando criar um usuario
        Given url url_origin + '/login'
        And request { "email": "aqqdmin@inatel.br","password": "127450" } 
        When method post
        Then status 200
        * def token = response.token
        Given url url_origin + '/user'
        * header Authorization = 'Bearer ' + token
        And request admin
        When method post
        Then status 200

    @update
    Scenario: Testando atualizar o nome de um usuario
        Given url url_origin + '/login'
        And request { "email": "aqqdmin@inatel.br","password": "127450" } 
        When method post
        Then status 200
        * def token = response.token
        Given url url_origin + '/user/admin'
        * header Authorization = 'Bearer ' + token
        And request admin
        When method get
        Then status 200
        And def user = karate.filter(response, function(x){ return x.email == 'admin309@inatel.br' })[0]
        Given url url_origin + '/user/' + user.id
        * header Authorization = 'Bearer ' + token
        And request
        """ 
            {
            "name": "novo_admin", "email": "admin309@inatel.br", "password": "admin123",
            "registration": 1234567, "role": "ADMIN", "photoUrl":null, "course": null, "teamIds": null
            }
        """
        When method put
        Then status 200

    @read
    Scenario: Testando ler um usuario
        Given url url_origin + '/login'
        And request { "email": "aqqdmin@inatel.br","password": "127450" } 
        When method post
        Then status 200
        * def token = response.token
        Given url url_origin + '/user/admin'
        * header Authorization = 'Bearer ' + token
        And request admin
        When method get
        Then status 200
        And def user = karate.filter(response, function(x){ return x.email == 'admin309@inatel.br' })[0]
        And match user == 
        """ 
        {
        "role":"ADMIN",
        "teams":[],
        "credentialsNonExpired":true,
        "enabled":true,
        "authorities":[{"authority":"ROLE_USER"}],
        "photoUrl":null,"password":"#ignore",
        "name":"novo_admin",
        "course":null,
        "registration":1234567,
        "accountNonExpired":true,
        "id":"#notnull",
        "email":"admin309@inatel.br",
        "username":"admin309@inatel.br",
        "accountNonLocked":true
        }
        """
        Given url url_origin + '/user/' + user.id 
        * header Authorization = 'Bearer ' + token
        When method get
        Then status 200

    @delete
    Scenario: Testando deletar um usuario
        Given url url_origin + '/login'
        And request { "email": "aqqdmin@inatel.br","password": "127450" } 
        When method post
        Then status 200
        * def token = response.token
        Given url url_origin + '/user/admin'
        * header Authorization = 'Bearer ' + token
        And request admin
        When method get
        * print response
        * print response.id 
        Then status 200
        And def user = karate.filter(response, function(x){ return x.email == 'admin309@inatel.br' })[0]
        Given url url_origin + '/user/' + user.id
        * header Authorization = 'Bearer ' + token
        When method delete
        Then status 204
        Given url url_origin + '/user/' + user.id
        * header Authorization = 'Bearer ' + token
        When method get
        Then status 404


    

    
