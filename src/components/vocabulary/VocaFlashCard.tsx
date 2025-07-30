import rocketSrc from "../../assets/images/topic/rocket-s.png"
import { useState } from "react";

export const VocaFlashCard = () => {
    const [isFlip, setIsFlip] = useState(false);

    return (
        <div className="relative h-[450px] w-[350px] mx-auto [perspective:1000px]"
            onClick={() => setIsFlip(!isFlip)}
        >
            {/* Flip container with 3D transform */}
            <div 
                className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
                    isFlip ? '[transform:rotateY(180deg)]' : ''
                }`}
            >
                {/* Front side */}
                <div className="absolute w-full h-full [backface-visibility:hidden] bg-blue-50 shadow-[0_0_24px_0_rgba(255,218,224,0.8)] rounded-3xl">
                    {/* Flip tag */}
                    <div className="absolute top-0 left-0 bg-blue-200 py-2 px-4 rounded-tl-3xl rounded-br-3xl">
                        <img className="w-4 h-4" src="https://img.icons8.com/forma-thin/24/return.png" alt="return" />
                    </div>

                    {/* Word block */}
                    <div className="mt-6">
                        <img className="w-[180px] h-[140px] bg-yellow-50 rounded-3xl mx-auto p-2" src={rocketSrc} alt="voca flash card" />
                        <p className="text-xl text-gray-400 font-medium text-center mt-6">to wear a piece of clothing</p>
                    </div>

                    {/* Action */}
                    <div className="absolute bottom-20 w-full flex gap-0 mx-0 mt-4">
                        {/* Left */}
                        <button className="w-1/2 border-t-[3px] border-red-400 relative bg-blue-500 group"
                            onClick={(e) => {
                                e.stopPropagation();
                                console.log("Don't know it");
                            }}
                        >
                            <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white border-[3px] border-red-400 rounded-full p-1.5
                            group-hover:bg-red-400 transition-all duration-300">
                                <img className="w-6 h-6" src="https://img.icons8.com/ios/50/multiply.png" alt="multiply"/>
                            </span>
                            <span className="absolute top-5 left-1/2 -translate-x-1/2 text-sm font-medium text-red-400">Don't know it</span>
                        </button>
                        
                        {/* Right */}
                        <button className="w-1/2 border-t-[3px] border-green-400 relative bg-pink-500 group"
                            onClick={(e) => {
                                e.stopPropagation();
                                console.log("Know it");
                            }}
                        >
                            <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white border-[3px] border-green-400 rounded-full p-1.5
                            group-hover:bg-green-400 transition-all duration-300">
                                <img className="w-6 h-6" src="https://img.icons8.com/ios/50/checkmark.png" alt="checkmark"/>
                            </span>
                            <span className="absolute top-5 left-1/2 -translate-x-1/2 text-sm font-medium text-green-400">Know it</span>
                        </button>
                    </div>

                    
                </div>

                {/* Back side */}
                <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-blue-50 shadow-[0_0_24px_0_rgba(255,218,224,0.8)] rounded-3xl p-4">
                    {/* Flip tag */}
                    <div className="absolute top-0 left-0 bg-blue-200 py-2 px-4 rounded-tl-3xl rounded-br-3xl">
                        <img className="w-4 h-4" src="https://img.icons8.com/forma-thin/24/return.png" alt="return" />
                    </div>

                    {/* Word block */}
                    <div className="flex flex-col gap-2">
                        <img className="w-[150px] h-[110px] bg-yellow-50 rounded-3xl mx-auto p-2" src={rocketSrc} alt="voca flash card" />
                        <h3 className="text-3xl text-gray-600 font-medium text-center flex items-center justify-center gap-2">
                            appetizer
                        </h3>
                        <p className="text-gray-500 flex items-center justify-center gap-1"> 
                            <button className="p-1.5 hover:bg-white rounded-lg transition-all duration-300"
                            onClick={(e) => {
                                e.stopPropagation();
                                console.log("Play sound");
                            }}>
                                <img className="w-4 h-4" src="https://img.icons8.com/ios/50/room-sound.png" alt="room-sound"/>
                            </button>
                            <span>/ˈæpɪtaɪzər/</span>
                        </p>
                        <p className="text-gray-500 text-center">[noun]</p>
                    </div>


                    {/* Examples block */}
                    <div className="bg-white rounded-xl p-4 mt-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-1">
                                <img className="w-5 h-5" src="https://img.icons8.com/small/32/ask-question.png" alt="question-mark"/>
                                <h5 className="text-gray-600 font-semibold">
                                    Examples
                                </h5>
                            </div>
                            <img className="w-5 h-5" src="https://img.icons8.com/pastel-glyph/64/brain--v1.png" alt="brain"/>
                        </div>

                        <ul className="list-disc list-inside text-gray-600">
                            <li className="text-sm mb-2">The theater downtown is putting on a Shakespeare production.</li>
                            <li className="text-sm">They are putting on a musical at the local theater next month.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}