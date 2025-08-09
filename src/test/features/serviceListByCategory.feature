Feature: Service List by Category

Background: Given User navigates to the application

Scenario: View Services in a Valid Category 
    When User selects the category "Graphic Design" And User applies the category filter 
    Then Display a list of available subcategories in "Graphic Design"

Scenario: View Services in Category with No Services 
    When User hovers the category "Testing" And Select a service type with no services
    Then Service list should show a "0 services available" message

Scenario: View Services with Multiple Filters 
    When User hover the "Graphic Design" category 
    And Select "Logo Design" 
    And User applies the category filter
    Then Service list should display services in ""Graphic Design"

Scenario: Pagination in Category List 
    When User selects the category "Graphic Design" 
    And User applies the category filter And Service list has more than 10 services 
    When User navigates to the second page 
    Then Service list should display the next set of services

# Scenario: Category List Responsiveness When User selects the category "Graphic Design" on a desktop And User applies the category filter Then Service list should display correctly on desktop When User selects the category "Graphic Design" on a mobile And User applies the category filter Then Service list should display correctly on mobile