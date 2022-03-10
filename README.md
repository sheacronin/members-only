# 🔒 Members Only

🔗 [Live site](https://members-only-sc.herokuapp.com/).

This app allows users to create an account and post messages. Different users have different permission levels that affect their abilities in the app.

Once a user has an account, they can click the link with the lock icon in the navigation bar to become a member. To become a club member, the user must enter the passcode that finishes the prompt on the screen. If the user is already a member, this page will show a link to page that has an input for a passcode to become an admin. This passcode has no prompt, so only users who know the passcode can become an admin with the ability to delete posts.

## Account Permission Levels

**Users** can post messages.

**Members** can post messages and see the authors and timestamps of all posted messages.

**Admins** can post messages, see authors and timestamps of all posted messages, and delete any posted message.

## Learning Goals & Technology

This app was created to practice using authentication with [passport.js](https://www.passportjs.org/) in Node.js/Express. Data for users and message posts are stored and managed in MongoDB.
