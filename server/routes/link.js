import {Router} from 'express';
import shortid from 'shortid';
import Link from '../models/Link';
import auth from '../middleware/auth.middleware';

export const router = new Router();

router.post('/generate', auth, async (req, res) => {
  try {
    const baseUrl = process.env.BASE_URL;
    const {from} = req.body;

    const code = shortid.generate();

    const existing = await Link.findOne({ where: { from } });

    if (existing) {
      return res.json({ link: existing });
    }

    const to = baseUrl + '/t/' + code;

    const link = await Link.create({
      code, to, from, userId: req.user.userId
    });

    res.status(200).json({ link });
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.findAll({ where: { userId: req.user.userId} });
    res.json(links);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const link = await Link.findByPk(req.params.id);
    res.json(link);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})