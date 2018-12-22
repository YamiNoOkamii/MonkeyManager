module.exports = (sequelize, DataTypes) => {
    var Enclos = sequelize.define('Enclos', {
      Name:DataTypes.STRING
    });
  
    return Enclos;
  };