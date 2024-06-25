Feature: Testando Admin

Background:
    * def url_origin = "http://localhost:8080"
    * def user_1 = 
    """
        { "id": "#notnull", "name": "Guilherme Grubba 7", "email": "guirgr2b46a@inatel.br", "password": "127450",
            "registration": 445676, "role": "STUDENT", "photoUrl": null,"course": null }
    """
    * def user_2 = 
      """
          { "id": "#notnull", "name": "Guilherme Grubba 7", "email": "guirgr2b46ja@inatel.br", "password": "127450",
              "registration": 445676, "role": "STUDENT", "photoUrl": null, "course": null }
      """
    * def user_3 = 
      """
          { "id": "#notnull", "name": "Guilherme Grubba 7", "email": "guirgr2b246a@inatel.br","password": "127450",
            "registration": 445676, "role": "STUDENT", "photoUrl": null, "course": null }
      """
    * def project_ =  { id: '#notnull', name: "novo_projeto", description: "descrição_nova" }
    
  @create
  Scenario: Testando criar um time
    Given url url_origin + '/login'
    And request { "email": "aqqdmin@inatel.br","password": "127450" } 
    When method post
    Then status 200
    * def token = response.token
    Given url url_origin + '/user/admin'
    * header Authorization = 'Bearer ' + token
    And request user_1
    When method get
    Then status 200
    And def user1 = karate.filter(response, function(x){ return x.email == 'guirgr2b46a@inatel.br'})[0]
    And def user2= karate.filter(response, function(x){ return x.email == 'guirgr2b46ja@inatel.br'})[0]
    And def user3 = karate.filter(response, function(x){ return x.email == 'guirgr2b246a@inatel.br'})[0]

    Given url url_origin + '/user/admin'
    * header Authorization = 'Bearer ' + token
    And request user_2
    When method get
    Then status 200

    Given url url_origin + '/user/admin'
    * header Authorization = 'Bearer ' + token
    And request user_3
    When method get
    Then status 200
    Given url url_origin + '/project'
    * header Authorization = 'Bearer ' + token

    And request project_
    When method get
    Then status 200
    And def project = karate.filter(response, function(x){ return x.name == 'novo_projeto'})[0]
    When method post
    Then status 200
    * def token = response.token
    Given url url_origin + '/team'
    * header Authorization = 'Bearer ' + token
    And request {"name": "team 1","status": "Classificado", "disqualifiedPhase": null, "projectId": project.id, "usersIds":[user1.id, user2.id, user3.id]}
    When method post
    Then status 200

@update
Scenario: Testando atualizar o nome de um time
    Given url url_origin + '/login'
    And request { "email": "aqqdmin@inatel.br","password": "127450" } 
    When method post
    Then status 200
    * def token = response.token
    Given url url_origin + '/team'
    * header Authorization = 'Bearer ' + token
    And request team1
    When method get
    Then status 200
    And def team = karate.filter(response, function(x){ return x.name == 'team 1' })[0]
    Given url url_origin + '/team/' + team.id
    * header Authorization = 'Bearer ' + token
    And request
    """
      {
        "project": { "id": "#notnull", "name": "Projeto2", "description": "Descrição2" },
        "users": [
          { "id": "#notnull", "name": "Guilherme Grubba 7", "email": "guirgr2b46ja@inatel.br", "password": "127450",
            "registration": 445676, "role": "STUDENT", "photoUrl": null, "course": null },
          { "id": "#notnull", "name": "Guilherme Grubba 7", "email": "guirgr2b46a@inatel.br", "password": "127450",
            "registration": 445676, "role": "STUDENT", "photoUrl": null,"course": null },
          {"id": "#notnull", "name": "Guilherme Grubba 7", "email": "guirgr2b246a@inatel.br","password": "127450",
            "registration": 445676, "role": "STUDENT", "photoUrl": null, "course": null}
        ],
        "name": "team_novo",
        "status": "Classificado",
        "disqualifiedPhase": null
      }
    """
    When method put
    Then status 200

@read
Scenario: Testando ler um time
    Given url url_origin + '/login'
    And request { "email": "aqqdmin@inatel.br","password": "127450" } 
    When method post
    Then status 200
    * def token = response.token
    Given url url_origin + '/team'
    * header Authorization = 'Bearer ' + token
    And request team1
    When method get
    Then status 200
    And def team = karate.filter(response, function(x){ return x.name == 'team_novo' })[0]
    Given url url_origin + '/team/' + team.id 
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
    Given url url_origin + '/team'
    * header Authorization = 'Bearer ' + token
    And request team1
    When method get
    * print response
    * print response.id 
    Then status 200
    And def team = karate.filter(response, function(x){ return x.name == 'team_novo' })[0]
    Given url url_origin + '/team/' + team.id
    * header Authorization = 'Bearer ' + token
    When method delete
    Then status 204
    Given url url_origin + '/team/' + team.id
    * header Authorization = 'Bearer ' + token
    When method get
    Then status 404