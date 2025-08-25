Feature: View Registered Services (Gigs) Functionality

  Background:
    Given User navigates to the application profile
    And User is logged in as "datngotien345@gmail.com" to check
    And User navigates to the profile page next

  Scenario: Verify No Active Gigs Message
    When There are no active gigs
    Then Message "It seems that you don't have any active Gigs." is displayed
    And "Create a new Gig" button is present

  Scenario: Verify Gig Display When Present
    When There is at least one gig
    Then Gig image is displayed
    And Gig title "I will write simple and interesting content for your website" is displayed
    And Gig description shows "500 word article" with price "US$30" and details
    And Rating shows 5 stars with "( 228 )" reviews
    And Price is "$30"

  Scenario: Verify View Detail Button
    When User clicks the "View detail" button for a gig
    Then User is redirected to the gig detail page "/jobDetail/9"

  Scenario: Verify Delete Button
    When User clicks the "DEL" button for a gig
    Then Confirmation dialog appears or gig is deleted after confirmation

  Scenario: Verify Create New Gig Button
    When User clicks the "Create a new Gig" button
    Then User is redirected to the create gig page

#   Scenario: Verify Multiple Gigs Display
#     When There are multiple gigs
#     Then All gigs are listed with their respective images, titles, descriptions, ratings, and prices

  Scenario: Verify Responsiveness on Desktop and Mobile
    When User views registered services on desktop
    Then All elements are displayed correctly on desktop
    When User views registered services on mobile
    Then All elements are displayed correctly on mobile