import LinkListInterface from "../Interfaces/LinkListInterface";
import Main from "../Pages/Mian/Main";
import Auth from "../Pages/Auth/Auth";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Default from "../Pages/Default/Default";
import Second from "../Pages/Second/Second";
import TestPage from "../Pages/TestPage/TestPage";
import AdminMain from "../Pages/AdminMain/AdminMain";
import AdminUsers from "../Pages/AdminUsers/AdminUsers";
import {Icon} from "../Components/Icon";
import AdminAccessRoles from "../Pages/AdminAccessRoles/AdminAccessRoles";
import AdminPrivilege from "../Pages/AdminPrivilege/AdminPrivilege";
import TestPage2 from "../Pages/TestPage2/TestPage2";

const adminNode = '/admin/'
const superUserNode = '/superuser/'
const userNode = '/'

const LinkListData: LinkListInterface = {
    adminLinks: {
        group: 'Авторизованные',
        node: adminNode,
        layout: <MainLayout />,
        authType: "authenticated",
        urls: [
            {
                title: 'Административная панель Главная',
                index: true,
                url: 'main',
                component: <AdminMain/>
            },
            {
                title: 'Работа с пользователями',
                url: 'users',
                icon: <Icon iconName={"PeopleFill"}/>,
                component: <AdminUsers />
            },
            {
                title: 'Работа с ролями',
                url: 'access_roles',
                icon: <Icon iconName={"PersonFillLock"}/>,
                component: <AdminAccessRoles />
            },
            {
                title: 'Работа с привилегиями',
                url: 'privileges',
                icon: <Icon iconName={"PersonLinesFill"}/>,
                component: <AdminPrivilege />
            },
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
        group: 'Высшие привилегии',
        node: superUserNode,
        layout: <MainLayout />,
        authType: "superuser",
        urls: [
            // {
            //     url: '/superuser/main',
            //     title: 'Superuser main',
            // }
        ],
    },
    userLinks: {
        group: 'Пользовательские',
        node: userNode,
        layout: <MainLayout />,
        authType: "user",
        urls: [
            {
                title: 'Главная',
                index: true,
                url: 'main',
                component: <Main/>
            },
            {
                title: 'Дополнительно',
                url: 'second',
                component: <Second/>
            },
            {
                title: 'Авторизация',
                url: 'auth',
                component: <Auth/>
            },
            {
                title: 'Тест',
                url: 'test',
                component: <TestPage/>
            },
            {
                title: 'Тест2',
                url: 'test2',
                component: <TestPage2/>
            },
            {
                title: 'Страница не найдена',
                url: '*',
                component: <Default/>
            },
        ],
    },
}

export default LinkListData;