require("dotenv").config();
const db = require("../models");
exports.get = async (req, res) => {
  try {
    let data = {
      travails: await db.sphere.findAll({ where: { type: "travail" } }),
      persos: await db.sphere.findAll({ where: { type: "perso" } }),
      relations: await db.sphere.findAll({ where: { type: "relation" } }),
    };
    res.send(data);
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des données:",
      error
    );
    res
      .status(500)
      .send("Une erreur s'est produite lors de la récupération des données.");
  }
};

exports.updateIndex = async (req, res) => {
  const idsToUpdate = req.body.index;

  const updatePromises = [];

  idsToUpdate.forEach((item) => {
    const { id, index } = item;
    updatePromises.push(db.sphere.update({ index }, { where: { id } }));
  });

  await Promise.all(updatePromises);
  res.send({result: true})
};

exports.delete = async (req, res) => {
  const deletedSphere = await db.sphere.findOne({
    where: { id: req.params.id },
  });

  if (!deletedSphere) {
    return res.status(404).send({ result: null, error: "Sphere not found" });
  }

  // Supprimer l'élément
  await db.sphere.destroy({ where: { id: req.params.id } });

  // Mettre à jour les index des éléments restants
  await db.sphere.update(
    { index: db.Sequelize.literal("`index` - 1") }, // Décrémenter l'index de 1 pour tous les éléments après celui supprimé
    { where: { index: { [db.Sequelize.Op.gt]: deletedSphere.index } } } // ....et les éléments avec un index supérieur à celui supprimé
  );

  res.send({ result: true });
};
exports.create = async (req, res) => {
  try {
    // Trouver le dernier ordre pour le type donné
    const lastOrder = await db.sphere.max("index", {
      where: { type: req.body.type },
    });
    // Incrémenter l'ordre
    const newOrder = lastOrder !== null ? lastOrder + 1 : 0;

    // Créer la nouvelle sphère avec l'ordre correct
    const newSphere = {
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      index: newOrder,
    };

    // Ajouter la nouvelle sphère dans la base de données
    const result = await db.sphere.create(newSphere);

    // Envoyer la réponse avec le résultat
    res.send({ result: result });
  } catch (error) {
    // Gérer les erreurs
    res.send({ result: null, error: error });
  }
};
