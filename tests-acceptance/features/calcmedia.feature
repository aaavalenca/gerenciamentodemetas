Feature: As a professor
         I want to calculate the students grades
         So that I can know which ones have been approved

Scenario: Calculating grades from students with all goals evaluated
Given I am at the metas page
And I can see a student with CPF "093" in the goals table
When I fill EE1 with "MA", EE2 with "MPA", EE3 with "MPA", EE4 with "MA" and EE5 with "MA" for the student with CPF "093"
And I try to calculate the average grade from the students
Then I can see the average grade of the student with CPF "093"

Scenario: Calculating grades from students with missing goals evaluated
Given I am at the metas page
And I can see a student with CPF "302" in the goals table
When I incompletely fill EE1 with "MA", EE2 with "MPA", EE3 with "MPA" and EE5 with "MA" for the student with CPF "302"
And I try to calculate the average grade from the students
Then I cannot see the average grade of the student with CPF "302"

Scenario: Calculating grades from students with misspelled goals evaluated
Given I am at the metas page
And I can see a student with CPF "114" in the goals table
When I fill EE1 with "ma", EE2 with "MPa", EE3 with "MPA", EE4 with "mA" and EE5 with "MaNa" for the student with CPF "114"
And I try to calculate the average grade from the students
Then I cannot see the average grade of the student with CPF "114"

#Service

Scenario: Calculating grades from students with all goals evaluated, service
Given The system has already a student with CPF "093", email "aaav@cin" and grades EE1 with "MA", EE2 with "MPA", EE3 with "MPA", EE4 with "MA" and EE5 with "MA"
Then The system has the average grade of the student with CPF "093" and grades EE1 with "MA", EE2 with "MPA", EE3 with "MPA", EE4 with "MA" and EE5 with "MA"

Scenario: Calculating grades from students with goals not evaluated, service
Given The system has already a student with CPF "114", email "l.de@hot" and grades EE1 with "ma", EE2 with "MPa", EE3 with "MPA", EE4 with "mA" and EE5 with "MaNa"
Then The system doesnt have the average grade of the student with CPF "114" and grades EE1 with "ma", EE2 with "MPa", EE3 with "MPA", EE4 with "mA" and EE5 with "MaNa"