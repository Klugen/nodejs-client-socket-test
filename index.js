import Express from 'express';
import Helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import  debug from 'debug';
import ZFJSignatureHelper from './ZFJSignatureHelper.js';
import ResDataUtil from './ResDataUtil.js';

import * as http from "http";
import AES256CBC from "./AES256.js";
import resDataUtil from "./ResDataUtil.js";

const log = debug('app:server');
const application = new Express();
application.use(new Helmet());
application.use(cookieParser());
application.use(bodyParser.json());
application.disable('x-powered-by');

application.get('/generate-aes-key', async (req, res) => {
    const aesKey = new AES256CBC().newRandomKey();
    res.send(aesKey);
});

application.get('/generateSignature', async (req, res) => {
    try {
        const signature = new ZFJSignatureHelper("24971a98a3f233f1776a2f87773c3d26",req.body.token, req.body.oopNum, req.body.orderstatus, req.body.timestamp).getSignature();
        res.send({
            ...req.body,
            signature
        });
    }catch (e){
       res.send(e.message) ;
    }
});


application.post("/order-notify", async (req, res) => {
    try {
        if (!req.body.signature) {
           res.send( ResDataUtil.fail(1,"签名不能为空"));
        }
        const sh = new ZFJSignatureHelper("24971a98a3f233f1776a2f87773c3d26", req.body.token,req.body.oopNum, req.body.orderstatus, req.body.timestamp);
        if (sh.verifySignature(req.body.signature)) {
            // todo 可以校验订单并处理订单状态
           res.send( ResDataUtil.success(null));
        } else {
           res.send( ResDataUtil.fail(2,"签名校验失败"));
        }
    }catch (e) {
        res.send(ResDataUtil.fail(99,e.message));
    }
});

const server = http.createServer(application);

server.listen(10241, () => {
    log("Express server listening on port 10241");
});
