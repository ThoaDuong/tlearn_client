import { Link } from "react-router-dom";
import bookSrc from "../../assets/images/home/book.jpg";
import Topic from "../../interfaces/Topic";

type TopicCardProps = {
    topic: Topic
}

export const TopicCard = ({ topic }: TopicCardProps) => {
    const topicCard = [
        {
            id: '1000',
            name: '1000 common words',
            words: 1000,
        },
        {
            id: '2000',
            name: '2000 common words',
            words: 2000,
        },
        {
            id: '3000',
            name: '3000 common words',
            words: 3000,
        }
    ]
    const topicDetail = [
        {
            id: '1',
            topicCardID: '1000',
            name: 'Family and Relationships',
            image: 'https://img.icons8.com/ios/50/book-and-pencil.png',
            wordDetail: [
                {
                    id: '1',
                    text: 'appetizer',
                    pronunciation: '/test/',
                    type: 'noun',
                    examples: ['The appetizer was delicious.', 'The appetizer was delicious.'],
                    image: 'https://img.icons8.com/ios/50/book-and-pencil.png'
                },
                {
                    id: '2',
                    text: 'appetizer',
                    pronunciation: '/test/',
                    type: 'noun',
                    examples: ['The appetizer was delicious.', 'The appetizer was delicious.'],
                    image: 'https://img.icons8.com/ios/50/book-and-pencil.png'
                },
            ]
        },
        {
            id: '2',
            topicCardID: '1000',
            name: 'Food',
            image: 'https://img.icons8.com/ios/50/book-and-pencil.png',
            wordDetail: []
        },
        {
            id: '3',
            topicCardID: '2000',
            name: 'Family and Relationships',
            image: 'https://img.icons8.com/ios/50/book-and-pencil.png',
            wordDetail: []
        }
    ]

    return (
        <Link to={`/topic/${topic.id}`} className="w-full bg-white rounded-2xl p-4 shadow-md">
            <img className="mx-auto w-[100px] h-[100px] md:w-[150px] md:h-[150px] object-cover rounded-full" src={bookSrc} alt="book"/>

            <h3 className="text-lg text-center text-gray-700 mt-2 md:mt-4"> {topic.name} </h3>

            <div className="flex justify-between items-center mt-2 md:mt-4">
                <span className="text-sm text-gray-500"> {topic.words} words</span>
                <button className=" px-4 py-2 rounded-md">
                    <img className="w-4 h-4" src="https://img.icons8.com/ios/50/long-arrow-right.png" alt="long-arrow-right"/>
                </button>
            </div>
        </Link>
    )
}