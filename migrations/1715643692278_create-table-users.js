/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    name: {
      type: 'varchar(30)',
      notNull: true,
    },
    email: {
      type: 'varchar(100)',
      notNull: true,
    },
    password: {
      type: 'varchar(100)',
      notNull: true,
    },
    picture: {
      type: 'varchar(100)',
      notNull: true,
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
    },
    category: {
      type: 'varchar(30)',
      notNull: true,
    },
  });

  // pgm.addConstraint(
  //   'users',
  //   'fk_users.category_id_categories.id',
  //   'FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE',
  // );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('users');
};
