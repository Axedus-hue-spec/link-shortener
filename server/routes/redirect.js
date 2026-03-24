const {Router} = require('express')
const Link = require('../models/models.js');
export const router = Router();

router.get('/:code', async (req, res) => {
  try {

    const link = await Link.findOne({ where: { code: req.params.code } })

    if (link) {
      return res.redirect(link.from);
    }

    res.status(404).json('Ссылка не найдена');

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});