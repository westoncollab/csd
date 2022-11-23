# Student testing page pseudocode

This is the page where students complete tests and have them marked automatically.

## Test choice page

When the test choice page is navigated to, get tests from the database to show.
```
EVENT on page open THEN
	SELECT tests FROM database WHERE student has test assigned
	SELECT status of tests FROM database
	DRAW tests table
END
```

Apply filters (e.g. name, status, subject, score) when the filter button is clicked.
```
EVENT on Filter button click THEN
	Choose filters to apply to table of tests
	RELOAD table
END
```

Go to selected test.
```
EVENT on Do Test button click THEN
	Open testing page for that test
END
```

## Testing page

These constants are declared with arbitrary numbers, they may be changed if found to be unbalanced.
For example, a higher negativeWeighting than positiveWeighting means a question has to be answered correctly more times than it is answered incorrectly to be less likely to be shown it.
```
CONSTANT negativeWeighting = 0.5
CONSTANT positiveWeighting = 1 
CONSTANT maximumWeight = 10

FUNCTION getQuestionWeight WITH PARAM questionId
    SELECT testResults FROM database FOR student FOR questionId
    VARIABLE weight = 0
    FOR EACH result OF student's question answers
        IF result IS correct THEN
            weight = MAXIMUM OF weight + negativeWeighting OR 1
        ELSE IF result IS incorrect THEN
            weight = MINIMUM OF weight + positiveWeighting OR maximumWeighting
    END
    RETURN weight
END
```

This function assumes that numToGet is less than the number of questions associated with the test.
numToGet may be a constant or decided by a lecturer when creating the test.
Questions which have a higher weight are added multiple times so are more likely to be picked.
```
FUNCTION getSelectionOfQuestions WITH PARAMS numToGet, testQuestions (map of questionId & questionWeight)
    
    VARIABLE randomWeightedQuestions = EMPTY ARRAY
    FOR questionId IN testQuestions
        ADD ITEM questionId TO ARRAY randomWeightedQuestions ROUND(questionWeight) TIMES
    END
    // semi-randomly pick questions
    VARIABLE selectedtexQuestions = EMPTY ARRAY
    FOR numToGet ITERATIONS
        ADD RANDOM ITEM FROM randomWeightedQuestions TO ARRAY selectedQuestions
        REMOVE ALL COPIES OF RANDOM ITEM FROM randomWeightedQuestions
        // so no question is repeated
    END
    RETURN selectedQuestions
END
```

When the test is started, choose questions according to the weighting system and list them.
```
EVENT on page open THEN
	VARIABLE weightedTestQuestions = EMPTY ARRAY
	FOR question IN test
		ADD ITEM questionId -> RESULT OF FUNCTION getQuestionWeight TO ARRAY weightedTestQuestions
	END
	VARIABLE questions = RESULT OF FUNCTION getSelectionOfQuestions USING weightedTestQuestions
	FOR question OF questions:
		DRAW question
		DRAW question's answer option radio buttons

END	
```


When the student has finished answering the questions and has clicked the submit button, the results are saved, the answers revealed, and the submit button and question progress bar replaced with the number of correct answers and a back button.
```
EVENT on Submit button click THEN
	SAVE TO DATABASE results of test
	DRAW corrections to incorrect answers
	UNDRAW question progress bar and Submit button
	DRAW "x/y correct" and Go Back button 
END
```

When the back button is clicked, return to the test choice page.
```
EVENT on Go Back button click THEN
	OPEN test choice page
END
```
