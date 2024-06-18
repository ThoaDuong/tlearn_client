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
import { GameOutOfTime } from '../components/game/GameOutOfTime';
import { GameMeaningMaster } from '../components/game/GameMeaningMaster';
import { WritingPage } from '../pages/WritingPage';
import { WritingAddNew } from '../components/writing/WritingAddNew';
import { HomePage } from '../pages/HomePage';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<HomeLayout/>}>
            <Route index element={<HomePage/>} />
            <Route path="login" element={<LoginPage/>} />
            <Route path="voca">
                <Route index element={<VocaPage/>} />
                <Route path="new" element={<VocaAddNew/>} />\
            </Route>
            <Route path="home" element={<HomePage/> } />
            <Route path="writing" >
                <Route index element={<WritingPage/>} />
                <Route path="new" element={<WritingAddNew/>} />
            </Route>
            <Route path="game" >
                <Route index element={<GamePage/>}/>
                <Route path="correct-answer" element={<GameCorrectAnswer/>} />
                <Route path="out-of-time" element={<GameOutOfTime/>} />
                <Route path="meaning-master" element={<GameMeaningMaster />} />
            </Route>

            <Route path="*" element={<NotFoundPage/>} />
        </Route>
    )
)