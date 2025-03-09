import { UUIDV4, UUID, TEXT, STRING, ENUM, JSONB, DATE } from 'sequelize';

'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Banners', {
    id: {
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV4,
      type: UUID
    },
    title: {
      type: TEXT,
      allowNull: false
    },
    url: {
      type: STRING
    },
    status: {
      type: ENUM,
      values: ['active', 'inactive'],
      defaultValue: 'inactive'
    },
    image: {
      type: JSONB
    },
    createdAt: {
      allowNull: false,
      type: DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      allowNull: false,
      type: DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Banners');
}