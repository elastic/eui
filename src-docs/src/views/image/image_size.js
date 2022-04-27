import { EuiImage, EuiSpacer } from '../../../../src/components';

export default () => (
  <div>
    <EuiImage
      hasShadow
      allowFullScreen
      size={50}
      caption="Custom size (50)"
      alt="Accessible image alt goes here"
      src="https://source.unsplash.com/1000x1000/?Nature"
    />
    <EuiSpacer />
    <EuiImage
      size="s"
      hasShadow
      allowFullScreen
      caption="Small"
      alt="Accessible image alt goes here"
      src="https://source.unsplash.com/1000x1000/?Nature"
    />
    <EuiSpacer />
    <EuiImage
      size="m"
      hasShadow
      allowFullScreen
      caption="Medium"
      alt="Accessible image alt goes here"
      src="https://source.unsplash.com/1000x1000/?Nature"
    />
    <EuiSpacer />
    <EuiImage
      size="l"
      hasShadow
      allowFullScreen
      caption="Large"
      alt="Accessible image alt goes here"
      src="https://source.unsplash.com/1000x1000/?Nature"
    />
    <EuiSpacer />
    <EuiImage
      size="xl"
      hasShadow
      allowFullScreen
      caption="Extra large"
      alt="Accessible image alt goes here"
      src="https://source.unsplash.com/1000x1000/?Nature"
    />
    <EuiSpacer />
    <EuiImage
      hasShadow
      allowFullScreen
      caption="Original"
      alt="Accessible image alt goes here"
      src="https://source.unsplash.com/1000x1000/?Nature"
    />
    <EuiSpacer />
    <EuiImage
      hasShadow
      allowFullScreen
      size="fullWidth"
      caption="Full width"
      alt="Accessible image alt goes here"
      src="https://source.unsplash.com/1000x1000/?Nature"
    />
  </div>
);
