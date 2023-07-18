'use strict';

/**
 * flower service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::flower.flower', ({ strapi }) => ({
  async updateFlowerPrices() {
    const flowers = await strapi.query('api::flower.flower').findMany({ populate: ['offer'] });
    console.log('omar');
    for (const flower of flowers) {
      const { price, offer } = flower;
      let priceAfterOffer = null;
      console.log(offer);
      if (offer) {
        const offerObject = await strapi.query('api::offer.offer').findOne({ id: offer.id });
        console.log(offerObject);
        if (offerObject && offerObject.discount_percent) {
          console.log(offerObject.discount_percent);
          const offerPercent = parseFloat(offerObject.discount_percent);
          priceAfterOffer = (price * (100 - offerPercent)) / 100;
        }
      } let priceAfterOfferString = null;
      if (priceAfterOffer) { priceAfterOfferString = priceAfterOffer.toString(); }
      console.log(priceAfterOffer);
      await strapi.entityService.update('api::flower.flower', flower.id, {
        data: {
          price_after_offer: priceAfterOfferString
        }
        ,
      })
    }
  }
}));
