'use strict';

/**
 * flower controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::flower.flower');
