Feature: Profile Page Functionality

  Background:
    Given User navigates to the application to test profile
    And User is logged in as "datngotien345@gmail.com"

  Scenario: Verify User Information Display
    When User navigates to the profile page
    Then User online status is displayed as "Online"
    And User avatar is displayed with text "DAT NGO"
    And Email is displayed as "datngotien345@gmail.com"

  Scenario: Verify Description Section
    When User navigates to the profile page
    Then Description section shows Name "DAT NGO", Phone "0946464198", Birthday "2025-08-08"
    And Edit button is present in Description section

  Scenario: Verify Languages Section
    When User navigates to the profile page
    Then Languages section shows "English - Basic" and "Vietnamese (Tiếng Việt) - Native/Bilingual"

  Scenario: Verify Skills Section
    When User navigates to the profile page
    Then Skills section is empty
    And Edit button is present in Skills section

  Scenario: Verify Education Section
    When User navigates to the profile page
    Then Education section shows "CYBERSOFT"
    And Edit button is present in Education section

  Scenario: Verify Certification Section
    When User navigates to the profile page
    Then Certification section is empty
    And Edit button is present in Certification section

  Scenario: Verify Linked Accounts Section
    When User navigates to the profile page
    Then Linked Accounts include "Facebook", "Google", "Github", "Twitter", "Dirbble", "Stack Overflow" with connect buttons

  Scenario: Verify Gigs Section
    When User navigates to the profile page
    Then Gigs section shows message "It seems that you don't have any active Gigs."
    And "Create a new Gig" button is present in profile

  Scenario: Verify Logout Functionality
    When User navigates to the profile page
    And User clicks the dropdown menu
    Then Logout button is displayed
    When User clicks Logout
    Then User is logged out and redirected to login page

  Scenario: Verify Edit Profile Elements
    When User navigates to the profile page
    Then Edit buttons are present for Description, Skills, Education, Certification
    And Camera icon for uploading avatar is present

  Scenario: Verify Responsiveness on Desktop and Mobile
    When User views profile on desktop
    Then All sections are displayed correctly on desktop
    When User views profile on mobile
    Then All sections are displayed correctly on mobile