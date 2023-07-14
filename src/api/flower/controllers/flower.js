'use strict';

/**
 * flower controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::flower.flower', ({ strapi }) => ({
  async find(ctx) {

    ctx.query.populate = { image: { fields: ['url', 'blurhash'] } }
    const entities = await strapi.entityService.findMany('api::flower.flower', ctx.query);
    return entities;
  },
}));
