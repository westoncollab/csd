ALTER TABLE `users`
  ADD CONSTRAINT `fk_UserToRoleId`
  FOREIGN KEY (`roleId`)
  REFERENCES `roles`(`roleId`);

ALTER TABLE `testQuestions` 
  ADD CONSTRAINT `fk_testResultToQuestionId_` 
  FOREIGN KEY (`questionId`) 
  REFERENCES `questions`(`questionId`);

ALTER TABLE `tests`
  ADD CONSTRAINT `fk_testToCreatedByLecturerId`
  FOREIGN KEY (`createdByLecturerId`)
  REFERENCES `users`(`userId`); 

ALTER TABLE `testQuestions`
  ADD CONSTRAINT `fk_testQuestionToTestId`
  FOREIGN KEY (`testId`)
  REFERENCES `tests`(`testId`);

ALTER TABLE `testQuestions`
  ADD CONSTRAINT `fk_testQuestionToQuestionId`
  FOREIGN KEY (`questionId`)
  REFERENCES `questions`(`questionId`);

ALTER TABLE `studentTestAssignments`
  ADD CONSTRAINT `fk_studentTestAssignmentToTestId`
  FOREIGN KEY (`testId`)
  REFERENCES `tests`(`testId`);

ALTER TABLE `studentTestAssignments`
  ADD CONSTRAINT `fk_studentTestAssignmentToUserId`
  FOREIGN KEY (`studentId`)
  REFERENCES `users`(`userId`);
 
ALTER TABLE `questions`
  ADD CONSTRAINT `fk_questionToSubjectId`
  FOREIGN KEY (`subjectId`)
  REFERENCES `subjects`(`subjectId`);

ALTER TABLE `questions`
  ADD CONSTRAINT `fk_questionToCreatedByLecturerId`
  FOREIGN KEY (`createdByLecturerId`)
  REFERENCES `users`(`userId`);
