const User = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true},
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password:  DataTypes.STRING,
    role:  DataTypes.STRING,
  }, {
    timestamps: false,
  });

  return User;
}

User.associate = (models) => {
  User.hasMany(models.Sale, {
    foreingKey: 'userId', as: 'sale'
  });
}

module.exports = User