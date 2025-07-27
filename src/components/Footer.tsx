import logoSrc from "../assets/images/header/logo-fit.png";


type FooterProps = {
    isPositionFix: boolean
}

export const Footer = ({ isPositionFix }: FooterProps) => {

    return (<div className={`w-full mt-20 bottom-0 left-0 static`}>
        {/*First line*/}
        <div className='t_container py-10 bg-gray-50 flex flex-col lg:flex-row items-center gap-5 lg:gap-32'>
            {/*Left*/}
            <div className='w-full lg:w-1/3 flex flex-col items-center lg:items-start gap-3'>
                <div className='flex gap-2 items-center'>
                    <img className='w-12 h-auto' src={logoSrc} alt='Logo' />
                    <h3 className='font-semibold text-lg text-gray-700'>TLearn</h3>
                </div>

                <p className='leading-tight'>
                    TLearn is a language learning website. Enjoy your learning here!
                </p>

                <div className='flex gap-1 items-center'>
                    <img className='w-5 h-auto' src="https://img.icons8.com/pastel-glyph/64/secured-letter--v1.png" alt="new-post--v2"/>
                    <span>kimthoa2598@gmail.com</span>
                </div>
            </div>

            {/*Right*/}
            <div className='w-full lg:w-2/3 flex flex-col sm:flex-row justify-between'>
                <div className='w-full flex justify-around'>
                    <div className='min-w-[110px]'>
                        <h3 className='font-semibold text-gray-700'>Quick access</h3>
                        <ul>
                            <li className='leading-relaxed'>Home</li>
                            <li className='leading-relaxed'>About Us</li>
                            <li className='leading-relaxed'>Help Center</li>
                        </ul>
                    </div>

                    <div className='min-w-[110px]'>
                        <h3 className='font-semibold text-gray-700'>Vocabulary</h3>
                        <ul>
                            <li className='leading-relaxed'>Level-based</li>
                            <li className='leading-relaxed'>Topic-related</li>
                        </ul>
                    </div>
                </div>

                <div className='w-full flex justify-around mt-5 sm:mt-0'>
                    <div className='min-w-[110px]'>
                        <h3 className='font-semibold text-gray-700'>Writing</h3>
                        <ul>
                            <li className='leading-relaxed'>Level-based</li>
                            <li className='leading-relaxed'>Topic-related</li>
                        </ul>
                    </div>

                    <div className='min-w-[110px]'>
                        <h3 className='font-semibold text-gray-700'>Social</h3>
                        <ul>
                            <li className='my-2 flex gap-3'>
                                <img className='h-8 w-8 bg-pink-100 rounded-lg p-1' src="https://img.icons8.com/fluency/48/linkedin.png" alt="linkedin"/>
                                <img className='h-8 w-8 bg-pink-100 rounded-lg p-1' src="https://img.icons8.com/ios-filled/50/github.png" alt="github"/>
                            </li>
                            <li className='flex gap-3'>
                                <img className='h-8 w-8 bg-pink-100 rounded-lg p-1' src="https://img.icons8.com/color/48/youtube-play.png" alt="youtube-play"/>
                                <img className='h-8 w-8 bg-pink-100 rounded-lg p-1' src="https://img.icons8.com/fluency/48/gmail-new.png" alt="gmail-new"/>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>

        {/*Second line*/}
        <div className='t_container t_head-style'>
            <div className='w-full text-white text-center lg:text-left'>Copyright ©2025. From TLearn with luv.</div>
        </div>
    </div>)
}