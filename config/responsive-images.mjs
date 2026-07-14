export const responsiveImageConfig = Object.freeze({
  sourceDirectory: 'public/images',
  outputDirectory: 'public/images/generated',
  imageSizes: [384],
  deviceSizes: [640, 960],
  quality: 80,
  maxVariantBytes: 120 * 1024,
})

export const responsiveImageWidths = Object.freeze([
  ...responsiveImageConfig.imageSizes,
  ...responsiveImageConfig.deviceSizes,
])
