Feature: User Authentication tests

  Background:
    Given User navigates to the application
    And User click on the login link

  Scenario: Login should be success
    And User enter the username as "datngotien345@gmail.com"
    And User enter the password as "123456"
    When User click on the login button
    Then Login should be success as "datngotien345@gmail.com"

  Scenario: Login should not be success
    Given User enter the username as "koushik@gmail.com"
    Given User enter the password as "Passkoushik"
    When User click on the login button
    But Login should fail