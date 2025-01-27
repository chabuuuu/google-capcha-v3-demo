# from selenium import webdriver
# from selenium.webdriver.common.by import By
# from selenium.webdriver.common.action_chains import ActionChains
# from selenium.webdriver.common.keys import Keys

from selenium import webdriver

from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
import time

# Đường dẫn tới WebDriver (thay đổi theo trình duyệt và hệ điều hành của bạn)
driver_path = "./chrome-linux64"

# Khởi tạo trình duyệt
options = webdriver.ChromeOptions()

options.add_experimental_option("detach", True)

driver = webdriver.Chrome(options=options)
try:

    while True:
        # Mở trang web
        driver.get("http://localhost:3000")  # Đường dẫn tới file HTML

        # Tìm trường email và nhập email
        email_input = driver.find_element(By.ID, "email")
        email_input.send_keys("example@gmail.com")

        # Nhấn nút submit
        submit_button = driver.find_element(By.TAG_NAME, "button")
        ActionChains(driver).move_to_element(submit_button).click().perform()

        # Chờ một thời gian để quan sát hành vi
        time.sleep(5)

finally:
    # Đóng trình duyệt
    driver.quit()
