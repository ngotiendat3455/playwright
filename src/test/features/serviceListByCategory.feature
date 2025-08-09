Feature: Service List by Category

Background: 
    Given User navigates to the home page of application

Scenario: View Subcategory in a Valid Category 
    When Locate the category menu or dropdown and Select a valid category as "Graphics & Design"
    Then Display a list of available subcategories

Scenario: View Services in a Valid Category
    When Locate the category menu or dropdown and Hover a valid category as "Graphics & Design" and Select a type service as "App Design"
    Then The system displays a list of services in the "Graphics & Design" category

Scenario: View Services in Category with No Services
    When Hover a valid category as "Testing" and Select a sub category with no services as "Web & App Design"
    Then The system displays a message like "0 services available"

Scenario: View Services with Multiple Filters 
    When User hover the "Graphic Design" category And Select "Logo Design"
    Then Service list should display services as "Logo Design"
    And User applies the category filter as "Category" and click option as "Data Entry"
    Then Service list should display services as "Data Entry"

Scenario: Pagination in Category List 
    When User selects the category "Graphic Design" and Select a type service as "App Design"
    When User navigates to the second page 
    Then Service list should display the next set of services as "App Design"

# Scenario: Category List Responsiveness When User selects the category "Graphic Design" on a desktop And User applies the category filter Then Service list should display correctly on desktop When User selects the category "Graphic Design" on a mobile And User applies the category filter Then Service list should display correctly on mobile