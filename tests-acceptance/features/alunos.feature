Feature: As a professor
    I wanto to register students
    So that I can manage their learning goals

Scenario: Registering students with spreadsheet
Given I am at the students page
And I cannot see a student with CPF "093" in the students list
When I upload a spreadsheet containing my students
Then I can see a student with CPF "093" in the students list