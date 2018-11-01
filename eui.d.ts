declare module '@elastic/eui' {
  export const accessibleClickKeys: { [keyCode: number]: string };
  export const cascadingMenuKeyCodes: { [keyCodeName: string]: keyCodes };
  export const comboBoxKeyCodes: { [keyCodeName: string]: keyCodes };
  export const htmlIdGenerator: (prefix?: string) => (suffix?: string) => string;
}
declare module '@elastic/eui' {
  export type HorizontalAlignment = 'left' | 'right' | 'center';
}

declare module '@elastic/eui' {
  export enum keyCodes {
    ENTER = 13,
    SPACE = 32,
    ESCAPE = 27,
    TAB = 9,
    BACKSPACE = 8,

    DOWN = 40,
    UP = 38,
    LEFT = 37,
    RIGHT = 39,
  }
 }

declare module '@elastic/eui' {
  export const VISUALIZATION_COLORS: string[];

  export const DEFAULT_VISUALIZATION_COLOR: string;

  type rgbDef = [number, number, number];

  export const hexToRbg: (hex: string) => rgbDef;
  export const rgbToHex: (rgb: string) => string;

  export const isColorDark: (red: number, green: number, blue: number) => boolean;

  export const calculateLuminance: (red: number, green: number, blue: number) => number;
  export const calculateContrast: (rgb1: rgbDef, rgb2: rgbDef) => number;
}
declare module '@elastic/eui' {
	import { EuiPopoverPosition } from "@elastic/eui"; module '@elastic/eui' {
	  type EuiToolTipPosition = 'top' | 'right' | 'bottom' | 'left';

	  type EuiPopoverAnchorRect = {
	    top: number;
	    left: number;
	    width: number;
	    height: number;
	  };

	  type EuiPopoverDimensions = {
	    width: number;
	    height: number;
	  };

	  export const calculatePopoverPosition: (
	    anchorBounds: EuiPopoverAnchorRect,
	    popoverBounds: EuiPopoverDimensions,
	    requestedPosition: EuiToolTipPosition,
	    buffer?: number,
	    positions?: EuiToolTipPosition[]
	  ) => {
	    top: number;
	    left: number;
	    width: number;
	    height: number;
	    position: EuiToolTipPosition;
	  };

	  type EuiPopoverPosition =
	    'topLeft' | 'topCenter' | 'topRight' |
	    'rightTop' | 'rightCenter' | 'rightBottom' |
	    'bottomLeft' | 'bottomCenter' | 'bottomRight' |
	    'leftTop' | 'leftCenter' | 'leftBottom';

	  type FindPopoverPositionArgs = {
	    anchor: HTMLElement | JSX.Element,
	    popover: HTMLElement | JSX.Element,
	    position: string,
	    buffer?: number,
	    offset?: number,
	    container?: HTMLElement
	  }
	  export const findPopoverPosition: (
	    args: FindPopoverPositionArgs
	  ) => {
	    position: EuiToolTipPosition,
	    relativePosition: EuiPopoverPosition,
	    top: number,
	    left: number
	  };
	}

}
/// <reference path="./accessibility/index.d.ts" />
/// <reference path="./alignment.d.ts" />
/// <reference path="./key_codes.d.ts" />
/// <reference path="./color/index.d.ts" />
/// <reference path="./popover/index.d.ts" />
declare module '@elastic/eui/components/common' {
	export interface CommonProps {
	    className?: string;
	    'aria-label'?: string;
	    'data-test-subj'?: string;
	}
	export type NoArgCallback<T> = () => T;
	export type RefCallback<Element extends HTMLElement> = (element: Element) => void;
	export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

}
declare module '@elastic/eui' {
	import { HTMLAttributes, Component, ReactNode } from 'react';

	import { CommonProps } from '@elastic/eui/components/common'; module '@elastic/eui' {
	  export type EuiAccordionSize = 'none' | 'xs' | 's' | 'm' | 'l' | 'xl';

	  export interface EuiAccordionProps {
	    id: string;
	    buttonContentClassName?: string;
	    buttonContent?: ReactNode;
	    extraAction?: ReactNode;
	    initialIsOpen?: boolean;
	    paddingSize?: EuiAccordionSize;
	  }

	  export class EuiAccordion extends Component<
	    CommonProps & HTMLAttributes<HTMLDivElement> & EuiAccordionProps
	    > {}
	}

}
declare module '@elastic/eui' {
	import { CommonProps } from '@elastic/eui/components/common';

	import { HTMLAttributes, SFC } from 'react'; module '@elastic/eui' {

	  export type AvatarSize = 's' | 'm' | 'l' | 'xl';

	  export type AvatarType = 'user' | 'space';

	  export interface EuiAvatarProps {
	    name: string;
	    color?: string;
	    initials?: string;
	    initialsLength?: number;
	    className?: string;
	    imageUrl?: string;
	    size?: AvatarSize;
	    type?: AvatarType;
	  }

	  export const EuiAvatar: SFC<
	    CommonProps & HTMLAttributes<HTMLDivElement> & EuiAvatarProps
	    >;
	}

}
declare module '@elastic/eui' {
	import { CommonProps } from '@elastic/eui/components/common';
	/// <reference path="../icon/index.d.ts" />

	import { SFC, ButtonHTMLAttributes, AnchorHTMLAttributes, MouseEventHandler } from 'react'; module '@elastic/eui' {
	  type EuiButtonPropsForButtonOrLink<Props> = (
	    (Props & { onClick: MouseEventHandler<HTMLButtonElement> } & ButtonHTMLAttributes<HTMLButtonElement>) |
	    (Props & { href: string; onClick: MouseEventHandler<HTMLAnchorElement> } & AnchorHTMLAttributes<HTMLAnchorElement>) |
	    (Props & AnchorHTMLAttributes<HTMLAnchorElement> & ButtonHTMLAttributes<HTMLButtonElement>)
	  )

	  /**
	   * Normal button type defs
	   *
	   * @see './button.js'
	   */

	  export type ButtonIconSide = 'left' | 'right';
	  export type ButtonColor =
	    | 'primary'
	    | 'secondary'
	    | 'warning'
	    | 'danger'
	    | 'ghost';
	  export type ButtonSize = 's' | 'l';

	  export interface EuiButtonProps {
	    iconType?: IconType;
	    iconSide?: ButtonIconSide;
	    fill?: boolean;
	    color?: ButtonColor;
	    size?: ButtonSize;
	    isLoading?: boolean;
	    isDisabled?: boolean;
	  }
	  export const EuiButton: SFC<
	    EuiButtonPropsForButtonOrLink<CommonProps & EuiButtonProps>
	  >;

	  /**
	   * button icon type defs
	   *
	   * @see './button_icon/button_icon.js'
	   */

	  export type ButtonIconColor =
	    | 'primary'
	    | 'danger'
	    | 'disabled'
	    | 'ghost'
	    | 'text';

	  export interface EuiButtonIconProps {
	    iconType?: IconType;
	    color?: ButtonIconColor;
	    'aria-label'?: string;
	    'aria-labelledby'?: string;
	    isDisabled?: boolean;
	    size?: ButtonSize;
	  }
	  export const EuiButtonIcon: SFC<
	    EuiButtonPropsForButtonOrLink<CommonProps & EuiButtonIconProps>
	  >;

	  /**
	   * button icon type defs
	   *
	   * @see './button_empty/button_empty.js'
	   */

	  export type EmptyButtonIconSide = 'left' | 'right';
	  export type EmptyButtonColor =
	    | 'primary'
	    | 'danger'
	    | 'disabled'
	    | 'text'
	    | 'ghost';
	  export type EmptyButtonSizes = 'xs' | 's' | 'l';
	  export type EmptyButtonFlush = 'left' | 'right';

	  export interface EuiButtonEmptyProps {
	    iconType?: IconType;
	    iconSide?: EmptyButtonIconSide;
	    color?: EmptyButtonColor;
	    size?: EmptyButtonSizes;
	    flush?: EmptyButtonFlush;
	    isLoading?: boolean;
	    isDisabled?: boolean;
	  }

	  export const EuiButtonEmpty: SFC<
	    EuiButtonPropsForButtonOrLink<CommonProps & EuiButtonEmptyProps>
	  >;
	}

}
declare module '@elastic/eui' {
	import { ButtonHTMLAttributes, ReactNode, SFC } from 'react';
	import { ListProps } from 'react-virtualized';
	import {
	  EuiComboBoxOption,
	  EuiComboBoxOptionProps,
	  EuiComboBoxOptionsListPosition,
	  EuiComboBoxOptionsListProps,
	} from '@elastic/eui';
	import { RefCallback } from '@elastic/eui/components/common'; module '@elastic/eui' {
	  export type EuiComboBoxOptionProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	    label: string,
	    isGroupLabelOption?: boolean,
	  }

	  export type EuiComboBoxOptionsListPosition = 'top' | 'bottom'

	  export interface EuiComboBoxOption {
	    option: EuiComboBoxOptionProps,
	    children?: ReactNode,
	    className?: string,
	    optionRef?: RefCallback<HTMLButtonElement>,
	    onClick: (option: EuiComboBoxOptionProps) => any,
	    onEnterKey: (option: EuiComboBoxOptionProps) => any,
	    disabled?: boolean,
	  }

