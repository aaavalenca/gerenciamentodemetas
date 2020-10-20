Feature: As a professor, I want to register students via spreadsheet so I can manage their goals

Scenario: Uploading spreadsheet successfully
Given I'm at the students page
Given I cannot see a listing of all my students and their goals
When I click on the "upload" button
Then I'm allowed to browse for files on my personal computer
When I click "planilha.xls"
And I click "open"
Then I'm at the students page again
And I can see a listing of all my students
