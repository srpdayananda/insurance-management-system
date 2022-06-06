import { StatusEnum } from './../common/enums/status';
import express from 'express';
import { findSourceMap } from 'module';
import mongoose from 'mongoose';

import { IRequest } from './../common/interfaces/request';
import Policy from './policy.model'

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
            let query = { userId: req.query.id }
            console.log(query)

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
            const foundPolicy = await Policy.findOne({ _id: req.body.id })
            if (!foundPolicy) {
                return res.status(400).send({
                    success: false,
                    message: 'Failed Policy Updated',
                    errors: ["couldn't find relevant PolicyId"]
                })
            }
            const query = { _id: req.body.id }
            const newValue = {
                name: req.body.name,
                address: req.body.address,
                amount: req.body.amount,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
            }
            const updatePolicy = await Policy.updateOne(query, newValue)
            return res.status(200).send({
                success: true,
                message: 'Policy Updated Successfully',
                policy: updatePolicy
            })
        }
        catch (error) {
            return res.status(400).send({
                success: false,
                message: 'Internal Sever Error'
            })
        }
    },
    async deletePolicy(req: IRequest, res: express.Response) {
        try {
            const foundPolicy = await Policy.findOne({ _id: req.query.id })
            if (!foundPolicy) {
                return res.status(400).send({
                    success: false,
                    message: 'Failed Policy Deleted',
                    errors: ["couldn't find relevant PolicyId"]
                })
            }
            const deletePolicy = await Policy.deleteOne({ _id: req.query.id })
            return res.status(200).send({
                success: true,
                message: 'policy deleted successfully'
            })
        }
        catch (error) {
            return res.status(400).send({
                success: false,
                message: 'Internal Server Error'
            })
        }
    },

}