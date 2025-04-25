import React, { useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useDropzone } from 'react-dropzone';

import Groups from './components/Groups';
import ModalCrop from '../../general/ModalCrop';
import Icon from '../../general/Icon';
import { getOverrides, useClasses } from '../../../utils/overrides';

import Button from '../../general/Button';
import Label from '../Label';
import Text from '../../typography/Text';

import { checkBrowserCanRender } from './utils';
import { createUseStyles } from '../../../utils/styles';
import styles from './styles';

const useStyles = createUseStyles(styles, 'FilePicker');

const imageTypes = [
    'image/png',
    'image/jpeg',
    'image/webp',
    'image/gif',
    'image/bmp',
    'image/heic',
];
const imageExtensions = ['png', 'jpeg', 'jpg', 'webp', 'gif', 'bmp', 'heic'];

function FilePicker({
    accept,
    classes: classesProp,
    className: classNameProp,
    cropAspect,
    cropImages,
    disabled,
    error,
    filesData,
    hint,
    id,
    info,
    isFullWidth,
    isRequired,
    label,
    maxFiles,
    maxSize,
    maxVisible,
    minSize,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    multiple,
    name,
    onCrop,
    onRemove,
    overrides: overridesProp,
    singleImagePreview,
    subtitle,
    groups,
    foldedText,
    unfoldedText,
    onExceedFileLimitDrop,
    handleDownload,
    downloadTooltip,
    deleteTooltip,
    customTitle,
    labelMode = 'vertical',
    onDrop = () => {},
    files = [],
    isReadOnly = false,
    title = 'Drop files here',
    buttonLabel = 'Select file',
    cropTitle = 'Crop image',
    cropTooltip = 'Crop image',
    cropAcceptLabel = 'Crop',
    cropCancelLabel = 'Cancel',
    previewImages = false,
    ...props
}) {
    const classes = useClasses(useStyles, classesProp);
    const [crop, setCrop] = useState({ isOpen: false, file: null });
    const [totalDroppedTooltip, setTotalDroppedTooltip] = useState(0);
    const [totalDroppedByGroupTooltip, setTotalDroppedByGroupTooltip] = useState({});

    const handleOnDrop = useCallback(
        (droppedFiles) => {
            const tempDroppedByGroup = {};
            if (groups?.length) {
                const isExceededList = groups.reduce((arr, group, index) => {
                    if (!group.maxFiles || !group.validateFiles) return arr;
                    let selectedFiles = [];
                    const selectedDroppedFiles = droppedFiles.filter((file) =>
                        group.validateFiles(file),
                    );
                    tempDroppedByGroup[index] = selectedDroppedFiles;
                    if (selectedDroppedFiles.length) {
                        selectedFiles = files?.filter((file) => group.validateFiles(file)) || [];

                        const isExceeded =
                            [...selectedFiles, ...selectedDroppedFiles].length > group.maxFiles;
                        arr.push(isExceeded);
                    }
                    return arr;
                }, []);

                if (isExceededList?.length) {
                    const isExceeded = isExceededList.some((current) => current === true);
                    if (isExceeded) {
                        onExceedFileLimitDrop && onExceedFileLimitDrop(droppedFiles);
                        return;
                    }
                }
            } else if (maxFiles) {
                const isExceeded = (files?.length || 0) + (droppedFiles?.length || 0) > maxFiles;
                if (isExceeded) {
                    onExceedFileLimitDrop && onExceedFileLimitDrop(droppedFiles);
                    return;
                }
            }

            if (
                cropImages &&
                onCrop &&
                cropAspect &&
                droppedFiles.length === 1 &&
                imageTypes.includes(droppedFiles[0].type)
            ) {
                return setCrop({ isOpen: true, file: droppedFiles[0], index: -1 });
            }
            return (
                onDrop &&
                Promise.resolve(
                    onDrop(
                        droppedFiles.map((file) =>
                            Object.assign(file, {
                                id: Date.now(),
                            }),
                        ),
                    ),
                ).then((result) => {
                    if (groups) {
                        const newGroupTooltips = groups.reduce((obj, group, index) => {
                            if (group.maxVisible && tempDroppedByGroup?.[index]?.length) {
                                obj[index] = tempDroppedByGroup[index].length;
                            }
                            return obj;
                        }, {});

                        setTotalDroppedByGroupTooltip(newGroupTooltips);
                        setTimeout(() => {
                            setTotalDroppedByGroupTooltip({});
                        }, 2500);
                    } else if (maxVisible) {
                        setTotalDroppedTooltip(droppedFiles.length);
                        setTimeout(() => {
                            setTotalDroppedTooltip(0);
                        }, 2500);
                    }
                })
            );
        },
        [
            cropAspect,
            cropImages,
            onCrop,
            onDrop,
            groups,
            maxVisible,
            files,
            maxFiles,
            onExceedFileLimitDrop,
        ],
    );

    const handleOnCrop = useCallback((file, index, id) => {
        setCrop({ isOpen: true, file, index, id });
    }, []);

    const handleOnCancelCrop = useCallback(() => {
        setCrop({ ...crop, isOpen: false });
    }, [crop]);

    const handleOnAcceptCrop = useCallback(
        (file) => {
            const newFile = crop.id ? { id: crop.id, file } : file;
            crop.index === -1 ? onDrop && onDrop([file]) : onCrop && onCrop(newFile, crop.index);
            setCrop({ ...crop, isOpen: false });
        },
        [crop, onCrop, onDrop],
    );

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
        onDrop: handleOnDrop,
        accept: accept
            ? accept.reduce((fileTypes, fileType) => {
                  fileTypes[fileType] = [];
                  return fileTypes;
              }, {})
            : {},
        disabled,
        maxSize,
        minSize,
        multiple: multiple && !cropAspect,
        ...props,
        noClick: true,
        noKeyboard: true,
    });

    // Overrides
    const override = getOverrides(overridesProp, FilePicker.overrides);

    // Classes
    const rootClassName = classnames(
        classes.root,
        {
            [classes.isReadOnly]: isReadOnly,
            [classes[labelMode]]: labelMode,
            [classes.isFullWidth]: isFullWidth,
            [classes.errored]: error,
        },
        classNameProp,
    );

    const dropZoneClassName = classnames(
        classes.dropZone,
        {
            [classes.isDragActive]: isDragActive,
            [classes.disabled]: disabled,
        },
        classNameProp,
    );

    const rootProps = {
        className: rootClassName,
    };

    const labelProps = {
        className: classes.Label,
        isRequired,
        hint,
        ...override.Label,
    };

    const showDragzone = useMemo(
        () => !(!groups && maxFiles && files.length >= maxFiles),
        [files.length, maxFiles, groups],
    );

    const renderSingleImagePreview = useMemo(() => {
        if (maxFiles !== 1 || !singleImagePreview || showDragzone) return;
        let newFile = null;
        if (files[0]?.file) newFile = files[0]?.file;
        else newFile = files[0];

        const isUrl = typeof newFile === 'string';

        const canRender = checkBrowserCanRender(isUrl ? newFile : newFile.name);

        return (
            <div className={classes.singleImagePreview}>
                {canRender && (
                    <span
                        style={{
                            backgroundImage: `url("${
                                isUrl ? newFile : URL.createObjectURL(newFile)
                            }")`,
                        }}
                    />
                )}
                {!canRender && <Icon name="img" size="big" />}
            </div>
        );
    }, [classes.singleImagePreview, files, maxFiles, showDragzone, singleImagePreview]);

    let filePickerProps = {
        id,
        name,
        className: classes.input,
        ...override.input,
    };

    return (
        <div {...rootProps} {...override.root}>
            {label && <Label {...labelProps}>{label}</Label>}
            <div className={classes.formControl} {...override.formControl}>
                {renderSingleImagePreview}
                {showDragzone && (
                    <div className={dropZoneClassName} {...getRootProps()}>
                        <input {...getInputProps()} {...filePickerProps} />
                        <Text type="subtitle" className={classes.title}>
                            {title}
                        </Text>
                        <Text type="caption" className={classes.subtitle}>
                            {subtitle}
                        </Text>
                        <Button className={classes.button} type="secondary" onClick={open}>
                            {buttonLabel}
                        </Button>
                    </div>
                )}
                <Groups
                    classes={classes}
                    classesProp={classesProp}
                    overrides={override}
                    files={files}
                    imageTypes={imageTypes}
                    imageExtensions={imageExtensions}
                    previewImages={previewImages}
                    cropImages={cropImages}
                    cropTooltip={cropTooltip}
                    downloadTooltip={downloadTooltip}
                    deleteTooltip={deleteTooltip}
                    handleOnCrop={handleOnCrop}
                    onRemove={onRemove}
                    filesData={filesData}
                    groups={groups}
                    foldedText={foldedText}
                    unfoldedText={unfoldedText}
                    maxVisible={maxVisible}
                    maxFiles={maxFiles}
                    totalDroppedTooltip={totalDroppedTooltip}
                    totalDroppedByGroupTooltip={totalDroppedByGroupTooltip}
                    handleDownload={handleDownload}
                    customTitle={customTitle}
                />
                {info && (
                    <div className={classes.info} {...override.info}>
                        {info}
                    </div>
                )}
                {error && (
                    <div className={classes.error} {...override.error}>
                        {error}
                    </div>
                )}
            </div>
            <ModalCrop
                aspect={cropAspect}
                classes={classesProp}
                file={crop.file}
                isOpen={crop.isOpen}
                onAccept={handleOnAcceptCrop}
                onCancel={handleOnCancelCrop}
                confirmText={cropAcceptLabel}
                cancelText={cropCancelLabel}
                overrides={overridesProp}
                title={cropTitle}
            />
        </div>
    );
}

