Feature: Search Service Functionality

Background: Given User navigates to the application

Scenario: Search with Valid Keyword When User enters the search keyword as "logo design" And User clicks the search button Then Search results should display services containing "logo design"

Scenario: Search with Empty Keyword When User enters the search keyword as "" And User clicks the search button Then Search should show an error message or all services

Scenario: Search with Invalid Keyword When User enters the search keyword as "xyzabc123" And User clicks the search button Then Search should show a "No results found" message

Scenario: Search with Partial Keyword When User enters the search keyword as "web" And User clicks the search button Then Search results should display services containing "web"

Scenario: Filter Services by Category When User selects the category "Graphic Design" And User applies the category filter Then Search results should display services in "Graphic Design"

Scenario: Combine Keyword Search and Category Filter When User selects the category "Programming" And User enters the search keyword as "Python" And User clicks the search button Then Search results should display services in "Programming" containing "Python"

Scenario: Search with Special Characters When User enters the search keyword as "@#$%" And User clicks the search button Then Search should show a "No results found" or error message

Scenario: Search Performance with Large Dataset When User enters the search keyword as "design" And User clicks the search button Then Search results should load within 3 seconds And Pagination should be available if results exceed page limit

Scenario: Case Sensitivity in Search When User enters the search keyword as "logo design" And User clicks the search button And User records the number of search results When User enters the search keyword as "LOGO DESIGN" And User clicks the search button Then Search results should have the same count as previous search

Scenario: Search with Long Keyword When User enters a long search keyword with 100 characters And User clicks the search button Then Search should show a "Keyword too long" or "No results found" message