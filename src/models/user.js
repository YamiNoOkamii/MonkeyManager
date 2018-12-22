module.exports = (sequelize, DataTypes) => {
    var Monkeys = sequelize.define('Monkeys', {
      Monkeyname: DataTypes.STRING,
	  Monkeyage: DataTypes.STRING,
	  Monkeyrace: DataTypes.STRING,
	  Idenclos: DataTypes.STRING
    });
  
    return Monkeys;
  };