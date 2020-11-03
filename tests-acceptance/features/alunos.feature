Feature: As a professor
    I wanto to register students
    So that I can manage their learning goals

Scenario: Registering students with spreadsheet
Given I am at the students page
And I cant see a student with CPF "093" in the students list
When I upload a spreadsheet containing my students
Then I can see a student with CPF "093" in the students list

Scenario: Registering students with spreadsheet when there's already a student registered
Given I am at the students page
And I can see a student with CPF "093" in the list of students
And I cannot see a student with CPF "111" in the students list
When I upload a new spreadsheet containing my students
Then I can still see a student with CPF "093"
And I can see a student with CPF "111"

# Scenario: Registering student with registered CPF
# Given I am at the students page
# Given I can see a student with CPF "093" in the students list
# When I try to register the student "Andre" with CPF "093"
# Then I can see an error message