	  export interface EuiComboBoxOptionsListProps {
	    options?: Array<EuiComboBoxOptionProps>,
	    isLoading?: boolean,
	    selectedOptions?: Array<any>,
	    onCreateOption?: any,
	    searchValue?: string,
	    matchingOptions?: Array<EuiComboBoxOptionProps>,
	    optionRef?: EuiComboBoxOption['optionRef'],
	    onOptionClick?: EuiComboBoxOption['onClick'],
	    onOptionEnterKey?: EuiComboBoxOption['onEnterKey'],
	    areAllOptionsSelected?: boolean,
	    getSelectedOptionForSearchValue?: (searchValue: string, selectedOptions: Array<any>) => EuiComboBoxOptionProps,
	    updatePosition: (parameter?: UIEvent | EuiPanelProps['panelRef']) => any,
	    position?: EuiComboBoxOptionsListPosition,
	    listRef: EuiPanelProps['panelRef'],
	    renderOption?: (option: EuiComboBoxOptionProps, searchValue: string, OPTION_CONTENT_CLASSNAME: string) => ReactNode,
	    width?: number,
	    scrollToIndex?: number,
	    onScroll?: ListProps['onScroll'],
	    rowHeight?: number,
	    fullWidth?: boolean,
	  }
	  export const EuiComboBoxOptionsList: SFC<EuiComboBoxOptionsListProps>;

	  export type EuiComboBoxSingleSelectionShape = { asPlainText?: boolean; };

	  export interface EuiComboBoxProps {
	    id?: string,
	    isDisabled?: boolean,
	    className?: string,
	    placeholder?: string,
	    isLoading?: boolean,
	    async?: boolean,
	    singleSelection?: EuiComboBoxSingleSelectionShape | boolean,
	    noSuggestions?: boolean,
	    options?: EuiComboBoxOptionsListProps['options'],
	    selectedOptions?: EuiComboBoxOptionsListProps['selectedOptions'],
	    onChange?: (options: Array<EuiComboBoxOptionProps>) => any,
	    onSearchChange?: (searchValue: string) => any,
	    onCreateOption?: EuiComboBoxOptionsListProps['onCreateOption'],
	    renderOption?: EuiComboBoxOptionsListProps['renderOption'],
	    isInvalid?: boolean,
	    rowHeight?: number,
	    isClearable?: boolean,
	    fullWidth?: boolean,
	  }
	  export const EuiComboBox: SFC<EuiComboBoxProps>;
	}

}
declare module '@elastic/eui' {
	import { CommonProps, RefCallback, NoArgCallback, Omit } from '@elastic/eui/components/common';

	import {
	  SFC,
	  ButtonHTMLAttributes,
	  HTMLAttributes,
	  ReactElement,
	  ReactNode
	} from 'react';
	import * as React from 'react'; module '@elastic/eui' {
	  /**
	   * context menu panel type defs
	   *
	   * @see './context_menu_panel.js`
	   */

	  export type EuiContextMenuPanelHeightChangeHandler = (height: number) => void;
	  export type EuiContextMenuPanelTransitionType = 'in' | 'out';
	  export type EuiContextMenuPanelTransitionDirection = 'next' | 'previous';
	  export type EuiContextMenuPanelShowPanelCallback = (
	    currentPanelIndex: number
	  ) => void;

	  export interface EuiContextMenuPanelProps {
	    items?: ReactNode[];
	    title?: ReactNode;
	    onClose?: NoArgCallback<void>;
	    onHeightChange?: EuiContextMenuPanelHeightChangeHandler;
	    transitionType?: EuiContextMenuPanelTransitionType;
	    transitionDirection?: EuiContextMenuPanelTransitionDirection;
	    onTransitionComplete?: NoArgCallback<void>;
	    onUseKeyboardToNavigate?: NoArgCallback<void>;
	    hasFocus?: boolean;
	    showNextPanel?: EuiContextMenuPanelShowPanelCallback;
	    showPreviousPanel?: EuiContextMenuPanelShowPanelCallback;
	    initialFocusedItemIndex?: number;
	  }

	  export const EuiContextMenuPanel: SFC<
	    CommonProps &
	      Omit<
	        HTMLAttributes<HTMLDivElement>,
	        'onKeyDown' | 'tabIndex' | 'onAnimationEnd'
	      > &
	      EuiContextMenuPanelProps
	  >;

	  /**
	   * context menu item type defs
	   *
	   * @see './context_menu_item.js`
	   */

	  export type EuiContextMenuItemIcon = ReactElement<any> | string | HTMLElement;

	  export interface EuiContextMenuItemProps extends CommonProps {
	    icon?: EuiContextMenuItemIcon;
	    hasPanel?: boolean;
	    disabled?: boolean;
	    onClick?: () => void;
	    buttonRef?: RefCallback<HTMLButtonElement>;
	    toolTipContent?: ReactNode;
	    toolTipTitle?: ReactNode;
	    toolTipPosition?: string;
	    href?: string;
	    target?: string;
	    rel?: string;
	    children?: ReactNode;
	  }

	  export const EuiContextMenuItem: SFC<
	    CommonProps &
	      Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> &
	      EuiContextMenuItemProps
	  >;

	  /**
	   * context menu type defs
	   *
	   * @see './context_menu.js`
	   */

	  export type EuiContextMenuPanelId = string | number;

	  export type EuiContextMenuPanelItemDescriptor = Omit<
	    EuiContextMenuItemProps,
	    'hasPanel'
	  > & {
	    name: string;
	    panel?: EuiContextMenuPanelId;
	  };

	  interface EuiContextMenuPanelDescriptor {
	    id: EuiContextMenuPanelId;
	    title: string;
	    items?: EuiContextMenuPanelItemDescriptor[];
	    content?: React.ReactNode;
	    width?: number;
	  }

	  export type EuiContextMenuProps = CommonProps &
	    Omit<HTMLAttributes<HTMLDivElement>, 'style'> & {
	      panels?: EuiContextMenuPanelDescriptor[];
	      initialPanelId?: EuiContextMenuPanelId;
	    };

	  export const EuiContextMenu: SFC<EuiContextMenuProps>;
	}

}
declare module '@elastic/eui' {
	import { HTMLAttributes, Component, ReactNode } from 'react';
	import { CommonProps } from '@elastic/eui/components/common'; module '@elastic/eui' {
	  export type EuiDescriptionListType = 'row' | 'column' | 'inline';
	  export type EuiDescriptionListAlignment = 'center' | 'left';
	  export type EuiDescriptionListTextStyle = 'normal' | 'reverse';

	  export interface EuiDescriptionListProps {
	    listItems?: Array<{ title: ReactNode, description: ReactNode }>;
	    align?: EuiDescriptionListAlignment;
	    compressed?: boolean;
	    textStyle?: EuiDescriptionListTextStyle;
	    type?: EuiDescriptionListType;
	  }

	  export class EuiDescriptionList extends Component<
	    CommonProps & HTMLAttributes<HTMLDListElement> & EuiDescriptionListProps
	    > {}

	  export interface EuiDescriptionListTitleProps {}

	  export class EuiDescriptionListTitle extends Component<
	    CommonProps & HTMLAttributes<HTMLElement> & EuiDescriptionListTitleProps
	    > {}

	  export interface EuiDescriptionListDescriptionProps {}

	  export class EuiDescriptionListDescription extends Component<
	    CommonProps & HTMLAttributes<HTMLElement> & EuiDescriptionListDescriptionProps
	    > {}
	}

}
declare module '@elastic/eui' {
	import { CommonProps } from '@elastic/eui/components/common';

