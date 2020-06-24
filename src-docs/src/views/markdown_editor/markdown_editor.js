/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import axios from 'axios';
import { EuiButton, EuiSpacer } from '../../../../src/components/';

import {
  defaultParsingPlugins,
  defaultProcessingPlugins,
  EuiMarkdownEditor,
} from '../../../../src';
import * as MarkdownChart from './plugins/markdown_chart';
import * as MarkdownTooltip from './plugins/markdown_tooltip';
import * as MarkdownCheckbox from './plugins/markdown_checkbox';

let slackFileId = '';
const markdownExample = require('!!raw-loader!./markdown-example.md');

const exampleParsingList = [
  ...defaultParsingPlugins,
  MarkdownChart.parser,
  MarkdownTooltip.parser,
  MarkdownCheckbox.parser,
];

const exampleProcessingList = [...defaultProcessingPlugins]; // pretend mutation doesn't happen immediately next 😅
exampleProcessingList[0][1].handlers.chartDemoPlugin = MarkdownChart.handler;
exampleProcessingList[1][1].components.chartDemoPlugin = MarkdownChart.renderer;

exampleProcessingList[0][1].handlers.tooltipPlugin = MarkdownTooltip.handler;
exampleProcessingList[1][1].components.tooltipPlugin = MarkdownTooltip.renderer;

exampleProcessingList[0][1].handlers.checkboxPlugin = MarkdownCheckbox.handler;
exampleProcessingList[1][1].components.checkboxPlugin =
  MarkdownCheckbox.renderer;

function uploadFile(channel) {
  const data = MarkdownChart.pngSnapshot();

  const form = new FormData();
  form.append('file', data, 'chart_snapshot');

  const headers = {
    'Content-Type': 'multipart/form-data;',
    Authorization:
      'Bearer xoxb-1120606011061-1180769966725-eNYJQbdaPXXrUjKYu6BmqM8z',
  };
  const axiosOptions = {
    headers,
    validateStatus: () => true,
  };

  let params = '?filename=file_test.png';
  if (channel) {
    params = `${params}channels=${channel}`;
  }

  axios
    .post(`https://slack.com/api/files.upload${params}`, form, axiosOptions)
    .then((slackFile) => {
      slackFileId = slackFile.data.file.id;
    });

  /*
  {
    "ok": true,
    "file": {
        "id": "F015KKCBR63",
        "created": 1593038975,
        "timestamp": 1593038975,
        "name": "chart (4).png",
        "title": "chart (4)",
        "mimetype": "image/png",
        "filetype": "png",
        "pretty_type": "PNG",
        "user": "U015ANMUEMB",
        "editable": false,
        "size": 51079,
        "mode": "hosted",
        "is_external": false,
        "external_type": "",
        "is_public": false,
        "public_url_shared": false,
        "display_as_bot": false,
        "username": "",
        "url_private": "https://files.slack.com/files-pri/T013JHU0B1T-F015KKCBR63/chart__4_.png",
        "url_private_download": "https://files.slack.com/files-pri/T013JHU0B1T-F015KKCBR63/download/chart__4_.png",
        "thumb_64": "https://files.slack.com/files-tmb/T013JHU0B1T-F015KKCBR63-82fc11ce27/chart__4__64.png",
        .....
        "thumb_1024_h": 192,
        "original_w": 1818,
        "original_h": 340,
        "thumb_tiny": "AwAIADC+6uWOGIGOlJtkH8XSpaKBWItsuMbzQEkB++cVLRQFiLbLj79ASTcMucZqWigLH//Z",
        "permalink": "https://yuliiatestslack.slack.com/files/U015ANMUEMB/F015KKCBR63/chart__4_.png",
        "permalink_public": "https://slack-files.com/T013JHU0B1T-F015KKCBR63-31600dcd02",
        "comments_count": 0,
        "is_starred": false,
        "shares": {},
        "channels": [],
        "groups": [],
        "ims": [],
        "has_rich_preview": false
        */
}

const downloadFile = (fileId) => {
  const headers = {
    'Content-Type': 'multipart/form-data;',
    Authorization:
      'Bearer xoxp-1120606011061-1121985424562-1209336292128-27f76c2e4c75d460882cf92ef8f3ea8c',
  };
  const axiosOptions = {
    headers,
    validateStatus: () => true,
  };

  axios
    .post(
      `https://slack.com/api/files.sharedPublicURL?file=${fileId}`,
      null,
      axiosOptions
    )
    .then((slackFile) => {
      console.log(slackFile);
    });
};

const shareFileToChannel = (fileId) => {
  const headers = {
    'Content-Type': 'multipart/form-data;',
    Authorization:
      'Bearer xoxp-1120606011061-1121985424562-1209336292128-27f76c2e4c75d460882cf92ef8f3ea8c',
  };
  const axiosOptions = {
    headers,
    validateStatus: () => true,
  };
  axios
    .post(
      `https://slack.com/api/chat.postMessage?channel=C013575J72T&as_user=true&text=${fileId}`,
      null,
      axiosOptions
    )
    .then((slackFile) => {
      const link = document.createElement('a');
      link.href = slackFile.thumb_64;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
};

export default () => {
  const [value, setValue] = useState(markdownExample);

  return (
    <>
      <EuiButton onClick={() => uploadFile('C013S4UAXBN')}>
        Post chart as an image to a Slack channel #general
      </EuiButton>
      <EuiSpacer size="m" />
      <EuiButton onClick={() => uploadFile()}>Post chart as an image</EuiButton>
      <EuiButton onClick={shareFileToChannel}>Share posted image</EuiButton>
      <EuiButton onClick={() => downloadFile(slackFileId)}>
        Download posted image
      </EuiButton>
      <EuiMarkdownEditor
        value={value}
        onChange={setValue}
        height={400}
        uiPlugins={[MarkdownChart.plugin, MarkdownTooltip.plugin]}
        parsingPluginList={exampleParsingList}
        processingPluginList={exampleProcessingList}
      />
    </>
  );
};
