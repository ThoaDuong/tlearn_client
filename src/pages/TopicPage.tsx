import { useSelector } from "react-redux";
import { RootState } from "../stores/store";
import { TopicCard } from "../components/topic/TopicCard";

export const TopicPage = () => {
    // redux
    const topicStore = useSelector((state: RootState) => state.topic);

    return (
        <div>
            <h1 className="text-center text-xl">Topic Page</h1>

            <div className="w-full flex justify-center items-center gap-4">
            {
                topicStore?.listTopic?.map((topic) => (
                    <TopicCard key={topic.id} topic={topic}/>
                ))
            }
            </div>
        </div>
    )
}