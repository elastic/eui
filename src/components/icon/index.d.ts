/// <reference path="../common.d.ts" />

import { SFC, SVGAttributes } from 'react';

declare module '@elastic/eui' {
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
    | 'apps'
    | 'arrowDown'
    | 'arrowLeft'
    | 'arrowRight'
    | 'arrowUp'
    | 'bolt'
    | 'boxesHorizontal'
    | 'boxesVertical'
    | 'brush'
    | 'bullseye'
    | 'check'
    | 'clock'
    | 'console'
    | 'consoleApp'
    | 'controlsHorizontal'
    | 'controlsVertical'
    | 'copy'
    | 'copyClipboard'
    | 'cross'
    | 'dashboardApp'
    | 'devToolsApp'
    | 'discoverApp'
    | 'document'
    | 'dot'
    | 'empty'
    | 'faceHappy'
    | 'faceSad'
    | 'fullScreen'
    | 'gear'
    | 'graphApp'
    | 'grid'
    | 'grokApp'
    | 'help'
    | 'indexPatternApp'
    | 'invert'
    | 'link'
    | 'list'
    | 'listAdd'
    | 'lock'
    | 'loggingApp'
    | 'logoBeats'
    | 'logoCloud'
    | 'logoElastic'
    | 'logoElasticSearch'
    | 'logoElasticStack'
    | 'logoGmail'
    | 'logoKibana'
    | 'logoLogstash'
    | 'logoSlack'
    | 'logoWebhook'
    | 'logoXpack'
    | 'machineLearningApp'
    | 'managementApp'
    | 'mapMarker'
    | 'minusInCircle'
    | 'monitoringApp'
    | 'node'
    | 'pencil'
    | 'pin'
    | 'pipelineApp'
    | 'plusInCircle'
    | 'questionInCircle'
    | 'reportingApp'
    | 'savedObjectsApp'
    | 'search'
    | 'searchProfilerApp'
    | 'securityApp'
    | 'shard'
    | 'share'
    | 'sortDown'
    | 'sortUp'
    | 'starEmpty'
    | 'tear'
    | 'timelionApp'
    | 'trash'
    | 'upgradeAssistantApp'
    | 'user'
    | 'usersRolesApp'
    | 'visualizeApp'
    | 'watchesApp'
    | 'wrench';

  export type IconSize = 'original' | 's' | 'm' | 'l' | 'xl' | 'xxl';

  export type IconColor =
    | 'accent'
    | 'danger'
    | 'default'
    | 'primary'
    | 'secondary'
    | 'subdued'
    | 'success'
    | 'text'
    | 'warning';

  export interface EuiIconProps {
    type?: IconType;
    color?: IconColor;
    size?: IconSize;
  }

  export const EuiIcon: SFC<
    CommonProps & SVGAttributes<SVGAElement> & EuiIconProps
  >;
}
