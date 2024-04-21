import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

//layouts
import { HomeLayout } from '../layouts/HomeLayout';
//pages
import { GamePage } from '../pages/GamePage';
import { VocaAddNew } from '../components/vocabulary/VocaAddNew';
import { LoginPage } from '../pages/LoginPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { VocaPage } from '../pages/VocaPage';
import { GameCorrectAnswer } from '../components/game/GameCorrectAnswer';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<HomeLayout/>}>
            <Route index element={<VocaPage/>} />
            <Route path="login" element={<LoginPage/>} />
            <Route path="new-voca" element={<VocaAddNew/>} />
            <Route path="game" >
                <Route index element={<GamePage/>}/>
                <Route path="correct-answer" element={<GameCorrectAnswer/>} />
            </Route>

            <Route path="*" element={<NotFoundPage/>} />
        </Route>
    )
)