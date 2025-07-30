import earthSrc from '../../assets/images/home/earth-trans.png'

export const TopicDetail = () => {
    return (<>
        <div className="bg-blue-50 rounded-3xl p-4">
            <div className="flex gap-4">
                <div className="w-32">
                    <img className="w-full h-full rounded-3xl object-cover" src={earthSrc} alt="literature"/>
                </div>
                <div className="w-full flex flex-col justify-between">
                    <h3 className="text-xl font-medium">1. Family and Relationships</h3>
                    <div className="flex justify-between gap-4">
                        {/* Left */}
                        <div className="flex gap-2">
                            <div className="bg-pink-100 p-2 rounded-xl">
                                <img className='w-6 h-6' src="https://img.icons8.com/dotty/80/copybook.png" alt="Vocabulary" />
                            </div>
                            <div className="bg-pink-100 p-2 rounded-xl">
                                <img className='w-6 h-6' src="https://img.icons8.com/comic/100/controller.png" alt="Vocabulary" />
                            </div>
                            <div className="bg-pink-100 p-2 rounded-xl">
                                <img className='w-6 h-6' src="https://img.icons8.com/ios/50/book-and-pencil.png" alt="Writing" />
                            </div>
                        </div>
                        {/* Right */}
                        <div className="flex justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <img className="w-4 h-4" src="https://img.icons8.com/forma-thin-sharp/24/book.png" alt="book"/>
                                <span className="text-gray-500">32 words</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <img className="w-4 h-4" src="https://img.icons8.com/fluency-systems-regular/50/clock--v3.png" alt="clock"/>
                                <span className="text-gray-500">15m</span>
                            </div>
                            <button className="flex gap-1 items-center bg-blue-200 text-gray-800 px-6 py-2 rounded-3xl">
                                <span className="mr-2">Start</span>
                                <img className="w-4 h-4" src="https://img.icons8.com/ios/50/long-arrow-right.png" alt="long-arrow-right"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}