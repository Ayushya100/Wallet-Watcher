# About Wallet Watcher
Welcome to the GitHub repository for **Wallet Watcher** - a burgeoning financial tracking and management tool designed with personal use in mind. Currently under active development, Wallet Watcher aims to offer a powerful yet user-friendly platform to help users effortlessly manage and analyze their financial activities.
## Project Status: Under Development
### What's Happening Now:
- **Core Feature Implementation:** Our team is working to develop the server-side requirements of Wallet Watcher.
- **Testing & Refinement:** Concurrently, we are testing the functionalities for reliability and user-friendliness.
## Focused Key Features
### Easy Tracking of Income and Expenses
- **Simplified Data Entry:** Quickly add income and expenses with an intutive interface.
- **Categorization:** Organize your financial data into categories for better analysis and tracking.
### Financial Reporting
- **Detailed Reports:** Generate comprehensive reports to view your financial trends and patterns.
- **Export Options:** Easily export your financial data in various formats for offline analysis or sharing.
### Secure Data Management
- **Privacy First:** We value your privacy. Your data is never shared or sold to third parties.
### Cross-platform Accessibility
- **Web and Mobile Access:** Use Wallet Watcher on your preferred devices, with seamless synchronization between platforms.
### User-Friendly Dashboard
- **Intutive Interface:** A clean and strightforward dashboard that gives you a quick overview of your financial status.
- **Customizable Views:** Tailor the dashboard to display the information most relevant to you.
## Getting Started
To start using Wallet Watcher, please clone or download the application. Follow the installation and setup instruction in our ReadME file to get up and running.

Join us on this journey to make financial management easier, more efficient, and more accessible.
### Required frameworks & Packages
- Node version - v16.20.1
- npm version - 8.19.4
- Angular CLI version - 15.2.9
- mongodb version - v5.0.8
### Installation Instructions
- Run the below commands within the backend service folders (accountManagementServices & financeManagementServices):
npm install & npm install -D
### Install and Setting up the MongoDB Environment
- Download the msi package of Mongodb from mongodb.com
- Run msi package and install complete version.
- Run the following command in cmd to check if mongodb is installed properly or not:
    "C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" --version
    Output: (should display the installed version of mongodb)
- Run the following command in cmd to check if mongodb shell version is installed properly or not:
    "C:\Program Files\MongoDB\Server\5.0\bin\mongo.exe" --version
    Output: (should display the installed shell version of mongodb)
- Open 'env' in your system.
- Go to the 'Environments Variable'.
- In 'user variables for admin' click on 'Path' and then click on 'Edit'
- Click on 'new' and paste the following path:
    'C:\Program Files\MongoDB\Server\5.0\bin'
- Click on Ok and done.
### Running the serverSide application
npm run start
### Documentation
- **DB Model Documentation:** [Wallet Watcher DB Model](https://app.eraser.io/workspace/zBSna17oY9NoSl0HFqjh?origin=share)
---
**Wallet Watcher** - Simplifying Financial Management for Everyone!