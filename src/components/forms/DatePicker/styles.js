export default (theme) => ({
    '@keyframes fpFadeInDown': {
        from: {
            opacity: '0',
            transform: 'translate3d(0, -20px, 0)',
        },
        to: {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
        },
    },
    calendarIcon: {
        cursor: 'pointer',
        width: 10,
        height: 10,
        margin: '0 0 0 5px',
        '& path': {
            fill: theme.colors.greySoft,
        },
    },
    clockIcon: {
        cursor: 'pointer',
        width: 12,
        height: 12,
        margin: '0 0 0 3px',
        '& path': {
            fill: theme.colors.greySoft,
        },
    },
    root: {},
    close: {
        position: 'relative',
        marginRight: 16,
        '&:before': {
            position: 'absolute',
            left: 18,
            content: "''",
            backgroundColor: '#CCC',
            width: 1,
            height: 9,
        },
    },
    container: {
        '& *, :after, :before': {
            boxSizing: 'inherit',
        },
        '&.flatpickr-calendar': {
            fontFamily: theme.typography.fontFamily,
            background: 'transparent',
            opacity: '0',
            display: 'none',
            textAlign: 'center',
            visibility: 'hidden',
            padding: '0',
            animation: 'none',
            direction: 'ltr',
            border: '0',
            fontSize: 14,
            lineHeight: '24px',
            borderRadius: 5,
            position: 'absolute',
            width: 307.875,
            boxSizing: 'border-box',
            touchAction: 'manipulation',
            boxShadow: '0 3px 13px rgba(0, 0, 0, 0.08)',
            marginTop: 5,
        },
        '&.flatpickr-calendar.open, &.flatpickr-calendar.inline': {
            opacity: '1',
            maxHeight: 640,
            visibility: 'visible',
        },
        '&.flatpickr-calendar.open': {
            display: 'inline-block',
            zIndex: '99999',
        },
        '&.flatpickr-calendar.animate.open': {
            animation: 'fpFadeInDown 300ms cubic-bezier(0.23, 1, 0.32, 1)',
        },
        '&.flatpickr-calendar.inline': {
            display: 'block',
            position: 'relative',
            top: 2,
        },
        '&.flatpickr-calendar.static': {
            position: 'absolute',
            top: 'calc(100% + 2px)',
        },
        '&.flatpickr-calendar.static.open': {
            zIndex: '999',
            display: 'block',
        },
        '&.flatpickr-calendar.multiMonth .flatpickr-days .dayContainer:nth-child(n+1) .flatpickr-day.inRange:nth-child(7n+7)': {
            boxShadow: 'none !important',
        },
        '&.flatpickr-calendar.multiMonth .flatpickr-days .dayContainer:nth-child(n+2) .flatpickr-day.inRange:nth-child(7n+1)': {
            boxShadow: '-2px 0 0 #e6e6e6, 5px 0 0 #e6e6e6',
        },
        '&.flatpickr-calendar .hasWeeks .dayContainer, &.flatpickr-calendar .hasTime .dayContainer': {
            borderBottom: '0',
            borderBottomRightRadius: '0',
            borderBottomLeftRadius: '0',
        },
        '&.flatpickr-calendar .hasWeeks .dayContainer': {
            borderLeft: '0',
        },
        '&.flatpickr-calendar.showTimeInput.hasTime .flatpickr-time': {
            height: 40,
            borderTop: '1px solid rgba(72, 72, 72, 0.1)',
            border: '1px solid rgba(72, 72, 72, 0.1)',
        },
        '&.flatpickr-calendar.showTimeInput.hasTime .flatpickr-innerContainer': {
            borderBottom: '0',
        },
        '&.flatpickr-calendar.noCalendar.hasTime .flatpickr-time': {
            height: 'auto',
        },
        '&.flatpickr-calendar:before, &.flatpickr-calendar:after': {
            position: 'absolute',
            display: 'block',
            pointerEvents: 'none',
            border: 'solid transparent',
            content: "''",
            height: 0,
            width: 0,
            left: 22,
        },
        '&.flatpickr-calendar.rightMost:before, &.flatpickr-calendar.rightMost:after': {
            left: 'auto',
            right: 22,
        },
        '&.flatpickr-calendar:before': {
            borderWidth: 5,
            margin: '0 -5px',
        },
        '&.flatpickr-calendar:after': {
            borderWidth: 4,
            margin: '0 -4px',
        },
        '&.flatpickr-calendar.arrowTop:before, &.flatpickr-calendar.arrowTop:after': {
            bottom: '100%',
        },
        '&.flatpickr-calendar.arrowTop:before': {
            borderBottomColor: 'rgba(72, 72, 72, 0.1)',
        },
        '&.flatpickr-calendar.arrowTop:after': {
            borderBottomColor: theme.colors.primary,
        },
        '&.flatpickr-calendar.noCalendar.arrowTop:after': {
            borderBottomColor: theme.colors.white,
            zIndex: 1000,
            top: -9,
            borderWidth: 5,
            left: 21,
        },
        '&.flatpickr-calendar.noCalendar.rightMost:after': {
            left: 'auto',
            right: 21,
        },
        '&.flatpickr-calendar.arrowBottom:before, &.flatpickr-calendar.arrowBottom:after': {
            top: '100%',
        },
        '&.flatpickr-calendar.arrowBottom:before': {
            borderTopColor: theme.colors.white,
        },
        '&.flatpickr-calendar.arrowBottom:after': {
            borderTopColor: theme.colors.white,
        },
        '&.flatpickr-calendar:focus': {
            outline: '0',
        },
        '& .flatpickr-wrapper': {
            position: 'relative',
            display: 'inline-block',
        },
        '& .flatpickr-months': {
            display: 'flex',
        },
        '& .flatpickr-months .flatpickr-month': {
            borderRadius: '5px 5px 0 0',
            background: theme.colors.primary,
            color: '#fff',
            fill: '#fff',
            height: 34,
            lineHeight: '1',
            textAlign: 'center',
            position: 'relative',
            userSelect: 'none',
            overflow: 'hidden',
            flex: '1',
        },
        '& .flatpickr-months .flatpickr-prev-month, & .flatpickr-months .flatpickr-next-month': {
            textDecoration: 'none',
            cursor: 'pointer',
            position: 'absolute',
            top: '0',
            width: 40,
            height: 40,
            padding: '7px 0',
            zIndex: '3',
            color: '#fff',
            fill: '#fff',
        },
        '& .flatpickr-months .flatpickr-prev-month.flatpickr-disabled, & .flatpickr-months .flatpickr-next-month.flatpickr-disabled': {
            display: 'none',
        },
        '& .flatpickr-months .flatpickr-prev-month i, & .flatpickr-months .flatpickr-next-month i': {
            position: 'relative',
        },
        '& .flatpickr-months .flatpickr-prev-month.flatpickr-prev-month, & .flatpickr-months .flatpickr-next-month.flatpickr-prev-month': {
            left: '0',
        },
        '& .flatpickr-months .flatpickr-prev-month.flatpickr-next-month, & .flatpickr-months .flatpickr-next-month.flatpickr-next-month': {
            right: '0',
        },
        '& .flatpickr-months .flatpickr-prev-month:hover, & .flatpickr-months .flatpickr-next-month:hover': {
            color: '#bbb',
        },
        '& .flatpickr-months .flatpickr-prev-month:hover svg, & .flatpickr-months .flatpickr-next-month:hover svg': {
            fill: theme.colors.primaryDark,
        },
        '& .flatpickr-months .flatpickr-prev-month svg, & .flatpickr-months .flatpickr-next-month svg': {
            width: 10,
            height: 10,
        },
        '& .flatpickr-months .flatpickr-prev-month svg path, & .flatpickr-months .flatpickr-next-month svg path': {
            transition: 'fill 0.1s',
            fill: 'inherit',
        },
        '& .numInputWrapper': {
            position: 'relative',
            height: 'auto',
        },
        '& .numInputWrapper input, & .numInputWrapper span': {
            display: 'inline-block',
        },
        '& .numInputWrapper input': {
            width: '100%',
        },
        '& .numInputWrapper input::-ms-clear': {
            display: 'none',
        },
        '& .numInputWrapper input::-webkit-outer-spin-button, & .numInputWrapper input::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
        },
        '& .numInputWrapper span': {
            position: 'absolute',
            right: '0',
            width: 14,
            padding: '0 4px 0 2px',
            height: '50%',
            lineHeight: '50%',
            opacity: '0',
            cursor: 'pointer',
            boxSizing: 'border-box',
        },
        '& .numInputWrapper span:hover': {
            background: 'rgba(0, 0, 0, 0.1)',
        },
        '& .numInputWrapper span:active': {
            background: 'rgba(0, 0, 0, 0.2)',
        },
        '& .numInputWrapper span:after': {
            display: 'block',
            content: '""',
            position: 'absolute',
        },
        '& .numInputWrapper span.arrowUp': {
            top: '0',
            borderBottom: '0',
        },
        '& .numInputWrapper span.arrowUp:after': {
            borderLeft: '4px solid transparent',
            borderRight: '4px solid transparent',
            borderBottom: '4px solid rgba(72, 72, 72, 0.6)',
            top: '26%',
        },
        '& .numInputWrapper span.arrowDown': {
            top: '50%',
        },
        '& .numInputWrapper span.arrowDown:after': {
            borderLeft: '4px solid transparent',
            borderRight: '4px solid transparent',
            borderTop: '4px solid rgba(72, 72, 72, 0.6)',
            top: '40%',
        },
        '& .numInputWrapper span svg': {
            width: 'inherit',
            height: 'auto',
        },
        '& .numInputWrapper span svg path': {
            fill: 'rgba(255, 255, 255, 0.5)',
        },
        '& .numInputWrapper:hover': {
            background: 'rgba(0, 0, 0, 0.05)',
        },
        '& .numInputWrapper:hover span': {
            opacity: '1',
        },
        '& .flatpickr-current-month': {
            fontSize: '135%',
            lineHeight: '1',
            fontWeight: '300',
            color: 'inherit',
            position: 'absolute',
            width: '75%',
            left: '12.5%',
            padding: '7.48px 0 0 0',
            height: 34,
            display: 'inline-block',
            textAlign: 'center',
            transform: 'translate3d(0px, 0px, 0px)',
        },
        '& .flatpickr-current-month span.cur-month': {
            fontFamily: 'inherit',
            fontWeight: '700',
            color: 'inherit',
            display: 'inline-block',
            marginLeft: '0.5ch',
            padding: '0',
        },
        '& .flatpickr-current-month span.cur-month:hover': {
            background: 'rgba(0, 0, 0, 0.05)',
        },
        '& .flatpickr-current-month .numInputWrapper': {
            width: '5.5ch',
            display: 'inline-block',
        },
        '& .flatpickr-current-month .numInputWrapper span.arrowUp:after': {
            borderBottomColor: '#fff',
        },
        '& .flatpickr-current-month .numInputWrapper span.arrowDown:after': {
            borderTopColor: '#fff',
        },
        '& .flatpickr-current-month input.cur-year': {
            background: 'transparent',
            boxSizing: 'border-box',
            color: 'inherit',
            cursor: 'text',
            padding: '0 0 0 0.5ch',
            margin: '0',
            display: 'inline-block',
            height: 22,
            border: '0',
            borderRadius: '0',
            verticalAlign: 'initial',
            '-webkit-appearance': 'textfield',
            '-moz-appearance': 'textfield',
            appearance: 'textfield',
            fontWeight: 300,
            ...theme.typography.largeText,
        },
        '& .flatpickr-current-month input.cur-year:focus': {
            outline: '0',
        },
        '& .flatpickr-current-month input.cur-year[disabled], & .flatpickr-current-month input.cur-year[disabled]:hover': {
            fontSize: '100%',
            color: 'rgba(255, 255, 255, 0.5)',
            background: 'transparent',
            pointerEvents: 'none',
        },
        '& .flatpickr-current-month .flatpickr-monthDropdown-months': {
            appearance: 'menulist',
            '-moz-appearance': 'none',
            '-webkit-appearance': 'none',
            background: theme.colors.primary,
            border: 'none',
            borderRadius: '0',
            boxSizing: 'border-box',
            color: 'inherit',
            cursor: 'pointer',
            fontSize: 'inherit',
            fontFamily: 'inherit',
            fontWeight: '300',
            height: 22,
            margin: '-1px 0 0 0',
            outline: 'none',
            padding: '0 0 0 0.5ch',
            position: 'relative',
            verticalAlign: 'initial',
            width: 'auto',
            ...theme.typography.largeText,
        },
        '& .flatpickr-current-month .flatpickr-monthDropdown-months:focus, & .flatpickr-current-month .flatpickr-monthDropdown-months:active': {
            outline: 'none',
        },
        '& .flatpickr-current-month .flatpickr-monthDropdown-months:hover': {
            background: 'rgba(0, 0, 0, 0.05)',
        },
        '& .flatpickr-current-month .flatpickr-monthDropdown-months .flatpickr-monthDropdown-month': {
            backgroundColor: theme.colors.primary,
            outline: 'none',
            border: 0,
            padding: '10px 0 10px 10px',
            ...theme.typography.largeText,
        },
        '& .flatpickr-weekdays': {
            background: theme.colors.primary,
            textAlign: 'center',
            overflow: 'hidden',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            height: 28,
        },
        '& .flatpickr-weekdays .flatpickr-weekdaycontainer': {
            display: 'flex',
            flex: '1',
        },
        '& span.flatpickr-weekday': {
            cursor: 'default',
            fontSize: '90%',
            background: theme.colors.primary,
            lineHeight: '1px',
            margin: '0',
            textAlign: 'center',
            display: 'block',
            flex: '1',
            color: theme.colors.text.white,
            ...theme.typography.smallText,
            textTransform: 'uppercase',
        },
        '& .dayContainer, & .flatpickr-weeks': {
            padding: '1px 0 0 0',
        },
        '& .flatpickr-days': {
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'flex-start',
            width: 307.875,
        },
        '& .flatpickr-days:focus': {
            outline: '0',
        },
        '& .dayContainer': {
            padding: '0',
            outline: '0',
            textAlign: 'left',
            width: 307.875,
            minWidth: 307.875,
            maxWidth: 307.875,
            boxSizing: 'border-box',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            transform: 'translate3d(0px, 0px, 0px)',
            opacity: '1',
        },
        '& .dayContainer+ & .dayContainer': {
            boxShadow: '-1px 0 0 rgba(72, 72, 72, 0.1)',
        },
        '& .flatpickr-day': {
            background: 'none',
            border: '1px solid transparent',
            borderRadius: 150,
            boxSizing: 'border-box',
            color: theme.colors.black,
            cursor: 'pointer',
            fontWeight: '400',
            width: '14.2857143%',
            flexBasis: '14.2857143%',
            maxWidth: 39,
            height: 39,
            lineHeight: '39px',
            margin: '0',
            display: 'inline-block',
            position: 'relative',
            justifyContent: 'center',
            textAlign: 'center',
            ...theme.typography.defaultText,
        },
        '& .flatpickr-day.inRange, & .flatpickr-day.prevMonthDay.inRange, & .flatpickr-day.nextMonthDay.inRange, & .flatpickr-day.today.inRange, & .flatpickr-day.prevMonthDay.today.inRange, & .flatpickr-day.nextMonthDay.today.inRange, & .flatpickr-day:hover, & .flatpickr-day.prevMonthDay:hover, & .flatpickr-day.nextMonthDay:hover, & .flatpickr-day:focus, & .flatpickr-day.prevMonthDay:focus, & .flatpickr-day.nextMonthDay:focus': {
            cursor: 'pointer',
            outline: '0',
            color: theme.colors.white,
            background: theme.colors.primary,
            borderColor: theme.colors.primary,
        },
        '& .flatpickr-day.today': {
            borderColor: theme.colors.primarySoft,
        },
        '& .flatpickr-day.today:hover, & .flatpickr-day.today:focus': {
            borderColor: theme.colors.primary,
            background: theme.colors.primary,
            color: '#fff',
        },
        '& .flatpickr-day.selected, & .flatpickr-day.startRange, & .flatpickr-day.endRange, & .flatpickr-day.selected.inRange, & .flatpickr-day.startRange.inRange, & .flatpickr-day.endRange.inRange, & .flatpickr-day.selected:focus, & .flatpickr-day.startRange:focus, & .flatpickr-day.endRange:focus, & .flatpickr-day.selected:hover, & .flatpickr-day.startRange:hover, & .flatpickr-day.endRange:hover, & .flatpickr-day.selected.prevMonthDay, & .flatpickr-day.startRange.prevMonthDay, & .flatpickr-day.endRange.prevMonthDay, & .flatpickr-day.selected.nextMonthDay, & .flatpickr-day.startRange.nextMonthDay, & .flatpickr-day.endRange.nextMonthDay': {
            background: theme.colors.primary,
            boxShadow: 'none',
            color: '#fff',
            borderColor: theme.colors.primary,
        },
        '& .flatpickr-day.selected.startRange, & .flatpickr-day.startRange.startRange, & .flatpickr-day.endRange.startRange': {
            borderRadius: '50px 0 0 50px',
        },
        '& .flatpickr-day.selected.endRange, & .flatpickr-day.startRange.endRange, & .flatpickr-day.endRange.endRange': {
            borderRadius: '0 50px 50px 0',
        },
        '& .flatpickr-day.selected.startRange+ & .endRange:not(:nth-child(7n+1)), & .flatpickr-day.startRange.startRange+ & .endRange:not(:nth-child(7n+1)), & .flatpickr-day.endRange.startRange+ & .endRange:not(:nth-child(7n+1))': {
            boxShadow: `-10px 0 0 ${theme.colors.primary}`,
        },
        '& .flatpickr-day.selected.startRange.endRange, & .flatpickr-day.startRange.startRange.endRange, & .flatpickr-day.endRange.startRange.endRange': {
            borderRadius: 50,
        },
        '& .flatpickr-day.inRange': {
            borderRadius: '0',
            boxShadow: '-5px 0 0 #e2e2e2, 5px 0 0 #e2e2e2',
        },
        '& .flatpickr-day.flatpickr-disabled, & .flatpickr-day.flatpickr-disabled:hover, & .flatpickr-day.prevMonthDay, & .flatpickr-day.nextMonthDay, & .flatpickr-day.notAllowed, & .flatpickr-day.notAllowed.prevMonthDay, & .flatpickr-day.notAllowed.nextMonthDay': {
            color: theme.colors.disabledGrey,
            background: 'transparent',
            borderColor: 'transparent',
            cursor: 'default',
        },
        '& .flatpickr-day.flatpickr-disabled, & .flatpickr-day.flatpickr-disabled:hover': {
            cursor: 'not-allowed',
            color: 'rgba(72, 72, 72, 0.1)',
        },
        '& .flatpickr-day.week.selected': {
            borderRadius: '0',
            boxShadow: `-5px 0 0 ${theme.colors.primary}, 5px 0 0 ${theme.colors.primary}`,
        },
        '& .flatpickr-day.hidden': {
            visibility: 'hidden',
        },
        '& .rangeMode .flatpickr-day': {
            marginTop: 1,
        },
        '& .flatpickr-weekwrapper': {
            float: 'left',
        },
        '& .flatpickr-weekwrapper .flatpickr-weeks': {
            padding: '0 12px',
            borderLeft: '1px solid rgba(72, 72, 72, 0.1)',
        },
        '& .flatpickr-weekwrapper .flatpickr-weekday': {
            float: 'none',
            width: '100%',
            lineHeight: '28px',
        },
        '& .flatpickr-weekwrapper span.flatpickr-day, & .flatpickr-weekwrapper span.flatpickr-day:hover': {
            display: 'block',
            width: '100%',
            maxWidth: 'none',
            color: 'rgba(72, 72, 72, 0.3)',
            background: 'transparent',
            cursor: 'default',
            border: 'none',
        },
        '& .flatpickr-innerContainer': {
            display: 'flex',
            boxSizing: 'border-box',
            overflow: 'hidden',
            background: '#fff',
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
        },
        '& .flatpickr-rContainer': {
            display: 'inline-block',
            padding: '0',
            boxSizing: 'border-box',
        },
        '& .flatpickr-time': {
            textAlign: 'center',
            outline: '0',
            display: 'flex',
            height: '0',
            lineHeight: '40px',
            maxHeight: 40,
            boxSizing: 'border-box',
            overflow: 'hidden',
            background: '#fff',
            borderRadius: '0 0 5px 5px',
        },
        '& .flatpickr-time:after': {
            content: '""',
            display: 'table',
            clear: 'both',
        },
        '& .flatpickr-time .numInputWrapper': {
            flex: '1',
            width: '40%',
            height: 40,
            float: 'left',
        },
        '& .flatpickr-time .numInputWrapper span.arrowUp:after': {
            borderBottomColor: theme.colors.blackLight,
        },
        '& .flatpickr-time .numInputWrapper span.arrowDown:after': {
            borderTopColor: theme.colors.blackLight,
        },
        '& .flatpickr-time.hasSeconds .numInputWrapper': {
            width: '26%',
        },
        '& .flatpickr-time.time24hr .numInputWrapper': {
            width: '49%',
        },
        '& .flatpickr-time input': {
            background: 'transparent',
            boxShadow: 'none',
            border: '0',
            borderRadius: '0',
            textAlign: 'center',
            margin: '0',
            padding: '0',
            height: 'inherit',
            lineHeight: 'inherit',
            color: theme.colors.black,
            position: 'relative',
            boxSizing: 'border-box',
            appearance: 'textfield',
            ...theme.typography.largeText,
        },
        '& .flatpickr-time input.flatpickr-hour': {
            fontWeight: 'bold',
        },
        '& .flatpickr-time input.flatpickr-minute, & .flatpickr-time input.flatpickr-second': {
            fontWeight: '400',
        },
        '& .flatpickr-time input:focus': {
            outline: '0',
            border: '0',
        },
        '& .flatpickr-time .flatpickr-time-separator, & .flatpickr-time .flatpickr-am-pm': {
            height: 'inherit',
            float: 'left',
            lineHeight: 'inherit',
            color: theme.colors.blackLight,
            fontWeight: 'bold',
            width: '2%',
            userSelect: 'none',
            alignSelf: 'center',
        },
        '& .flatpickr-time .flatpickr-am-pm': {
            outline: '0',
            width: '18%',
            cursor: 'pointer',
            textAlign: 'center',
            fontWeight: '400',
        },
        '& .flatpickr-input[readonly]': {
            cursor: 'pointer',
        },
    },
});
