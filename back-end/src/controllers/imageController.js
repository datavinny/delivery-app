const getImage = async (req, res) => {
  res.status(200).sendFile(
    '/home/devlopes/trybe-projects/sd-019-c-project-delivery-app/back-end/src/images/no_image.jpg',
  );
};

module.exports = {
  getImage,
};