	import { SFC, HTMLAttributes } from 'react'; module '@elastic/eui' {
	  /**
	   * flex grid type defs
	   *
	   * @see './flex_grid.js'
	   */

	  export type FlexGridGutterSize = 'none' | 's' | 'm' | 'l' | 'xl';
	  export type FlexGridColumns = 0 | 1 | 2 | 3 | 4;

	  export interface EuiFlexGridProps {
	    columns?: FlexGridColumns;
	    gutterSize?: FlexGridGutterSize;
	  }

	  export const EuiFlexGrid: SFC<
	    CommonProps & HTMLAttributes<HTMLDivElement> & EuiFlexGridProps
	  >;

	  /**
	   * flex group type defs
	   *
	   * @see './flex_group.js'
	   */

	  export type FlexGroupAlignItems =
	    | 'stretch'
	    | 'flexStart'
	    | 'flexEnd'
	    | 'center';
	  export type FlexGroupComponentType = 'div' | 'span';
	  export type FlexGroupDirection =
	    | 'column'
	    | 'columnReverse'
	    | 'row'
	    | 'rowReverse';
	  export type FlexGroupGutterSize = 'none' | 'xs' | 's' | 'm' | 'l' | 'xl';
	  export type FlexGroupJustifyContent =
	    | 'flexStart'
	    | 'flexEnd'
	    | 'center'
	    | 'spaceBetween'
	    | 'spaceAround'
	    | 'spaceEvenly';

	  export interface EuiFlexGroupProps {
	    alignItems?: FlexGroupAlignItems;
	    children?: React.ReactNode;
	    className?: string;
	    component?: FlexGroupComponentType;
	    direction?: FlexGroupDirection;
	    gutterSize?: FlexGroupGutterSize;
	    justifyContent?: FlexGroupJustifyContent;
	    responsive?: boolean;
	    wrap?: boolean;
	  }

	  export const EuiFlexGroup: SFC<
	    CommonProps &
	      HTMLAttributes<HTMLDivElement | HTMLSpanElement> &
	      EuiFlexGroupProps
	  >;

	  /**
	   * flex item type defs
	   *
	   * @see './flex_item.js'
	   */

	  export type FlexItemGrowSize =
	    | 1
	    | 2
	    | 3
	    | 4
	    | 5
	    | 6
	    | 7
	    | 8
	    | 9
	    | 10
	    | true
	    | false
	    | null;
	  export type FlexItemComponentType = 'div' | 'span';

	  export interface EuiFlexItemProps {
	    grow?: FlexItemGrowSize;
	    component?: FlexItemComponentType;
	  }

	  export const EuiFlexItem: SFC<
	    CommonProps &
	      HTMLAttributes<HTMLDivElement | HTMLSpanElement> &
	      EuiFlexItemProps
	  >;
	}

}
declare module '@elastic/eui' {
	import { CommonProps } from '@elastic/eui/components/common';

	import { SFC, SVGAttributes } from 'react'; module '@elastic/eui' {

	  /**
	   * icon type defs
	   *
	   * @see './icon.js'
	   */
	  export type IconType =
	    | 'addDataApp'
	    | 'advancedSettingsApp'
	    | 'alert'
	    | 'apmApp'
	    | 'apmTrace'
	    | 'apps'
	    | 'arrowDown'
	    | 'arrowLeft'
	    | 'arrowRight'
	    | 'arrowUp'
	    | 'asterisk'
	    | 'bolt'
	    | 'boxesHorizontal'
	    | 'boxesVertical'
	    | 'broom'
	    | 'brush'
	    | 'bullseye'
	    | 'calendar'
	    | 'check'
	    | 'checkInCircleFilled'
	    | 'clock'
	    | 'compute'
	    | 'console'
	    | 'consoleApp'
	    | 'controlsHorizontal'
	    | 'controlsVertical'
	    | 'copy'
	    | 'copyClipboard'
	    | 'createAdvancedJob'
	    | 'createMultiMetricJob'
	    | 'createPopulationJob'
	    | 'createSingleMetricJob'
	    | 'cross'
	    | 'dashboardApp'
	    | 'database'
	    | 'dataVisualizer'
	    | 'devToolsApp'
	    | 'discoverApp'
	    | 'document'
	    | 'dot'
	    | 'editorAlignCenter'
	    | 'editorAlignLeft'
	    | 'editorAlignRight'
	    | 'editorBold'
	    | 'editorCodeBlock'
	    | 'editorComment'
	    | 'editorHeading'
	    | 'editorItalic'
	    | 'editorLink'
	    | 'editorOrderedList'
	    | 'editorStrike'
	    | 'editorTable'
	    | 'editorUnderline'
	    | 'editorUnorderedList'
	    | 'empty'
	    | 'exit'
	    | 'expand'
	    | 'exportAction'
	    | 'eye'
	    | 'eyeClosed'
	    | 'faceHappy'
	    | 'faceNeutral'
	    | 'faceSad'
	    | 'filter'
	    | 'fullScreen'
	    | 'gear'
	    | 'glob'
	    | 'grab'
	    | 'graphApp'
	    | 'grid'
	    | 'grokApp'
	    | 'heatmap'
	    | 'help'
	    | 'iInCircle'
	    | 'importAction'
	    | 'indexClose'
	    | 'indexEdit'
	    | 'indexFlush'
	    | 'indexManagementApp'
	    | 'indexMapping'
	    | 'indexOpen'
	    | 'indexPatternApp'
	    | 'indexSettings'
	    | 'infraApp'
	    | 'inputOutput'
	    | 'inspect'
	    | 'invert'
	    | 'kqlField'
	    | 'kqlFunction'
	    | 'kqlOperand'
	    | 'kqlSelector'
	    | 'kqlValue'
	    | 'link'
	    | 'list'
	    | 'listAdd'
	    | 'lock'
	    | 'lockOpen'
	    | 'loggingApp'
	    | 'logoAerospike'
	    | 'logoApache'
	    | 'logoAWS'
	    | 'logoAWSMono'
	    | 'logoBeats'
	    | 'logoCeph'
	    | 'logoCloud'
	    | 'logoCouchbase'
	    | 'logoDocker'
	    | 'logoDropwizard'
	    | 'logoElastic'
	    | 'logoElasticsearch'
	    | 'logoElasticStack'
	    | 'logoEtcd'
	    | 'logoGCP'
	    | 'logoGCPMono'
	    | 'logoGithub'
	    | 'logoGmail'
	    | 'logoGolang'
	    | 'logoHAproxy'
	    | 'logoKafka'
	    | 'logoKibana'
	    | 'logoKubernetes'
	    | 'logoKubernetes'
	    | 'logoLogstash'
	    | 'logoMemcached'
	    | 'logoMongodb'
	    | 'logoMySQL'
	    | 'logoNginx'
	    | 'logoOsquery'
	    | 'logoPhp'
	    | 'logoPostgres'
	    | 'logoPrometheus'
	    | 'logoRabbitmq'
	    | 'logoRedis'
	    | 'logoSketch'
	    | 'logoSlack'
	    | 'logoWebhook'
	    | 'logoXpack'
	    | 'logstashFilter'
	    | 'logstashIf'
	    | 'logstashInput'
	    | 'logstashOutput'
	    | 'logstashQueue'
	    | 'machineLearningApp'
	    | 'managementApp'
	    | 'mapMarker'
	    | 'memory'
	    | 'merge'
	    | 'minusInCircle'
	    | 'monitoringApp'
	    | 'node'
	    | 'number'
	    | 'pause'
	    | 'pencil'
	    | 'pin'
	    | 'pipelineApp'
	    | 'play'
	    | 'plusInCircle'
	    | 'popout'
	    | 'questionInCircle'
	    | 'refresh'
	    | 'reportingApp'
	    | 'save'
	    | 'savedObjectsApp'
	    | 'scale'
	    | 'search'
	    | 'searchProfilerApp'
	    | 'securityApp'
	    | 'shard'
	    | 'share'
	    | 'sortDown'
	    | 'sortLeft'
	    | 'sortRight'
	    | 'sortUp'
	    | 'spacesApp'
	    | 'starEmpty'
	    | 'starPlusFilled'
	    | 'stats'
	    | 'stop'
	    | 'stopFilled'
	    | 'storage'
	    | 'string'
	    | 'tableOfContents'
	    | 'tag'
	    | 'tear'
	    | 'temperature'
	    | 'timelionApp'
	    | 'trash'
	    | 'upgradeAssistantApp'
	    | 'user'
	    | 'usersRolesApp'
	    | 'vector'
	    | 'visArea'
	    | 'visBarHorizontal'
	    | 'visBarVertical'
	    | 'visControls'
	    | 'visGauge'
	    | 'visGoal'
	    | 'visHeatmap'
	    | 'visLine'
	    | 'visMapCoordinate'
	    | 'visMapRegion'
	    | 'visMetric'
	    | 'visPie'
	    | 'visTable'
	    | 'visTagCloud'
	    | 'visText'
	    | 'visTimelion'
	    | 'visualizeApp'
	    | 'visVega'
	    | 'visVisualBuilder'
	    | 'watchesApp'
	    | 'wrench'
	    | 'auditbeatApp'
	    | 'canvasApp'
	    | 'crossClusterReplicationApp'
	    | 'filebeatApp'
	    | 'gisApp'
	    | 'heartbeatApp'
	    | 'indexRollupApp'
	    | 'metricbeatApp'
	    | 'notebookApp'
	    | 'packetbeatApp'
	    | 'securityAnalyticsApp'
	    | 'sqlApp'

	  export type IconSize = 'original' | 's' | 'm' | 'l' | 'xl' | 'xxl';

	  export type IconColor =
	    | 'accent'
	    | 'danger'
	    | 'default'
	    | 'ghost'
	    | 'primary'
	    | 'secondary'
	    | 'subdued'
	    | 'success'
	    | 'text'
	    | 'warning'
	    | string;

	  export interface EuiIconProps {
	    type?: IconType;
	    color?: IconColor;
	    size?: IconSize;
	  }

	  export const EuiIcon: SFC<CommonProps & SVGAttributes<SVGAElement> & EuiIconProps>;
	}

}
declare module '@elastic/eui' {
	/// <reference path="../icon/index.d.ts" />

	import { SFC, HTMLAttributes } from 'react';
	import { CommonProps } from '@elastic/eui/components/common'; module '@elastic/eui' {
	  /**
	   * health type defs
	   *
	   * @see './health.js'
	   */

	  type EuiHealthProps = CommonProps &
	    HTMLAttributes<HTMLDivElement> & {
	      color: IconColor;
	    };

	  export const EuiHealth: SFC<EuiHealthProps>;
	}

}
declare module '@elastic/eui' {
	import { CommonProps, RefCallback } from '@elastic/eui/components/common';

