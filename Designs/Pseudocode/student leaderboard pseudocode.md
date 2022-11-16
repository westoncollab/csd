# Student Leaderboard Pseudocode

A leaderboard should motivate students to complete more and different tests and aim for higher scores, not excessively repeat a test they have a good score on or rush to get any score on as many tests as possible.

To do this, their leaderboard position takes into account both the number of tests completed and their average percentage correct on their latest attempt. Tests students haven't completed are considered to have a latest score of 0 when calculating leaderboard positon, but as this will make most students' average much lower than they would expect, the average displayed is the average of the tests they have completed.

```
EVENT on page load THEN
	SELECT students and students' test results FROM database
	FOR EACH student
		FOR EACH test
			IF student has completed test THEN
				SET latest_test_score = lastest test score
			ELSE
				SET latest_test_score = 0
			END
			SET working_average TO (working_average + latest_test_score) / number of tests included in average
		END
	END
	FOR 10 students with highest working_average
		DRAW student leaderboard position
	END
	IF logged in student is on leaderboard THEN
		DRAW highlight logged in student's leaderboard position
	ELSE
		DRAW text "You are at <position> with an average of <number> from completing <number> tests."
	END
END
```

The back button returns the student to their dashboard.
```
EVENT on back button clicked THEN
	OPEN student dashboard
END
```
