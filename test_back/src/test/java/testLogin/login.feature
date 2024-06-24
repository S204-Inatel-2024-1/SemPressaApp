Feature: Testando Login

    Background:
        * def url_origin = "http://localhost:8000"
        * def admin = 
            """
            {
            "email": "admin@gmail.com",
            "password": "admin"
            }
            """
        * def csrfToken = null

    Scenario: Testando acessar um Login Valido
        Given url url_origin
        When method get
        Then status 200
        #And def csrfToken = responseHeaders['Set-Cookie'][0].split(';')[0].split('=')[1]
        And def csrfCookie = responseCookies['csrftoken'].value
        * print csrfCookie
        # Armazenar o cookie CSRF
        * cookie csrf = csrfCookie
        And path '/auth/login/'
        And request admin
        And header Content-Type = 'application/json'
        And header X-CSRF-Token = csrfCookie
        And cookie csrftoken = csrfCookie
        When method post
        Then status 200
        
        #And match response == { url_confirmacao: 'url_orientador' }
        #And match response == {"token": "#notnull"} #colocar propxima url

    Scenario: Testando acessar um Login com senha Invalida
        Given url url_origin
        And request { login: 'usuario', senha: 'senha'}
        When method post
        #Then status 401  #Nao vai ser 401 tem que testar se vai voltar pra mesma pagina
        
    Scenario: Testando acessar um Login com usuario Inválido
        Given url url_origin
        And request { login: 'usuario', senha: 'senha'}
        When method post
        #Then status 401  #Nao vai ser 401 tem que testar se vai voltar pra mesma pagina

    Scenario: Testando erro ao mudar o tipo de Login

    

    
