
Feature: Java library support
  Java libraries should compile

  Scenario: Immaterial change on master
    Given project java-hello-world-maven
    When README is changed on master
    Then it should build successfully

  Scenario: Immaterial change on new branch
    Given project java-hello-world-maven
    When README is changed on a new branch
    Then it should build successfully

  Scenario: Java change on master
    Given project java-hello-world-maven
    When Java is changed on master
    Then it should build successfully

  Scenario: Java change on new branch
    Given project java-hello-world-maven
    When Java is changed on a new branch
    Then it should build successfully
    