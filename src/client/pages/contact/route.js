import { lazy } from "react";

export default {
    path: '/contact',
    exact: true,
    public: true,
    component: lazy(() => import('.'))
}