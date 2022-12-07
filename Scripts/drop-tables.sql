ALTER TABLE users
DROP CONSTRAINT IF EXISTS fk_UserToRoleId;

ALTER TABLE testResults
DROP CONSTRAINT IF EXISTS Name	testResults_ibfk_1;

ALTER TABLE testResults
DROP CONSTRAINT IF EXISTS Name	testResults_ibfk_2;

ALTER TABLE tests
DROP CONSTRAINT IF EXISTS fk_testToCreatedByLecturerId;

ALTER TABLE testQuestions
DROP CONSTRAINT IF EXISTS fk_testQuestionToTestId;

ALTER TABLE testQuestions
DROP CONSTRAINT IF EXISTS fk_testQuestionToQuestionId;

ALTER TABLE studentTestAssignments
DROP CONSTRAINT IF EXISTS fk_studentTestAssignmentToTestId;

ALTER TABLE studentTestAssignments
DROP CONSTRAINT IF EXISTS fk_studentTestAssignmentToUserId;

ALTER TABLE questions
DROP CONSTRAINT IF EXISTS fk_questionToSubjectId;

ALTER TABLE questions
DROP CONSTRAINT IF EXISTS fk_questionToCreatedByLecturerId;

DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS tests;
DROP TABLE IF EXISTS testResults;
DROP TABLE IF EXISTS testQuestions;
DROP TABLE IF EXISTS studentTestAssignments;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS subjects;
