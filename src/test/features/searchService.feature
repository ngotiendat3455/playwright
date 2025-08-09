Feature: Search Service Functionality

Background:
    Given User navigates to the home page

Scenario: Search with Valid Keyword
    When User enters the search keyword as "logo design" And User clicks the search button
    Then Search results should display services containing "logo design"

Scenario: Search with Empty Keyword
    When User enters the search keyword as "" And User clicks the search button
    Then Search should show an error message or all services

Scenario: Search with Invalid Keyword
    When User enters the search keyword as "xyzabc123" And User clicks the search button
    Then Search should show a "0 services available" message

Scenario: Search with Partial Keyword
    When User enters the search keyword as "design" And User clicks the search button
    Then Search results should display services containing "design"

Scenario: Search with Special Characters
    When User enters the search keyword as "@#$%" And User clicks the search button
    Then Search should show a "0 services available" message

Scenario: Search with Long Keyword
    When User enters a long search keyword with 100 characters And User clicks the search button
    Then Search should show a "0 services available" message