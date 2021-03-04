import express, { Router } from 'express';
import { createCheckout } from '../controllers/checkout';

const router: Router = express.Router();

router.route('/checkout').post(createCheckout);

export default router;
