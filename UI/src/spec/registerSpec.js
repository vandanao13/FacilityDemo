// describe('Wanderlust App', () => {

//     it('should navigate to login page', function () {

//       browser.get("http://localhost:3000/register");

//       expect(browser.getCurrentUrl()).toContain("register");

//     })

//     it('should login successfully', function () {

//       var name = element(by.name("name"));

//       var email = element(by.name("emailId"));

//       var contactNo = element(by.name("contactNo"));

//       var pass = element(by.name("password"))

//       name.sendKeys("pritesh")

//       email.sendKeys('pritesh@infy.com')

//       contactNo.sendKeys(9098765432);

//       pass.sendKeys("Abc@1234");


//       var button = element(by.name("submit1"));

//       button.click();

//       browser.sleep(1000).then(function() {

//         expect(browser.getCurrentUrl()).toContain("register");

//     });

//     })

//   });
