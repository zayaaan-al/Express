import { Router } from "express";

import * as rh from './reqhandler.js'

const router = Router();

router.route('/adduser').post(rh.addUser);
router.route('/login').post(rh.login);

router.route('/add').post(rh.AddData);
router.route('/get').get(rh.getdata);
router.route('/update/:id').put(rh.updateOne);
router.route('/delete/:id').delete(rh.deletedata);
router.route('/getbyid/:id').get(rh.getdatabyId);

export default router;