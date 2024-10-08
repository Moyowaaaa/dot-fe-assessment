# Dot Frontend Assessment Solution | Moyowa Etchie

This is the solution to the frontend assessment task from Dot the task was to build out a mini e-commerce product catalog

## Features

- Product details

- filter section to filter through products via different parameters

- Products Pagination per page

- Mobile responsiveness to ensure that it is compatible with all screen sizes

## Tools and Technologies

The technologies I used on this project:

- React
- TypeScript
- Tailwind
- Tanstack query
- React hot toast

This project was bootstrapped with [Vite react-app]( [Vite Configuration Reference](https://vitejs.dev/config/).

## project Setup

To install and run the project locally, download/clone the repo and run the following commands:

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

## Assumptions I made

- I assumed that both routes; products and categories are meant to return the same data and with that I rendered the categories of each product as well as their sub categories in the left sidebar.

- Parameters for the sort by field for the filters were not specified, so I specified mine;(category, price)

## Any additional features I implemented

- Slide animation in for sidebar that holds the cart

- Custom click outside hook for if a user clicks outside the cart, the cart closes

## Areas I would improve on if given more time

- I decided to use tailwind css for css styling so as to be fast, next time I'd use SCSS instead of tailwind so as to make sure the code is less verbose
  <br/>
  <br/>
  <br/>

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).
