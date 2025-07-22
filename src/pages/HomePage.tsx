import earthSrc from '../assets/images/green-earth.png'
import multipleLanguageSrc from '../assets/images/multi-language.jpg'
import appleSrc from '../assets/images/apple.jpg'

export const HomePage = () => {
    return (<>
        {/* Title block */}
        <div className="my-10 text-center text-gray-800">
            <h1 className="text-4xl font-bold mb-5">Learn with <span className="text-pink-main">TLearn</span></h1>
            <p className="text-lg">TLearn is a language learning platform that makes your learning process faster and easier.</p>
        </div>

        {/* Circle block */}
        <div className="relative">
            <div className="relative mt-24 w-[600px] h-[600px] mx-auto rounded-full border-4 border-dashed border-gray-200">
                {/* Vocabulary - Top Center */}
                <span className="absolute z-5 left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 flex flex-col items-center justify-center rounded-full bg-pink-50 p-4 gap-2">
                    <img className='w-8 h-8' src="https://img.icons8.com/dotty/80/copybook.png" alt="Vocabulary" />
                    <span className="text-lg font-semibold text-gray-800">Vocabulary</span>
                </span>
                {/* Memorize - Left Lower */}
                <span className="absolute z-5 left-0 top-[30%] transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 flex flex-col items-center justify-center rounded-full bg-pink-50 p-4 gap-2">
                    <img className='w-8 h-8' src="https://img.icons8.com/comic/100/controller.png" alt="Vocabulary" />
                    <span className="text-lg font-semibold text-gray-800">Memorize</span>
                </span>
                {/* Writing - Right Lower */}
                <span className="absolute z-5 right-0 top-[30%] transform translate-x-1/2 -translate-y-1/2 w-40 h-40 flex flex-col items-center justify-center rounded-full bg-pink-50 p-4 gap-2">
                    <img className='w-8 h-8' src="https://img.icons8.com/ios/50/book-and-pencil.png" alt="Vocabulary" />
                    <span className="text-lg font-semibold text-gray-800">Writing</span>
                </span>

                <div className="absolute z-10 w-[600px] h-[600px] left-1/2 top-[55%] transform -translate-x-1/2 -translate-y-1/2">
                    <img className="w-[600px] h-[600px] object-cover" src={earthSrc} alt="earth" />
                </div>

            </div>

            <div className="absolute z-20 left-0 bottom-0 bg-white w-full h-[300px] mx-0 px-0"></div>
        </div>

        {/* Learning block */}
        <div className="flex justify-center items-center -mt-48 z-30">
            <div className="w-1/2 h-full flex flex-col items-center justify-center">
                <h2 className="text-center text-2xl font-semibold text-gray-800 mb-4">Learn English from anywhere</h2>
                <button className="border border-pink-main text-pink-main bg-white hover:bg-pink-main hover:text-white transition-all duration-300 px-4 py-2 rounded-full flex items-center justify-center">
                    <span className="mr-2">See more</span>
                    <img className="w-4 h-4" src="https://img.icons8.com/ios/50/long-arrow-right.png" alt="long-arrow-right"/>
                </button>
            </div>
            <div className="w-1/2 h-full">
                <img className="w-[80%] h-auto mx-auto object-cover rounded-2xl" src={multipleLanguageSrc} alt="learn" />
            </div>
        </div>

        {/* Vocabulary block */}
        <div className="flex justify-center items-center mt-20">
            <div className="w-1/2 h-full">
                <img className="w-[80%] h-auto mx-auto object-cover rounded-2xl" src={appleSrc} alt="apple" />
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