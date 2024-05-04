import { lazy } from "react";
import { Navigate } from "react-router-dom";
const Album = lazy(() => import("./pages/Album"));
const Discovery = lazy(() => import("./pages/Discovery"));
const MySongList = lazy(() => import("./pages/MySongList"));
const NextList = lazy(() => import("./pages/NextList"));
const PersonalFM = lazy(() => import("./pages/PersonalFM"));
const Playlist = lazy(() => import("./pages/Playlist"));
const Search = lazy(() => import("./pages/Search"));
const Singer = lazy(() => import("./pages/Singer"));
const Song = lazy(() => import("./pages/Song"));
const User = lazy(() => import("./pages/User"));
const Video = lazy(() => import("./pages/Video"));
const Login = lazy(() => import("./pages/Login"));
const Explore = lazy(() => import("./pages/Explore"));

export default [
    {
        path: "/Album",
        element: <Album />,
    },
    {
        path: "/Discovery",
        element: <Discovery />,
    },
    {
        path: "/MySongList",
        element: <MySongList />,
    },
    {
        path: "/NextList",
        element: <NextList />,
    },
    {
        path: "/PersonalFM",
        element: <PersonalFM />,
    },
    {
        path: "/Playlist",
        element: <Playlist />,
    },
    {
        path: "/Search",
        element: <Search />,
    },
    {
        path: "/Singer",
        element: <Singer />,
    },
    {
        path: "/Song",
        element: <Song />,
    },
    {
        path: "/User",
        element: <User />,
    },
    {
        path: "/Video",
        element: <Video />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/Explore",
        element: <Explore />,
    },
    {
        path: "/*",
        element: <Navigate to="/Discovery" />,
    },
];
