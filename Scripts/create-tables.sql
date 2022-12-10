CREATE TABLE `roles` (
  `roleId` INT NOT NULL AUTO_INCREMENT,
  `roleName` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`roleId`)
) ENGINE = InnoDB;

CREATE TABLE `users` (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(128) NOT NULL,
  `lastName` VARCHAR(128) NOT NULL,
  `email` VARCHAR(128) NOT NULL UNIQUE,
  `password` VARCHAR(128) NOT NULL,
  `lastLoginTime` DATETIME,
  `isApproved` BOOLEAN DEFAULT false,
  `roleId` INT NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE = InnoDB;

CREATE TABLE `tests` (
  `testId` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(256) NOT NULL,
  `createdByLecturerId` INT NOT NULL,
  PRIMARY KEY (`testId`)
) ENGINE = InnoDB;

CREATE TABLE `testResults` (
  `questionId` INT NOT NULL REFERENCES `questions`(`questionId`),
  `studentId` INT NOT NULL REFERENCES `users`(`userId`),
  `date` DATETIME NOT NULL,
  `answeredInTestId` INT NOT NULL REFERENCES `tests`(`testId`),
  `correct` BOOLEAN NOT NULL,
  PRIMARY KEY (`questionId`, `studentId`, `date`)
) ENGINE = InnoDB;

CREATE TABLE `testQuestions` (
  `testQuestionsId` INT NOT NULL AUTO_INCREMENT,
  `testId` INT NOT NULL,
  `questionId` INT NOT NULL, 
  PRIMARY KEY (`testQuestionsId`)
) ENGINE = InnoDB;

Create TABLE `studentTestAssignments` (
  `studentTestAssignmentsId` INT NOT NULL AUTO_INCREMENT,
  `testId` INT NOT NULL,
  `studentId` INT NOT NULL,
  `optional` BOOLEAN,
  PRIMARY KEY (`studentTestAssignmentsId`)
) ENGINE = InnoDB;

Create TABLE `questions` (
  `questionId` INT NOT NULL AUTO_INCREMENT,
  `question` TEXT,
  `correctAnswer` TEXT,
  `incorrectAnswerA` TEXT,
  `incorrectAnswerB` TEXT,
  `incorrectAnswerC` TEXT,
  `subjectId` INT NOT NULL,
  `createdByLecturerId` INT NOT NULL,
  PRIMARY KEY (`questionId`)
) ENGINE = InnoDB;

CREATE TABLE `subjects` (
  `subjectId` INT NOT NULL AUTO_INCREMENT,
  `subjectName` VARCHAR(256) NOT NULL,
  PRIMARY KEY (`subjectId`)
) ENGINE = InnoDB;
