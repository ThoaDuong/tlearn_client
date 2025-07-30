import { VocaFlashCard } from "../components/vocabulary/VocaFlashCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';

export const FlashCardPage = () => {
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
                    <SwiperSlide className="rounded-3xl"><VocaFlashCard /></SwiperSlide>
                    <SwiperSlide className="rounded-3xl"><VocaFlashCard /></SwiperSlide>
                    <SwiperSlide className="rounded-3xl"><VocaFlashCard /></SwiperSlide>
                    <SwiperSlide className="rounded-3xl"><VocaFlashCard /></SwiperSlide>
                    <SwiperSlide className="rounded-3xl"><VocaFlashCard /></SwiperSlide>
                </Swiper>

                {/* Navigation buttons */}
                {/* <button className="swiper-button-prev ml-10" aria-label="Previous"></button>
                <button className="swiper-button-next mr-10" aria-label="Next"></button> */}
            </div>
        </div>
    )
}