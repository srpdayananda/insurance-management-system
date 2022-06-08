import express from 'express';

import policyController from './policy.controller'

export const policyRouter = express.Router()
policyRouter
    .route('/')
    .post(policyController.createPolicy)
    .get(policyController.getPolicies)
    .put(policyController.updatePolicy)