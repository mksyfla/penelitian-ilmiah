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
  pgm.createTable('works', {
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
    is_choose: {
      type: 'boolean',
      notNull: true,
    },
    image: {
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
    job_id: {
      type: 'int',
      notNull: true,
    },
    user_id: {
      type: 'int',
      notNull: true,
    },
  });

  pgm.addConstraint(
    'works',
    'fk_works.job_id_jobs.id',
    'FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE',
  );

  pgm.addConstraint(
    'works',
    'fk_works.user_id_users.id',
    'FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE',
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('works');
};
