module.exports = {
  routes: [{
    method: "GET",
    path: "/orders/indexForAdmin",
    handler: "api::order.order.customFind",
  },
  { path: '/orders/deliverd/:id', method: 'POST', handler: 'api::order.order.deliverd' },
  { path: '/orders/reject/:id', method: 'POST', handler: 'api::order.order.reject' },

  ]
}
