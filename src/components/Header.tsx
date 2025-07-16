import { userState } from "../stores/slices/userSlice";
import logoSrc from "../assets/logo-fit.png";
import tLearnSrc from "../assets/tlearn-fit.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const navList = [
    { id: 1, title: 'Vocabulary', slug: "voca", icon: "https://img.icons8.com/dotty/80/copybook.png" },
    { id: 2, title: 'Memorize Vocabulary', slug: "game", icon: "https://img.icons8.com/comic/100/controller.png" },
    { id: 3, title: 'Writing', slug: "writing", icon: "https://img.icons8.com/ios/50/book-and-pencil.png" },
    { id: 4, title: 'About', slug: "about", icon: "https://img.icons8.com/wired/64/about.png" },
];
const settingList = [
    { id: 1, title: 'My Profile', icon: 'https://img.icons8.com/wired/64/speed.png' },
    { id: 2, title: 'Logout', icon: 'https://img.icons8.com/wired/64/logout-rounded.png' },
]

type HeaderProps = {
    userStore: userState
}

export const Header = ( props: HeaderProps ) => {
    // nav & user menu variable
    const [toggleSettingList, setToggleSettingList] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    const handleClickSetting = (title: string) => {
        if (title === 'Logout') {
            const serverUrl = import.meta.env.VITE_SERVER_URL || "";
            window.open(`${serverUrl}/logout`, "_self");
        }
    }

    const handleToggle = () => {
        setToggleSettingList((prev) => !prev);
        setHasInteracted(true);
    };

    return (
    <>
        {/*First line*/}
        <div className='t_head-style t_container'>
            <Link to="/">
                <div className='flex gap-1 items-center'>
                    <img className='w-8 h-auto' src={logoSrc} alt='Logo' />
                </div>
            </Link>

            <Link to='top-useer'>
                <span className='text-white'>Top Users</span>
            </Link>
        </div>

        {/*Second line*/}
        <div className='t_container py-2 flex items-center justify-between'>
            {/*Left block*/}
            <div className='flex items-center gap-6'>
                {/*Logo*/}
                <Link to="/">
                    <img className='w-20 h-auto' src={tLearnSrc} alt='TLearn' />
                </Link>

                {/*Navbar*/}
                <div className='flex gap-6 items-center'>
                    {
                        navList.map(item => (
                            <Link
                                to={item.slug}
                                key={item.id}
                                className='flex gap-2 items-center py-2 px-4 rounded-3xl text-gray-700 font-semibold hover:bg-gray-50 hover:text-pink-600'
                            >
                                <img className='w-5 h-5' src={item.icon} alt="book"/>
                                <span> {item.title} </span>
                            </Link>
                        ))
                    }
                </div>
            </div>

            {/*Right block*/}
            <div>
                {props.userStore.id ?
                    <div className='relative'>
                        {/*User*/}
                        <button onClick={() => handleToggle()} className='rounded-full p-2 bg-pink-50'>
                            <img className='h-8 w-8' src='https://img.icons8.com/wired/64/test-account.png' alt='user' />
                        </button>
                        <ul className={`absolute z-[99] top-12 right-0 bg-pink-50 min-w-40 rounded-xl ${
                            hasInteracted
                                ? toggleSettingList
                                    ? 'animate-slideY-in'
                                    : 'animate-slideY-out'
                                : 'hidden'
                        }`}>
                            {settingList.map(item => (
                                <li className='flex gap-2 items-center px-3 py-2 hover:cursor-pointer group'
                                    key={item.id} onClick={(event) => {
                                    event.preventDefault();
                                    handleClickSetting(item.title);
                                }}>
                                    <img className='w-5 h-5' src={item.icon} alt={item.title}/>
                                    <span className='text-sm text-gray-700 group-hover:text-pink-700'> {item.title} </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    :
                    <div>
                        <Link color="white" to="login" className='flex gap-2 items-center bg-gray-100 text-pink-700 font-semibold rounded-3xl py-2 px-4'>
                            <img className='w-5 h-5' src='https://img.icons8.com/wired/64/login-rounded-right.png' alt='Login' />
                            <span>Login</span>
                        </Link>
                    </div>
                }

            </div>
        </div>
    </>
    )
}