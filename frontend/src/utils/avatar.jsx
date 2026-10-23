import { createAvatar } from '@dicebear/core'
import { initials } from '@dicebear/collection'

export function UserAvatar({ fullName, picture, showInitialsFallback = false }) {
    if (picture) {
        return (
            <img
                src={picture}
                alt={`${fullName}'s Profile`}
                className='shrink-0 size-12 rounded-full object-cover overflow-hidden bg-slate-800'
            />
        )
    }

    if (!showInitialsFallback) {
        return null
    }

    const avatar = createAvatar(initials, {
        seed: fullName,
        radius: 50,
    });

    const svgDataUri = avatar.toDataUri();

    return (
        <img
            src={svgDataUri}
            alt={`${fullName}'s Profile`}
            className='shrink-0 size-12 rounded-full object-cover overflow-hidden bg-slate-800'
        />
    )
}