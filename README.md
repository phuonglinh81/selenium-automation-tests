# selenium-automation-tests
## Overview
This is a Selenium test suite for a web application with login functionality. The purpose of this test suite is to ensure that the login features of the application work correctly, covering both valid and invalid cases for username and password.
## Test Cases
The test suite verifies the accuracy of the login process by checking several scenarios. It includes tests for successful login with valid username and password, as well as cases where the username or password fields are left empty. It also tests scenarios with an invalid username (unregistered user) and an invalid password (password less than 5 characters). These tests ensure that the application provides accurate error messages and validates user input fields during the login process.
```python
# Kiểm thử đăng nhập thành công
def test_login_success():
    driver = setup_browser()
    driver.get("http://127.0.0.1:5500/pages/index.html")

    # Nhập thông tin đăng nhập hợp lệ
    driver.find_element(By.ID, "username").send_keys("user1")
    driver.find_element(By.ID, "password").send_keys("12345")
    driver.find_element(By.ID, "login-btn").click()

    # Xác minh kết quả
    WebDriverWait(driver, 10).until(EC.url_contains("pages/products.html"))
    assert "pages/products.html" in driver.current_url, "Không chuyển đến trang products"
    driver.quit()

# Kiểm thử đăng nhập với trường username để trống
def test_login_empty_username():
    driver = setup_browser()
    driver.get("http://127.0.0.1:5500/pages/index.html")

    driver.find_element(By.ID, "password").send_keys("12345")
    driver.find_element(By.ID, "login-btn").click()

    # Xác minh thông báo lỗi
    error_msg = driver.find_element(By.ID, "error-message").text
    assert error_msg == "Username must be at least 5 characters long", "Thông báo lỗi không chính xác khi username để trống"
    driver.quit()

# Kiểm thử đăng nhập với trường password để trống
def test_login_empty_password():
    driver = setup_browser()
    driver.get("http://127.0.0.1:5500/pages/index.html")

    driver.find_element(By.ID, "username").send_keys("user1")
    driver.find_element(By.ID, "login-btn").click()

    # Xác minh thông báo lỗi
    error_msg = driver.find_element(By.ID, "error-message").text
    assert error_msg == "Password must be at least 5 characters long", "Thông báo lỗi không chính xác khi mật khẩu để trống"
    driver.quit()

# Kiểm thử đăng nhập với username không hợp lệ
def test_login_invalid_username():
    driver = setup_browser()
    driver.get("http://127.0.0.1:5500/pages/index.html")

    driver.find_element(By.ID, "username").send_keys("user123")
    driver.find_element(By.ID, "password").send_keys("12345")
    driver.find_element(By.ID, "login-btn").click()

    # Xác minh thông báo lỗi
    error_msg = driver.find_element(By.ID, "error-message").text
    assert error_msg == "Invalid username or password", "Thông báo lỗi không chính xác khi username không hợp lệ"
    driver.quit()

# Kiểm thử đăng nhập với mật khẩu không hợp lệ (ít hơn 5 ký tự)
def test_login_invalid_password():
    driver = setup_browser()
    driver.get("http://127.0.0.1:5500/pages/index.html")

    driver.find_element(By.ID, "username").send_keys("user1")
    driver.find_element(By.ID, "password").send_keys("123")
    driver.find_element(By.ID, "login-btn").click()

    # Xác minh thông báo lỗi
    error_msg = driver.find_element(By.ID, "error-message").text
    assert error_msg == "Password must be at least 5 characters long", "Thông báo lỗi không chính xác khi mật khẩu không hợp lệ"
    driver.quit()

# Kiểm thử đăng nhập với cả username và password để trống
def test_login_empty_credentials():
    driver = setup_browser()
    driver.get("http://127.0.0.1:5500/pages/index.html")

    driver.find_element(By.ID, "login-btn").click()

    # Xác minh thông báo lỗi
    error_msg = driver.find_element(By.ID, "error-message").text
    assert error_msg == "Username and password cannot be empty", "Thông báo lỗi không chính xác khi cả username và password để trống"
    driver.quit()
```
## Dependencies
To run the tests, you need to install the necessary dependencies. The primary dependency for this project is Selenium, a popular web testing framework. You can install Selenium using the following command:
```bash
pip install selenium
```
This will install the Selenium package required to interact with the web browser and perform automated tests.
## Results 
Tests are executed in a local environment with results displayed in the console. Successful test passes will be shown, along with assertions for error handling.

![image](https://github.com/user-attachments/assets/1cf381c9-20a4-4d4d-9a35-f17d53aba08d)
## How to Run
```bash
python selenium_test.py
```
## Link ChatGPT
Here is the link to my ChatGPT conversation where an example of running Selenium tests was provided. You can review it to understand the implementation and testing process better.[ChatGPT Example on JUnit Testing](https://chatgpt.com/share/67868f23-0450-8005-943a-68168148bac5). Additionally, I asked ChatGPT to evaluate and grade my automation testing exercises. I made adjustments based on the suggestions provided to improve the results of my tests. Here is the link to my ChatGPT conversation for evaluation and feedback. I got 9/10 [ChatGPT evaluate and grade](https://chatgpt.com/share/6786925d-ca40-8005-a248-bde7597a4e8e)
 
