import express from 'express';
import diagnosesService from '../services/diagnoses';

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res) => {
	return res.json(diagnosesService.getDiagnoses());
});

export default diagnosesRouter;
