import logoSrc from "../assets/logo-fit.png";


type FooterProps = {
    isPositionFix: boolean
}

export const Footer = ({ isPositionFix }: FooterProps) => {

    return (<div className={`bottom-0 left-0 ${isPositionFix ? 'fixed' : 'static'}`}>
        {/*First line*/}
        <div className='t_container py-10 bg-gray-50 flex items-center gap-32'>
            <div className='w-1/3 flex flex-col gap-3'>
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
            <div className='w-2/3 flex justify-between'>
                <div>
                    <h3 className='font-semibold text-gray-700'>Quick access</h3>
                    <ul>
                        <li className='leading-relaxed'>Home</li>
                        <li className='leading-relaxed'>About Us</li>
                        <li className='leading-relaxed'>Help Center</li>
                    </ul>
                </div>

                <div>
                    <h3 className='font-semibold text-gray-700'>Vocabulary</h3>
                    <ul>
                        <li className='leading-relaxed'>Level-based</li>
                        <li className='leading-relaxed'>Topic-related</li>
                    </ul>
                </div>

                <div>
                    <h3 className='font-semibold text-gray-700'>Writing</h3>
                    <ul>
                        <li className='leading-relaxed'>Level-based</li>
                        <li className='leading-relaxed'>Topic-related</li>
                    </ul>
                </div>

                <div>
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

        {/*Second line*/}
        <div className='t_container t_head-style'>
            <span className='text-white text-center'>Copyright ©2024. From TLearn with luv.</span>
        </div>
    </div>)
}