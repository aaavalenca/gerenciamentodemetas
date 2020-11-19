Feature: As a professor
         I want to register students
         So that I can manage their learning goals

Scenario: Registering student with non registered CPF
Given I am at the students page
Given I cannot see a student with CPF "054" in the students list
When I try to register the student "Mateus" with CPF "054" and email "ma@cin"
Then I can see "Mateus" with CPF "054" in the students list

Scenario: Registering student with non registered CPF
Given I am at the students page
Given I cannot see a student with CPF "683" in the students list
When I try to register the student "Mari" with CPF "683" and email "m@cin"
Then I can see "Mari" with CPF "683" in the students list

Scenario: Registering student with non registered CPF
Given I am at the students page
Given I cannot see a student with CPF "684" in the students list
When I try to register the student "Lari" with CPF "684" and email "l@cin"
Then I can see "Lari" with CPF "684" in the students list

Scenario: Registering student with non registered CPF
Given I am at the students page
Given I cannot see a student with CPF "685" in the students list
When I try to register the student "Ju" with CPF "685" and email "j@cin"
Then I can see "Ju" with CPF "685" in the students list

Scenario: Registering student with registered CPF
Given I am at the students page
Given I can see a student with CPF "683" in the students list
When I try to register the student "Pedro" with CPF "683" and email "p@cin"
Then I cannot see "Pedro" with CPF "683" in the students list
And I can see an error message