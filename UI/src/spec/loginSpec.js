// describe('Wanderlust App', () => {

//     it('should navigate to login page', function () {

//       browser.get("http://localhost:3000/login");

//       expect(browser.getCurrentUrl()).toContain("login");

//     })

//     it('should login successfully', function () {

//       var contactNo = element(by.id("uContactNo"));

//       var pass = element(by.name("password"));

//       contactNo.sendKeys(9098765432);

//       pass.sendKeys("Abc@1234");

//       var button = element(by.name("submit"));

//       button.click();

//       browser.sleep(1000).then(function() {

//         expect(browser.getCurrentUrl()).toContain("login");

//     });

//     })

//   });
