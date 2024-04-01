# CapitecAutomation
Swag Labs UI and Restful-Booker API Automation
Develop branch has all the code for SwagLab UI and Restful-Booker API Automation code
This code requires Nodejs version 20 or above and latest playwright framework.
Folder SwagLabsUI contains code for UI automation.
Folder api-test contains code for API automation.
File .github/workflows/SwagLabsUI.yml contains github actions workflow. Trigger has been set to run the pipeline on code push to develop and main branch.
File SauceLabsUIAutomationTC.xlsx contains test case scenerios for the UI automation.
File ApiAutomationTC.xlsx contains test case scenerios for the API automation.
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
