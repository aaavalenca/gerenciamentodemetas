Feature: As a professor
         I want to remove students
         So that I can correct mistaken registers

Scenario: Removing student with registered CPF
Given I am at the students page
Given I can see a student with CPF "552" in the list of students
When I try to remove the student with CPF "552"
Then I cant see student with CPF "552" in the list