	import { HTMLAttributes, SFC } from 'react'; module '@elastic/eui' {
	  /**
	   * panel type defs
	   *
	   * @see './panel.js'
	   */

	  export type PanelPaddingSize = 'none' | 's' | 'm' | 'l';

	  export interface EuiPanelProps {
	    hasShadow?: boolean;
	    paddingSize?: PanelPaddingSize;
	    grow?: boolean;
	    panelRef?: RefCallback<HTMLDivElement>;
	  }

	  export const EuiPanel: SFC<
	    CommonProps & HTMLAttributes<HTMLDivElement> & EuiPanelProps
	  >;
	}

}
declare module '@elastic/eui' {
	import { CommonProps, NoArgCallback } from '@elastic/eui/components/common';
	/// <reference path="../panel/index.d.ts" />

	import { SFC, ReactNode, HTMLAttributes } from 'react'; module '@elastic/eui' {
	  /**
	   * popover type defs
	   *
	   * @see './popover.js'
	   */

	  export type PopoverAnchorPosition =
	    | 'upCenter'
	    | 'upLeft'
	    | 'upRight'
	    | 'downCenter'
	    | 'downLeft'
	    | 'downRight'
	    | 'leftCenter'
	    | 'leftUp'
	    | 'leftDown'
	    | 'rightCenter'
	    | 'rightUp'
	    | 'rightDown';

	  interface EuiPopoverProps {
	    id: string;
	    closePopover: NoArgCallback<void>;
	    button: ReactNode;
	    withTitle?: boolean;
	    isOpen?: boolean;
	    ownFocus?: boolean;
	    hasArrow?: boolean;
	    anchorPosition?: PopoverAnchorPosition;
	    panelClassName?: string;
	    panelPaddingSize?: PanelPaddingSize;
	  }

	  export const EuiPopover: SFC<
	    CommonProps & HTMLAttributes<HTMLDivElement> & EuiPopoverProps
	  >;
	}

}
declare module '@elastic/eui' {
	import { CommonProps } from '@elastic/eui/components/common';
	/// <reference path="./checkbox/index.d.ts" />
	/// <reference path="./field_number/index.d.ts" />
	/// <reference path="./field_password/index.d.ts" />
	/// <reference path="./field_search/index.d.ts" />
	/// <reference path="./field_text/index.d.ts" />
	/// <reference path="./form_help_text/index.d.ts" />
	/// <reference path="./form_label/index.d.ts" />
	/// <reference path="./form_row/index.d.ts" />
	/// <reference path="./radio/index.d.ts" />
	/// <reference path="./range/index.d.ts" />
	/// <reference path="./select/index.d.ts" />
	/// <reference path="./switch/index.d.ts" />
	/// <reference path="./text_area/index.d.ts" />

	import { SFC, FormHTMLAttributes, ReactNode } from 'react'; module '@elastic/eui' {
	  /**
	   * @see './form.js'
	   */
	  export type EuiFormProps = CommonProps &
	    FormHTMLAttributes<HTMLFormElement> & {
	      isInvalid?: boolean;
	      error?: ReactNode | ReactNode[];
	    };

	  export const EuiForm: SFC<EuiFormProps>;
	}

}
declare module '@elastic/eui' {
	import { CommonProps } from '@elastic/eui/components/common';

	import { SFC } from 'react'; module '@elastic/eui' {
	  /**
	   * table pagination type defs
	   *
	   * @see './table_pagination.js'
	   */

	  export type PageChangeHandler = (pageIndex: number) => void;
	  export type ItemsPerPageChangeHandler = (pageSize: number) => void;

	  export interface EuiTablePaginationProps {
	    activePage?: number;
	    itemsPerPage?: number;
	    itemsPerPageOptions?: number[];
	    onChangeItemsPerPage?: ItemsPerPageChangeHandler;
	    onChangePage?: PageChangeHandler;
	    pageCount?: number;
	  }

	  export const EuiTablePagination: SFC<EuiTablePaginationProps>;
	}

}
declare module '@elastic/eui' {
	/// <reference path="./table_pagination/index.d.ts" />
	import { CommonProps, NoArgCallback } from '@elastic/eui/components/common';
	/// <reference path="../icon/index.d.ts" />
	/// <reference path="../../services/alignment.d.ts" />

	import {
	  SFC,
	  HTMLAttributes,
	  TableHTMLAttributes,
	  ButtonHTMLAttributes,
	  ThHTMLAttributes,
	  TdHTMLAttributes
	} from 'react';
	import { EuiTableRowCellProps } from '@elastic/eui'; module '@elastic/eui' {
	  /**
	   * table type defs
	   *
	   * @see './table.js'
	   */

	  export interface EuiTableProps {
	    compressed?: boolean;
	    responsive?: boolean;
	  }

	  export const EuiTable: SFC<
	    CommonProps & TableHTMLAttributes<HTMLTableElement> & EuiTableProps
	  >;

	  /**
	   * table body type defs
	   *
	   * @see './table_body.js'
	   */

	  export interface EuiTableBodyProps {}

	  export const EuiTableBody: SFC<CommonProps & EuiTableBodyProps>;

	  /**
	   * table header type defs
	   *
	   * @see './table_header.js'
	   */

	  export interface EuiTableHeaderProps {}

	  export const EuiTableHeader: SFC<CommonProps & EuiTableHeaderProps>;

	  /**
	   * table header button type defs
	   *
	   * @see './table_header_button.js'
	   */

	  export interface EuiTableHeaderButtonProps {
	    iconType?: IconType;
	  }

	  export const EuiTableHeaderButton: SFC<
	    CommonProps &
	      ButtonHTMLAttributes<HTMLButtonElement> &
	      EuiTableHeaderButtonProps
	  >;

	  /**
	   * table header cell type defs
	   *
	   * @see './table_header_cell.js'
	   */

	  export type TableHeaderCellScope = 'col' | 'row' | 'colgroup' | 'rowgroup';

	  export interface EuiTableHeaderCellProps {
	    align?: HorizontalAlignment;
	    width?: string;
	    onSort?: NoArgCallback<void>;
	    isSorted?: boolean;
	    isSortAscending?: boolean;
	    scope?: TableHeaderCellScope;
	  }

	  export const EuiTableHeaderCell: SFC<
	    CommonProps &
	      ThHTMLAttributes<HTMLTableHeaderCellElement> &
	      EuiTableHeaderCellProps
	  >;

	  /**
	   * table header cell checkbox type defs
	   *
	   * @see './table_header_cell_checkbox.js'
	   */

	  export type EuiTableHeaderCellCheckboxScope =
	    | 'col'
	    | 'row'
	    | 'colgroup'
	    | 'rowgroup';

	  export interface EuiTableHeaderCellCheckboxProps {
	    width?: string;
	    scope?: EuiTableHeaderCellCheckboxScope;
	  }

	  export const EuiTableHeaderCellCheckbox: SFC<
	    CommonProps &
	      TdHTMLAttributes<HTMLTableCellElement> &
	      EuiTableHeaderCellCheckboxProps
	  >;

	  /**
	   * table row type defs
	   *
	   * @see './table_row.js'
	   */

	  export interface EuiTableRowProps {
	    isSelected?: boolean;
	  }

	  export const EuiTableRow: SFC<
	    CommonProps & EuiTableRowProps & HTMLAttributes<HTMLTableRowElement>
	  >;

	  /**
	   * table row cell type defs
	   *
	   * @see './table_row_cell.js'
	   */

	  export interface EuiTableRowCellProps {
	    truncateText?: boolean;
	    align?: HorizontalAlignment;
	    textOnly?: boolean;
	  }

	  export const EuiTableRowCell: SFC<
	    CommonProps & HTMLAttributes<HTMLDivElement> & EuiTableRowCellProps
	  >;

	  /**
	   * table row cell checkbox type defs
	   *
	   * @see './table_row_cell_checkbox.js'
	   */

	  export interface EuiTableRowCellCheckboxProps {}

	  export const EuiTableRowCellCheckbox: SFC<
	    CommonProps &
	      TdHTMLAttributes<HTMLTableCellElement> &
	      EuiTableRowCellCheckboxProps
	  >;
	}

}
declare module '@elastic/eui' {
	import { CommonProps, Omit } from '@elastic/eui/components/common';
	/// <reference path="../button/index.d.ts" />

