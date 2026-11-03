# Munchly

**Cook with what you already have.** Munchly is a mobile app that turns the ingredients in your pantry into recipes. It also keeps your grocery list in sync with what you're missing.

## Features

- **Pantry.** Track the ingredients you have at home.
- **Recipe search.** Find recipes that use your pantry ingredients, powered by the Spoonacular API.
- **Recipe details.** Ingredients, steps, and a formatted summary for each recipe.
- **Grocery list.** Add what you need, including items that aren't in your pantry yet.
- **Saved recipes.** Bookmark favorites to come back to.
- **Accounts.** Sign in so your pantry and saved recipes follow you between devices.
- **Themes.** Light and dark color themes.

## Tech stack

| Layer | Tools |
|---|---|
| App | React Native, Expo (SDK 52), Expo Router (tab navigation) |
| Data | Supabase (auth + database), AsyncStorage for local session state |
| Recipes | [Spoonacular API](https://spoonacular.com/food-api) |

## Repository layout

```
munchly-main/
  app/          screens (Expo Router): tabs/search, tabs/pantry, tabs/saved
  components/   pantry list, grocery list, search results, loading/empty states
  database/     Supabase client
  utils/        Spoonacular hooks, session hook, storage helpers
```

## Running locally

```bash
cd munchly-main
npm install
npx expo start      # then press i (iOS simulator), a (Android), or w (web)
```

You'll need a Spoonacular API key and a Supabase project. Set them in `utils/env.js` and `database/db.js`.

## Team

**Sarah Barragan · Anusheh Chaudry · Natalie W. · Emma Su**
