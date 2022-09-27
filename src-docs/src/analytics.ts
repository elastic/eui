const dataLayer = window.dataLayer = window.dataLayer || [];

// get existing euid cookie or create a new one
const euid = 'c72b57ee-4dd4-4e03-a14f-83709e6c3899';

dataLayer.push({
  event: 'page_view',
  euid,
});
