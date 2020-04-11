# 🚪 👾 Doorman + Add user to DB example

You probably want to know how to add a user to your database after they authenticate, so you can do things with them in your app after they sign in/sign up.

This example app handles that for you.

To the related docs, check out [Add user to the database](https://docs.doorman.cool/concepts/add-user-to-the-database).

For a tutorial walkthrough of this example, check out [User to DB code example](https://docs.doorman.cool/concepts/add-user-to-the-database/user-in-db-code-example) in our docs.

## 🏄🏾‍♂️ To try out this example:

```sh
git clone https://github.com/nandorojo/doorman-examples
cd add-user-to-db
yarn
expo start --ios # or expo start --android
```

This example uses our test account's `publicProjectId` (found on the Doorman dashboard), and `firebaseConfig`, found on Firebase's console.

---

## Use this example in your own app

To **deploy this in your own app**, you'll need to 1) [create a project](https://app.doorman.cool) on Doorman's dashboard, and 2) follow the Doorman [setup guide](https://docs.doorman.cool/introduction/getting-started).

After that, replace the `publicProjectId` in `src/AuthLogic.tsx` with yours. Also, replace the `firebase.initializeApp()` argument with your firebase config in `App.tsx`.

---

## 🧐 What is [Doorman](https://doorman.cool)?

Doorman lets React Native developers add phone authentication to their apps with ease. It works perfectly with **Firebase Auth and Expo**.

**We handle the backend and provide UI components** 😇 for Firebase phone auth. That means you can spend less time worrying about the auth flow, and more time building your actual features.

Our mission is to help you create **incredible apps** that **your users will love**. And that all starts with the first impression they make with your app – your auth flow.

## 😎 With Doorman, you can...

- 👟Build a phone authentication flow in a few lines of code.

- 💅Fully customize the design to fit your app.

* 👩‍💻Avoid maintaining a complex server.

* 🔥Keep using Firebase Auth with Expo.

* 🕺Create a native auth experience, without web views or popups.

## 👾 Docs

We have great [documentation](https://docs.doorman.cool). Check out our [setup guide](https://docs.doorman.cool/introduction/getting-started) to deploy.

## 👩‍💻 Website

Check out [doorman.cool](https://doorman.cool).
