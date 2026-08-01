/**
 * Geometry for the shared-element transitions: the flight overlay's wordmark
 * hand-off, and the lightbox growing out of the thumbnail that opened it.
 *
 * Split out from the components because this is the part that has to be
 * exactly right and the part a DOM test cannot check: jsdom reports every rect
 * as zero-sized, so measuring through the real overlay proves nothing. Here it
 * is plain arithmetic over two boxes and can be pinned with real numbers.
 */

/**
 * The transform that carries `from` onto `to`.
 *
 * Assumes the moving element's `transform-origin` is its top-left corner —
 * with any other origin the scale would pull the corner off the target and the
 * translation below would no longer line the two boxes up.
 *
 * Scale comes from the height ratio rather than the width. Both boxes are a
 * single line of the same face at the same leading, so their heights are
 * `font-size × leading` and the ratio is exactly the type-size ratio. Widths
 * are not usable: the destination heading is a block that fills its column,
 * while the plate's wordmark shrinks to its own text.
 *
 * Returns `null` when either box has no height — a heading that has not laid
 * out yet, or a page that does not offer a landing target at all. Callers fall
 * back to lifting the title away instead.
 */
export function morphBetween(from, to) {
  if (!from || !to) return null;
  if (!from.height || !to.height) return null;
  return {
    x: to.left - from.left,
    y: to.top - from.top,
    scale: to.height / from.height,
  };
}

/**
 * The inverse: the transform that puts a box already laid out at `to` back
 * over `from`. Applied on the frame before animating to identity — the "invert"
 * step of a FLIP, which is how the lightbox appears to grow out of the
 * thumbnail that opened it without ever animating width or height.
 *
 * Unlike `morphBetween` this works off centres and scales each axis
 * separately, and assumes the default `transform-origin` of 50% 50%. Both
 * differences are forced by the same thing: a thumbnail and its enlarged view
 * rarely share an aspect ratio, because the thumbnails are cropped to a fixed
 * ratio with `object-fit: cover` while the enlarged view is uncropped. A
 * single uniform scale would leave one axis short.
 *
 * Returns `null` if either box is empty — an image that has not loaded, or an
 * open with no originating thumbnail (a keyboard activation, say). Callers
 * fall back to a plain scale-in.
 */
export function flipBetween(from, to) {
  if (!from || !to) return null;
  if (!from.width || !from.height || !to.width || !to.height) return null;
  return {
    x: from.left + from.width / 2 - (to.left + to.width / 2),
    y: from.top + from.height / 2 - (to.top + to.height / 2),
    scaleX: from.width / to.width,
    scaleY: from.height / to.height,
  };
}