	import { HTMLAttributes, SFC } from 'react'; module '@elastic/eui' {
	  /**
	   * pagination type defs
	   *
	   * @see './pagination.js'
	   */

	  export type PageClickHandler = (pageIndex: number) => void;

	  export interface EuiPaginationProps {
	    pageCount?: number;
	    activePage?: number;
	    onPageClick?: PageClickHandler;
	  }

	  export const EuiPagination: SFC<
	    CommonProps & HTMLAttributes<HTMLDivElement> & EuiPaginationProps
	  >;

	  /**
	   * pagination button type defs
	   *
	   * @see './pagination_button.js'
	   */

	  export interface EuiPaginationButtonProps {
	    isActive?: boolean;
	    isPlaceholder?: boolean;
	    hideOnMobile?: boolean;
	  }

	  export const EuiPaginationButton: SFC<
	    CommonProps &
	      Omit<EuiButtonEmptyProps, 'size' | 'color'> &
	      EuiPaginationButtonProps
	  >;
	}

}
declare module '@elastic/eui' {
	import { CommonProps, Omit } from '@elastic/eui/components/common';

	import {
	  SFC,
	  AnchorHTMLAttributes,
	  ButtonHTMLAttributes,
	  MouseEventHandler
	} from 'react'; module '@elastic/eui' {
	  /**
	   * link type defs
	   *
	   * @see './link.js'
	   */

	  export type EuiLinkType = 'button' | 'reset' | 'submit';
	  export type EuiLinkColor =
	    | 'primary'
	    | 'subdued'
	    | 'secondary'
	    | 'accent'
	    | 'danger'
	    | 'warning'
	    | 'ghost';

	  export interface LinkButtonProps {
	    type?: EuiLinkType;
	    color?: EuiLinkColor;
	    onClick?: MouseEventHandler<HTMLButtonElement>;
	  }

	  type EuiLinkButtonProps = CommonProps &
	    ButtonHTMLAttributes<HTMLButtonElement> &
	    LinkButtonProps;

	  export interface LinkAnchorProps {
	    type?: EuiLinkType;
	    color?: EuiLinkColor;
	  }

	  type EuiLinkAnchorProps = CommonProps &
	    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'> &
	    LinkAnchorProps;

	  export const EuiLink: SFC<EuiLinkButtonProps | EuiLinkAnchorProps>;
	}

}
declare module '@elastic/eui' {
	import { CommonProps } from '@elastic/eui/components/common';

	import { SFC, HTMLAttributes } from 'react'; module '@elastic/eui' {
	  /**
	   * @see './loading_spinner.js'
	   */
	  export type EuiLoadingSpinnerSize = 's' | 'm' | 'l' | 'xl';

	  export type EuiLoadingSpinnerProps = CommonProps &
	    HTMLAttributes<HTMLDivElement> & {
	      size?: EuiLoadingSpinnerSize;
	    };

	  export const EuiLoadingSpinner: SFC<EuiLoadingSpinnerProps>;

	  /**
	   * @see './loading_chart.js'
	   */
	  export type EuiLoadingChartSize = 'm' | 'l' | 'xl';

	  export type EuiLoadingChartProps = CommonProps &
	    HTMLAttributes<HTMLDivElement> & {
	      mono?: boolean;
	      size?: EuiLoadingChartSize;
	    };

	  export const EuiLoadingChart: SFC<EuiLoadingChartProps>;


	  /**
	   * @see './loading_kibana.js'
	   */
	  export interface EuiLoadingKibanaProps {
	    size: 'm' | 'l' | 'xl';
	  }

	  export const EuiLoadingKibana: SFC<
	    CommonProps & HTMLAttributes<HTMLDivElement> & EuiLoadingKibanaProps
	    >;
	}

}
declare module '@elastic/eui' {
	import { CommonProps } from '@elastic/eui/components/common';

	import { SFC, ProgressHTMLAttributes } from 'react'; module '@elastic/eui' {
	  /**
	   * @see './progress.js'
	   */
	  export type EuiProgressColor =
	    | 'accent'
	    | 'danger'
	    | 'primary'
	    | 'secondary'
	    | 'subdued';

	  export type EuiProgressSize = 'xs' | 's' | 'm' | 'l';

	  export type EuiProgressPosition = 'fixed' | 'absolute' | 'static';

	  export type EuiProgressProps = CommonProps &
	    ProgressHTMLAttributes<HTMLProgressElement> & {
	      size?: EuiProgressSize;
	      color?: EuiProgressColor;
	      position?: EuiProgressPosition;
	      max?: number;
	    };

	  export const EuiProgress: SFC<EuiProgressProps>;
	}

}
declare module '@elastic/eui' {
  import { SFC } from 'react';

  /**
   * portal type defs
   *
   * @see './portal.js'
   */
  type EuiPortalProps = {
    children: React.ReactNode;
  };

  export const EuiPortal: SFC<EuiPortalProps>;
}
declare module '@elastic/eui' {
	import { CommonProps } from '@elastic/eui/components/common';
	import { SFC } from 'react'; module '@elastic/eui' {
	  /**
	   * title type defs
	   *
	   * @see './title.js'
	   */

	  type EuiTitleSize = 'xxxs' | 'xxs' | 'xs' | 's' | 'm' | 'l';

	  type EuiTitleTextTransform = 'uppercase';

	  type EuiTitleProps = CommonProps & {
	    size?: EuiTitleSize;
	    textTransform?: EuiTitleTextTransform;
	  };

	  export const EuiTitle: SFC<EuiTitleProps>;
	}

}
declare module '@elastic/eui' {
	import { CommonProps } from '@elastic/eui/components/common';
	import { SFC, HTMLAttributes } from 'react'; module '@elastic/eui' {
	  /**
	   * text type defs
	   *
	   * @see './text.js'
	   * @see './text_color.js'
	   */
	  type SIZES = 's' | 'xs';

	  type COLORS =
	    | 'default'
	    | 'subdued'
	    | 'secondary'
	    | 'accent'
	    | 'danger'
	    | 'warning'
	    | 'ghost';

	  type EuiTextProps = CommonProps &
	    HTMLAttributes<HTMLDivElement> & {
	      size?: SIZES;
	      color?: COLORS;
	      grow?: boolean;
	    };

	  type EuiTextColorProps = CommonProps &
	    HTMLAttributes<HTMLDivElement> &
	    HTMLAttributes<HTMLSpanElement> & {
	    color?: COLORS;
	  };

	  export const EuiText: SFC<EuiTextProps>;
	  export const EuiTextColor: SFC<EuiTextColorProps>;
	}

}
declare module '@elastic/eui' {
	import { CommonProps, Omit } from '@elastic/eui/components/common';
	/// <reference path="../button/index.d.ts" />

	import { ReactNode, SFC, HTMLAttributes } from 'react'; module '@elastic/eui' {

	  /**
	   * Modal type defs
	   *
	   * @see './modal.js'
	   */
	  export interface EuiModalProps {
	    onClose: () => void;
	    /**
	     * Sets the max-width of the modal,
	     * set to `true` to use the default size,
	     * set to `false` to not restrict the width,
	     * set to a number for a custom width in px,
	     * set to a string for a custom width in custom measurement.
	     */
	    maxWidth?: boolean | number | string;
	  }

	  export const EuiModal: SFC<
	    CommonProps & HTMLAttributes<HTMLDivElement> & EuiModalProps
	    >;


	  /**
	   * @see './modal_body.js'
	   */
	  export const EuiModalBody: SFC<
	    CommonProps & HTMLAttributes<HTMLDivElement>
	    >;


	  /**
	   * @see './modal_footer.js'
	   */
	  export const EuiModalFooter: SFC<
	    CommonProps & HTMLAttributes<HTMLDivElement>
	    >;


	  /**
	   * @see './modal_header.js'
	   */
	  export const EuiModalHeader: SFC<
	    CommonProps & HTMLAttributes<HTMLDivElement>
	    >;


	  /**
	   * @see './modal_header_title.js'
	   */
	  export const EuiModalHeaderTitle: SFC<
	    CommonProps & HTMLAttributes<HTMLDivElement>
	    >;

	  /**
	   * Confirm modal type defs
	   *
	   * @see './confirm_modal.js'
	   */

	  // index.js re-exports values from confirm_modal.js with these names.
	  export const EUI_MODAL_CONFIRM_BUTTON: 'confirm';
	  export const EUI_MODAL_CANCEL_BUTTON: 'cancel';

	  export interface EuiConfirmModalProps {
	    buttonColor?: ButtonColor;
	    cancelButtonText?: ReactNode;
	    confirmButtonText?: ReactNode;
	    defaultFocusedButton?: 'confirm' | 'cancel';
	    title?: ReactNode;
	    onCancel?: () => void;
	    onConfirm?: () => void;
	    /**
	     * Sets the max-width of the modal,
	     * set to `true` to use the default size,
	     * set to `false` to not restrict the width,
	     * set to a number for a custom width in px,
	     * set to a string for a custom width in custom measurement.
	     */
	    maxWidth?: boolean | number | string;
	  }

	  // `title` from the React defs conflicts with our definition above
	  export const EuiConfirmModal: SFC<
	    CommonProps & Omit<HTMLAttributes<HTMLDivElement>, 'title'> & EuiConfirmModalProps
	    >;

	}

}
declare module '@elastic/eui' {
	import { CommonProps } from '@elastic/eui/components/common';

