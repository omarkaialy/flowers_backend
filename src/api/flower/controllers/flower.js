'use strict';

/**
 * flower controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::flower.flower', ({ strapi }) => ({
  async find(ctx) {

    ctx.query.populate = { image: { fields: ['url', 'blurhash'] }, offer: { fields: ['name', 'discount_percent'] } }
    const entities = await strapi.entityService.findMany('api::flower.flower', ctx.query);

    return { "data": entities };
  },
}));
