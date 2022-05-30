import express from "express";

export interface IRequest extends express.Request {
  user: any;
  policy: any;
}
