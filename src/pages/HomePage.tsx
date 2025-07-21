import { navList } from "../components/Header"

export const HomePage = () => {
    return (<>
        <div className="my-10 text-center text-gray-800">
            <h1 className="text-4xl font-bold mb-5">Learn with TLearn</h1>
            <p className="text-lg">TLearn is a language learning platform that makes your learning process faster and easier.</p>
        </div>

        <div className="flex justify-center gap-5">
            <span className="w-40 h-40 flex flex-col items-center justify-center rounded-full bg-pink-50 p-4 gap-2">
                <img className='w-8 h-8' src="https://img.icons8.com/ios/50/book-and-pencil.png" alt="Vocabulary" />
                <span className="text-lg font-semibold text-gray-800">Writing</span>
            </span>
            <span className="w-40 h-40 flex flex-col items-center justify-center rounded-full bg-pink-50 p-4 gap-2">
                <img className='w-8 h-8' src="https://img.icons8.com/dotty/80/copybook.png" alt="Vocabulary" />
                <span className="text-lg font-semibold text-gray-800">Vocabulary</span>
            </span>
            <span className="w-40 h-40 flex flex-col items-center justify-center rounded-full bg-pink-50 p-4 gap-2">
                <img className='w-8 h-8' src="https://img.icons8.com/comic/100/controller.png" alt="Vocabulary" />
                <span className="text-lg font-semibold text-gray-800">Memorize</span>
            </span>
        </div>
    </>)
}