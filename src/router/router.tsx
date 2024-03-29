import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

//layouts
import { HomeLayout } from '../layouts/HomeLayout';
//pages
import { GamePage } from '../pages/GamePage';
import { VocaAddNew } from '../pages/Vocabulary/VocaAddNew';
import { VocaListCard } from '../pages/Vocabulary/VocaListCard';
import { LoginPage } from '../pages/LoginPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { RootLayout } from '../layouts/RootLayout';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<HomeLayout/>}>
            <Route index element={<VocaListCard/>} />
            <Route path="login" element={<LoginPage/>} />
            <Route path="new-voca" element={<VocaAddNew/>} />
            <Route path="game" element={<GamePage/>} />
            <Route path="*" element={<NotFoundPage/>} />
        </Route>
    )
)