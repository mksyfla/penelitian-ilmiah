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
  pgm.createTable('jobs', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    title: {
      type: 'varchar(50)',
      notNull: true,
    },
    content: {
      type: 'text',
      notNull: true,
    },
    deadline: {
      type: 'date',
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
    user_id: {
      type: 'int',
      notNull: true,
    },
  });

  pgm.addConstraint(
    'jobs',
    'fk_jobs.user_id_users.id',
    'FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE',
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('jobs');
};
