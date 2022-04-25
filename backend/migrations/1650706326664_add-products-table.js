/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('products', {
    id: 'id',
    name: {
      type: 'varchar(255)',
      notNull: true,
    },
    sku: {
      type: 'varchar(255)',
      unique: true,
      notNull: true,
    },
    image: {
      type: 'varchar(255)',
      notNull: true,
    },
    price: {
      type: 'numeric',
      notNull: true,
    },
    description: {
      type: 'text',
      notNull: false,
    },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updatedAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
      onUpdate: pgm.func('current_timestamp'),
    },
  }, {
    ifNotExists: true,
  })
};

exports.down = (pgm) => {
  pgm.dropTable('products', {
    ifExists: true,
  })
};