FilePicker.overrides = [
    'root',
    'filePicker',
    'error',
    'info',
    'formControl',
    'Label',
    'groups',
    'groupsHeader',
    'groupsTitle',
    'file',
    'filesList',
];

FilePicker.propTypes = {
    /** Set accepted file types. Array of MIME types or file extensions that the component will accept. */
    accept: PropTypes.array,
    /** Placeholder text shown when the dropzone is active. */
    activePlaceholder: PropTypes.string,
    /** Label for the file selection button. Default is 'Select file'. */
    buttonLabel: PropTypes.string,
    /** Object with custom styles classes. Allows for custom styling of the component beyond the default theme. */
    classes: PropTypes.object,
    /** Override component styles with a custom class. Useful for applying global styles to the component. */
    className: PropTypes.string,
    /** Aspect ratio for image cropping. Used when cropImages is true. */
    cropAspect: PropTypes.number,
    /** When true, allows cropping of image files. Displays a crop button for each image. */
    cropImages: PropTypes.bool,
    /** Text for the accept button in the crop modal. Default is 'Crop'. */
    cropAcceptLabel: PropTypes.string,
    /** Text for the cancel button in the crop modal. Default is 'Cancel'. */
    cropCancelLabel: PropTypes.string,
    /** Title for the crop modal. Default is 'Crop image'. */
    cropTitle: PropTypes.string,
    /** Tooltip text for the crop button. Default is 'Crop image'. */
    cropTooltip: PropTypes.string,
    /** When true, disables the file picker. User cannot select or drop files. */
    disabled: PropTypes.bool,
    /** Error message displayed below the component. Also triggers error styling when present.
     * Can be a boolean or string - when true, only applies error styling without showing a message. */
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    /** Array of files currently selected. Can be File objects or objects with id and file properties. */
    files: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.any,
            PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                file: PropTypes.object,
            }),
        ]),
    ),
    /** Additional data for files to be used for custom rendering or processing. */
    filesData: PropTypes.object,
    /** Tooltip text displayed in an info icon next to the label. Provides additional context for the field. */
    hint: PropTypes.string,
    /** HTML id attribute for the hidden file input element. */
    id: PropTypes.string,
    /** Informational message displayed below the component. Used for non-error guidance text. */
    info: PropTypes.string,
    /** When true, component will take up 100% of the available width. Useful for responsive layouts. */
    isFullWidth: PropTypes.bool,
    /** When true, prevents user from selecting or removing files. The component appears non-interactive. */
    isReadOnly: PropTypes.bool,
    /** When true, displays an asterisk next to the label indicating the field is required. */
    isRequired: PropTypes.bool,
    /** Text to be displayed as the file picker's label. Appears above or beside the dropzone. */
    label: PropTypes.string,
    /** Determines how the label is positioned relative to the file picker.
     * 'horizontal' places the label beside the dropzone, 'vertical' places it above. */
    labelMode: PropTypes.oneOf(['horizontal', 'vertical']),
    /** Maximum accepted number of files. The default value is 0 which means there is no limitation to how many files are accepted.
     * When set, prevents user from selecting more than the specified number of files. */
    maxFiles: PropTypes.number,
    /** Maximum file size in bytes. Files larger than this will be rejected. */
    maxSize: PropTypes.number,
    /** Minimum file size in bytes. Files smaller than this will be rejected. */
    minSize: PropTypes.number,
    /** Maximum image height in pixels. Images taller than this will be rejected. */
    maxHeight: PropTypes.number,
    /** Maximum image width in pixels. Images wider than this will be rejected. */
    maxWidth: PropTypes.number,
    /** Minimum image height in pixels. Images shorter than this will be rejected. */
    minHeight: PropTypes.number,
    /** Minimum image width in pixels. Images narrower than this will be rejected. */
    minWidth: PropTypes.number,
    /** When true, allows selecting multiple files at once. */
    multiple: PropTypes.bool,
    /** HTML name attribute for the hidden file input element. */
    name: PropTypes.string,
    /** Function called when an image is cropped. Receives the cropped file and its index in the files array. */
    onCrop: PropTypes.func,
    /** Function called when files are dropped or selected. Receives the array of accepted files.
     * For better behavior, return a Promise from this function. */
    onDrop: PropTypes.func,
    /** Function called when a file is removed. Receives the file being removed.
     * For better behavior, return a Promise from this function. */
    onRemove: PropTypes.func,
    /** Object with custom style overrides for inner elements. Enables deep customization of component parts. */
    overrides: PropTypes.object,
    /** Main title text displayed in the dropzone. Default is 'Drop files here'. */
    title: PropTypes.string,
    /** Additional informational text displayed below the title in the dropzone.
     * Useful for communicating size limits, accepted file types, etc. */
    subtitle: PropTypes.string,
    /** When true, displays preview thumbnails for image files. */
    previewImages: PropTypes.bool,
    /** Defines groups of files with specific validation rules and limits.
     * Useful for organizing different types of files within the same picker. */
    groups: PropTypes.arrayOf(
        PropTypes.shape({
            /** Title for the group displayed in the UI. */
            title: PropTypes.string,
            /** Maximum number of files allowed in this group. */
            maxFiles: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            /** Function that determines if a file belongs to this group. Returns boolean. */
            validateFiles: PropTypes.func,
        }),
    ),
    /** Maximum number of files to show before collapsing the list. When set, displays a "Show more" button. */
    maxVisible: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Text for the "Show more" button when files are folded (collapsed). Required when maxVisible is set. */
    foldedText: PropTypes.string,
    /** Text for the "Show less" button when files are unfolded (expanded). Required when maxVisible is set. */
    unfoldedText: PropTypes.string,
    /** Function called when dropped files exceed the maxFiles limit. Receives the array of dropped files. */
    onExceedFileLimitDrop: PropTypes.func,
    /** Function called when the download icon is clicked. Receives the file being downloaded. */
    handleDownload: PropTypes.func,
    /** Tooltip text for the download button. */
    downloadTooltip: PropTypes.string,
    /** Tooltip text for the delete button. */
    deleteTooltip: PropTypes.string,
    /** Custom title component to replace the default text title. */
    customTitle: PropTypes.node,
    /** When true, displays a single image preview for the selected file (only works with maxFiles=1). */
    singleImagePreview: PropTypes.bool,
};

export default React.memo(FilePicker);
