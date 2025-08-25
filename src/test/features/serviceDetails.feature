Feature: Service Details Functionality

  Background:
    Given I open the service details page at "https://demo5.cybersoft.edu.vn/jobDetail/9"

  # View details
  Scenario: View Details of a Valid Service
    Then the service details should show title, description, price and delivery time

  # Multiple packages
  Scenario: View Service with Multiple Packages
    Then I should see three packages tabs: "Basic", "Standard", "Premium"
    And each package tab should show name, price and description

  # Invalid / Not found
  Scenario: View Invalid or Non-Existent Service
    Given I open the service details page at "https://demo5.cybersoft.edu.vn/jobDetail/999999"
    Then I should see a Service not found message
