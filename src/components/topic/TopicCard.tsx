import bookSrc from "../../assets/images/home/book.jpg";

export const TopicCard = () => {
    return (
        <div className="w-full bg-white rounded-2xl p-4 shadow-md">
            <img className="mx-auto w-[100px] h-[100px] md:w-[150px] md:h-[150px] object-cover rounded-full" src={bookSrc} alt="book"/>

            <h3 className="text-lg text-center text-gray-700 mt-2 md:mt-4">Topic Name</h3>

            <div className="flex justify-between items-center mt-2 md:mt-4">
                <span className="text-sm text-gray-500">100 words</span>
                <button className=" px-4 py-2 rounded-md">
                    <img className="w-4 h-4" src="https://img.icons8.com/ios/50/long-arrow-right.png" alt="long-arrow-right"/>
                </button>
            </div>
        </div>
    )
}