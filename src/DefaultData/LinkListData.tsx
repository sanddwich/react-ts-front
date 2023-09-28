import LinkListInterface from "../Interfaces/LinkListInterface";
import Main from "../Pages/Mian/Main";
import Auth from "../Pages/Auth/Auth";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Default from "../Pages/Default/Default";
import Second from "../Pages/Second/Second";
import TestPage from "../Pages/TestPage/TestPage";

const adminNode = '/admin/'
const superUserNode = '/superuser/'
const userNode = '/'

const LinkListData: LinkListInterface = {
    adminLinks: {
        node: adminNode,
        layout: <MainLayout />,
        urls: [
            // {
            //     title: 'Admin main',
            //     url: '/admin/main',
            // },
            // {
            //     title: 'Admin users',
            //     url: '/admin/users',
            // },
            // {
            //     title: 'Admin accessRoles',
            //     url: '/admin/accessRoles',
            // },
            // {
            //     title: 'Admin privileges',
            //     url: '/admin/privileges',
            // },
        ],
    },
    superUserLinks: {
        node: superUserNode,
        layout: <MainLayout />,
        urls: [
            // {
            //     url: '/superuser/main',
            //     title: 'Superuser main',
            // }
        ],
    },
    userLinks: {
        node: userNode,
        layout: <MainLayout />,
        urls: [
            {
                title: 'Main',
                index: true,
                url: 'main',
                component: <Main/>
            },
            {
                title: 'Second',
                url: 'second',
                component: <Second/>
            },
            {
                title: 'Auth',
                url: 'auth',
                component: <Auth/>
            },
            {
                title: 'Test',
                url: 'test',
                component: <TestPage/>
            },
            {
                title: 'Default',
                url: '*',
                component: <Default/>
            },
        ],
    },
}

export default LinkListData;