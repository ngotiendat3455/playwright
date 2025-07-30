Feature: Search Service Functionality

Background: Given User navigates to the application

Scenario: Search with Valid Keyword
    When User enter the search keyword as "logo design" And User click the search button
    Then Search results should display services containing "logo design"

Scenario: Search with Empty Keyword 
    When User enters the search keyword as "" And User clicks the search button 
    Then Search should show an error message or all services

Scenario: Search with Invalid Keyword 
    When User enters the search keyword as "xyzabc123" And User clicks the search button 
    Then Search should show a "0 services available" message

Scenario: Search with Partial Keyword 
    When User enters the search keyword as "design" And User clicks the search button 
    Then Search results should display services containing as "design"

# Scenario: Filter Services by Category When User selects the category "Graphic Design" And User applies the category filter Then Search results should display services in "Graphic Design"

# Scenario: Combine Keyword Search and Category Filter When User selects the category "Programming" And User enters the search keyword as "Python" And User clicks the search button Then Search results should display services in "Programming" containing "Python"

Scenario: Search with Special Characters 
    When User enters the search keyword as "@#$%" And User clicks the search button 
    Then Search should show a "0 services available" message

Scenario: Search with Long Keyword 
    When User enters a long search keyword with 100 characters And User clicks the search button 
    Then Search should show a "0 services available" message

# Scenario: Case Sensitivity in Search 
#     When User enters the search keyword as "logo design" And User clicks the search button And User records the number of search results 
#     When User enters the search keyword as "LOGO DESIGN" And User clicks the search button 
#     Then Search results should have the same count as previous search