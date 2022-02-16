import { lazy } from "react";

// const HomePage = lazy(() => import('./Home'));
// const LoginPage = lazy(() => import('./Login'));

// export default [
//     {
//         path: '/',
//         exact: true,
//         public: true,
//         component: HomePage
//     },
//     {
//         path: '/Login',
//         exact: true,
//         public: true,
//         component: LoginPage
//     }
// ];

let routes = [];

const context = require.context('.', true, /route.js$/);

context.keys().forEach((path) => {
    routes.push(require(`${path}`).default);
    // console.log(path);
    // console.log(require(`${path}`).default);
});

export default routes;