	import { SFC, HTMLAttributes } from 'react'; module '@elastic/eui' {

	  /**
	   * EuiOverlayMask type defs
	   *
	   * @see './overlay_mask.js'
	   */
	  export interface EuiOverlayMaskProps {
	    onClick?: () => void;
	  }

	  export const EuiOverlayMask: SFC<
	    CommonProps & HTMLAttributes<HTMLDivElement> & EuiOverlayMaskProps
	    >;

	}

}
declare module '@elastic/eui' {
	import { CommonProps } from '@elastic/eui/components/common';

	import { SFC, HTMLAttributes } from 'react'; module '@elastic/eui' {

	  /**
	   * EuiHorizontalRule type defs
	   *
	   * @see './horizontal_rule.js'
	   */

	  export type EuiHorizontalRuleSize = 'full' | 'half' | 'quarter';

	  export type EuiHorizontalRuleMargin = 'none' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

	  export interface EuiHorizontalRuleProps {
	    size?: EuiHorizontalRuleSize;
	    margin?: EuiHorizontalRuleMargin;
	  }

	  export const EuiHorizontalRule: SFC<
	    CommonProps & HTMLAttributes<HTMLHRElement> & EuiHorizontalRuleProps
	    >;

	}

}
declare module '@elastic/eui' {
	import { CommonProps } from '@elastic/eui/components/common';
	/// <reference path="../panel/index.d.ts" />

	import { SFC, HTMLAttributes } from 'react'; module '@elastic/eui' {
	  export interface EuiPageWidthProps {
	    /**
	     * Sets the max-width of the page,
	     * set to `true` to use the default size,
	     * set to `false` to not restrict the width,
	     * set to a number for a custom width in px,
	     * set to a string for a custom width in custom measurement.
	     */
	    restrictWidth?: boolean | number | string;
	  }

	  /**
	   * @see './page.js'
	   */
	  export const EuiPage: SFC<CommonProps & EuiPageWidthProps &HTMLAttributes<HTMLDivElement>>;

	  /**
	   * @see ./page_header/page_header.js
	   */
	  export const EuiPageHeader: SFC<CommonProps & HTMLAttributes<HTMLDivElement>>;

	  /**
	   * @see ./page_header/page_header_section.js
	   */
	  export const EuiPageHeaderSection: SFC<CommonProps & HTMLAttributes<HTMLDivElement>>;

	  /**
	   * @see ./page_body/page_body.js
	   */
	  export const EuiPageBody: SFC<CommonProps & EuiPageWidthProps & HTMLAttributes<HTMLDivElement>>;

	  /**
	   * @see ./page_content/page_content.js
	   */

	  export type EuiPageContentPaddingSize = 'none' | 's' | 'm' | 'l';
	  export type EuiPageContentVerticalPosition = 'center';
	  export type EuiPageContentHorizontalPosition = 'center';

	  export interface EuiPageContentProps {
	    panelPaddingSize?: EuiPageContentPaddingSize;
	    verticalPosition?: EuiPageContentVerticalPosition;
	    horizontalPosition?: EuiPageContentHorizontalPosition;
	  }

	  export const EuiPageContent: SFC<CommonProps & EuiPanelProps & EuiPageContentProps>;

	  /**
	   * @see ./page_content/page_content_body.js
	   */
	  export const EuiPageContentBody: SFC<CommonProps & HTMLAttributes<HTMLDivElement>>;

	  /**
	   * @see ./page_content/page_content_header.js
	   */
	  export const EuiPageContentHeader: SFC<CommonProps & HTMLAttributes<HTMLDivElement>>;

	  /**
	   * @see ./page_content/page_content_header_section.js
	   */
	  export const EuiPageContentHeaderSection: SFC<CommonProps & HTMLAttributes<HTMLDivElement>>;

	  /**
	   * @see ./page_side_bar/page_side_bar.js
	   */
	  export const EuiPageSideBar: SFC<CommonProps & HTMLAttributes<HTMLDivElement>>;
	}

}
declare module '@elastic/eui' {
	import { CommonProps } from '@elastic/eui/components/common'; module '@elastic/eui' {
	  export interface EuiFlyoutProps {
	    onClose: () => void;
	    size?: 's' | 'm' | 'l';
	    /**
	     * Hides the default close button. You must provide another close button somewhere within the flyout.
	     */
	    hideCloseButton?: boolean;
	    /**
	     * Locks the mouse / keyboard focus to within the flyout
	     */
	    ownFocus?: boolean;
	    /**
	     * Specify an aria-label for the close button of the flyout.
	     */
	    closeButtonAriaLabel?: string;
	    /**
	     * Sets the max-width of the page,
	     * set to `true` to use the default size,
	     * set to `false` to not restrict the width,
	     * set to a number for a custom width in px,
	     * set to a string for a custom width in custom measurement.
	     */
	    maxWidth?: boolean | number | string;
	  }

	  export const EuiFlyout: React.SFC<
	    CommonProps &
	    EuiFlyoutProps
	  >;

	  export const EuiFlyoutBody: React.SFC<CommonProps>;

	  export interface EuiFlyoutHeaderProps {
	    hasBorder?: boolean;
	  }
	  export const EuiFlyoutHeader: React.SFC<CommonProps & EuiFlyoutHeaderProps>;

	  export const EuiFlyoutFooter: React.SFC<CommonProps>;
	}

}
declare module '@elastic/eui' {
	import { CommonProps, Omit } from '@elastic/eui/components/common';
	/// <reference path="../icon/index.d.ts" />
	/// <reference path="../title/index.d.ts" />

	import { SFC, ReactNode, HTMLAttributes } from 'react'; module '@elastic/eui' {
	  /**
	   * EuiEmptyPrompt type defs
	   *
	   * @see './empty_prompt.js'
	   */

	  export interface EuiEmptyPromptProps {
	    iconType?: IconType;
	    iconColor?: IconColor;
	    title?: ReactNode;
	    titleSize?: EuiTitleSize;
	    body?: ReactNode;
	    actions?: ReactNode;
	  }

	  export const EuiEmptyPrompt: SFC<
	    CommonProps & EuiEmptyPromptProps & Omit<HTMLAttributes<HTMLDivElement>, 'title'>
	  >;


	}

}
declare module '@elastic/eui' {
	import { CommonProps } from '@elastic/eui/components/common';

	import { SFC, HTMLAttributes } from 'react'; module '@elastic/eui' {
	  type FontSize = 's' | 'm' | 'l';
	  type PaddingSize = 'none' | 's' | 'm' | 'l';

	  // there isn't a specific type for the <code> element, and MDN
	  // says that it only supports the HTMLElement interface
	  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code
	  type HTMLCodeElement = HTMLElement

	  interface EuiCodeSharedProps {
	    paddingSize?: PaddingSize;

	    /**
	     * Sets the syntax highlighting for a specific language
	     * See http://highlightjs.readthedocs.io/en/latest/css-classes-reference.html#language-names-and-aliases
	     * for options
	     */
	    language?: string;

	    overflowHeight?: number;
	    fontSize?: FontSize;
	    transparentBackground?: boolean;
	  }


	  /**
	   * EuiCode type defs
	   *
	   * @see './code.js'
	   */

	  export interface EuiCodeProps extends EuiCodeSharedProps {
	    inline?: true
	  }

	  export const EuiCode: SFC<
	    CommonProps & EuiCodeProps & HTMLAttributes<HTMLCodeElement>
	  >;

	  /**
	   * EuiCodeBlock type defs
	   *
	   * @see './code_block.js'
	   */

	  export interface EuiCodeBlockProps extends EuiCodeSharedProps {
	    inline?: false
	  }

	  export const EuiCodeBlock: SFC<
	    CommonProps & EuiCodeBlockProps & HTMLAttributes<HTMLCodeElement>
	  >;
	}

}
declare module '@elastic/eui' {
	import { CommonProps, Omit } from '@elastic/eui/components/common';
	/// <reference path="../icon/index.d.ts" />

	import { SFC, ReactNode, HTMLAttributes } from 'react'; module '@elastic/eui' {
	  /**
	   * EuiCallOut type defs
	   *
	   * @see './code.js'
	   */

	  type Color = 'primary' | 'success' | 'warning' | 'danger';
	  type Size = 's' | 'm';

	  export interface EuiCallOutProps {
	    title?: ReactNode,
	    iconType?: IconType,
	    color?: Color,
	    size?: Size,
	  }

	  export const EuiCallOut: SFC<
	    CommonProps & EuiCallOutProps & Omit<HTMLAttributes<HTMLDivElement>, 'title'>
	  >;
	}

}
declare module '@elastic/eui' {
	/// <reference path="../icon/index.d.ts" />

	import { HTMLAttributes, MouseEventHandler, SFC } from 'react';
	import { CommonProps } from '@elastic/eui/components/common'; module '@elastic/eui' {
	  type IconSide = 'left';

	  export interface EuiBadgeProps {
	    iconType?: IconType;
	    iconSide?: IconSide;
	    iconOnClick?: MouseEventHandler<HTMLButtonElement>;
	    iconOnClickAriaLabel?: string;
	    onClick?: MouseEventHandler<HTMLButtonElement>;
	    onClickAriaLabel?: string;
	    color?: string;
	    closeButtonProps?: object;
	  }

	  export const EuiBadge: SFC<
	    CommonProps & HTMLAttributes<HTMLSpanElement> & HTMLAttributes<HTMLButtonElement> & EuiBadgeProps
	  >;
	}

}
declare module '@elastic/eui' {
	import { CommonProps } from '@elastic/eui/components/common';
	/// <reference path="../icon/index.d.ts" />

