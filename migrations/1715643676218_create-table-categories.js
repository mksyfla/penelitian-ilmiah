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
  pgm.createTable('categories', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    category: {
      type: 'varchar(30)',
      notNull: true,
    },
  });

  pgm.sql("INSERT INTO categories(category) VALUES ('UMKM')");
  pgm.sql("INSERT INTO categories(category) VALUES ('Mahasiswa')");
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('categories');
};
