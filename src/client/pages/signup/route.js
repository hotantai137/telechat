import { lazy } from "react";

export default {
    path: '/signup',
    exact: true,
    public: true,
    component: lazy(() => import('.'))
}