	import { Component, SFC, HTMLAttributes, ReactChild } from 'react'; module '@elastic/eui' {
	  /**
	   * EuiToast type def
	   *
	   * @see './toast.js'
	   */
	  export interface EuiToastProps extends CommonProps, HTMLAttributes<HTMLDivElement> {
	    title?: string,
	    color?: 'primary' | 'success' | 'warning' | 'danger',
	    iconType?: IconType,
	    onClose?: () => void,
	  }

	  export const EuiToast: SFC<EuiToastProps>;


	  /**
	   * EuiGlobalToastListItem type def
	   *
	   * @see './global_toast_list_item.js'
	   */
	  export interface EuiGlobalToastListItemProps {
	    isDismissed?: boolean;
	  }

	  export const EuiGlobalToastListItem: SFC<
	    EuiGlobalToastListItemProps
	  >

	  /**
	   * EuiGlobalToastList type def
	   *
	   * @see './global_toast_list.js'
	   */
	  export interface Toast extends EuiToastProps {
	    id: string,
	    text?: ReactChild,
	  }

	  export interface EuiGlobalToastListProps {
	    toasts?: Toast[];
	    dismissToast: (this: EuiGlobalToastList, toast: Toast) => void;
	    toastLifeTimeMs: number
	  }

	  export class EuiGlobalToastList extends Component<EuiGlobalToastListProps> {
	    scheduleAllToastsForDismissal(): void;
	    scheduleToastForDismissal(toast: Toast): void;
	    dismissToast(toast: Toast): void;
	  }
	}

}
declare module '@elastic/eui' {
	import { ReactElement, ReactNode, SFC } from 'react'; module '@elastic/eui' {
	  export type ToolTipPositions =
	    | 'top'
	    | 'right'
	    | 'bottom'
	    | 'left';

	  export interface EuiToolTipProps {
	    children: ReactElement<any>;
	    className?: string;
	    content: ReactNode;
	    title?: ReactNode;
	    id?: string;
	    position?: ToolTipPositions;
	  }
	  export const EuiToolTip: SFC<EuiToolTipProps>;

	  export interface EuiIconTipProps {
	    color?: string;
	    type?: string;
	    size?: string;
	    'aria-label'?: string;
	    content: ReactNode;
	  }
	  export const EuiIconTip: SFC<EuiIconTipProps>;
	}

}
declare module '@elastic/eui' {
	import { CommonProps } from '@elastic/eui/components/common';

	import { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, MouseEventHandler, ReactNode, SFC } from 'react'; module '@elastic/eui' {

	  export const EuiKeyPadMenu: SFC<
	    CommonProps & HTMLAttributes<HTMLDivElement>
	  >;

	  interface EuiKeyPadMenuItemCommonProps {
	    label: ReactNode;
	    betaBadgeLabel?: string;
	    betaBadgeIconType?: IconType;
	    betaBadgeTooltipContent?: ReactNode;
	  }

	  export const EuiKeyPadMenuItemButton: SFC<
	    CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & EuiKeyPadMenuItemCommonProps
	  >;

	  export const EuiKeyPadMenuItem: SFC<
	    CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & EuiKeyPadMenuItemCommonProps
	  >;
	}

}
/// <reference path="./accordion/index.d.ts" />
/// <reference path="./avatar/index.d.ts" />
/// <reference path="./button/index.d.ts" />
/// <reference path="./combo_box/index.d.ts" />
/// <reference path="./context_menu/index.d.ts" />
/// <reference path="./description_list/index.d.ts" />
/// <reference path="./flex/index.d.ts" />
/// <reference path="./health/index.d.ts" />
/// <reference path="./icon/index.d.ts" />
/// <reference path="./panel/index.d.ts" />
/// <reference path="./popover/index.d.ts" />
/// <reference path="./form/index.d.ts" />
/// <reference path="./table/index.d.ts" />
/// <reference path="./pagination/index.d.ts" />
/// <reference path="./link/index.d.ts" />
/// <reference path="./loading/index.d.ts" />
/// <reference path="./progress/index.d.ts" />
/// <reference path="./portal/index.d.ts" />
/// <reference path="./title/index.d.ts" />
/// <reference path="./text/index.d.ts" />
/// <reference path="./modal/index.d.ts" />
/// <reference path="./overlay_mask/index.d.ts" />
/// <reference path="./horizontal_rule/index.d.ts" />
/// <reference path="./page/index.d.ts" />
/// <reference path="./flyout/index.d.ts" />
/// <reference path="./empty_prompt/index.d.ts" />
/// <reference path="./code/index.d.ts" />
/// <reference path="./call_out/index.d.ts" />
/// <reference path="./badge/index.d.ts" />
/// <reference path="./toast/index.d.ts" />
/// <reference path="./tool_tip/index.d.ts" />
/// <reference path="./combo_box/index.d.ts" />
/// <reference path="./key_pad_menu/index.d.ts" />

declare module '@elastic/eui' {
  // @ts-ignore
  export * from '@elastic/eui/components/common';
}
declare module "@elastic/eui/dist/eui_theme_*.json" {
    const value: any;
    export default value;
}
declare module '@elastic/eui' {
	import { ShallowWrapper, ReactWrapper } from 'enzyme'; module '@elastic/eui' {
	  export function findTestSubject<T extends ShallowWrapper | ReactWrapper> (
	    mountedComponent: T,
	    testSubjectSelector: string
	  ): ReturnType<T["find"]>;
	}

}
/// <reference path="./services/index.d.ts" />
/// <reference path="./components/index.d.ts" />
/// <reference path="./themes/index.d.ts" />
/// <reference path="./test/index.d.ts" />
declare module '@elastic/eui' {
	import { CommonProps } from '@elastic/eui/components/common';

	import { SFC, ReactNode, HTMLAttributes, ChangeEventHandler, InputHTMLAttributes } from 'react'; module '@elastic/eui' {
	  /**
	   * checkbox type defs
	   *
	   * @see './checkbox.js'
	   */

	  export type EuiCheckboxType = 'inList';

	  export interface EuiCheckboxProps {
	    id: string;
	    checked: boolean;
	    onChange: ChangeEventHandler<HTMLInputElement>; // overriding to make it required
	    label?: ReactNode;
	    type?: EuiCheckboxType;
	    disabled?: boolean;
	    indeterminate?: boolean;
	  }

	  export const EuiCheckbox: SFC<
	    CommonProps & InputHTMLAttributes<HTMLInputElement> & EuiCheckboxProps
	  >;

	  /**
	   * checkbox group type defs
	   *
	   * @see './checkbox_group.js'
	   */

	  export type EuiCheckboxGroupOption = {
	    id: string;
	    label?: ReactNode;
	  };

	  export type EuiCheckboxGroupIdToSelectedMap = { [id: string]: boolean };

	  export interface EuiCheckboxGroupProps {
	    options: EuiCheckboxGroupOption[];
	    idToSelectedMap: EuiCheckboxGroupIdToSelectedMap;
	    onChange: ChangeEventHandler<HTMLInputElement>;
	  }

	  export const EuiCheckboxGroup: SFC<
	    CommonProps & HTMLAttributes<HTMLDivElement> & EuiCheckboxGroupProps
	  >;
	}

}
declare module '@elastic/eui' {
	import { CommonProps } from '@elastic/eui/components/common';
	/// <reference path="../../icon/index.d.ts" />

	import { ReactNode, SFC, InputHTMLAttributes } from 'react'; module '@elastic/eui' {

	  /**
	   * text field type defs
	   *
	   * @see './field_number.js'
	   */
	  export interface EuiFieldNumberProps {
	    icon?: IconType;
	    isInvalid?: boolean;
	    fullWidth?: boolean;
	    isLoading?: boolean;
	    compressed?: boolean;
	    prepend?: ReactNode | ReactNode[];
	    append?: ReactNode | ReactNode[];
	  }

	  export const EuiFieldNumber: SFC<
	    CommonProps & InputHTMLAttributes<HTMLInputElement> & EuiFieldNumberProps
	    >;
	}

}
declare module '@elastic/eui' {
	import { CommonProps } from '@elastic/eui/components/common';

	import { SFC, InputHTMLAttributes, Ref } from 'react'; module '@elastic/eui' {

	  /**
	   * password field type defs
	   *
	   * @see './field_password.js'
	   */
	  export interface EuiFieldPasswordProps {
	    isInvalid?: boolean;
	    inputRef?: Ref<HTMLInputElement>;
	    fullWidth?: boolean;
	    isLoading?: boolean;
	    compressed?: boolean;
	  }

	  export const EuiFieldPassword: SFC<
	    CommonProps & InputHTMLAttributes<HTMLInputElement> & EuiFieldPasswordProps
	  >;
	}

}
declare module '@elastic/eui' {
	import { CommonProps } from '@elastic/eui/components/common';

