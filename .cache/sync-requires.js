

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---src-pages-404-js": (preferDefault(require("/Users/john/Desktop/Code/pizza-web/gatsby/src/pages/404.js"))),
  "component---src-pages-beers-js": (preferDefault(require("/Users/john/Desktop/Code/pizza-web/gatsby/src/pages/beers.js"))),
  "component---src-pages-index-js": (preferDefault(require("/Users/john/Desktop/Code/pizza-web/gatsby/src/pages/index.js"))),
  "component---src-pages-order-js": (preferDefault(require("/Users/john/Desktop/Code/pizza-web/gatsby/src/pages/order.js"))),
  "component---src-pages-pizzas-js": (preferDefault(require("/Users/john/Desktop/Code/pizza-web/gatsby/src/pages/pizzas.js"))),
  "component---src-pages-slicemasters-js": (preferDefault(require("/Users/john/Desktop/Code/pizza-web/gatsby/src/pages/slicemasters.js"))),
  "component---src-templates-pizza-js": (preferDefault(require("/Users/john/Desktop/Code/pizza-web/gatsby/src/templates/Pizza.js"))),
  "component---src-templates-slicemaster-js": (preferDefault(require("/Users/john/Desktop/Code/pizza-web/gatsby/src/templates/Slicemaster.js")))
}

