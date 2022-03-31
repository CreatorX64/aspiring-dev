# Aspiring.Dev

![Screen recording of the app](./assets/screen.gif)

## Summary

This is a web based challenge tracker app built for developers.

Challenges can be added through a simple UI and then tracked through a personal dashboard where users can glance over all their active challenges.

The app doesn't enforce users on a strict timeline and gives a very flexible workflow to submit late entries or multiple entries on the same day.

## Stack

The application was built with the following tech stack:

- **Tailwind CSS:** Styling
- **React:** Frontend library
- **Supabase:** PostgreSQL database, authentication
- **Hasura:** GraphQL backend, authorization
- **Netlify:** Deployment
- Notable NPM packages:
  - **emoji-mart:** Emoji picker
  - **react-circular-progressbar:** Simple progress bar
  - **react-loader-spinner:** Customizable loading spinner
  - **react-modal:** Accessible modal for React

_Why didn't you build it with Next.js?_

Because I didn't need any SSR or SSG features. And I know that Next.js offers many other benefits apart from SSR/SSG, but dealing with the extra complexity that Next.js brings (especially when using Apollo Client) wasn't a good trade-off for me giving that this is my first-ever project of using GraphQL, Apollo, and Hasura. Ideally I would want to use Next.js all-the-time, but it didn't make sense for this particular project for the reasons I outlined.
