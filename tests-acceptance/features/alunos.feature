# GUI TESTS

Feature: As a professor
         I want to register students
         So that I can manage their learning goals

Scenario: Registering student with non registered CPF
Given I am at the students page
And I cant see a student with CPF "093" in the students list
When I upload a spreadsheet containing my students
Then I can see a student with CPF "093" in the students list

Scenario: Registering students with spreadsheet when there's already a student registered
Given I am at the students page
And I can see a student with CPF "093" in the list of students
And I cant see a student with CPF "111" in the students list
When I upload a new spreadsheet containing my students
Then I can still see a student with CPF "093"
And I can see a student with CPF "111" in the students list

Scenario: Registering student with invalid email
Given I am at the students page
When I try to register a student with CPF "888" and email "oi"
Then I cant see student with CPF "888" in the list

# Service

Scenario: Registering students, service
Given The system has no students with CPF "552" registered
When I register a student with CPF "552"
Then The system now stores a student with CPF "552"

Scenario: Registering a student when there's already a student registered, service
Given The system has already a student with CPF "552" registered
When I attempt to register a student with CPF "552"
Then The system still has a student with CPF "552"

Scenario: Registering student with invalid email, service
Given The system has already a student with CPF "552" registered
When I attempt to register a student with CPF "123" and email "oi"
And The system does not store a student with CPF "123" and email "oi"
