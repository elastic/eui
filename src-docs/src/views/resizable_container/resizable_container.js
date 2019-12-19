import React from 'react';

import {
  EuiPanel,
  EuiCode,
  EuiSpacer,
  EuiText,
  EuiFlexGroup,
  EuiResizableContainer,
} from '../../../../src';

export default () => (
  <EuiResizableContainer style={{ height: '400px' }}>
    {(Panel, Resizer) => (
      <>
        <Panel
          initialWidth={50}
          style={{
            minWidth: '25%',
            margin: '10px',
          }}>
          <EuiFlexGroup direction="column" gutterSize="none">
            <EuiPanel paddingSize="none">
              <EuiCode>paddingSize=&quot;none&quot;</EuiCode>
            </EuiPanel>

            <EuiSpacer size="l" />

            <EuiPanel paddingSize="s">
              <EuiCode>paddingSize=&quot;s&quot;</EuiCode>
            </EuiPanel>

            <EuiSpacer size="l" />

            <EuiPanel paddingSize="m">
              <EuiCode>paddingSize=&quot;m&quot;</EuiCode>
            </EuiPanel>

            <EuiSpacer size="l" />

            <EuiPanel paddingSize="l">
              <EuiCode>paddingSize=&quot;l&quot;</EuiCode>
            </EuiPanel>
          </EuiFlexGroup>
        </Panel>

        <Resizer />

        <Panel
          initialWidth={50}
          style={{
            minWidth: '35%',
            overflowY: 'auto',
          }}
          scrollable={true}>
          <EuiText>
            <p>
              Lorem ipsum dolor sit amet, omnis omittam patrioque eam ad, eum
              discere efficiantur ut. Ei duo sale melius discere, per animal
              equidem rationibus at. Maiestatis mnesarchum per ea, te eum option
              petentium repudiandae. Ne summo dicam timeam vis, duo etiam primis
              maiestatis ex. Per detraxit mediocrem ad. Ei vix postulant
              aliquando, has ei epicurei quaerendum necessitatibus. No vis idque
              nihil ancillae, ea nostrud incorrupte interesset mel. Ex vim paulo
              docendi, docendi omittam complectitur ne quo, ea nam mundi
              salutatus. An detraxit splendide sed, ridens rationibus cu has. In
              nam tota meliore torquatos, stet detracto insolens cu his. Quidam
              pericula cum ei, modus essent vis an, mea ut veri placerat. Ne cum
              fugit dolor aeterno. No augue audiam consequuntur quo. Case
              detraxit reprehendunt ad qui, vis autem possim eu, vel ut duis
              erroribus. At accusata delicatissimi vis, ad eam eruditi ceteros
              pertinacia, at mandamus quaerendum vis. Ut simul omittam menandri
              his, quodsi vituperata et his, ut eum melius tractatos petentium.
              Nec illud molestie an. Te sed dolor ridens atomorum, quem eirmod
              sed id. Sea iusto dicant populo an. Ius aeque fuisset et, duo id
              amet invenire. Ad duo appareat rationibus sadipscing, nullam
              verterem vix no. Ut melius cetero pertinax usu, ei sententiae
              reprimique eam. Eu usu ferri graeco. Ei qui paulo latine
              rationibus, dico dicat tempor usu ad. Ut eligendi interesset mel,
              ius ut modus animal propriae, justo epicurei no his. Ea sit enim
              sale omittantur, quot malorum intellegat pro ad, ocurreret
              salutatus vel cu. Brute quaeque facilisis in nec. His velit
              percipitur eu, libris possim convenire nec no. Ad mel exerci
              explicari, vidit brute percipitur an vim, phaedrum volutpat
              consequuntur mea ad. Ei sed adhuc mentitum consetetur, ea justo
              perpetua pro, cetero lucilius sententiae eos eu.
            </p>
          </EuiText>
        </Panel>
      </>
    )}
  </EuiResizableContainer>
);
