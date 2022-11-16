Admin Dashboard Pseudocode
Here when we refer to EVENT it means code which runs as a reaction to a user interacting with the user interface. For example, an EVENT might be a triggered when a user clicks a button.

Admin dashboard landing page
1: EVENT On student managment button click THEN
2:     Open the student managment page
3: END
1: EVENT On test managment button click THEN
2:     Open the test managment page
3: END
1: EVENT On lecturer managment button click THEN
2:     Open the lecturer managment page
3: END


Student managment page
Drawing the student table:

1: SELECT student_rows FROM database WHERE student has lecturer
2: FOR row IN student_rows THEN
3:     DRAW row
4: END
Handling row checkbox selection:

1: INITIALISE selected_rows
2: SET selected_rows to empty list

3: EVENT On student row checkbox clicked THEN
4:    IF row IS IN selected_rows THEN
5:        DELETE row FROM selected_rows
6:        SET row checkbox check TO FALSE
7:    ELSE
8:        APPEND row TO selected_rows
9:        SET row checkbox check TO TRUE
10:   END
11: END

12: EVENT On disable button clicked THEN
13:    FOR row IN selected_rows
14:        SET row IsApproved column to FALSE
15:    END 
16: END

17: EVENT On approve button clicked THEN
18:    FOR row IN selected_rows 
19:        SET row IsApproved column to TRUE
20:    END                         
21: END

22: EVENT On terminate button clicked THEN
23:    FOR row IN selected_rows 
24:       UPDATE database to have account termination flag
25:    END                         
26: END
Test managment page
Drawing the test table:

1: INITIALISE test_names to empty list
2: SELECT names of tests FROM database
3: SET test_names to names of tests
4: DRAW test_names in combo box

5: EVENT On combo box selection changed THEN
6:    SELECT test_questions_row FROM database where the test's name is the value in the combo box
7:    FOR test_question_row IN test_questions
8:        DRAW test_question_row
9:    END
10: END
Handling row checkbox selection:

1: INITIALISE selected_rows
2: SET selected_rows to empty list

3: EVENT On test row checkbox clicked THEN
4:    IF row IS IN selected_rows THEN
5:        DELETE row FROM selected_rows
6:        SET row checkbox check TO FALSE
7:    ELSE
8:        APPEND row TO selected_rows
9:        SET row checkbox check TO TRUE
10:   END
11: END

12: EVENT On delete button clicked THEN
13:    FOR row IN selected_rows
14:        UPDATE database to mark test as archived
15:    END 
16: END

17: EVENT On add question button clicked THEN
18:    Open add question dialog         
19: END

20: EVENT On save button clicked THEN
21:    FOR row IN selected_rows 
22:        IF row is in database THEN
23:           UPDATE row in database
24         ELSE
25:            ADD row to database
26:    END                         
27: END





Lecturer managment page
Drawing the lecturer table:

1: SELECT lecturer_rows FROM database
2: FOR row IN lecturer_rows THEN
3:     DRAW row
4: END
Handling row checkbox selection:

1: INITIALISE selected_rows
2: SET selected_rows to empty list

3: EVENT On lecturer row checkbox clicked THEN
4:    IF row IS IN selected_rows THEN
5:        DELETE row FROM selected_rows
6:        SET row checkbox check TO FALSE
7:    ELSE
8:        APPEND row TO selected_rows
9:        SET row checkbox check TO TRUE
10:   END
11: END

12: EVENT On disable button clicked THEN
13:    FOR row IN selected_rows
14:        SET row IsApproved column to FALSE
15:    END 
16: END

17: EVENT On approve button clicked THEN
18:    FOR row IN selected_rows 
19:        SET row IsApproved column to TRUE
20:    END                         
21: END

22: EVENT On terminate button clicked THEN
23:    FOR row IN selected_rows 
24:       UPDATE database to have account termination flag
25:    END                         
26: END
