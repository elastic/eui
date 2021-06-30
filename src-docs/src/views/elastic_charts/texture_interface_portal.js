import React, { useState } from 'react';

import { EuiCodeBlock, EuiButton, EuiPortal } from '../../../../src/components';

let buttonRef = null;

export const TextureInterfacePortal = () => {
  const [isPortalVisible, setIsPortalVisible] = useState(false);

  const setButtonRef = (node) => (buttonRef = node);

  const togglePortal = () => {
    setIsPortalVisible(!isPortalVisible);
  };

  let portal;

  if (isPortalVisible) {
    portal = (
      <EuiPortal insert={{ sibling: buttonRef, position: 'after' }}>
        <EuiCodeBlock language="javascript">
          {`interface TexturedStylesBase {
  /** polygon fill color for texture */
  fill?: Color | ColorVariant;
  /** polygon stroke color for texture */
  stroke?: Color | ColorVariant;
  /** polygon stroke width for texture  */
  strokeWidth?: number;
  /** polygon opacity for texture  */
  opacity?: number;
  /** polygon opacity for texture  */
  dash?: number[];
  /** polygon opacity for texture  */
  size?: number;
  /**
  * The angle of rotation for entire texture
  * in degrees
  */
  rotation?: number;
  /**
  * The angle of rotation for polygons
  * in degrees
  */
  shapeRotation?: number;
  /** texture spacing between polygons */
  spacing?: Partial<Point> | number;
  /** overall origin offset of pattern */
  offset?: Partial<Point> & {
  /** apply offset along global coordinate axes */
  global?: boolean;
  };
  }
  
  interface TexturedShapeStyles extends TexturedStylesBase {
  /** typed of texture designs currently supported */
  shape: TextureShape;
  }
  
  interface TexturedPathStyles extends TexturedStylesBase {
  /** path for polygon texture */
  path: string | Path2D;
  }
  
  /**
  * @public
  *
  * Texture style config for area spec
  */
  export type TexturedStyles = TexturedPathStyles | TexturedShapeStyles;`}
        </EuiCodeBlock>
      </EuiPortal>
    );
  }
  return (
    <div>
      <EuiButton onClick={togglePortal} buttonRef={setButtonRef}>
        Toggle button for texture interface
      </EuiButton>
      {portal}
    </div>
  );
};
