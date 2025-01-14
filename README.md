# selenium-automation-tests
## Overview
This is a Selenium test suite for a web application with login functionality. The purpose of this test suite is to ensure that the login features of the application work correctly, covering both valid and invalid cases for username and password.
## Test Cases
The test suite verifies the accuracy of the login process by checking several scenarios. It includes tests for successful login with valid username and password, as well as cases where the username or password fields are left empty. It also tests scenarios with an invalid username (unregistered user) and an invalid password (password less than 5 characters). These tests ensure that the application provides accurate error messages and validates user input fields during the login process.
## Dependencies
To run the tests, you need to install the necessary dependencies. The primary dependency for this project is Selenium, a popular web testing framework. You can install Selenium using the following command:
```bash
pip install selenium
```
This will install the Selenium package required to interact with the web browser and perform automated tests.
## How to Run
```bash
python selenium_test.py
```
## Results 
Tests are executed in a local environment with results displayed in the console. Successful test passes will be shown, along with assertions for error handling.
![image](https://github.com/user-attachments/assets/c8276c57-c430-443e-aee7-ecb8eb19f57a)
## Link ChatGPT
Here is the link to my ChatGPT conversation where an example of running Selenium tests was provided. You can review it to understand the implementation and testing process better.[ChatGPT Example on JUnit Testing](https://chatgpt.com/share/67868f23-0450-8005-943a-68168148bac5). Additionally, I asked ChatGPT to evaluate and grade my automation testing exercises. I made adjustments based on the suggestions provided to improve the results of my tests. Here is the link to my ChatGPT conversation for evaluation and feedback. [ChatGPT evaluate and grade](https://chatgpt.com/share/67824d07-cbf0-8005-8b3b-c5c23376b4ea)
 
