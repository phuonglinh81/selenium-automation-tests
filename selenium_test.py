from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Thiết lập trình duyệt
def setup_browser():
    driver = webdriver.Chrome()  
    driver.implicitly_wait(5)  
    return driver

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
    assert error_msg == "Username cannot be empty", "Thông báo lỗi không chính xác khi username để trống"
    driver.quit()

# Kiểm thử đăng nhập với trường password để trống
def test_login_empty_password():
    driver = setup_browser()
    driver.get("http://127.0.0.1:5500/pages/index.html")

    driver.find_element(By.ID, "username").send_keys("user1")
    driver.find_element(By.ID, "login-btn").click()

    # Xác minh thông báo lỗi
    error_msg = driver.find_element(By.ID, "error-message").text
    assert error_msg == "Password cannot be empty", "Thông báo lỗi không chính xác khi mật khẩu để trống"
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

# Chạy tất cả các kịch bản kiểm thử
if __name__ == "__main__":
    all_tests = [
        test_login_success,
        test_login_empty_username,
        test_login_empty_password,
        test_login_invalid_username,
        test_login_invalid_password,
        test_login_empty_credentials,
    ]

    passed_tests = 0
    total_tests = len(all_tests)

    for test in all_tests:
        try:
            test()
            passed_tests += 1
            print(f"{test.__name__}: Passed")
        except AssertionError as e:
            print(f"{test.__name__}: Failed - {e}")


    print(f"✅ {passed_tests}/{total_tests} bài kiểm thử thành công.")

