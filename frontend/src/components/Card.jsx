import * as Icons from 'lucide-react'

export default function Card({ title, value, iconName, iconColor, textColor, fontSize }) {
    const Icon = Icons[iconName]

    return (
        <main className='flex px-3 py-3  rounded-md lg:rounded-xl lg:py-4 shadow-[0_0_6.6px_1px_rgba(0,0,0,0.20)] lg:px-3 lg:gap-6 bg-card-white text-black'>
            <section className='flex-col'>
                <h2 className='text-black font-semilight text-sm  lg:font-semibold '>{title}</h2>
                <h2 className={`font-bold ${fontSize}  ${textColor}`} >{value}</h2>
            </section>

            <section className={`lg:self-center py-2 px-2 self-start ${iconColor}  rounded-md p-2`}>
                <Icon
                    strokeWidth={1.5}
                    className='w-8 h-8 lg:w-8 lg:h-8 text-white' />
            </section>
        </main>
    )
}