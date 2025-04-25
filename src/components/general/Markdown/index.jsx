import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';
import { getOverrides, useClasses } from '../../../utils/overrides';
import { createUseStyles } from '../../../utils/styles';
import Text from '../../typography/Text';
import List from './components/List';
import Link from './components/Link';

import styles from './styles';

const useStyles = createUseStyles(styles, 'Markdown');

const Markdown = memo(
    ({
        classes: classesProp,
        className: classNameProp,
        components,
        content,
        linkCallback,
        overrides: overridesProp,
    }) => {
        const classes = useClasses(useStyles, classesProp);
        const override = getOverrides(overridesProp, Markdown.overrides);

        const rootProps = useMemo(
            () => ({
                className: classNames(classes.root, classNameProp),
                children: content,
                components: {
                    a: ({ node, children, ...props }) => (
                        <Link
                            variation="primary"
                            callback={linkCallback}
                            {...props}
                            {...override.a}
                        >
                            {children}
                        </Link>
                    ),
                    p: ({ children }) => (
                        <Text type="body" as="p" className={classes.block} {...override.p}>
                            {children}
                        </Text>
                    ),
                    h1: ({ children }) => (
                        <Text type="h1" as="h1" className={classes.block} {...override.h1}>
                            {children}
                        </Text>
                    ),
                    h2: ({ children }) => (
                        <Text type="h2" as="h2" className={classes.block} {...override.h2}>
                            {children}
                        </Text>
                    ),
                    h3: ({ children }) => (
                        <Text type="h3" as="h3" className={classes.block} {...override.h3}>
                            {children}
                        </Text>
                    ),
                    h4: ({ children }) => (
                        <Text type="h4" as="h4" className={classes.block} {...override.h4}>
                            {children}
                        </Text>
                    ),
                    h5: ({ children }) => (
                        <Text type="h5" as="h5" className={classes.block} {...override.h5}>
                            {children}
                        </Text>
                    ),
                    h6: ({ children }) => (
                        <Text type="h6" as="h6" className={classes.block} {...override.h6}>
                            {children}
                        </Text>
                    ),
                    ul: ({ children }) => (
                        <List items={children} bullet="arrowRight" {...override.ul} />
                    ),
                    ol: ({ children }) => <List items={children} type="ordered" {...override.ol} />,
                    ...components,
                },
                ...override.root,
            }),
            [
                classNameProp,
                classes.block,
                classes.root,
                components,
                content,
                linkCallback,
                override.a,
                override.h1,
                override.h2,
                override.h3,
                override.h4,
                override.h5,
                override.h6,
                override.ol,
                override.p,
                override.root,
                override.ul,
            ],
        );

        return <ReactMarkdown {...rootProps} />;
    },
);

Markdown.overrides = ['root', 'a', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol'];

Markdown.propTypes = {
    /** Custom CSS class for styling the Markdown container */
    className: PropTypes.string,
    /**
     * Custom components to override default markdown rendering.
     * Can be used to provide custom renderers for specific markdown elements.
     * Each key should be a valid markdown element tag (e.g., 'a', 'p', 'h1').
     */
    components: PropTypes.object,
    /**
     * Markdown content to render.
     * Raw markdown string that will be processed and converted to React components.
     */
    content: PropTypes.string.isRequired,
    /**
     * Callback function that is called when a link in the markdown content is clicked.
     * Receives an object with { event, attributes, link } where:
     * - event: The click event
     * - attributes: Parsed attributes from the link title (as JSON)
     * - link: Function to execute the default link behavior
     */
    linkCallback: PropTypes.func,
    /**
     * Object with custom style overrides for inner elements.
     * Supports overrides for 'root', 'a', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol'.
     */
    overrides: PropTypes.object,
};

export default Markdown;
