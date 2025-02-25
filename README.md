# Ivy EHR

#### Simplify client admissions with this referral management system. 
<img src="./public/images/welcome-screenshot.png" alt="A screenshot of the Ivy EHR welcome page accessible upon sign-in."/>

## Description
Navigate the process of admitting a new client to care through this full CRUD application built with the MEN stack. Once signed up and in to this electronic health record system, start by creating a new referral. Progress through the admission process by confirming insurance and scheduling an intake. You can easily make changes to your referrals at any time. Once the intake is complete, simply close the referral to officially admit the client.

## Quick Links
* **Project planning** can be found [here](https://trello.com/b/M7AGFx57/intake-ehr).
* **Wireframe** can be found [here](https://lucid.app/lucidspark/123e0c49-f988-44e5-94ef-6602e9912516/edit?viewport_loc=-3160%2C-922%2C4562%2C2316%2C0_0&invitationId=inv_8848a2a9-bab9-4095-b4ca-07ab3ce16aa4).
* **GitHub repo** can be found [here](https://ivy-ehr-4960d3032d29.herokuapp.com/).
* **Deployed project** link can be found [here](https://github.com/annamiriams/intake-ehr).

## Table of Contents
* [Technologies Used](#technologiesused)
* [Features](#features)
* [Design](#design)
* [Project Next Steps](#nextsteps)
* [Works Cited](#workscited)

## <a name="technologiesused"></a>Technologies Used
* JavaScript
* HTML5
* CSS3
* bcrypt
* dotenv
* EJS
* express
* express-session
* method-override
* mongoose
* morgan

## <a name="design"></a>Design
* All icons displayed in this app were designed by surang and can be found in [this](https://www.flaticon.com/packs/house-plant-6) Flaticon pack. The neutral earth tones and relaxing houseplant motif brings a balanced and grounded theme to this application. 

## <a name="nextsteps"></a>Project Next Steps
* Build out referralSchema (demographic information, contact information, notes section that can be updated by other team members, reasons for initail referral, reasons referral closure, etc.).
* Build out userSchema (first and last names, email address, etc.).
* Create the ability for various teams to use the app, with limited access to viewing only your own team's referrals.
* Add the ability to reopen a previously closed referral to accomodate for rereferred clients.

## <a name="workscited"></a>Works Cited:
* **[Hamburger menu](https://www.shecodes.io/athena/12829-how-to-create-a-burger-menu-icon-with-css)**: This resource got me started as I developed the hamburger menu for the mobile media query. I also referenced the GA resources provided on the topic.
* **[users controller](https://generalassembly.instructure.com/courses/633/assignments/13439?module_item_id=51553)**: The GA cookbook lab helped me develop the Team page and subsequent team member profiles, and significantly prepared me for building this app.
* **[MEN stack session auth](https://generalassembly.instructure.com/courses/633/pages/men-stack-session-auth?module_item_id=51544)**: The GA lesson on this topic helped me set up the authentication for this application.
* **[MEN stack CRUD app lab](https://github.com/annamiriams/men-stack-crud-app-lab)**: This CRUD app was great practice for implementing the fundamentals of building a CRUD app.
* **[ChatGPT](https://chatgpt.com/)**: I asked ChatGPT a lot of questions through the process of building this app. I used is as a secondary resource to googling, though I ultimately turned to ChatGPT when I needed a more specific answer to understand the fundamentals of the concepts behind building a CRUD app using the MEN stack. For example: When building out the user controller, I struggled to understand what was getting in the way of rendering users/show.ejs. After asking ChatGPT about how to effectively use different controllers, I finally realized that my issue was that a route in users.js was being intercepted by the same route in referrals.js. 