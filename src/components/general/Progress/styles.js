export default (theme) => ({
    // Keyframe animation for transitioning between progress values
    '@keyframes progressAnimation': {
        from: { width: 'var(--progress-percentage-from)' },
        to: { width: 'var(--progress-percentage-to)' },
    },
    // Root container for the progress bar
    root: {
        display: 'block',
        height: 4,
        border: 'none',
        borderRadius: 2,
        overflow: 'hidden',
        backgroundColor: theme.colors.grey[50],
    },
    // Inner element that shows the actual progress
    progressBar: {
        display: 'block',
        height: 'inherit',
        borderRadius: 2,
    },
    // Styles for progress less than 25%
    low: {
        '& $progressBar': {
            background: theme.colors.semantic.positiveCustom200,
        },
    },
    // Styles for progress between 25% and 49%
    medium: {
        '& $progressBar': {
            background: theme.colors.semantic.positiveCustom300,
        },
    },
    // Styles for progress between 50% and 74%
    high: {
        '& $progressBar': {
            background: theme.colors.semantic.positive400,
        },
    },
    // Styles for progress between 75% and 99%
    higher: {
        '& $progressBar': {
            background: theme.colors.semantic.positive500,
        },
    },
    // Styles for progress at 100% or above
    full: {
        '& $progressBar': {
            background: theme.colors.semantic.negative500,
        },
    },
    // Styles applied when animation is enabled
    animated: {
        '& $progressBar': {
            animationName: '$progressAnimation',
            animationDuration: 'var(--progress-duration)',
            animationDelay: 'var(--progress-delay)',
            animationTimingFunction: 'var(--progress-timing-function)',
            transition: 'all var(--progress-duration) var(--progress-timing-function)',
        },
    },
});
