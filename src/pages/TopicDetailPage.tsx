import rocketSrc from "../assets/images/topic/rocket.jpg";
import { TopicCardDetail } from "../components/topic/TopicDetail";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../stores/store";
import { useEffect } from "react";
import { fetchTopicDetailList } from "../stores/slices/topicSlice";

export const TopicDetailPage = () => {
    const { topicCardID } = useParams();
    // redux
    const topicStore = useSelector((state: RootState) => state.topic);
    const dispatch: AppDispatch =  useDispatch();

    useEffect(() => {
        if(topicCardID) {
            dispatch(fetchTopicDetailList(topicCardID));
        }
    }, [topicCardID]);

    useEffect(() => {
        console.log('topicStore.listTopicDetail', topicStore.listTopicDetail);
    }, [topicStore.listTopicDetail])

    return (<div>
        {/* Head */}
        <div className="flex gap-10 mt-10">
            {/* Left */}
            <div className="w-4/5 flex flex-col gap-4">
                <h2 className="text-3xl font-semibold">English B1 Vocabulary (Intermediate)</h2>
                <p className="text-gray-600">Here you will find 58 lessons categorized by topic, difficulty, and usage according to CEFR. This is the third step in your vocabulary learning journey.</p>
                <div className="w-1/2 flex justify-between">
                    <div className="flex items-center gap-2">
                        <img className="w-4 h-4" src="https://img.icons8.com/ios/50/literature.png" alt="literature"/>
                        <span className="text-gray-500">58 lessons</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <img className="w-4 h-4" src="https://img.icons8.com/forma-thin-sharp/24/book.png" alt="book"/>
                        <span className="text-gray-500">1000 words</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <img className="w-4 h-4" src="https://img.icons8.com/fluency-systems-regular/50/clock--v3.png" alt="clock"/>
                        <span className="text-gray-500">15h 25m</span>
                    </div>
                </div>
            </div>
            {/* Right */}
            <div className="w-1/5">
                <img className="w-full h-auto rounded-3xl" src={rocketSrc} alt="book" />
            </div>
        </div>

        {/* Detail */}
        <div className="mt-10 flex flex-col gap-4">
            {
                topicStore.listTopicDetail.map((detail) => (
                    <TopicCardDetail key={detail.id} detail={detail} /> 
                ))
            }
        </div>
    </div>)
}