# 🚪 ⚡️ Doorman Splash Screen Example

This example aims to show a really minimal way to use Doorman in your app, with a custom Splash Screen shown before the auth flow.

## 🏄🏾‍♂️ To try out this example:

```sh
git clone https://github.com/nandorojo/doorman-examples
cd with-splash-screen
yarn
expo start --ios # or expo start --android
```

This example uses our test account's `publicProjectId` (found on the Doorman dashboard), and `firebaseConfig`, found on Firebase's console.

---

## Use this example in your own app

To **deploy this in your own app**, you'll need to 1) [create a project](https://app.doorman.cool) on Doorman's dashboard, and 2) follow the Doorman [setup guide](https://docs.doorman.cool/introduction/getting-started).

After that, replace the `publicProjectId` in `src/App.tsx` with yours. Also, replace the `firebase.initializeApp()` argument with your firebase config in the same file.

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
