'use strict';


/**
 * order controller
 */
const moment = require('moment');
const momenttimezone = require('moment-timezone');
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
  async find(ctx) {
    const userFilters = ctx.query.filters;
    const newFilters = { user_id: { id: ctx.state.user.id } };
    const filters = Object.assign({}, userFilters, newFilters);
    ctx.query.filters = filters;

    ctx.query.populate = { flowers: { populate: ['image'] } };
    console.log(ctx.query);
    const entities = await strapi.entityService.findMany('api::order.order', ctx.query);
    return { "data": entities };
  },
  async create(ctx) {
    let totalCount;
    let totalPrice;
    let sum = 0;
    let userId = ctx.state.user.id;
    const { flowers, order_date } =
      ctx.request.body;
    totalCount = flowers.length.toString();
    console.log(flowers);
    for (const id of flowers) {
      console.log(id);
      const object = await strapi.query('api::flower.flower').findOne({ id });
      if (object && object.price_after_offer) { sum += parseInt(object.price_after_offer); } else {
        sum += parseInt(object.price);
      }
      console.log(sum);
    };
    totalPrice = sum.toString();
    console.log(totalPrice);
    const order = await strapi.service('api::order.order').create({
      data: {
        order_date: order_date,
        user_id: userId,
        flowers: flowers,
        total_products_count: totalCount,
        total_price: totalPrice,
        status: 0
      }
    });
    return order;
  }, async deliverd(ctx) {
    const { id } = ctx.params;
    const order = await strapi.entityService.findOne('api::order.order', id);
    console.log(order);
    if (order.status == 0) {
      const timestamp = Date.now();
      const date = new Date(timestamp);

      const orderUpdated = await strapi.entityService.update('api::order.order', id, { data: { status: 1, deliverd_at: date.toISOString().slice(0, 10) } })
      return orderUpdated;
    }
    else return { message: 'not allowed' };
  },
  async reject(ctx) {
    const { id } = ctx.params;
    const order = await strapi.entityService.findOne('api::order.order', id);
    if (order.status == 0) {
      const orderUpdated = await strapi.entityService.update('api::order.order', id, { data: { status: 2 } })
      return orderUpdated;
    }


  },
  async customFind(ctx) {
    // const query = { ...ctx.query, populate: { flowers: { populate: ['image'] } } };
    const entities = await strapi.entityService.findMany('api::order.order', ctx.query);
    return { 'data': entities };
  },
}));
