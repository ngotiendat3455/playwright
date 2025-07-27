Feature: Service List by Category

Background: Given User navigates to the application

Scenario: View Services in a Valid Category When User selects the category "Graphic Design" And User applies the category filter Then Service list should display services in "Graphic Design"

Scenario: View Services in Category with No Services When User selects the category "Voice Over" And User applies the category filter Then Service list should show a "No services found" message

Scenario: View Services with Multiple Categories When User selects the category "Programming" And User applies the category filter And User records the number of services When User selects the category "Writing" And User applies the category filter Then Service list should display services in "Writing" And Service list should not include services from "Programming"

Scenario: Pagination in Category List When User selects the category "Graphic Design" And User applies the category filter And Service list has more than 10 services When User navigates to the second page Then Service list should display the next set of services

Scenario: Category List Responsiveness When User selects the category "Graphic Design" on a desktop And User applies the category filter Then Service list should display correctly on desktop When User selects the category "Graphic Design" on a mobile And User applies the category filter Then Service list should display correctly on mobile