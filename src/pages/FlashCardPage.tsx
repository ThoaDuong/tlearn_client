import { VocaFlashCard } from "../components/vocabulary/VocaFlashCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../stores/store";
import { useParams } from "react-router-dom";
import WordDetail from "../interfaces/WordDetail";
import { useEffect } from "react";
import { fetchWordDetailList, fetchTopicDetailList } from "../stores/slices/topicSlice";

export const FlashCardPage = () => {

    const { topicCardID, detailID } = useParams();
    const topicStore = useSelector((state: RootState) => state.topic);
    const dispatch: AppDispatch =  useDispatch();


    useEffect(() => {
        if(topicCardID){   
            dispatch(fetchTopicDetailList(topicCardID));
        }
    },  [topicCardID]);

    useEffect(() => {
        if(topicStore.listTopicDetail && detailID){
            dispatch(fetchWordDetailList(detailID));
        }
    }, [topicStore.listTopicDetail, detailID])

    useEffect(() =>  {
        console.log('listWordDetail', topicStore.listWordDetail);
    },  [topicStore.listWordDetail]);


    return (
        <div>
            <h1 className="mt-10 text-2xl font-bold text-center text-gray-800">Flash Card</h1>
            
            <div className="mt-10">
                <Swiper
                    effect={'cards'}
                    grabCursor={true}
                    modules={[EffectCards, Navigation]}
                    navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
                    className="max-w-[350px]"
                >
                    {
                        topicStore.listWordDetail?.map((detail: WordDetail) => (
                            <SwiperSlide key={detail.id} className="rounded-3xl">
                                <VocaFlashCard detail={detail} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>

                {/* Navigation buttons */}
                {/* <button className="swiper-button-prev ml-10" aria-label="Previous"></button>
                <button className="swiper-button-next mr-10" aria-label="Next"></button> */}
            </div>
        </div>
    )
}