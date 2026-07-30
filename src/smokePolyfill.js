// Temporary: jsdom in CRA's Jest lacks TextEncoder/TextDecoder, which
// react-router v7 touches at module load.
import { TextEncoder, TextDecoder } from 'util';

if (typeof global.TextEncoder === 'undefined') global.TextEncoder = TextEncoder;
if (typeof global.TextDecoder === 'undefined') global.TextDecoder = TextDecoder;

// jsdom has no IntersectionObserver, and framer-motion's whileInView needs one.
// Report every observed element as visible straight away so scroll-triggered
// reveals settle into their final state under test.
if (typeof global.IntersectionObserver === 'undefined') {
  class MockIntersectionObserver {
    constructor(callback) {
      this.callback = callback;
      this.elements = new Set();
    }

    observe(el) {
      this.elements.add(el);
      this.callback([{ target: el, isIntersecting: true, intersectionRatio: 1 }], this);
    }

    unobserve(el) {
      this.elements.delete(el);
    }

    disconnect() {
      this.elements.clear();
    }

    takeRecords() {
      return [];
    }
  }

  global.IntersectionObserver = MockIntersectionObserver;
  global.IntersectionObserverEntry = function IntersectionObserverEntry() {};
}

if (typeof global.ResizeObserver === 'undefined') {
  global.ResizeObserver = class ResizeObserver {
    observe() {}

    unobserve() {}

    disconnect() {}
  };
}

// jsdom defines window.scrollTo but throws "Not implemented" when called, which
// floods the output with console.error noise that can hide real failures.
if (typeof window !== 'undefined') {
  window.scrollTo = () => {};
}

if (typeof window !== 'undefined' && typeof window.matchMedia !== 'function') {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent() {
      return false;
    },
  });
}
