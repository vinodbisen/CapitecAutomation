# CapitecAutomation
1. Swag Labs UI and Restful-Booker API Automation
2. Develop branch has all the code for SwagLab UI and Restful-Booker API Automation code
3. This code requires Nodejs version 20 or above and latest playwright framework.
4. Folder SwagLabsUI contains code for UI automation.
5. Folder api-test contains code for API automation.
6. File .github/workflows/SwagLabsUI.yml contains github actions workflow. Trigger has been set to run the pipeline on code push to develop and main branch.
7. File **SauceLabsUIAutomationTC.xlsx** contains test case scenerios for the UI automation.
8. File **ApiAutomationTC.xlsx** contains test case scenerios for the API automation.
   
After checkout following commands needs to run to prepaire the environment.
1. Install Nodejs
2. Install Playwright
3. Install VSCode (optional)

To execute UI automation test 
1. Change the directory to SwagLabUI/tests
2. Execute command **npx playwright test** from commandline

To execute API automation test 
1. Change the directory to api-test/tests
2. Execute command **npx playwright test** from commandline
