const { TimestampAuthority } = require("./timestamp-authority");
const { PkiExpressConfig } = require("./pkiexpress-config");
const {Command} = require("./command");
const { PkiExpressOperator } = require("./pkiexpress-operator");

class StampData extends PkiExpressOperator {
    constructor(config, data, timestampUrl) {
        config = config || new PkiExpressConfig();
        super(config);
        this._data = data;
        this._tsaOptions = new TimestampAuthority(timestampUrl)
    }

    get algorithm(){
        return this._algorithm;
    }

    set algorithm(value){
        this._algorithm = value;
    }

    get data(){
        return this._data;
    }

    set data(value){
        this._data = value;
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

    getData(){
        return this._data;
    }

    setData(value){
        this._data = value;
    }
    
    getTimestampAuthorityOptions() {
        return this._tsaOptions;
    }
    
    createArgs() {
        if (!this._data) {
            throw new Error("The hash to be stamped can not be null");
        }

        let args = [this._data];

        // If omitted, the algorithm is inferred from the size of the hash.
        if (this._algorithm) {
            args.push("--algorithm");
            args.push(this._algorithm);
        }

        this.getTimestampAuthorityOptions().addCmdArguments(args);
        return args;
    }

    stampData() {
        let args = this.createArgs();
        console.log("args", args);
        // Invoke command.
        return new Promise((resolve, reject) => {
            this._invoke(Command.STAMP_DATA, args)
                .then((response) => {
                    let result = response[0];
                    resolve(result);
                })
                .catch((err) => reject(err));
        });
    }

}

exports.StampData = StampData;