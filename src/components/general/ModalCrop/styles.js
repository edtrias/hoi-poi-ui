import reactCropStyles from './reactCrop.styles';

export default (theme) => ({
    // Main modal container styles - centers the content
    cropModal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Content container with border and background
    cropModalContent: {
        position: 'relative',
        borderRadius: 4,
        padding: 22,
        border: `1px dashed ${theme.colors.grey[100]}`,
        backgroundColor: theme.colors.grey[100],
    },
    // Canvas container for the crop component
    cropCanvas: {
        position: 'relative',
        overflow: 'hidden',
        ...reactCropStyles(theme),
        '&:focus': {
            outline: 'none',
        },
    },
});
