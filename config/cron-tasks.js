module.exports = {
  "0 1 0 * * *": async ({ strapi }) => {
    await strapi.service("api::flower.flower").updateFlowerPrices();
  }
}