	import { SFC, InputHTMLAttributes } from 'react'; module '@elastic/eui' {
	  /**
	   * search field type defs
	   *
	   * @see './field_search.js'
	   */

	  export interface EuiFieldSearchProps {
	    name?: string;
	    id?: string;
	    placeholder?: string;
	    value?: string;
	    isInvalid?: boolean;
	    fullWidth?: boolean;
	    isLoading?: boolean;
	    incremental?: boolean;
	  }

	  export const EuiFieldSearch: SFC<
	    CommonProps & InputHTMLAttributes<HTMLInputElement> & EuiFieldSearchProps
	  >;
	}

}
declare module '@elastic/eui' {
	import { CommonProps } from '@elastic/eui/components/common';

	import { SFC, InputHTMLAttributes } from 'react'; module '@elastic/eui' {

	  /**
	   * text field type defs
	   *
	   * @see './field_text.js'
	   */
	  export interface EuiFieldTextProps {
	    icon?: string;
	    isInvalid?: boolean;
	    inputRef?: (ref: HTMLInputElement) => void;
	    fullWidth?: boolean;
	    isLoading?: boolean;
	  }

	  export const EuiFieldText: SFC<
	    CommonProps & InputHTMLAttributes<HTMLInputElement> & EuiFieldTextProps
	    >;
	}

}
declare module '@elastic/eui' {
	import { CommonProps } from '@elastic/eui/components/common';
	/// <reference path="../../icon/index.d.ts" />

	import { ReactNode, SFC, HTMLAttributes } from 'react'; module '@elastic/eui' {

	  /**
	   * @see './field_help_text.js'
	   */
	  export interface EuiFormHelpTextProps {
	  }

	  export const EuiFormHelpText: SFC<
	    CommonProps & HTMLAttributes<HTMLDivElement> & EuiFormHelpTextProps
	    >;
	}

}
declare module '@elastic/eui' {
	import { CommonProps } from '@elastic/eui/components/common';

	import { SFC, ReactNode, LabelHTMLAttributes } from 'react'; module '@elastic/eui' {
	  /**
	   * @see './form_label.js'
	   */

	  export type EuiFormLabelProps = CommonProps &
	    LabelHTMLAttributes<HTMLLabelElement> & {
	      isFocused?: boolean;
	      isInvalid?: boolean;
	    };

	  export const EuiFormLabel: SFC<EuiFormLabelProps>;
	}

}
declare module '@elastic/eui' {
	import { CommonProps } from '@elastic/eui/components/common';

	import { SFC, ReactNode, HTMLAttributes } from 'react'; module '@elastic/eui' {
	  /**
	   * @see './form_row.js'
	   */

	  export type EuiFormRowProps = CommonProps &
	    HTMLAttributes<HTMLDivElement> & {
	      error?: ReactNode | ReactNode[];
	      fullWidth?: boolean;
	      hasEmptyLabelSpace?: boolean;
	      helpText?: ReactNode;
	      isInvalid?: boolean;
	      label?: ReactNode;
	    };

	  export const EuiFormRow: SFC<EuiFormRowProps>;
	}

}
declare module '@elastic/eui' {
	import { CommonProps, Omit } from '@elastic/eui/components/common';

	import { SFC, ChangeEventHandler, HTMLAttributes, ReactNode } from 'react'; module '@elastic/eui' {
	  /**
	   * @see './radio_group.js'
	   */
	  export interface EuiRadioGroupOption {
	    id: string;
	    label?: ReactNode;
	  }

	  export type EuiRadioGroupChangeCallback = (id: string, value: string) => void;

	  export type EuiRadioGroupProps = CommonProps &
	    Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
	      disabled?: boolean;
	      name?: string;
	      options?: EuiRadioGroupOption[];
	      idSelected?: string;
	      onChange: EuiRadioGroupChangeCallback;
	    };

	  export type x = EuiRadioGroupProps['onChange'];

	  export const EuiRadioGroup: SFC<EuiRadioGroupProps>;

	  export interface EuiRadioProps {
	    autoFocus?: boolean;
	    compressed?: boolean;
	    label?: ReactNode;
	    name?: string;
	    value?: string;
	    checked?: boolean;
	    disabled?: boolean;
	    onChange: ChangeEventHandler<HTMLInputElement>; // overriding to make it required
	  }

	  export const EuiRadio: SFC<
	    CommonProps & HTMLAttributes<HTMLDivElement> & EuiRadioProps
	  >;
	}

}
declare module '@elastic/eui' {
	import { CommonProps } from '@elastic/eui/components/common';

	import { SFC, ReactNode, HTMLAttributes, ChangeEventHandler, InputHTMLAttributes } from 'react'; module '@elastic/eui' {
	  /**
	   * @see './range.js'
	   */

	  export type EuiRangeLevelColor = 'primary' | 'success' | 'warning' | 'danger';

	  export interface EuiRangeProps {
	    compressed?: boolean;
	    fullWidth?: boolean;
	    id?: string;
	    levels?: Array<{ min?: number; max?: number; color?: EuiRangeLevelColor }>;
	    // `min` and `max` are optional in HTML but required for our component,
	    // so we override them.
	    max: number;
	    min: number;
	    // The spec allows string values for `step` but the component requires
	    // a number.
	    step?: number;
	    showInput?: boolean;
	    showLabels?: boolean;
	    showRange?: boolean;
	    showTicks?: boolean;
	    showValue?: boolean;
	    tickInterval?: number;
	  }

	  export const EuiRange: SFC<
	    CommonProps & InputHTMLAttributes<HTMLInputElement> & EuiRangeProps
	  >;
	}

}
declare module '@elastic/eui' {
	import { CommonProps } from '@elastic/eui/components/common';

	import {SFC, ReactNode, Ref, OptionHTMLAttributes, SelectHTMLAttributes} from 'react'; module '@elastic/eui' {
	  /**
	   * @see './select.js'
	   */

	  export type EuiSelectProps = CommonProps &
	    SelectHTMLAttributes<HTMLSelectElement> & {
	    name?: string;
	    id?: string;
	    options: Array<{ text: ReactNode } & OptionHTMLAttributes<HTMLOptionElement>>;
	    isInvalid?: boolean;
	    fullWidth?: boolean;
	    isLoading?: boolean;
	    hasNoInitialSelection?: boolean;
	    inputRef?: Ref<HTMLSelectElement>;
	    compressed?: boolean;
	    prepend?: ReactNode | ReactNode[];
	    append?: ReactNode | ReactNode[];
	  };

	  export const EuiSelect: SFC<EuiSelectProps>;
	}

}
declare module '@elastic/eui' {
	import { CommonProps } from '@elastic/eui/components/common';

	import { SFC, InputHTMLAttributes, ReactNode } from 'react'; module '@elastic/eui' {
	  /**
	   * @see './switch.js'
	   */
	  export type EuiSwitchProps = CommonProps &
	    InputHTMLAttributes<HTMLInputElement> & {
	      label?: ReactNode;
	    };

	  export const EuiSwitch: SFC<EuiSwitchProps>;
	}

}
declare module '@elastic/eui' {
	import { CommonProps } from '@elastic/eui/components/common';

	import { SFC, TextareaHTMLAttributes } from 'react'; module '@elastic/eui' {

	  /**
	   * @see './text_area.js'
	   */
	  export interface EuiTextAreaProps {
	    rows?: number;
	    isInvalid?: boolean;
	    fullWidth?: boolean;
	    inputRef?: (input: any) => void;
	  }

	  export const EuiTextArea: SFC<
	    CommonProps & TextareaHTMLAttributes<HTMLTextAreaElement> & EuiTextAreaProps
	    >;
	}

}
declare module '@elastic/eui/components/spacer/spacer' {
	import React from 'react';
	import { HTMLAttributes } from 'react';
	import { CommonProps } from '@elastic/eui/components/common';
	export const SIZES: string[];
	export type SpacerSize = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
	export type EuiSpacerProps = HTMLAttributes<HTMLDivElement> & CommonProps & {
	    size: SpacerSize;
	};
	export const EuiSpacer: React.SFC<EuiSpacerProps>;

}
declare module '@elastic/eui' {
	export { EuiSpacer, } from '@elastic/eui/components/spacer/spacer';

}
declare module '@elastic/eui/services/predicate/common_predicates' {
	export const always: () => boolean;
	export const never: () => boolean;
	export const isUndefined: (value: any) => boolean;
	export const isNull: (value: any) => boolean;
	export const isNil: (value: any) => boolean;
	export const isMoment: (value: any) => boolean;
	export const isDate: (value: any) => boolean;
	export const isDateLike: (value: any) => boolean;

}
declare module '@elastic/eui/services/predicate/lodash_predicates' {
	export { isFunction, isArray, isString, isBoolean, isNumber, isNaN, } from 'lodash';

}
declare module '@elastic/eui' {
	export * from '@elastic/eui/services/predicate/common_predicates';
	export * from '@elastic/eui/services/predicate/lodash_predicates';

}
declare module '@elastic/eui/services/format/format_boolean' {
	export const formatBoolean: (value: boolean, { yes, no, nil }?: {
	    yes?: string;
	    no?: string;
	    nil?: string;
	}) => string;

}
