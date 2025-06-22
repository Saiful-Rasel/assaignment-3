import express from 'express'
import {  borrowSummary, createBorrow } from './borrow.controller'


export const borrowRoute = express.Router()


borrowRoute.post('/',createBorrow)
borrowRoute.get('/', borrowSummary)