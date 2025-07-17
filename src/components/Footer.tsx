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
                    <h3 className='font-semibold text-gray-700'>About</h3>
                    <ul>
                        <li className='leading-relaxed'>About Us</li>
                        <li className='leading-relaxed'>Q&A</li>
                    </ul>
                </div>

                <div>
                    <h3 className='font-semibold text-gray-700'>Contact</h3>
                    <ul>
                        <li className='leading-relaxed'>About Us</li>
                        <li className='leading-relaxed'>Q&A</li>
                    </ul>
                </div>

                <div>
                    <h3 className='font-semibold text-gray-700'>Recommend Website</h3>
                    <ul>
                        <li className='leading-relaxed'>lootoo</li>
                        <li className='leading-relaxed'>kaplay</li>
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