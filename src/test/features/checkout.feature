# Feature: Checkout Service Registration Functionality

#   Background:
#     Given User navigates to the service detail page
#     And User clicks on the order button to open checkout modal

#   Scenario: Verify Basic Package Display
#     When User selects the "Basic" tab
#     Then Package title is "Basic" with price "US$30"
#     And Description shows "500 word article" with details "This order includes a 500 word article based on your chosen topic."
#     And Delivery time is "14 Days Delivery"
#     And Revisions are "Unlimited Revisions"
#     And Features list includes "Good fearture" three times

#   Scenario: Verify Standard Package Display
#     When User selects the "Standard" tab
#     Then Package title is "Standard" with price "US$30"
#     And Description shows "500 word article" with details "This order includes a 500 word article based on your chosen topic."
#     And Delivery time is "14 Days Delivery"
#     And Revisions are "Unlimited Revisions"
#     And Features list includes "Good fearture" three times

#   Scenario: Verify Premium Package Display
#     When User selects the "Premium" tab
#     Then Package title is "Premium" with price "US$30"
#     And Description shows "500 word article" with details "This order includes a 500 word article based on your chosen topic."
#     And Delivery time is "14 Days Delivery"
#     And Revisions are "Unlimited Revisions"
#     And Features list includes "Good fearture" three times

#   Scenario: Verify Switching Between Packages
#     When User selects the "Basic" tab
#     Then "Basic" package details are displayed
#     When User selects the "Standard" tab
#     Then "Standard" package details are displayed
#     When User selects the "Premium" tab
#     Then "Premium" package details are displayed

#   Scenario: Verify Continue Button Functionality
#     When User selects the "Basic" tab
#     Then Continue button shows "Continue (US$30)"
#     When User clicks the Continue button
#     Then User is redirected to payment page or order confirmation

#   Scenario: Verify Compare Packages Link
#     When User clicks the Compare Packages link
#     Then Comparison table or modal is displayed showing Basic, Standard, Premium differences

#   Scenario: Verify Form Submission
#     When User selects the "Basic" tab
#     And User clicks the Continue button
#     Then Form is submitted with selected package "Basic" and price "US$30"

#   Scenario: Verify Responsiveness on Desktop and Mobile
#     When User views checkout on desktop
#     Then All tabs and details are displayed correctly on desktop
#     When User views checkout on mobile
#     Then All tabs and details are displayed correctly on mobile