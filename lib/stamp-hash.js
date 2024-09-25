const { TimestampAuthority } = require("./timestamp-authority");
const { PkiExpressConfig } = require("./pkiexpress-config");
const {Command} = require("./command");
const { PkiExpressOperator } = require("./pkiexpress-operator");

class StampHash extends PkiExpressOperator {
    constructor(config, hash, timestampUrl) {
        config = config || new PkiExpressConfig();
        super(config);
        this._hash = hash;
        this._tsaOptions = new TimestampAuthority(timestampUrl)
    }

    get algorithm(){
        return this._algorithm;
    }

    set algorithm(value){
        this._algorithm = value;
    }

    get hash(){
        return this._hash;
    }

    set hash(value){
        this._hash = value;
    }
    
    get timestampAuthorityOptions() {
        return this._tsaOptions;
    }

    getAlgorithm(){
        return this._algorithm;
    }

    setAlgorithm(value){
        this._algorithm = value;
    }

    getHash(){
        return this._hash;
    }

    setHash(value){
        this._hash = value;
    }
    
    getTimestampAuthorityOptions() {
        return this._tsaOptions;
    }
    
    createArgs() {
        if (!this._hash) {
            throw new Error("The hash to be stamped can not be null");
        }

        let args = [this._hash];

        // If omitted, the algorithm is inferred from the size of the hash.
        if (this._algorithm) {
            args.push("--algorithm");
            args.push(this._algorithm);
        }

        this.getTimestampAuthorityOptions().addCmdArguments(args);
        return args;
    }

    stampHash() {
        let args = this.createArgs();
        console.log("args", args);
        // Invoke command.
        return new Promise((resolve, reject) => {
            this._invoke(Command.STAMP_HASH, args)
                .then((response) => {
                    let result = response[0];
                    resolve(result);
                })
                .catch((err) => reject(err));
        });
    }

}

exports.StampHash = StampHash;