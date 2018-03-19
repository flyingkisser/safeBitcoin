
wallet={};
transaction={};

require("./common-js/server/global.js");
require("./wallet/util.js");
require("./transaction/util.js");

g_bitcoinlib = require('bitcoinjs-lib');

// let testAddr=wallet.util.createAddressAndPrivateKey();
// cc.log("\nnew addr is %s\nyour private key is :\n%s",testAddr.address,testAddr.privateKey);
// cc.log("add len %d key len %d",testAddr.address.length,testAddr.privateKey.length);
//
//
// testAddr=wallet.util.createAddressAndPrivateKeyFromStr("it's a joke!");
// cc.log("\nnew addr is %s\nyour private key is :\n%s",testAddr.address,testAddr.privateKey);
// cc.log("add len %d key len %d",testAddr.address.length,testAddr.privateKey.length);
//
// var key="KxwhcMdjRHzYLLgYMr6dm9JHoed4dNGKb5cfrLU2c9fXEj956mbL";
// var addr="1BakXWbRyWk12GDUuAUfttXHDsX2PMUVCm";
// transaction.util.doTrans(key,addr,0.001);

var printUsage=function () {
    cc.logNoDate("safeBitcoin usage:\n" +
        "address memoryWorld\n" +
        "trans amount privateKey dstAddress\n"
    );
    process.exit(0);
};

let action=process.argv[2];
if(action==="address"){
    let memoryWorld=process.argv[3];
    if(!memoryWorld){
        printUsage();
        return;
    }
    let info=wallet.util.createAddressAndPrivateKeyFromStr(memoryWorld);
    cc.log("your address is %s,privateKey is %s",info.address,info.privateKey);
}else{
    printUsage();
}

