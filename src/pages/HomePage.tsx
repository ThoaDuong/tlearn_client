import aircraftSrc from '../assets/images/home/aircraft-trans.png'
import learnSrc from '../assets/images/home/learn.jpg'
import multipleLanguageSrc from '../assets/images/home/multi-language.jpg'
import { TopicCard } from '../components/topic/TopicCard'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../stores/store'

export const HomePage = () => {
    // redux
    const topicStore = useSelector((state: RootState) => state.topic);
    
    return (<>
        {/* Title block */}
        <div className="my-10 text-center text-gray-800">
            <h1 className="text-4xl font-bold mb-5">Learn with <span className="text-pink-main">TLearn</span></h1>
            <p className="text-lg">TLearn is a language learning platform that makes your learning process faster and easier.</p>
        </div>

        {/* Circle block | Desktop only */}
        <div className="hidden md:block relative">
            <div className="relative mt-24 w-[600px] h-[600px] mx-auto rounded-full border-4 border-dashed border-gray-200">
                {/* Vocabulary - Top Center */}
                <Link to="topic">
                    <span className="absolute z-10 left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 flex flex-col items-center justify-center rounded-full bg-pink-50 p-4 gap-2">
                        <img className='w-8 h-8' src="https://img.icons8.com/dotty/80/copybook.png" alt="Vocabulary" />
                        <span className="text-lg font-semibold text-gray-800">Vocabulary</span>
                    </span>
                </Link>
                {/* Memorize - Left Lower */}
                <Link to="game">
                    <span className="absolute z-10 left-0 top-[30%] transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 flex flex-col items-center justify-center rounded-full bg-pink-50 p-4 gap-2">
                        <img className='w-8 h-8' src="https://img.icons8.com/comic/100/controller.png" alt="Memorize" />
                        <span className="text-lg font-semibold text-gray-800">Memorize</span>
                    </span>
                </Link>
                {/* Writing - Right Lower */}
                <Link to="writing">
                    <span className="absolute z-10 right-0 top-[30%] transform translate-x-1/2 -translate-y-1/2 w-40 h-40 flex flex-col items-center justify-center rounded-full bg-pink-50 p-4 gap-2">
                        <img className='w-8 h-8' src="https://img.icons8.com/ios/50/book-and-pencil.png" alt="Writing" />
                        <span className="text-lg font-semibold text-gray-800">Writing</span>
                    </span>
                </Link>

                <div className="absolute z-5 w-[500px] h-[400px] left-1/2 top-[45%] transform -translate-x-1/2 -translate-y-1/2">
                    <img className="object-cover mx-auto" src={aircraftSrc} alt="earth" />
                </div>

            </div>

            <div className="absolute z-20 left-0 bottom-0 bg-white w-full h-[300px] mx-0 px-0"></div>
        </div>

        {/* Circle block | Mobile only */}
        <div className="grid md:hidden grid-cols-3 grid-rows-2 gap-4 z-40 rounded-3xl">
            <Link to="topic">
                <div  className="row-span-2 flex justify-center items-center rounded-3xl p-4 bg-pink-50 bg-[url('../public/images/bg-card.png')] bg-cover bg-center">
                    <span className="text-base sm:text-lg text-gray-800">Vocabulary</span>
                </div>
            </Link>
            <Link to="game">
                <div  className="row-span-1 flex justify-center items-center rounded-3xl p-4 bg-pink-50 bg-[url('../public/images/bg-card.png')] bg-cover bg-center">
                <span className="text-base sm:text-lg text-gray-800">Memorize</span>
            </div>
            </Link>
            <Link to="writing">
                <div  className="row-span-1 flex justify-center items-center rounded-3xl p-4 bg-pink-50 bg-[url('../public/images/bg-card.png')] bg-cover bg-center">
                    <span className="text-base sm:text-lg text-gray-800">Writing</span>
                </div>
            </Link>
            <div className='col-span-2 w-full bg-blue-50 mx-auto rounded-2xl'>
                <img className='w-full h-[200px] object-cover object-top' src={aircraftSrc} alt="aircraft" />
            </div>
        </div>

        {/* Learning block */}
        <div className="relative flex justify-center items-center mt-20 md:-mt-48 z-40">
            <div className="w-1/2 h-full flex flex-col items-center justify-center">
                <h2 className="text-center text-2xl font-semibold text-gray-800 mb-4">Learn English from anywhere</h2>
                <button className="border border-pink-main text-pink-main bg-white hover:bg-pink-main hover:text-white transition-all duration-300 px-4 py-2 rounded-full flex items-center justify-center">
                    <span className="mr-2">See more</span>
                    <img className="w-4 h-4" src="https://img.icons8.com/ios/50/long-arrow-right.png" alt="long-arrow-right"/>
                </button>
            </div>
            <div className="w-1/2 h-full">
                <img className="w-[80%] h-[250px] mx-auto object-cover rounded-2xl" src={multipleLanguageSrc} alt="learn" />
            </div>
        </div>

        {/* Topic block */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-4 bg-blue-50 mt-20 py-20 px-5 md:px-20">
            <div className="w-full lg:w-1/4 flex flex-col justify-center items-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Most common words</h2>
                <button className="border border-pink-main text-pink-main bg-white hover:bg-pink-main hover:text-white transition-all duration-300 px-4 py-2 rounded-full flex items-center justify-center">
                    <span className="mr-2">See more</span>
                    <img className="w-4 h-4" src="https://img.icons8.com/ios/50/long-arrow-right.png" alt="long-arrow-right"/>
                </button>
            </div>

            <div className="w-full lg:w-3/4 flex flex-col md:flex-row justify-center items-center gap-4">
            {
                topicStore?.listTopic?.map((topic) => (
                    <TopicCard key={topic.id} topic={topic}/>
                ))
            }
            </div>

        </div>

        {/* Vocabulary block */}
        <div className="flex justify-center items-center mt-20">
            <div className="w-1/2 h-full">
                <img className="w-[80%] h-[250px] mx-auto object-cover rounded-2xl" src={learnSrc} alt="apple" />
            </div>
            <div className="w-1/2 h-full flex flex-col items-center justify-center">
                <div className="mb-4">
                    <h2 className="text-center text-2xl font-semibold text-gray-800">Word Review</h2>
                    <p className="text-center text-gray-600">This step of vocabulary learning focuses on comprehensively understanding each word by breaking down its essential components</p>
                </div>
                <button className="border border-pink-main text-pink-main bg-white hover:bg-pink-main hover:text-white transition-all duration-300 px-4 py-2 rounded-full flex items-center justify-center">
                    <span className="mr-2">See more</span>
                    <img className="w-4 h-4" src="https://img.icons8.com/ios/50/long-arrow-right.png" alt="long-arrow-right"/>
                </button>
            </div>
        </div>

    </>)
}