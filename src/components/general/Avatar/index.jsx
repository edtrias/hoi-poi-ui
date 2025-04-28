import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import SingleAvatar from './SingleAvatar';
import MultiAvatar from './MultiAvatar';

const Avatar = memo(({ sources, type = 'round', size = 'medium', ...props }) => {
    const Component = sources ? MultiAvatar : SingleAvatar;

    const finalProps = useMemo(
        () => (sources ? { sources, type, size, ...props } : { type, size, ...props }),
        [props, size, sources, type],
    );

    return <Component {...finalProps} />;
});

Avatar.propTypes = {
    /** Array of avatar sources for displaying multiple avatars together */
    sources: PropTypes.arrayOf(
        PropTypes.shape({
            /** Image URL for the avatar */
            src: PropTypes.string,
            /** Fallback image URL if main image fails to load */
            placeholder: PropTypes.string,
            /** Alternative text for the image, also used to generate initials when no image is available */
            alt: PropTypes.string,
        }),
    ),
    /** Image URL for a single avatar */
    src: PropTypes.string,
    /** Fallback image URL if main image fails to load */
    placeholder: PropTypes.string,
    /** Alternative text for the image, also used to generate initials when no image is available */
    alt: PropTypes.string,
    /** Icon name to display when no image or initials are available */
    icon: PropTypes.string,
    /** Avatar shape: 'round' for circular, 'square' for square with slight border radius */
    type: PropTypes.oneOf(['round', 'square']),
    /** Size of the avatar, affects dimensions */
    size: PropTypes.oneOf(['tiny', 'small', 'medium', 'large', 'big', 'huge']),
};

export default Avatar;
