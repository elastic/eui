import * as React from 'react';

const EuiIconLogoPostgres = ({ title, titleId, ...props }) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g fill="none">
      <path
        fill="#000"
        d="M31.876 19.162c-.192-.564-.695-.956-1.345-1.05-.306-.045-.657-.026-1.072.057-.724.145-1.261.2-1.654.211 1.48-2.422 2.683-5.185 3.376-7.785 1.12-4.205.521-6.12-.178-6.987-1.85-2.293-4.551-3.525-7.809-3.563a14.239 14.239 0 00-4.06.551 15.573 15.573 0 00-2.373-.21c-1.567-.024-2.952.307-4.135.988a19.334 19.334 0 00-2.92-.711C6.85.208 4.549.563 2.866 1.716.828 3.112-.117 5.537.058 8.926.113 10 .734 13.273 1.71 16.376c.561 1.784 1.16 3.266 1.78 4.404.878 1.614 1.818 2.564 2.873 2.906.591.19 1.666.325 2.796-.588.143.168.334.335.588.49.322.198.716.359 1.109.454 1.418.344 2.745.258 3.878-.224.007.195.013.382.017.543.008.262.015.518.025.758.067 1.62.181 2.881.518 3.763l.07.201c.168.5.449 1.335 1.164 1.99.74.677 1.637.885 2.457.885.412 0 .804-.052 1.149-.124 1.227-.255 2.621-.643 3.63-2.036.953-1.316 1.417-3.299 1.5-6.423l.031-.253.02-.165.225.019.058.004c1.25.055 2.779-.202 3.718-.625.741-.334 3.119-1.55 2.559-3.194"
      />
      <path
        fill="#336791"
        d="M29.738 19.481c-3.717.744-3.973-.476-3.973-.476 3.925-5.648 5.566-12.817 4.15-14.571C26.052-.352 19.365 1.91 19.254 1.97l-.036.006a13.657 13.657 0 00-2.48-.25c-1.682-.027-2.958.427-3.927 1.14 0 0-11.928-4.766-11.374 5.992.118 2.289 3.383 17.318 7.278 12.779a70.443 70.443 0 012.798-3.064c.683.44 1.501.665 2.358.584l.067-.055c-.02.206-.011.408.027.647-1.004 1.087-.709 1.277-2.714 1.678-2.03.405-.837 1.127-.06 1.316.944.229 3.127.553 4.602-1.45l-.058.23c.393.304.669 1.985.623 3.508-.047 1.524-.078 2.57.232 3.387.31.817.619 2.655 3.255 2.107 2.203-.458 3.345-1.644 3.503-3.623.113-1.407.368-1.199.384-2.457l.205-.595c.236-1.907.037-2.522 1.394-2.236l.33.028c1 .044 2.307-.156 3.074-.502 1.652-.743 2.632-1.985 1.003-1.659"
      />
      <path
        fill="#FFF"
        d="M13.51 9.882c-.335-.045-.639-.004-.792.11a.28.28 0 00-.12.187c-.02.133.077.282.136.358.169.216.414.365.658.398.035.004.07.007.105.007.405 0 .774-.307.807-.533.04-.283-.383-.472-.795-.527m11.099.009c-.032-.222-.44-.285-.826-.233-.386.052-.76.22-.73.443.026.173.348.468.73.468a.718.718 0 00.097-.006.947.947 0 00.53-.281c.135-.138.213-.291.199-.391"
      />
      <path
        fill="#FFF"
        d="M30.975 19.397c-.142-.416-.598-.55-1.356-.398-2.25.45-3.056.139-3.321-.05 1.75-2.584 3.189-5.708 3.965-8.623.368-1.38.57-2.663.587-3.708.019-1.147-.183-1.99-.598-2.505-1.675-2.075-4.134-3.189-7.11-3.22-2.047-.022-3.775.486-4.11.629a10.549 10.549 0 00-2.313-.288c-1.536-.024-2.864.332-3.963 1.06a18.131 18.131 0 00-3.22-.82c-2.61-.407-4.683-.098-6.163.918C1.608 3.605.793 5.773.951 8.836c.053 1.03.658 4.2 1.614 7.236 1.258 3.996 2.625 6.257 4.063 6.723.169.054.363.092.577.092.525 0 1.168-.23 1.838-1.01a64.894 64.894 0 012.532-2.778 4.18 4.18 0 001.822.475l.005.048c-.11.127-.217.255-.321.385-.44.542-.532.655-1.95.938-.403.08-1.473.294-1.489 1.022-.017.795 1.266 1.13 1.412 1.165.509.123 1 .184 1.467.184 1.138 0 2.14-.363 2.94-1.064-.025 2.834.097 5.628.448 6.479.288.696.99 2.4 3.208 2.399a5.3 5.3 0 001.078-.119c2.315-.48 3.32-1.473 3.71-3.66.208-1.17.565-3.961.733-5.459.354.107.81.156 1.304.156 1.029 0 2.216-.212 2.961-.547.837-.377 2.346-1.3 2.072-2.104zM25.462 9.278c-.008.442-.07.844-.137 1.262-.072.451-.145.917-.164 1.482-.019.55.052 1.123.12 1.676.14 1.118.282 2.268-.269 3.403a4.37 4.37 0 01-.243-.485c-.069-.161-.217-.42-.423-.777-.8-1.39-2.673-4.648-1.714-5.977.286-.396 1.01-.803 2.83-.584zm-2.206-7.49c2.667.058 4.777 1.025 6.27 2.876 1.146 1.42-.116 7.879-3.767 13.45l-.111-.135-.046-.056c.943-1.51.759-3.006.595-4.331-.068-.544-.132-1.058-.115-1.541.016-.511.086-.95.154-1.375.082-.522.167-1.063.144-1.701a.684.684 0 00.015-.24c-.06-.611-.78-2.441-2.247-4.098a10.094 10.094 0 00-3.572-2.604 12.407 12.407 0 012.68-.244zM8.334 21.307c-.737.86-1.246.695-1.414.641-1.091-.353-2.357-2.59-3.474-6.136-.966-3.069-1.53-6.155-1.575-7.02-.141-2.737.543-4.644 2.033-5.669 2.426-1.668 6.414-.67 8.016-.163-.023.022-.047.042-.07.065-2.63 2.575-2.567 6.974-2.56 7.243 0 .104.008.251.02.453.046.74.13 2.117-.095 3.677-.209 1.45.252 2.868 1.264 3.892.104.105.213.205.327.3-.45.467-1.43 1.502-2.472 2.717zm2.81-3.635c-.816-.826-1.186-1.974-1.017-3.15.238-1.648.15-3.083.103-3.854l-.016-.277c.384-.33 2.165-1.255 3.434-.973.58.129.932.511 1.08 1.17.759 3.406.1 4.825-.43 5.966-.109.235-.212.458-.3.687l-.068.178c-.173.45-.334.867-.434 1.264a3.325 3.325 0 01-2.352-1.011zm.133 4.594a2.07 2.07 0 01-.614-.256c.111-.051.31-.12.654-.19 1.668-.332 1.925-.567 2.487-1.26.13-.158.275-.338.478-.557.301-.328.44-.272.69-.172.202.082.4.328.48.599.037.128.08.37-.06.56-1.174 1.595-2.886 1.574-4.115 1.276zm8.725 7.873c-2.04.424-2.761-.586-3.237-1.74-.308-.744-.459-4.102-.351-7.81a.434.434 0 00-.02-.143 1.823 1.823 0 00-.057-.262c-.16-.54-.548-.99-1.013-1.178-.185-.074-.525-.21-.933-.11.087-.347.238-.74.402-1.165l.068-.178c.078-.202.175-.41.277-.632.554-1.194 1.313-2.829.49-6.522-.309-1.384-1.34-2.06-2.901-1.903-.936.094-1.793.46-2.22.67a7.255 7.255 0 00-.255.132c.12-1.394.57-4 2.255-5.647 1.062-1.038 2.475-1.55 4.196-1.523 3.393.054 5.569 1.742 6.796 3.15 1.058 1.211 1.631 2.433 1.86 3.091-1.72-.17-2.889.16-3.482.982-1.29 1.787.706 5.257 1.665 6.924.175.306.327.57.375.682.312.734.716 1.224 1.012 1.582.09.11.178.215.245.308-.521.146-1.456.482-1.371 2.164-.069.843-.558 4.793-.806 6.189-.328 1.843-1.028 2.53-2.995 2.939zm8.513-9.447c-.532.24-1.424.42-2.27.458-.935.043-1.411-.101-1.523-.19-.053-1.048.35-1.157.775-1.273a3.35 3.35 0 00.195-.058c.04.031.082.062.13.092.75.481 2.091.533 3.984.154l.02-.004c-.255.232-.692.542-1.31.821z"
      />
    </g>
  </svg>
);

export const icon = EuiIconLogoPostgres;
