'use strict';

/**
 * offer controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::offer.offer', ({ strapi }) => ({

  async store(ctx) {
    const { name, discount_percent, flower, end_date } = ctx.request.body;
    console.log(name);
    console.log(discount_percent);
    console.log(flower);
    console.log(Date.parse(end_date));
    const offer = await strapi.entityService.create('api::offer.offer', {
      data: { name: name, discount_percent: discount_percent, flower: flower, end_date: new Date(Date.parse(end_date)) }
    })

    if (offer) {
      const { price } = await strapi.entityService.findOne('api::flower.flower', flower);
      const price_after_offer = parseInt(price) * (parseInt(discount_percent) / 100)
        ; const priceAfterOffer = price_after_offer.toString();
      await strapi.entityService.update('api::flower.flower', flower, {
        data: {
          price_after_offer: priceAfterOffer
        }
      });
      return offer;
    }
  },
  async delete(ctx) {
    const { id } = ctx.params;
    console.log(id);

    const offer = await strapi.entityService.findOne('api::offer.offer', id, { populate: { flower: true } });
    if (offer) {
      const { flower } = offer
        ; const flowerId = flower.id;
      console.log(flower);
      console.log(flowerId);
      await strapi.entityService.update('api::flower.flower', flowerId, { data: { price_after_offer: null } });
      await strapi.entityService.delete('api::offer.offer', id);
      return { message: 'deleted succesfully' };
    } else return { message: 'this offer isn\'t exist' };

  }


}));
