import express from 'express';
import mongoose from 'mongoose';

import { IRequest } from './../common/interfaces/request';
import Policy from './policy.model'
import { StatusEnum } from './../common/enums/status';

export default {
    async createPolicy(req: IRequest, res: express.Response) {
        try {
            await Policy.create({
                name: req.body.name,
                age: req.body.age,
                address: req.body.address,
                amount: req.body.amount,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                userId: mongoose.Types.ObjectId(req.user.userId),
            })
            return res.status(200).send({
                success: true,
                message: 'policy created successfully'
            })
        } catch (error) {
            return res.status(400).send({
                success: false,
                message: 'Internal Sever Error'
            })
        }
    },
    async getPolicies(req: IRequest, res: express.Response) {
        try {
            let query;
            if (req.query.id) {
                query = { userId: req.query.id }
            } else {
                query = { status: StatusEnum.NOT_APPROVED }
            }
            const getPolicies = await Policy.find(query).populate('userId', ['firstName', 'lastName'])
            return res.status(200).send({
                success: true,
                message: 'policy got successfully',
                policies: getPolicies
            })
        }
        catch (error) {
            return res.status(400).send({
                success: false,
                message: 'Internal Sever Error'
            })
        }
    },
    async updatePolicy(req: IRequest, res: express.Response) {
        try {
            let query = { _id: req.body.id }

            const findPolicy = await Policy.findOne(query);
            if (findPolicy) {
                let newValue = {
                    status: req.body.status
                }

                const updatePolicy = await Policy.updateOne(query, newValue)
                return res.status(200).send({
                    success: true,
                    message: 'Policy Status Update Successfully',
                    policy: updatePolicy
                })
            }
        }
        catch (error) {
            return res.status(400).send({
                success: false,
                message: 'Internal Sever Error'
            })
        }
    },

}