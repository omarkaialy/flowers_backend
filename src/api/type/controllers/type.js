'use strict';

/**
 * type controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::type.type', ({ strapi }) => ({
  async find(ctx) {
    ctx.query.populate = '*';
    const types = await strapi.entityService.findMany('api::type.type', ctx.query);
    return { data: types }
  }

}));
